/* The Journey of John Walter Roberts: story map engine.
 * Reads window.JOURNEY (data/journey.js) and window.WORLD_EVENTS (data/world-events.js).
 * Copyright © 2026 Harrison Stewart. AGPL-3.0-or-later.
 */
(function () {
  "use strict";

  const J = window.JOURNEY;
  const P = J.person;
  const STOPS = J.stops || [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mqMobile = window.matchMedia("(max-width: 760px)");

  const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
  const CAT = {
    world:   { color: "var(--cat-world)",   label: "World" },
    us:      { color: "var(--cat-us)",      label: "America" },
    war:     { color: "var(--cat-war)",     label: "War" },
    science: { color: "var(--cat-science)", label: "Science & invention" },
    culture: { color: "var(--cat-culture)", label: "Culture" },
    local:   { color: "var(--cat-local)",   label: "Close to home" }
  };

  /* ---------- small helpers ---------- */

  const $ = (sel, root) => (root || document).querySelector(sel);
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  function parseDate(s) {
    const [y, m, d] = String(s).split("-").map(Number);
    return { y, m: m || null, d: d || null };
  }
  // decimal year, used for ordering and timeline placement
  function yearFrac(s) {
    const p = parseDate(s);
    if (!p.m) return p.y + 0.5;
    if (!p.d) return p.y + (p.m - 0.5) / 12;
    return p.y + (p.m - 1) / 12 + (p.d - 1) / 365;
  }
  function fmtDate(s) {
    const p = parseDate(s);
    if (p.d) return `${p.d} ${MONTHS[p.m - 1]} ${p.y}`;
    if (p.m) return `${MONTHS[p.m - 1]} ${p.y}`;
    return String(p.y);
  }
  // John's age on a date; exact only when both dates are precise enough
  function ageAt(s) {
    const b = parseDate(P.born), t = parseDate(s);
    const age = t.y - b.y;
    if (!b.m || !t.m) return { age, exact: false };
    if (t.m < b.m) return { age: age - 1, exact: true };
    if (t.m > b.m) return { age, exact: true };
    if (!b.d || !t.d) return { age, exact: false };
    return { age: t.d < b.d ? age - 1 : age, exact: true };
  }
  function ageLine(s) {
    const { age, exact } = ageAt(s);
    if (age < 0) return `Before ${P.short} was born`;
    if (age === 0) return `${P.short} was a baby`;
    return `${P.short} was ${exact ? "" : "about "}${age}`;
  }

  const BORN = yearFrac(P.born);
  const DIED = yearFrac(P.died);
  const START_YEAR = parseDate(P.born).y;
  const END_YEAR = parseDate(P.died).y;

  const EVENTS = (window.WORLD_EVENTS || [])
    .map((e) => Object.assign({}, e, { t: yearFrac(e.date) }))
    .filter((e) => e.t >= BORN && e.t <= DIED)
    .sort((a, b) => a.t - b.t)
    .map((e, i) => Object.assign(e, { id: i }));

  function eventsFor(stop, i) {
    if (Array.isArray(stop.meanwhile)) {
      return stop.meanwhile
        .map((d) => EVENTS.find((e) => e.date === d))
        .filter(Boolean);
    }
    const from = yearFrac(stop.date);
    const to = i + 1 < STOPS.length ? yearFrac(STOPS[i + 1].date) : DIED + 0.01;
    return EVENTS.filter((e) => e.t >= from && e.t < to)
      .map((e) => ({ e, score: (e.cat === "local" ? 2 : 0) + (e.first ? 1 : 0) }))
      .sort((a, b) => b.score - a.score || a.e.t - b.e.t)
      .slice(0, 3)
      .map((x) => x.e)
      .sort((a, b) => a.t - b.t);
  }

  /* ---------- chapters ---------- */

  const chapters = [{ type: "intro" }]
    .concat(STOPS.map((stop, idx) => ({ type: "stop", stop, idx, events: eventsFor(stop, idx) })))
    .concat([{ type: "lifetime" }]);
  if (J.closing && J.closing.text && J.closing.text.length) chapters.push({ type: "closing" });

  const opened = STOPS.map((s) => (s.discoveries || []).map(() => false));

  /* ---------- map ---------- */

  const map = L.map("map", {
    zoomControl: false,
    worldCopyJump: true,
    minZoom: 2,
    zoomSnap: 0.25
  }).setView([30, -88], 5);

  L.control.zoom({ position: "topright" }).addTo(map);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    className: "base-tiles",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // gentle arcs between stops, like routes drawn on an old travel map
  function arc(a, b, n) {
    const [lat1, lng1] = a, [lat2, lng2] = b;
    const dx = lng2 - lng1, dy = lat2 - lat1;
    if (Math.hypot(dx, dy) < 0.05) return [a, b];
    const k = 0.2;
    const cx = (lng1 + lng2) / 2 + dy * k;
    const cy = (lat1 + lat2) / 2 - dx * k;
    const pts = [];
    for (let s = 0; s <= n; s++) {
      const t = s / n, u = 1 - t;
      pts.push([u * u * lat1 + 2 * u * t * cy + t * t * lat2, u * u * lng1 + 2 * u * t * cx + t * t * lng2]);
    }
    return pts;
  }

  const stopLL = STOPS.map((s) => [s.lat, s.lng]);
  const segments = stopLL.slice(1).map((ll, i) => arc(stopLL[i], ll, 40));

  const routeFuture = L.polyline(segments.flat(), {
    color: "#6d2216", weight: 2, opacity: 0.35, dashArray: "2 7", lineCap: "round", interactive: false
  }).addTo(map);
  const routeDone = L.polyline([], {
    color: "#8b2e1f", weight: 3.5, opacity: 0.9, dashArray: "10 7", lineCap: "round", interactive: false
  }).addTo(map);

  const stopMarkers = STOPS.map((s, i) => {
    const m = L.marker([s.lat, s.lng], {
      icon: stopIcon(i + 1, ""),
      title: `${i + 1}. ${s.title}`,
      keyboard: true,
      riseOnHover: true,
      zIndexOffset: 500
    }).addTo(map);
    m.on("click", () => go(i + 1));
    return m;
  });

  function stopIcon(n, cls) {
    return L.divIcon({
      className: "",
      html: `<div class="stop-pin ${cls}">${n}</div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });
  }

  const discLayer = L.layerGroup().addTo(map);
  const eventLayer = L.layerGroup().addTo(map);
  const branchLayer = L.layerGroup().addTo(map);
  let discMarkers = [];

  // where to put discovery pins around the stop marker (pixel offsets)
  const DISC_OFFSETS = [[36, -26], [-36, -26], [0, -46], [40, 18]];

  /* ---------- layout-aware camera ---------- */

  function obstruction() {
    const card = $("#card").getBoundingClientRect();
    const tl = $("#timeline").getBoundingClientRect();
    if (mqMobile.matches) return { left: 0, top: 56, right: 0, bottom: window.innerHeight - card.top };
    return { left: card.right, top: 0, right: 0, bottom: tl.height ? window.innerHeight - tl.top : 0 };
  }
  function centerFor(latlng, zoom) {
    const o = obstruction();
    const pt = map.project(latlng, zoom);
    // shift so the point sits in the middle of the uncovered part of the map
    const shift = L.point((o.right - o.left) / 2, (o.bottom - o.top) / 2);
    return map.unproject(pt.add(shift), zoom);
  }
  function fitPadding() {
    const o = obstruction();
    return {
      paddingTopLeft: [o.left + 40, o.top + 60],
      paddingBottomRight: [o.right + 70, o.bottom + 40]
    };
  }
  function flyTo(latlng, zoom) {
    if (reduceMotion) return map.setView(centerFor(latlng, zoom), zoom, { animate: false });
    map.flyTo(centerFor(latlng, zoom), zoom, { duration: 2 });
  }
  function flyToBounds(bounds, maxZoom) {
    const opts = Object.assign(fitPadding(), { maxZoom: maxZoom || 9 });
    if (reduceMotion) return map.fitBounds(bounds, Object.assign(opts, { animate: false }));
    map.flyToBounds(bounds, Object.assign(opts, { duration: 2 }));
  }
  function popupOptions(extra) {
    const o = obstruction();
    return Object.assign({
      maxWidth: 300,
      minWidth: 220,
      autoPanPaddingTopLeft: L.point(o.left + 24, o.top + 70),
      autoPanPaddingBottomRight: L.point(o.right + 64, o.bottom + 24)
    }, extra || {});
  }

  /* ---------- route drawing ---------- */

  let drawRaf = 0;
  function setRoute(doneCount, animateLast) {
    cancelAnimationFrame(drawRaf);
    const full = segments.slice(0, doneCount).flat();
    if (!animateLast || reduceMotion || doneCount === 0) {
      routeDone.setLatLngs(full);
      return;
    }
    const before = segments.slice(0, doneCount - 1).flat();
    const seg = segments[doneCount - 1];
    const t0 = performance.now() + 350;
    const dur = 1500;
    const step = (now) => {
      const t = Math.max(0, Math.min(1, (now - t0) / dur));
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const n = Math.max(1, Math.round(eased * (seg.length - 1)));
      routeDone.setLatLngs(before.concat(seg.slice(0, n + 1)));
      if (t < 1) drawRaf = requestAnimationFrame(step);
    };
    routeDone.setLatLngs(before);
    drawRaf = requestAnimationFrame(step);
  }

  function setStopStates(current) {
    stopMarkers.forEach((m, i) => {
      let cls = "";
      if (current === "all") cls = "";
      else if (i === current) cls = "is-current";
      else if (current < 0 || i > current) cls = "is-future";
      m.setIcon(stopIcon(i + 1, cls));
      m.setZIndexOffset(i === current ? 1000 : 500);
    });
  }

  /* ---------- popups ---------- */

  function discoveryHTML(d) {
    return `<div class="pop-kicker">✦ Discovery</div>
      <div class="pop-title">${esc(d.title)}</div>
      <p class="pop-text">${esc(d.text)}</p>
      ${d.source ? `<p class="pop-source">Source: ${esc(d.source)}</p>` : ""}`;
  }

  function eventHTML(e, withBack) {
    const c = (CAT[e.cat] || CAT.world).color;
    return `<div class="pop-kicker event" style="--c:${c}">Meanwhile · ${esc(fmtDate(e.date))}</div>
      <div class="pop-title">${esc(e.title)}</div>
      <p class="pop-text">${esc(e.text)}</p>
      ${e.place ? `<p class="pop-source">${esc(e.place)}</p>` : ""}
      <p class="pop-age">${esc(ageLine(e.date))} years old.</p>
      ${withBack ? `<button class="pop-back" type="button" data-action="back">← Back to ${esc(P.short)}'s story</button>` : ""}`;
  }

  function eventPin(e, dim) {
    const c = (CAT[e.cat] || CAT.world).color;
    return L.marker([e.lat, e.lng], {
      icon: L.divIcon({
        className: "",
        html: `<div class="event-pin ${dim ? "is-dim" : ""}" style="--c:${c}"></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      }),
      title: e.title,
      keyboard: true
    });
  }

  /* ---------- timeline ---------- */

  const track = $("#tl-track");
  const span = END_YEAR + 1 - START_YEAR;
  const pct = (t) => `${((t - START_YEAR) / span) * 100}%`;

  function buildTimeline() {
    let html = `<div class="tl-line"></div><div class="tl-fill" id="tl-fill"></div>
      <span class="tl-end start">${START_YEAR}</span><span class="tl-end stop">${END_YEAR}</span>`;
    for (let y = Math.ceil(START_YEAR / 10) * 10; y <= END_YEAR; y += 10) {
      if (y - START_YEAR < 4 || END_YEAR - y < 4) continue;
      html += `<span class="tl-decade" style="left:${pct(y)}">${y}</span>`;
    }
    EVENTS.forEach((e) => {
      const c = (CAT[e.cat] || CAT.world).color;
      html += `<button class="tl-event" type="button" style="left:${pct(e.t)};--c:${c}"
        data-action="event" data-id="${e.id}" data-tip="${esc(parseDate(e.date).y + " · " + e.title)}"
        aria-label="${esc(parseDate(e.date).y + ": " + e.title)}"></button>`;
    });
    STOPS.forEach((s, i) => {
      html += `<button class="tl-stop" type="button" style="left:${pct(yearFrac(s.date))}"
        data-action="goto" data-chapter="${i + 1}" data-tip="${esc(parseDate(s.date).y + " · " + s.title)}"
        aria-label="Stop ${i + 1}: ${esc(s.title)}">${i + 1}</button>`;
    });
    html += `<div class="tl-cursor" id="tl-cursor"><span id="tl-cursor-label"></span></div>
      <div class="tl-tip" id="tl-tip" role="tooltip"></div>`;
    track.innerHTML = html;
  }

  function setTimeline(t, label, nearIds, currentStop) {
    const fill = $("#tl-fill"), cursor = $("#tl-cursor");
    if (t == null) {
      cursor.style.opacity = 0;
      fill.style.width = "0%";
    } else {
      cursor.style.opacity = 1;
      cursor.style.left = pct(t);
      fill.style.width = pct(t);
      $("#tl-cursor-label").textContent = label || "";
      // keep the label inside the bar near the right end
      $("#tl-cursor-label").style.left = (t - START_YEAR) / span > 0.85 ? "auto" : "6px";
      $("#tl-cursor-label").style.right = (t - START_YEAR) / span > 0.85 ? "6px" : "auto";
    }
    track.querySelectorAll(".tl-event").forEach((b) => {
      b.classList.toggle("is-near", nearIds.indexOf(Number(b.dataset.id)) !== -1);
    });
    track.querySelectorAll(".tl-stop").forEach((b, i) => {
      b.classList.toggle("is-future", currentStop !== "all" && (currentStop < 0 || i > currentStop));
    });
  }

  track.addEventListener("mouseover", (ev) => showTip(ev.target.closest("[data-tip]")));
  track.addEventListener("focusin", (ev) => showTip(ev.target.closest("[data-tip]")));
  track.addEventListener("mouseout", () => showTip(null));
  track.addEventListener("focusout", () => showTip(null));
  function showTip(el) {
    const tip = $("#tl-tip");
    if (!el) { tip.classList.remove("show"); return; }
    tip.textContent = el.dataset.tip;
    const left = parseFloat(el.style.left);
    tip.style.left = el.style.left;
    tip.style.transform = left < 12 ? "translateX(-10%)" : left > 88 ? "translateX(-90%)" : "translateX(-50%)";
    tip.classList.add("show");
  }

  /* ---------- card rendering ---------- */

  const PIN_SVG = `<svg width="12" height="15" viewBox="0 0 12 15" aria-hidden="true"><path d="M6 0C2.7 0 0 2.6 0 5.9 0 10.3 6 15 6 15s6-4.7 6-9.1C12 2.6 9.3 0 6 0zm0 8.2A2.3 2.3 0 1 1 6 3.6a2.3 2.3 0 0 1 0 4.6z" fill="currentColor"/></svg>`;

  function paragraphs(arr, cls) {
    return (arr || []).map((p) => `<p${cls ? ` class="${cls}"` : ""}>${esc(p)}</p>`).join("");
  }

  function introHTML() {
    const intro = J.intro || {};
    return `<div class="kicker">${esc(intro.kicker || "A family history map")}</div>
      <h1>The Journey of ${esc(P.name)}</h1>
      <p class="lifespan">${START_YEAR} – ${END_YEAR}</p>
      ${P.relation ? `<p class="relation">${esc(P.relation)}</p>` : ""}
      ${paragraphs(intro.text, "lede")}
      <p class="hint">Press <kbd>→</kbd> or <kbd>Space</kbd> to begin. Tap the glowing <span aria-hidden="true">✦</span> pins for discoveries.</p>
      ${J.presenter ? `<p class="byline">By ${esc(J.presenter)}</p>` : ""}`;
  }

  function stopHTML(ch) {
    const s = ch.stop, i = ch.idx;
    const a = ageAt(s.date);
    const ageTxt = a.age <= 0 ? "Newborn" : `Age ${a.exact ? "" : "~"}${a.age}`;
    const discs = s.discoveries || [];
    const discBtns = discs.map((d, k) => {
      const isOpen = opened[i][k];
      const label = isOpen ? d.title : discs.length > 1 ? `Discovery ${k + 1}` : "Reveal a discovery";
      return `<button class="discover-btn ${isOpen ? "is-opened" : ""}" type="button" data-action="discover" data-k="${k}">
        <span class="spark" aria-hidden="true">✦</span>${esc(label)}</button>`;
    }).join("");
    const evs = ch.events.map((e) => {
      const c = (CAT[e.cat] || CAT.world).color;
      return `<li><button class="event-chip" type="button" style="--c:${c}" data-action="event" data-id="${e.id}">
        <span class="yr">${parseDate(e.date).y}</span>
        <span><span class="t">${esc(e.title)}</span><span class="a">${esc(ageLine(e.date))}</span></span>
      </button></li>`;
    }).join("");
    return `<div class="kicker"><span>Stop ${i + 1} of ${STOPS.length}</span><span class="dot">·</span>
        <span>${esc(fmtDate(s.date))}</span><span class="dot">·</span><span>${ageTxt}</span></div>
      <h2>${esc(s.title)}</h2>
      <p class="place">${PIN_SVG}<span>${esc(s.place)}</span></p>
      ${s.photo ? `<figure class="photo"><img src="${esc(s.photo.src)}" alt="${esc(s.photo.caption || "")}"><figcaption>${esc(s.photo.caption || "")}</figcaption></figure>` : ""}
      <div class="story">${paragraphs(s.story)}</div>
      ${discBtns ? `<div class="discover-row">${discBtns}</div>` : ""}
      ${evs ? `<section class="meanwhile"><h3>Meanwhile in the world</h3><ul class="event-list">${evs}</ul></section>` : ""}`;
  }

  function lifetimeHTML() {
    const L_ = J.lifetime || {};
    const firsts = EVENTS.filter((e) => e.first)
      .map((e) => `<li><b>${parseDate(e.date).y}</b>${esc(e.first)}</li>`).join("");
    return `<div class="kicker">One lifetime · ${START_YEAR} – ${END_YEAR}</div>
      <h2>${esc(L_.title || "What one life can hold")}</h2>
      <div class="story">${paragraphs(L_.before)}</div>
      ${firsts ? `<ul class="firsts">${firsts}</ul>` : ""}
      <div class="story">${paragraphs(L_.after)}</div>`;
  }

  function closingHTML() {
    const c = J.closing;
    const links = (J.links || []).map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join(" · ");
    return `<div class="kicker">Connection</div>
      <h2>${esc(c.title || "Why this matters to me")}</h2>
      <div class="story">${paragraphs(c.text)}</div>
      ${J.presenter ? `<p class="byline">${esc(J.presenter)}${c.signoff ? `, ${esc(c.signoff)}` : ""}</p>` : ""}
      ${links ? `<p class="sources">${links}</p>` : ""}`;
  }

  function navHTML(i) {
    const last = i === chapters.length - 1;
    const dots = chapters.map((_, k) => `<span class="${k <= i ? "on" : ""}"></span>`).join("");
    return `<nav class="card-nav" aria-label="Story navigation">
      <button class="nav-btn" type="button" data-action="prev" ${i === 0 ? "disabled" : ""} aria-label="Previous">←</button>
      <div class="progress" aria-hidden="true">${dots}</div>
      ${last
        ? `<button class="nav-btn primary" type="button" data-action="goto" data-chapter="0">Start over</button>`
        : `<button class="nav-btn primary" type="button" data-action="next">${i === 0 ? "Begin" : "Next"} →</button>`}
    </nav>`;
  }

  /* ---------- going to a chapter ---------- */

  let current = -1;

  function go(i, opts) {
    i = Math.max(0, Math.min(chapters.length - 1, i));
    const prev = current;
    current = i;
    const ch = chapters[i];
    map.closePopup();
    discLayer.clearLayers();
    eventLayer.clearLayers();
    branchLayer.clearLayers();
    discMarkers = [];

    const html = ch.type === "intro" ? introHTML()
      : ch.type === "stop" ? stopHTML(ch)
      : ch.type === "lifetime" ? lifetimeHTML()
      : closingHTML();
    $("#card").innerHTML = `<div class="card-body">${html}</div>${navHTML(i)}`;

    if (!opts || !opts.keepHash) {
      try { history.replaceState(null, "", i ? `#${i}` : location.pathname + location.search); } catch (e) { /* file:// */ }
    }

    const allBounds = L.latLngBounds(stopLL.length ? stopLL : [[30, -88]]);

    if (ch.type === "intro") {
      setStopStates(-1);
      setRoute(0);
      routeFuture.setStyle({ opacity: 0.35 });
      setTimeline(null, "", [], -1);
      flyToBounds(allBounds, 7);
    } else if (ch.type === "stop") {
      const s = ch.stop;
      setStopStates(ch.idx);
      setRoute(ch.idx, prev === i - 1);
      setTimeline(yearFrac(s.date), String(parseDate(s.date).y), ch.events.map((e) => e.id), ch.idx);
      flyTo([s.lat, s.lng], s.zoom || 8);
      addDiscoveryPins(ch);
      ch.events.forEach((e) => {
        if (e.lat == null) return;
        const m = eventPin(e, true).addTo(eventLayer);
        m.bindPopup(eventHTML(e, true), popupOptions());
      });
    } else {
      setStopStates("all");
      setRoute(segments.length);
      setTimeline(DIED, "", ch.type === "lifetime" ? EVENTS.filter((e) => e.first).map((e) => e.id) : [], "all");
      $("#tl-cursor").style.opacity = 0;
      if (ch.type === "lifetime") {
        const located = EVENTS.filter((e) => e.lat != null);
        located.forEach((e) => {
          eventPin(e, !e.first).bindPopup(eventHTML(e, false), popupOptions()).addTo(eventLayer);
        });
        flyToBounds(L.latLngBounds(located.map((e) => [e.lat, e.lng]).concat(stopLL)), 3);
      } else {
        flyToBounds(allBounds, 7);
      }
    }
    $("#card .card-body").scrollTop = 0;
  }

  function addDiscoveryPins(ch) {
    const s = ch.stop;
    let local = 0;
    (s.discoveries || []).forEach((d, k) => {
      const own = d.lat != null && d.lng != null;
      const off = own ? [0, 0] : DISC_OFFSETS[local++ % DISC_OFFSETS.length];
      const m = L.marker(own ? [d.lat, d.lng] : [s.lat, s.lng], {
        icon: L.divIcon({
          className: "",
          html: `<div class="discovery-pin ${opened[ch.idx][k] ? "is-opened" : ""}" aria-hidden="true">✦</div>`,
          iconSize: [28, 28],
          iconAnchor: [14 - off[0], 14 - off[1]],
          popupAnchor: [off[0], off[1] - 14]
        }),
        title: `Discovery: ${d.title}`,
        keyboard: true,
        zIndexOffset: 1200
      }).addTo(discLayer);
      m.bindPopup(discoveryHTML(d), popupOptions());
      m.on("popupopen", () => markOpened(ch.idx, k));
      m.on("click", () => { if (own) showBranch(ch, k); });
      discMarkers[k] = m;
    });
  }

  function markOpened(si, k) {
    opened[si][k] = true;
    const ch = chapters[current];
    if (!ch || ch.type !== "stop" || ch.idx !== si) return;
    const pinEl = discMarkers[k] && discMarkers[k].getElement();
    if (pinEl) pinEl.querySelector(".discovery-pin").classList.add("is-opened");
    const btn = $(`#card [data-action="discover"][data-k="${k}"]`);
    if (btn) {
      btn.classList.add("is-opened");
      btn.innerHTML = `<span class="spark" aria-hidden="true">✦</span>${esc(ch.stop.discoveries[k].title)}`;
    }
  }

  function showBranch(ch, k) {
    const s = ch.stop, d = s.discoveries[k];
    branchLayer.clearLayers();
    L.polyline(arc([s.lat, s.lng], [d.lat, d.lng], 60), {
      color: "#b07d1a", weight: 2.5, dashArray: "3 8", lineCap: "round", interactive: false
    }).addTo(branchLayer);
    flyToBounds(L.latLngBounds([[s.lat, s.lng], [d.lat, d.lng]]), 5);
  }

  function revealDiscovery(k) {
    const ch = chapters[current];
    if (!ch || ch.type !== "stop") return;
    const discs = ch.stop.discoveries || [];
    if (k == null) k = discs.findIndex((_, j) => !opened[ch.idx][j]);
    if (k < 0 || !discs[k]) return;
    const m = discMarkers[k];
    if (!m) return;
    const d = discs[k];
    if (d.lat != null) {
      map.once("moveend", () => m.openPopup());
      showBranch(ch, k);
    } else {
      m.openPopup();
    }
  }

  function focusEvent(id) {
    const e = EVENTS.find((x) => x.id === id);
    if (!e) return;
    const ch = chapters[current];
    if (e.lat == null) {
      // worldwide event: show it where John was
      const s = ch && ch.type === "stop" ? ch.stop : STOPS[0];
      const ll = s ? [s.lat, s.lng] : map.getCenter();
      L.popup(popupOptions()).setLatLng(ll).setContent(eventHTML(e, false)).openOn(map);
      return;
    }
    let m = null;
    eventLayer.eachLayer((l) => {
      const ll = l.getLatLng();
      if (ll.lat === e.lat && ll.lng === e.lng) m = l;
    });
    if (!m) m = eventPin(e, false).bindPopup(eventHTML(e, true), popupOptions()).addTo(eventLayer);
    const z = Math.min(Math.max(map.getZoom(), 4), 6);
    map.once("moveend", () => m.openPopup());
    flyTo([e.lat, e.lng], z);
  }

  function backToStory() {
    map.closePopup();
    const ch = chapters[current];
    if (ch && ch.type === "stop") {
      map.stop();
      setTimeout(() => flyTo([ch.stop.lat, ch.stop.lng], ch.stop.zoom || 8), 30);
    }
  }

  // popup buttons get their own listener so map handlers can't swallow the click
  map.on("popupopen", (ev) => {
    const btn = ev.popup.getElement() && ev.popup.getElement().querySelector('[data-action="back"]');
    if (!btn) return;
    L.DomEvent.on(btn, "click", (e) => { L.DomEvent.stop(e); backToStory(); });
  });

  function overview() {
    map.closePopup();
    flyToBounds(L.latLngBounds(stopLL.length ? stopLL : [[30, -88]]), 7);
  }

  /* ---------- input ---------- */

  function onAction(el) {
    const a = el.dataset.action;
    if (a === "next") go(current + 1);
    else if (a === "prev") go(current - 1);
    else if (a === "goto") go(Number(el.dataset.chapter));
    else if (a === "discover") revealDiscovery(Number(el.dataset.k));
    else if (a === "event") focusEvent(Number(el.dataset.id));
    else if (a === "back") backToStory();
  }

  document.addEventListener("click", (ev) => {
    const el = ev.target.closest("[data-action]");
    if (el && el.dataset.action !== "back") onAction(el);
  });

  document.addEventListener("keydown", (ev) => {
    if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
    const tag = (ev.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea") return;
    const k = ev.key;
    if (k === "ArrowRight" || k === "PageDown" || (k === " " && tag !== "button")) { ev.preventDefault(); go(current + 1); }
    else if (k === "ArrowLeft" || k === "PageUp") { ev.preventDefault(); go(current - 1); }
    else if (k === "Home") go(0);
    else if (k === "End") go(chapters.length - 1);
    else if (k === "d" || k === "D") revealDiscovery();
    else if (k === "o" || k === "O") overview();
    else if (k === "p" || k === "P") togglePresent();
    else if (k === "t" || k === "T") { if (presenting) $("#timer").hidden = !$("#timer").hidden; }
    else if (k === "r" || k === "R") { if (presenting) startAt = performance.now(); }
  });

  $("#btn-overview").addEventListener("click", overview);
  $("#btn-present").addEventListener("click", togglePresent);

  /* ---------- present mode with a 2-minute timer ---------- */

  let presenting = false, startAt = 0, timerId = 0;

  function togglePresent() {
    presenting = !presenting;
    document.body.classList.toggle("presenting", presenting);
    $("#btn-present").setAttribute("aria-pressed", String(presenting));
    $("#btn-present").textContent = presenting ? "Exit" : "Present";
    const timer = $("#timer");
    if (presenting) {
      startAt = performance.now();
      timer.hidden = false;
      tick();
      timerId = setInterval(tick, 250);
      const fs = document.documentElement.requestFullscreen;
      if (fs && !document.fullscreenElement) fs.call(document.documentElement).catch(() => {});
      if (current !== 0) go(0);
    } else {
      clearInterval(timerId);
      timer.hidden = true;
      if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
    }
    setTimeout(() => map.invalidateSize(), 300);
  }

  function tick() {
    const s = Math.floor((performance.now() - startAt) / 1000);
    const timer = $("#timer");
    timer.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
    timer.classList.toggle("in-window", s >= 120 && s <= 150);
    timer.classList.toggle("over", s > 150);
  }

  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && presenting) togglePresent();
  });

  /* ---------- start ---------- */

  buildTimeline();
  const hashChapter = () => {
    const n = parseInt((location.hash || "").replace("#", ""), 10);
    return Number.isFinite(n) ? n : 0;
  };
  go(hashChapter(), { keepHash: true });
  window.addEventListener("hashchange", () => {
    if (hashChapter() !== current) go(hashChapter(), { keepHash: true });
  });

  let resizeT = 0;
  window.addEventListener("resize", () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => map.invalidateSize(), 150);
  });
})();
