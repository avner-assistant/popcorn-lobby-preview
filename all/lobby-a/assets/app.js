(function() {
  var A = "assets/";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var C = window.CATALOG, G = C.games;
  function $(id) {
    return document.getElementById(id);
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function(c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  var I = {
    grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',
    star: '<path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
    sparkle: '<path d="M12 3c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7z"/><path d="M19 15.5c.2 1.4.9 2.1 2.3 2.3-1.4.2-2.1.9-2.3 2.3-.2-1.4-.9-2.1-2.3-2.3 1.4-.2 2.1-.9 2.3-2.3z"/>',
    slots: '<rect x="3" y="5" width="15" height="14" rx="2"/><path d="M8 5v14M13 5v14M21 7v6h-3"/><circle cx="21" cy="6" r="1.4"/>',
    flame: '<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2.2 1-3.6 2.4-4.8.3 1.8 1.3 2.8 2.3 2.8C11 8.5 11 5.5 12 3z"/>',
    live: '<rect x="2.5" y="6" width="13" height="12" rx="2"/><path d="m15.5 10.5 6-3.5v10l-6-3.5"/><circle cx="7" cy="10" r="1.2"/>',
    coins: '<ellipse cx="9" cy="7" rx="6" ry="2.6"/><path d="M3 7v4c0 1.4 2.7 2.6 6 2.6S15 12.4 15 11V7"/><path d="M9 16.2c-.9 2.1 1.6 4.2 6 4.2 3.3 0 6-1.2 6-2.6v-4c0-1.2-1.8-2.2-4.4-2.5"/>',
    diamond: '<path d="M6 4h12l3 5-9 11L3 9z"/><path d="M3 9h18M9 4l3 16 3-16"/>',
    gift: '<path d="M4 8h16v3H4zM5 11h14v9H5zM12 8v12M12 8c-2-4-6-4-6-1.5S10 8 12 8zm0 0c2-4 6-4 6-1.5S14 8 12 8z"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    rocket: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    wheel: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3"/><path d="M12 3.5V9M12 15v5.5M3.5 12H9M15 12h5.5M6 6l3.9 3.9M14.1 14.1 18 18M18 6l-3.9 3.9M9.9 14.1 6 18"/>',
    spade: '<path d="M12 3c3 4 8 6.5 8 10.5a3.8 3.8 0 0 1-6.8 2.4L14 21h-4l.8-5.1A3.8 3.8 0 0 1 4 13.5C4 9.5 9 7 12 3z"/>',
    pumpkin: '<path d="M12 7c-5 0-8 2.8-8 6.5S7 20 12 20s8-2.8 8-6.5S17 7 12 7z"/><path d="M12 7c-2 0-3 3-3 6.5S10 20 12 20M12 7c2 0 3 3 3 6.5S14 20 12 20M12 7V4.5l2-1"/>',
    heart: '<path d="M12 20s-7-4.4-9-8.6C1.6 8.3 3.5 5 6.8 5c2 0 3.3 1.1 4.2 2.4C11.9 6.1 13.2 5 15.2 5c3.3 0 5.2 3.3 3.8 6.4C19 15.6 12 20 12 20z"/>',
    home: '<path d="M3 11 12 4l9 7v9h-6v-6H9v6H3z"/>',
    crown: '<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>',
    studio: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M7 7 9 3M12 7l2-4M17 7l2-4M3 11h18"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',
    phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>',
    wallet: '<path d="M4 7h15a1.5 1.5 0 0 1 1.5 1.5V19H5.5A1.5 1.5 0 0 1 4 17.5z"/><path d="M4 7l11-3.5V7M16 12.5h4.5v3H16a1.5 1.5 0 0 1 0-3z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'
  };
  function svg(n) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (I[n] || I.star) + "</svg>";
  }
  [].forEach.call(document.querySelectorAll("[data-icon]"), function(e) {
    e.innerHTML = svg(e.getAttribute("data-icon"));
  });
  var CHIPS = [
    ["all", "All Games", "grid"],
    ["top", "Top", "star"],
    ["new", "New", "sparkle"],
    ["slots", "Slots", "slots"],
    ["hot", "Hot Games", "flame"],
    ["live", "Live Casino", "live"],
    ["hold-and-win", "Hold and Win", "coins"],
    ["jackpot", "Jackpot", "diamond"],
    ["bonus-buy", "Bonus Buy", "gift"],
    ["megaways", "Megaways", "bolt"],
    ["crash", "Instant", "rocket"],
    ["roulette", "Roulette", "wheel"],
    ["blackjack", "Blackjack", "spade"]
  ];
  var ICON = { "halloween-special": "pumpkin", every: "grid", favs: "heart", provider: "studio", search: "search" };
  CHIPS.forEach(function(c) {
    ICON[c[0]] = c[2];
  });
  var NAME = {};
  C.rails.forEach(function(r) {
    NAME[r.slug] = r.name;
  });
  var GROUPS = { a: ["halloween-special", "top"], b: ["new", "hot", "slots"], c: ["live", "hold-and-win", "megaways", "bonus-buy", "crash"], d: ["jackpot", "roulette", "blackjack"] };
  var BADGE = { new: ["new", "New"], live: ["live", "Live"], jackpot: ["jp", "Jackpot"], hot: ["pop", "Hot"] };
  $("chips").innerHTML = CHIPS.map(function(c, i) {
    return '<a class="chip' + (i ? "" : " on") + '" href="' + (i ? "#/games/" + c[0] : "#/") + '" data-cat="' + c[0] + '" aria-pressed="' + (i ? "false" : "true") + '">' + svg(c[2]) + c[1] + "</a>";
  }).join("") + '<a class="chip" href="#/games/favs" data-cat="favs" aria-pressed="false">' + svg("heart") + 'Favourites <span class="count" id="favCount">0</span></a>';
  $("drawerCats").innerHTML = CHIPS.slice(1).map(function(c) {
    return '<a href="#/games/' + c[0] + '" data-cat="' + c[0] + '">' + svg(c[2]) + c[1] + "</a>";
  }).join("");
  var favs = {};
  function tile(id, badgeFor) {
    var g = G[id];
    if (!g)
      return "";
    var b = badgeFor && BADGE[badgeFor];
    return '<a class="gcard" href="#/game/' + id + '" data-id="' + id + '" aria-label="' + esc(g.n) + " by " + esc(g.p) + '"><span class="thumb"><img src="' + g.t + '" alt="" loading="lazy" width="380" height="380">' + (b ? '<span class="badge ' + b[0] + '">' + b[1] + "</span>" : "") + '<button class="fav' + (favs[id] ? " on" : "") + '" aria-label="Add ' + esc(g.n) + ' to favourites" aria-pressed="' + !!favs[id] + '">' + svg("heart") + '</button><span class="play"><span><svg viewBox="0 0 24 24"><path d="M7 4v16l13-8z"/></svg></span></span></span><span class="gname">' + esc(g.n) + '</span><span class="gprov">' + esc(g.p) + "</span></a>";
  }
  function railHtml(r) {
    return '<section class="rail" id="' + (r.slug === "top" ? "games" : r.slug) + '" aria-label="' + esc(r.name) + '"><div class="rail-head"><span class="rail-icon">' + svg(ICON[r.slug]) + "</span><h2>" + esc(r.name) + '</h2><a class="more" href="#/games/' + r.slug + '" data-cat="' + r.slug + '">View all &rarr;</a><div class="arrows"><button class="arrow prev" aria-label="Previous"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m15 6-6 6 6 6"/></svg></button><button class="arrow next" aria-label="Next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m9 6 6 6-6 6"/></svg></button></div></div><div class="track">' + r.ids.map(function(id) {
      return tile(id, r.slug);
    }).join("") + "</div></section>";
  }
  var bySlug = {};
  C.rails.forEach(function(r) {
    bySlug[r.slug] = r;
  });
  Object.keys(GROUPS).forEach(function(k) {
    $("rails-" + k).innerHTML = GROUPS[k].map(function(s) {
      return bySlug[s] ? railHtml(bySlug[s]) : "";
    }).join("");
  });
  var PV = window.PROVIDERS || { list: [], total_games: 0 }, PVBY = {};
  PV.list.forEach(function(p) {
    PVBY[p.n] = p;
  });
  function pslug(n) {
    return String(n).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function pcard(p, dup) {
    var pl = PVBY[p.n] && PVBY[p.n].logo || p.logo;
    return '<a class="pcard' + (dup ? " dup" : "") + '" href="#/providers/' + pslug(p.n) + '" data-prov="' + esc(p.n) + '"' + (dup ? ' tabindex="-1" aria-hidden="true"' : ' aria-label="' + esc(p.n) + ' games"') + '><span class="ppill"><img src="' + pl + '" alt="" loading="lazy" decoding="async"></span><span class="pname">' + esc(p.n) + "</span></a>";
  }
  $("provTrack").innerHTML = C.providers.map(function(p) {
    return pcard(p);
  }).join("") + (reduce ? "" : C.providers.map(function(p) {
    return pcard(p, 1);
  }).join(""));
  $("provAllN").textContent = " " + PV.list.length;
  var picksIds = (bySlug.top || C.rails[0]).ids.slice(0, 4);
  $("favPicks").innerHTML = picksIds.map(function(id) {
    return tile(id);
  }).join("");
  $("noResPicks").innerHTML = picksIds.map(function(id) {
    return tile(id);
  }).join("");
  var lobby = $("lobby"), results = $("results"), grid = $("resGrid"), q = $("q");
  function setChip(cat) {
    [].forEach.call(document.querySelectorAll(".chip"), function(c) {
      var on = c.getAttribute("data-cat") === cat;
      c.classList.toggle("on", on);
      c.setAttribute("aria-pressed", on);
    });
    [].forEach.call(document.querySelectorAll(".nav a"), function(a, i) {
      a.classList.toggle("on", cat === "all" && i === 0 || cat === "every" && i === 1);
    });
  }
  function hidePage() {
    var pg = $("page");
    if (!pg.hidden) {
      pg.hidden = true;
      pg.innerHTML = "";
    }
    document.body.classList.remove("v-page");
  }
  function showGrid(title, icon, ids, emptyTitle, emptyText) {
    hidePage();
    hideStudios();
    $("resStudios").hidden = true;
    $("resMore").hidden = true;
    document.body.classList.remove("v-prov");
    lobby.hidden = true;
    results.hidden = false;
    $("resTitle").textContent = title;
    $("resIcon").innerHTML = svg(icon);
    $("resCount").textContent = ids.length + (ids.length === 1 ? " GAME" : " GAMES");
    grid.innerHTML = ids.map(function(id) {
      return tile(id);
    }).join("");
    $("noResults").hidden = ids.length > 0;
    if (!ids.length) {
      $("noResTitle").textContent = emptyTitle || "No games match";
      $("noResText").textContent = emptyText || "";
    }
  }
  function showLobby() {
    hidePage();
    hideStudios();
    document.body.classList.remove("v-prov");
    results.hidden = true;
    lobby.hidden = false;
    setChip("all");
  }
  var ALL = Object.keys(G);
  function filterCat(cat, scroll) {
    if (q.value) {
      q.value = "";
      document.body.classList.remove("has-q");
    }
    if (cat === "all") {
      showLobby();
      if (scroll)
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      return;
    }
    setChip(cat);
    if (cat === "favs") {
      var f = ALL.filter(function(id) {
        return favs[id];
      });
      showGrid("Your favourites", "heart", f, "Your front row is empty", "Tap the heart on any game and it will save you a seat here.");
    } else if (cat === "every") {
      showGrid("All games", "grid", ALL);
    } else {
      showGrid(NAME[cat] || cat, ICON[cat], ALL.filter(function(id) {
        return G[id].c.indexOf(cat) >= 0;
      }));
    }
    scrollToResults();
  }
  function scrollToResults() {
    var y = $("chips").getBoundingClientRect().top + window.scrollY - $("top").offsetHeight - 4;
    if (window.scrollY > y || window.scrollY < y - 400)
      window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  }
  function norm(s) {
    return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
  }
  var IDX = {};
  ALL.forEach(function(id) {
    IDX[id] = norm(G[id].n + " " + G[id].p);
  });
  function runSearch() {
    var v = norm(q.value);
    document.body.classList.toggle("has-q", !!q.value);
    if (window.__router)
      window.__router.searching(!!v);
    if (!v) {
      showLobby();
      return;
    }
    setChip(null);
    var words = v.split(" ");
    var hits = ALL.filter(function(id) {
      return words.every(function(w) {
        return IDX[id].indexOf(w) >= 0;
      });
    });
    hits.sort(function(a, b) {
      return (norm(G[a].n).indexOf(words[0]) === 0 ? 0 : 1) - (norm(G[b].n).indexOf(words[0]) === 0 ? 0 : 1);
    });
    showGrid(
      "Results for “" + q.value.trim() + "”",
      "search",
      hits,
      "No games match “" + q.value.trim() + "”",
      "Try a game name or a studio, like “Pragmatic” or “Roulette”. Here are tonight’s picks instead."
    );
  }
  q.addEventListener("input", runSearch);
  q.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      q.value = "";
      runSearch();
      closeSearch();
    }
    if (e.key === "Enter")
      scrollToResults();
  });
  $("searchClear").addEventListener("click", function() {
    q.value = "";
    runSearch();
    q.focus();
  });
  function openSearch() {
    document.body.classList.add("searching");
    $("searchBtn").setAttribute("aria-expanded", "true");
    setTimeout(function() {
      q.focus();
    }, 30);
  }
  function closeSearch() {
    if (!q.value) {
      document.body.classList.remove("searching");
      $("searchBtn").setAttribute("aria-expanded", "false");
    }
  }
  $("searchBtn").addEventListener("click", function() {
    document.body.classList.contains("searching") && !q.value ? closeSearch() : openSearch();
  });
  $("tabSearch").addEventListener("click", function(e) {
    e.preventDefault();
    if (!$("page").hidden || !studios.hidden)
      window.__router.go("#/");
    window.scrollTo({ top: 0 });
    openSearch();
  });
  q.addEventListener("blur", function() {
    setTimeout(closeSearch, 150);
  });
  var drawer = $("drawer"), scrim = $("scrim"), lastFocus = null;
  function focusables() {
    return [].filter.call(drawer.querySelectorAll('a[href], button, select, summary, [tabindex]:not([tabindex="-1"])'), function(e) {
      return e.offsetParent !== null;
    });
  }
  function openDrawer() {
    lastFocus = document.activeElement;
    drawer.hidden = false;
    scrim.hidden = false;
    requestAnimationFrame(function() {
      document.body.classList.add("drawer-open");
    });
    $("burger").setAttribute("aria-expanded", "true");
    setTimeout(function() {
      $("drawerClose").focus();
    }, 60);
  }
  function closeDrawer() {
    if (drawer.hidden)
      return;
    document.body.classList.remove("drawer-open");
    $("burger").setAttribute("aria-expanded", "false");
    setTimeout(function() {
      drawer.hidden = true;
      scrim.hidden = true;
    }, reduce ? 0 : 260);
    if (lastFocus && lastFocus.focus)
      lastFocus.focus();
  }
  $("burger").addEventListener("click", openDrawer);
  $("tabMenu").addEventListener("click", function(e) {
    e.preventDefault();
    openDrawer();
  });
  $("drawerClose").addEventListener("click", closeDrawer);
  scrim.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", function(e) {
    if (drawer.hidden)
      return;
    if (e.key === "Escape") {
      e.preventDefault();
      closeDrawer();
      return;
    }
    if (e.key === "Tab") {
      var f = focusables(), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!drawer.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  document.addEventListener("click", function(e) {
    var fv = e.target.closest(".fav");
    if (fv) {
      e.preventDefault();
      e.stopPropagation();
      var id = fv.closest(".gcard").getAttribute("data-id");
      favs[id] = !favs[id];
      if (!favs[id])
        delete favs[id];
      [].forEach.call(document.querySelectorAll('.gcard[data-id="' + id + '"] .fav'), function(b) {
        b.classList.toggle("on", !!favs[id]);
        b.setAttribute("aria-pressed", !!favs[id]);
      });
      $("favCount").textContent = Object.keys(favs).length;
      if (favs[id])
        spinHero();
      return;
    }
    var ar = e.target.closest(".arrow");
    if (ar && ar.closest("#providers") && pcar.arrow(ar.classList.contains("next") ? 1 : -1))
      return;
    if (ar) {
      var t = ar.closest(".rail").querySelector(".track");
      t.scrollBy({ left: (ar.classList.contains("next") ? 1 : -1) * t.clientWidth * 0.9, behavior: reduce ? "auto" : "smooth" });
      return;
    }
    var a = e.target.closest('a[href^="#/"]');
    if (a && (!a.target || a.target === "_self") && !e.defaultPrevented && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button === 0) {
      e.preventDefault();
      var opener = a;
      if (drawer.contains(a)) {
        opener = $("burger");
        closeDrawer();
      }
      window.__router.go(a.getAttribute("href"), opener);
      return;
    }
  });
  var WINS = [
    // [game title as on the page, masked player, amount in euro, multiplier (0 = none)]
    ["Big Bass Halloween 2", "Da***l", 38.4, 24],
    ["Gold Rush with Johnny Cash", "Mi***o", 112.8, 0],
    ["Galactic VIP Roulette", "Sa***h", 252, 36],
    ["Sugar Rush", "Jo***s", 1240.5, 312],
    ["Crown Coins", "El***a", 19.6, 0],
    ["Aviamasters", "Ma***k", 65, 13],
    ["Las Vegas Blackjack", "Li***e", 90, 0],
    ["Wanted Dead or a Wild", "To***y", 486.2, 87],
    ["3 Coin Volcanoes", "An***a", 27.5, 0],
    ["Shining Crown", "Ka***n", 8.8, 0],
    ["Extra Chilli Megaways", "Ro***t", 342, 57],
    ["Mega Wheel", "Ni***e", 150, 50],
    ["Chaos Crew 3", "Fe***x", 3860, 965],
    ["Elvis Frog in Vegas", "Is***l", 45.1, 0],
    ["Sugar Plinko", "Lu***s", 22.4, 16],
    ["Hypernova Megaways", "Em***y", 176.4, 42],
    ["Joker's Gold", "Ol***r", 61.3, 0],
    ["Lucky Twins Jackpot", "Ha***h", 2150.75, 0],
    ["Duck Hunters", "Ch***e", 98.6, 31],
    ["Mr. Oinksters Hold and Win", "Le***n", 74, 0],
    ["Dragon Tiger", "Va***a", 40, 0],
    ["Hell Hot 100", "Be***n", 12.3, 0],
    ["Wild West Gold Megaways", "Ra***i", 628.9, 109],
    ["Happy Halloween", "Yu***i", 33.7, 0],
    ["Snoop Dogg Dollars", "Sv***n", 5620.4, 562],
    ["Cabaret Roulette", "Ag***s", 72, 36]
  ];
  var byTitle = {};
  ALL.forEach(function(id) {
    byTitle[G[id].n] = id;
  });
  function eur(v) {
    return "€" + v.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  var winsHtml = WINS.filter(function(w) {
    return byTitle[w[0]];
  }).map(function(w) {
    var g = G[byTitle[w[0]]], big = w[2] >= 1e3;
    return '<a class="win' + (big ? " big" : "") + '" href="#/game/' + byTitle[w[0]] + '" data-q="' + esc(g.n) + '" aria-label="Sample win: ' + esc(w[1]) + ", " + eur(w[2]) + " on " + esc(g.n) + '. Open the game"><img src="' + g.t + '" alt="" width="36" height="36" decoding="async"><span class="win-body"><span class="win-r1"><span class="win-user">' + esc(w[1]) + '</span><span class="win-amt">' + eur(w[2]) + '</span></span><span class="win-r2"><span class="win-game">' + esc(g.n) + "</span>" + (w[3] ? '<span class="win-x">x' + w[3].toLocaleString("en") + "</span>" : "") + "</span></span></a>";
  }).join("");
  var winsEl = $("wins"), winsTrack = $("winsTrack");
  winsTrack.innerHTML = '<div class="wins-set">' + winsHtml + '</div><div class="wins-set" aria-hidden="true">' + winsHtml.replace(/<a /g, '<a tabindex="-1" ') + "</div>";
  function winsSpeed() {
    var sets = winsTrack.children;
    sets[0].style.width = sets[1].style.width = "";
    var w = Math.ceil(sets[0].getBoundingClientRect().width);
    sets[0].style.width = sets[1].style.width = w + "px";
    winsTrack.style.setProperty("--wins-dur", (w / (innerWidth <= 760 ? 32 : 42)).toFixed(2) + "s");
  }
  winsSpeed();
  if (document.fonts && document.fonts.ready)
    document.fonts.ready.then(winsSpeed);
  var winsW = innerWidth;
  window.addEventListener("resize", function() {
    if (Math.abs(innerWidth - winsW) > 40) {
      winsW = innerWidth;
      winsSpeed();
    }
  });
  winsEl.addEventListener("touchstart", function() {
    winsEl.classList.add("hold");
  }, { passive: true });
  winsEl.addEventListener("touchend", function() {
    setTimeout(function() {
      winsEl.classList.remove("hold");
    }, 1200);
  });
  if ("IntersectionObserver" in window)
    new IntersectionObserver(function(es) {
      winsEl.classList.toggle("off", !es[0].isIntersecting);
    }).observe(winsEl);
  window.__wins = { count: WINS.length };
  function gameBtn(g, cls, size) {
    return '<a class="' + cls + '" href="#/game/' + byTitle[g.n] + '" data-q="' + esc(g.n) + '" title="' + esc(g.n) + '"><img src="' + g.t + '" alt="" width="' + size + '" height="' + size + '" loading="lazy" decoding="async"></a>';
  }
  var BOARDS = {
    // [game title as on the page, masked player, win in euro, multiplier]
    today: [
      ["Snoop Dogg Dollars", "Sv***n", 5620.4, 562],
      ["Chaos Crew 3", "Fe***x", 3860, 965],
      ["Lucky Twins Jackpot", "Ha***h", 2150.75, 430],
      ["Sugar Rush", "Jo***s", 1240.5, 312],
      ["Wild West Gold Megaways", "Ra***i", 628.9, 109],
      ["Wanted Dead or a Wild", "To***y", 486.2, 87],
      ["Extra Chilli Megaways", "Ro***t", 342, 57],
      ["Galactic VIP Roulette", "Sa***h", 252, 36],
      ["Hypernova Megaways", "Em***y", 176.4, 42],
      ["Mega Wheel", "Ni***e", 150, 50]
    ],
    week: [
      ["Lamp Of Infinity", "Ar***n", 14280, 2380],
      ["Big Bass Halloween 2", "Ma***a", 9412.6, 1176],
      ["Wishbringer", "Ke***n", 7655, 1531],
      ["Snoop Dogg Dollars", "Sv***n", 5620.4, 562],
      ["Duck Hunters", "Ti***o", 4980, 4980],
      ["Chaos Crew 3", "Fe***x", 3860, 965],
      ["Gold Rush with Johnny Cash", "Pa***a", 3122.4, 780],
      ["Sweet Bonanza CandyLand", "Gi***a", 2600, 520],
      ["Lucky Twins Jackpot", "Ha***h", 2150.75, 430],
      ["Octo Attack", "Wi***m", 1904, 952]
    ],
    mult: [
      ["Duck Hunters", "Ti***o", 4980, 4980],
      ["Lamp Of Infinity", "Ar***n", 14280, 2380],
      ["Plinko 2 Halloween", "Co***a", 362.8, 1814],
      ["Wishbringer", "Ke***n", 7655, 1531],
      ["Big Bass Halloween 2", "Ma***a", 9412.6, 1176],
      ["Chaos Crew 3", "Fe***x", 3860, 965],
      ["Octo Attack", "Wi***m", 1904, 952],
      ["Aviamasters", "Mo***e", 91.2, 912],
      ["Gold Rush with Johnny Cash", "Pa***a", 3122.4, 780],
      ["Snoop Dogg Dollars", "Sv***n", 5620.4, 562]
    ]
  };
  var MEDAL = ["gold", "silver", "bronze"];
  function xm(v) {
    return "x" + v.toLocaleString("en");
  }
  function renderBill(key) {
    var rows = BOARDS[key].filter(function(r) {
      return byTitle[r[0]];
    }), mult = key === "mult";
    var main = function(r) {
      return mult ? xm(r[3]) : eur(r[2]);
    }, side = function(r) {
      return mult ? eur(r[2]) : xm(r[3]);
    };
    $("podium").innerHTML = [1, 0, 2].map(function(i) {
      var r = rows[i], g = G[byTitle[r[0]]];
      return '<div class="pod pod-' + (i + 1) + " " + MEDAL[i] + '" aria-label="Number ' + (i + 1) + ": " + esc(r[1]) + ", " + main(r) + " on " + esc(g.n) + ' (sample)"><span class="pod-beam" aria-hidden="true"></span><span class="pod-art">' + gameBtn(g, "pod-game", 96) + '<span class="pod-rank" aria-hidden="true">' + (i + 1) + '</span></span><b class="pod-user">' + esc(r[1]) + '</b><span class="pod-amt">' + main(r) + '</span><span class="pod-meta"><span class="pod-gname">' + esc(g.n) + '</span><span class="pod-side">' + side(r) + '</span></span><span class="pod-step" aria-hidden="true"><i>' + (i + 1) + "</i></span></div>";
    }).join("");
    $("billList").innerHTML = rows.slice(3).map(function(r, k) {
      var g = G[byTitle[r[0]]];
      return '<li class="brow"><span class="brow-n" aria-hidden="true">' + (k + 4) + "</span>" + gameBtn(g, "brow-game", 44) + '<span class="brow-who"><b>' + esc(r[1]) + "</b><span>" + esc(g.n) + '</span></span><span class="brow-side">' + side(r) + '</span><span class="brow-amt">' + main(r) + "</span></li>";
    }).join("");
  }
  var billTabs = document.querySelectorAll(".bill-tabs [role=tab]"), billPanel = $("billPanel");
  function selectBill(btn, focus) {
    [].forEach.call(billTabs, function(b) {
      var on = b === btn;
      b.setAttribute("aria-selected", on);
      b.tabIndex = on ? 0 : -1;
    });
    billPanel.setAttribute("aria-labelledby", btn.id);
    if (!reduce) {
      billPanel.classList.remove("swap");
      void billPanel.offsetWidth;
      billPanel.classList.add("swap");
    }
    renderBill(btn.getAttribute("data-board"));
    if (focus)
      btn.focus();
  }
  [].forEach.call(billTabs, function(b, i) {
    b.addEventListener("click", function() {
      selectBill(b);
    });
    b.addEventListener("keydown", function(e) {
      var n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? billTabs.length - 1 : null;
      if (n === null)
        return;
      e.preventDefault();
      selectBill(billTabs[(n + billTabs.length) % billTabs.length], true);
    });
  });
  renderBill("today");
  var POTS = [
    ["Major", "Evening Show", 48906.12, [0.08, 0.62], ["6 days ago", "Lu***a", "Lucky Twins Wilds Jackpots"], ["Lucky Twins Wilds Jackpots", "Diamond Rhino Jackpot", "Lucky Twins Jackpot"]],
    ["Mega", "Grand Premiere", 128453055e-2, [0.35, 2.85], ["38 days ago", "Br***o", "Playboy Gold Jackpots"], ["Playboy Gold Jackpots", "Jackpot Joker", "Fortune king jackpot"]],
    ["Mini", "Matinee", 2418.36, [0.01, 0.09], ["47 min ago", "Jo***e", "Chicken Dash Jackpot"], ["Chicken Dash Jackpot", "Jackpot Football", "Merge Up 2"]]
  ];
  var JPWINS = [
    ["Playboy Gold Jackpots", "Br***o", 11023948e-1, "Mega"],
    ["Lucky Twins Wilds Jackpots", "Lu***a", 52710.4, "Major"],
    ["Diamond Rhino Jackpot", "Ce***a", 44218.65, "Major"],
    ["Jackpot Joker", "Da***d", 39870, "Major"],
    ["Fortune king jackpot", "Mi***a", 3240.15, "Mini"]
  ];
  function digitsHtml(v) {
    return eur(v).split("").map(function(ch) {
      return /\d/.test(ch) ? '<span class="dg" data-d="' + ch + '"><span class="dg-r" style="--d:' + ch + '"><i>0</i><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i>9</i></span></span>' : '<span class="sep">' + ch + "</span>";
    }).join("");
  }
  $("pots").innerHTML = POTS.map(function(p, i) {
    return '<article class="pot pot-' + p[0].toLowerCase() + '" aria-label="' + p[0] + ' jackpot (sample)"><header><span class="pot-tier">' + p[0] + '</span><span class="pot-name">' + p[1] + '</span></header><div class="pot-amt" id="potAmt' + i + '"><span class="sr" id="potSr' + i + '">' + eur(p[2]) + '</span><span class="pot-digits" aria-hidden="true">' + digitsHtml(p[2]) + '</span></div><p class="pot-last">Last won ' + p[4][0] + " by <b>" + p[4][1] + "</b> on " + esc(p[4][2]) + '</p><div class="pot-feed"><small>Grows on</small><span class="pot-games">' + p[5].map(function(t) {
      return byTitle[t] ? gameBtn(G[byTitle[t]], "pot-game", 40) : "";
    }).join("") + "</span></div></article>";
  }).join("");
  $("jpwList").innerHTML = JPWINS.filter(function(w) {
    return byTitle[w[0]];
  }).map(function(w) {
    var g = G[byTitle[w[0]]];
    return '<li class="jpw">' + gameBtn(g, "jpw-game", 40) + '<span class="jpw-who"><b>' + esc(w[1]) + "</b><span>" + esc(g.n) + '</span></span><span class="jpw-r"><span class="jpw-amt">' + eur(w[2]) + '</span><span class="jpw-tier t-' + w[3].toLowerCase() + '">' + w[3] + "</span></span></li>";
  }).join("");
  var potVals = POTS.map(function(p) {
    return p[2];
  }), jpEl = $("jackpots"), jpOn = false, jpTicks = 0;
  function setPot(i, v) {
    var box = $("potAmt" + i), dg = box.querySelector(".pot-digits"), s = eur(v);
    if (dg.textContent.length !== "0123456789".length * s.replace(/\D/g, "").length + s.replace(/\d/g, "").length) {
      dg.innerHTML = digitsHtml(v);
    } else {
      var cols = dg.querySelectorAll(".dg"), k = 0;
      s.split("").forEach(function(ch) {
        if (/\d/.test(ch)) {
          var c = cols[k++];
          if (c.getAttribute("data-d") !== ch) {
            c.setAttribute("data-d", ch);
            c.firstChild.style.setProperty("--d", ch);
          }
        }
      });
    }
    $("potSr" + i).textContent = s;
  }
  function tickPots() {
    if (!jpOn || document.hidden)
      return;
    jpTicks++;
    POTS.forEach(function(p, i) {
      potVals[i] = Math.round((potVals[i] + p[3][0] + Math.random() * (p[3][1] - p[3][0])) * 100) / 100;
      setPot(i, potVals[i]);
    });
  }
  if (!reduce) {
    var jpTimer = setInterval(tickPots, 2200);
    if ("IntersectionObserver" in window)
      new IntersectionObserver(function(es) {
        jpOn = es[0].isIntersecting;
      }).observe(jpEl);
    else
      jpOn = true;
  }
  window.__boards = { freeze: function() {
    if (typeof jpTimer !== "undefined")
      clearInterval(jpTimer);
  }, pots: function() {
    return potVals.slice();
  }, ticks: function() {
    return jpTicks;
  }, select: function(k) {
    selectBill(document.querySelector('[data-board="' + k + '"]'));
  } };
  var slides = document.querySelectorAll(".slide"), dots = $("bnrDots").children, cur = 0, timer = null, paused = false, bnr = $("bnr");
  function go(n, user) {
    cur = (n + slides.length) % slides.length;
    $("bnrTrack").style.transform = "translateX(" + -100 * cur + "%)";
    [].forEach.call(slides, function(s, i) {
      s.classList.toggle("on", i === cur);
      s.setAttribute("aria-hidden", i !== cur);
      [].forEach.call(s.querySelectorAll("a"), function(l) {
        l.tabIndex = i === cur ? 0 : -1;
      });
    });
    [].forEach.call(dots, function(d, i) {
      d.classList.toggle("on", i === cur);
      d.setAttribute("aria-selected", i === cur);
    });
    if (cur === 0 && started)
      setTimeout(spinHero, 700);
    if (user)
      restart();
  }
  function restart() {
    clearInterval(timer);
    if (!reduce)
      timer = setInterval(function() {
        if (!paused && !document.hidden)
          go(cur + 1);
      }, 6e3);
  }
  $("bnrPrev").addEventListener("click", function() {
    go(cur - 1, true);
  });
  $("bnrNext").addEventListener("click", function() {
    go(cur + 1, true);
  });
  [].forEach.call(dots, function(d, i) {
    d.addEventListener("click", function() {
      go(i, true);
    });
  });
  bnr.addEventListener("mouseenter", function() {
    paused = true;
  });
  bnr.addEventListener("mouseleave", function() {
    paused = false;
  });
  bnr.addEventListener("focusin", function() {
    paused = true;
  });
  bnr.addEventListener("focusout", function() {
    paused = false;
  });
  var sx = null, sy = null;
  bnr.addEventListener("touchstart", function(e) {
    sx = e.touches[0].clientX;
    sy = e.touches[0].clientY;
  }, { passive: true });
  bnr.addEventListener("touchend", function(e) {
    if (sx === null)
      return;
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    sx = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy))
      go(cur + (dx < 0 ? 1 : -1), true);
  });
  bnr.addEventListener("keydown", function(e) {
    if (e.key === "ArrowRight")
      go(cur + 1, true);
    if (e.key === "ArrowLeft")
      go(cur - 1, true);
  });
  var started = false;
  go(0);
  started = true;
  restart();
  window.__bnr = { go, cur: function() {
    return cur;
  }, stop: function() {
    clearInterval(timer);
    timer = null;
  } };
  var chipsEl = $("chips");
  function chipEnd() {
    chipsEl.classList.toggle("end", chipsEl.scrollLeft + chipsEl.clientWidth >= chipsEl.scrollWidth - 4);
  }
  chipsEl.addEventListener("scroll", chipEnd, { passive: true });
  window.addEventListener("resize", chipEnd);
  chipEnd();
  [].forEach.call(document.querySelectorAll(".mbox"), function(m) {
    m.insertAdjacentHTML("beforeend", '<span class="pops" aria-hidden="true"><i></i><i></i><i></i></span><span class="reels" aria-hidden="true"><i><b></b></i><i><b></b></i><i><b></b></i><s></s><s></s><s></s><s></s></span>');
  });
  function spin(scope) {
    var rs = scope.querySelectorAll(".reels");
    if (reduce || !rs.length || rs[0].classList.contains("spin"))
      return;
    [].forEach.call(rs, function(r) {
      r.classList.remove("won");
      void r.offsetWidth;
      r.classList.add("spin");
    });
    setTimeout(function() {
      [].forEach.call(rs, function(r) {
        r.classList.remove("spin");
        r.classList.add("won");
      });
    }, 1650);
    setTimeout(function() {
      [].forEach.call(rs, function(r) {
        r.classList.remove("won");
      });
    }, 2700);
  }
  var HH = $("heroHost"), OH = $("offersHost"), lastHover = null;
  function onScreen(m) {
    if (!m || m.offsetParent === null)
      return false;
    var r = m.getBoundingClientRect();
    return r.bottom > 0 && r.top < innerHeight;
  }
  function spinHero() {
    if (!document.hidden && cur === 0 && onScreen(HH))
      spin(HH);
  }
  function spinOffers() {
    if (!document.hidden && onScreen(OH))
      spin(OH);
  }
  if (OH && !reduce && "IntersectionObserver" in window) {
    new IntersectionObserver(function(es) {
      if (es[0].isIntersecting)
        setTimeout(spinOffers, 350);
    }, { threshold: 0.6 }).observe(OH);
    document.addEventListener("mouseover", function(e) {
      var c = e.target.closest && e.target.closest(".ocard");
      if (c && !c.contains(e.relatedTarget))
        spinOffers();
    });
  }
  if (HH && !reduce) {
    (function heroSpin(first) {
      setTimeout(function() {
        spinHero();
        heroSpin();
      }, first ? 2200 : 6e3 + Math.random() * 3e3);
    })(true);
    document.addEventListener("mouseover", function(e) {
      var c = e.target.closest && e.target.closest(".gcard");
      if (c && c !== lastHover)
        spinHero();
      lastHover = c || null;
    });
  }
  var studios = $("studios"), stGrid = $("stGrid"), stQ = $("stQ"), stSort = "games";
  function fmt(n) {
    return n.toLocaleString("en");
  }
  $("stTotal").textContent = PV.list.length;
  $("stGames").textContent = fmt(PV.total_games);
  var localCount = {};
  ALL.forEach(function(id) {
    localCount[G[id].p] = (localCount[G[id].p] || 0) + 1;
  });
  function stCard(p) {
    return '<a class="st-card' + (p.logo ? "" : " st-text") + '" href="#/providers/' + pslug(p.n) + '" data-prov="' + esc(p.n) + '" aria-label="' + esc(p.n) + ", " + fmt(p.count) + ' games"><span class="ppill">' + (p.logo ? '<img src="' + p.logo + '" alt="" loading="lazy" decoding="async">' : '<b class="st-word">' + esc(p.n) + "</b>") + '</span><span class="st-name">' + esc(p.n) + '</span><span class="st-meta"><b>' + fmt(p.count) + "</b> game" + (p.count === 1 ? "" : "s") + (p.kind ? " &middot; " + esc(p.kind) : "") + "</span></a>";
  }
  function renderStudios() {
    var v = norm(stQ.value), words = v ? v.split(" ") : [];
    var list = PV.list.filter(function(p) {
      var k = norm(p.n);
      return words.every(function(w) {
        return k.indexOf(w) >= 0 || k.replace(/ /g, "").indexOf(w) >= 0;
      });
    });
    if (stSort === "az")
      list = list.slice().sort(function(a, b) {
        return a.n.localeCompare(b.n, "en", { sensitivity: "base" });
      });
    else if (v)
      list = list.slice().sort(function(a, b) {
        return (norm(a.n).indexOf(words[0]) === 0 ? 0 : 1) - (norm(b.n).indexOf(words[0]) === 0 ? 0 : 1);
      });
    stGrid.innerHTML = list.map(stCard).join("");
    studios.classList.toggle("has-q", !!stQ.value);
    $("stFound").textContent = v ? list.length + (list.length === 1 ? " studio" : " studios") + " found" : PV.list.length + " studios";
    $("stEmpty").hidden = list.length > 0;
    if (!list.length)
      $("stEmptyTitle").textContent = "No studio called “" + stQ.value.trim() + "”";
  }
  stQ.addEventListener("input", renderStudios);
  stQ.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && stQ.value) {
      e.stopPropagation();
      stQ.value = "";
      renderStudios();
    }
  });
  $("stClear").addEventListener("click", function() {
    stQ.value = "";
    renderStudios();
    stQ.focus();
  });
  $("stReset").addEventListener("click", function() {
    stQ.value = "";
    renderStudios();
    stQ.focus();
  });
  [].forEach.call(studios.querySelectorAll("[data-sort]"), function(b) {
    b.addEventListener("click", function() {
      stSort = b.getAttribute("data-sort");
      [].forEach.call(studios.querySelectorAll("[data-sort]"), function(x) {
        x.setAttribute("aria-pressed", x === b);
      });
      renderStudios();
    });
  });
  renderStudios();
  function showStudios() {
    hidePage();
    if (q.value) {
      q.value = "";
      document.body.classList.remove("has-q");
    }
    lobby.hidden = true;
    results.hidden = true;
    studios.hidden = false;
    document.body.classList.add("v-studios");
    document.body.classList.remove("v-prov");
    studios.style.setProperty("--st-top", $("top").offsetHeight + "px");
    setChip(null);
    var nav = document.querySelectorAll(".nav a");
    if (nav[3])
      nav[3].classList.add("on");
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  function hideStudios() {
    if (studios.hidden)
      return;
    studios.hidden = true;
    document.body.classList.remove("v-studios");
  }
  function showProvider(name) {
    var p = PVBY[name] || { n: name, count: 0, titles: [] }, ids = ALL.filter(function(id) {
      return G[id].p === name;
    });
    setChip(null);
    showGrid(name, "studio", ids, "No games from " + name, "");
    $("resStudios").hidden = false;
    $("resCount").textContent = fmt(p.count || ids.length) + ((p.count || ids.length) === 1 ? " GAME" : " GAMES");
    document.body.classList.add("v-prov");
    if (!ids.length && p.titles && p.titles.length) {
      $("noResults").hidden = true;
      grid.innerHTML = p.titles.map(function(t) {
        return '<div class="gcard tcard"><span class="thumb"><span class="tposter"><small>' + esc(name) + "</small><b>" + esc(t) + '</b></span></span><span class="gname">' + esc(t) + '</span><span class="gprov">' + esc(name) + "</span></div>";
      }).join("");
    }
    var shown = ids.length || (p.titles || []).length;
    if (p.count > shown) {
      $("resMore").hidden = false;
      $("resMore").innerHTML = "Showing <b>" + shown + "</b> of " + fmt(p.count) + " " + esc(name) + " games. " + (ids.length ? "This preview carries the games from tonight&rsquo;s lobby; the live site lists them all." : "Sample titles; thumbnails come with the live site.");
    }
    window.scrollTo({ top: 0, behavior: "auto" });
    scrollToResults();
  }
  var pTrack = $("provTrack"), pSec = $("providers");
  var pcar = function() {
    var hold = { hover: 0, focus: 0, touch: 0, arrow: 0, off: 0 }, pos = 0, loop = 0, last = 0, moved = 0, touchT, arrowT, running = false;
    function measure() {
      var d = pTrack.querySelector(".pcard.dup"), f = pTrack.firstElementChild;
      loop = d && f ? d.offsetLeft - f.offsetLeft : 0;
      if (loop > 0) {
        pos = (pos % loop + loop) % loop;
      }
    }
    function paused2() {
      return reduce || document.hidden || hold.hover || hold.focus || hold.touch || hold.arrow || hold.off || lobby.hidden;
    }
    function speed() {
      return innerWidth <= 760 ? 22 : 26;
    }
    function kick() {
      if (!running && !reduce) {
        running = true;
        last = 0;
        requestAnimationFrame(frame);
      }
    }
    function frame(t) {
      if (hold.off || document.hidden) {
        running = false;
        return;
      }
      var dt = last ? Math.min(64, t - last) : 0;
      last = t;
      if (!paused2()) {
        if (!loop)
          measure();
        if (loop > 0) {
          pos += dt * speed() / 1e3;
          if (pos >= loop)
            pos -= loop;
          pTrack.scrollLeft = pos;
          moved += dt * speed() / 1e3;
        }
      }
      requestAnimationFrame(frame);
    }
    if (!reduce) {
      pTrack.classList.add("rolling");
      pTrack.addEventListener("scroll", function() {
        if (!loop)
          return;
        var x = pTrack.scrollLeft;
        if (Math.abs(x - pos) > 2) {
          if (hold.arrow) {
            pos = x;
            return;
          }
          if (x >= loop) {
            x -= loop;
            pTrack.scrollLeft = x;
          } else if (x <= 0 && hold.touch) {
            x += loop;
            pTrack.scrollLeft = x;
          }
          pos = x;
        }
      }, { passive: true });
      pSec.addEventListener("mouseenter", function() {
        hold.hover = 1;
      });
      pSec.addEventListener("mouseleave", function() {
        hold.hover = 0;
      });
      pSec.addEventListener("focusin", function() {
        hold.focus = 1;
      });
      pSec.addEventListener("focusout", function(e) {
        if (!pSec.contains(e.relatedTarget))
          hold.focus = 0;
      });
      pSec.addEventListener("touchstart", function() {
        hold.touch = 1;
        clearTimeout(touchT);
      }, { passive: true });
      pSec.addEventListener("touchend", function() {
        clearTimeout(touchT);
        touchT = setTimeout(function() {
          hold.touch = 0;
          pos = pTrack.scrollLeft;
        }, 2500);
      }, { passive: true });
      if ("IntersectionObserver" in window)
        new IntersectionObserver(function(es) {
          hold.off = es[0].isIntersecting ? 0 : 1;
          if (!hold.off)
            kick();
        }).observe(pSec);
      document.addEventListener("visibilitychange", function() {
        if (!document.hidden)
          kick();
      });
      var pw = innerWidth;
      window.addEventListener("resize", function() {
        if (Math.abs(innerWidth - pw) > 20) {
          pw = innerWidth;
          measure();
        }
      });
      if (document.fonts && document.fonts.ready)
        document.fonts.ready.then(measure);
      kick();
    }
    return {
      // an arrow steps the loop by about one view; going back past the start jumps by one list width first, so it never hits a wall
      arrow: function(dir) {
        if (reduce || !loop)
          return false;
        var stepPx = Math.max(120, pTrack.clientWidth * 0.9), from = pTrack.scrollLeft;
        if (from >= loop)
          from -= loop;
        if (dir < 0 && from - stepPx < 0)
          from += loop;
        if (from !== pTrack.scrollLeft)
          pTrack.scrollLeft = from;
        pos = from;
        hold.arrow = 1;
        clearTimeout(arrowT);
        pTrack.scrollTo({ left: from + dir * stepPx, behavior: "smooth" });
        arrowT = setTimeout(function() {
          var x = pTrack.scrollLeft;
          if (x >= loop) {
            x -= loop;
            pTrack.scrollLeft = x;
          }
          pos = x;
          hold.arrow = 0;
        }, 700);
        return true;
      },
      state: function() {
        return { running, pos, scrollLeft: pTrack.scrollLeft, loop, moved, paused: !!paused2(), hold: JSON.parse(JSON.stringify(hold)), reduce: !!reduce, cards: pTrack.children.length };
      },
      measure
    };
  }();
  window.__pcar = pcar;
  window.__studios = { open: function() {
    window.__router.go("#/providers");
  }, provider: function(n) {
    window.__router.go("#/providers/" + pslug(n));
  } };
  window.__app = {
    G,
    ALL,
    PV,
    PVBY,
    C,
    NAME,
    ICON,
    CHIPS,
    svg,
    esc,
    eur,
    tile,
    pslug,
    favs,
    showLobby,
    filterCat,
    showStudios,
    hideStudios,
    showProvider,
    hidePage,
    setChip,
    closeDrawer,
    drawer,
    q,
    runSearch,
    openSearch,
    scrollToResults,
    reduce
  };
  window.addEventListener("load", function() {
    setTimeout(function() {
      $("loader").classList.add("done");
    }, reduce ? 0 : 650);
  });
})();
