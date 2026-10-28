// Popcorn.casino preview: renders the game rails, arrows, favourites and the loader.
(function () {
  var A = 'assets/';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // [title line 1, line 2, image, badge]
  function art(n, crop) { return { src: A + 'art/' + n + '.webp', crop: crop }; }

  var RAILS = {
    top: [
      { id: 'popular', title: 'Popular tonight', icon: 'star', tag: 'TOP 10', games: [
        ['Leading', 'Lady', art('tile-leading-lady'), 'pop'],
        ['Match Night', 'Cash', art('tile-sportsbar'), 'pop'],
        ['Neon', 'Roulette', art('tile-roulette')],
        ['Cash', 'Case', art('tile-cash')],
        ['High Roller', 'Blackjack', art('tile-cards')],
        ['Vegas', 'Reels', art('tile-slot')],
        ['Velvet', 'Room VIP', art('tile-vip')],
        ['Feather', 'Fortune', art('tile-showgirl')],
        ['Golden', 'Ticket', art('tile-ticket')]
      ] },
      { id: 'new', title: 'New releases', icon: 'kernel', tag: 'THIS WEEK', games: [
        ['After', 'Hours', art('tile-vip', '70% 40% / 170%'), 'new'],
        ['Showgirl', 'Riches', art('tile-showgirl', '50% 20% / 150%'), 'new'],
        ['Spin', 'City', art('tile-roulette', '30% 60% / 165%'), 'new'],
        ['Bar Tab', 'Bonanza', art('tile-sportsbar', '50% 70% / 160%'), 'new'],
        ['Marquee', 'Gems', art('tile-sevens'), 'new'],
        ['Briefcase', 'Bonus', art('tile-cash', '50% 30% / 160%'), 'new'],
        ['Red Carpet', 'Riches', art('tile-leading-lady', '50% 25% / 150%'), 'new'],
        null
      ] }
    ],
    mid: [
      { id: 'live', title: 'Live casino', icon: 'spotlight', tag: 'REAL DEALERS', games: [
        ['Neon', 'Roulette Live', art('tile-roulette'), 'live'],
        ['High Roller', 'Blackjack', art('tile-cards'), 'live'],
        ['Velvet', 'Baccarat', art('tile-cards', '75% 70% / 170%'), 'live'],
        ['VIP Lounge', 'Roulette', art('tile-vip', '80% 80% / 160%'), 'live'],
        ['Match Night', 'Game Show', art('tile-sportsbar'), 'live'],
        ['Showtime', 'Poker', art('tile-showgirl'), 'live'],
        ['Midnight', 'Dice', art('tile-vip', '85% 90% / 210%'), 'live'],
        ['Grand', 'Wheel', art('tile-roulette', '70% 30% / 180%'), 'live']
      ] },
      { id: 'jackpots', title: 'Jackpots', icon: 'ticket', tag: 'PRIZE POOLS', games: [
        ['Grand', 'Premiere', art('tile-jackpot'), 'jp'],
        ['Cash', 'Case', art('tile-cash'), 'jp'],
        ['Vegas', 'Reels', art('tile-slot'), 'jp'],
        ['Golden', 'Ticket', art('tile-ticket'), 'jp'],
        ['Spotlight', 'Sevens', art('tile-sevens'), 'jp'],
        ['Coin', 'Storm', art('tile-slot', '50% 85% / 170%'), 'jp'],
        ['Leading', 'Lady', art('tile-leading-lady'), 'jp']
      ] }
    ],
    bottom: [
      { id: 'originals', title: 'Popcorn originals', icon: 'mascot/head', tag: 'ONLY HERE', games: [
        ['Popcorn', 'Showman', art('tile-showman'), 'new'],
        ['Velvet', 'Room VIP', art('tile-vip')],
        ['Feather', 'Fortune', art('tile-showgirl'), 'new'],
        ['Match Night', 'Cash', art('tile-sportsbar')],
        ['Grand', 'Premiere', art('tile-jackpot')],
        ['Cash', 'Case', art('tile-cash')],
        ['Encore', 'Roulette', art('tile-roulette', '40% 50% / 140%')],
        ['Golden', 'Ticket', art('tile-ticket')]
      ] }
    ]
  };
  var BADGE = { pop: 'Popular', new: 'New', live: 'Live', jp: 'Jackpot' };
  var STUDIO = ['Popcorn Originals', 'Marquee Studios', 'Stagelight Games'];

  function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }
  function card(g, i) {
    if (!g) {
      return '<div class="card loading"><div class="ld"><span class="pop-row"><img src="' + A + 'icons/kernel.webp" alt=""><img src="' + A + 'icons/kernel.webp" alt=""><img src="' + A + 'icons/kernel.webp" alt=""></span>More coming</div></div>';
    }
    var im = g[2], style = '';
    if (im.crop) { var c = im.crop.split(' / '); style = ' style="object-position:' + c[0] + ';transform-origin:' + c[0] + ';scale:' + (parseFloat(c[1]) / 100) + '"'; }
    return '<a class="card" href="#" aria-label="' + g[0] + ' ' + g[1] + '">' +
      '<img class="art" src="' + im.src + '" alt="" loading="lazy"' + style + '>' +
      (g[3] ? '<span class="badge ' + g[3] + '">' + BADGE[g[3]] + '</span>' : '') +
      '<button class="fav" aria-label="Add to favourites"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9-8.6C1.6 8.3 3.5 5 6.8 5c2 0 3.3 1.1 4.2 2.4C11.9 6.1 13.2 5 15.2 5c3.3 0 5.2 3.3 3.8 6.4C19 15.6 12 20 12 20z"/></svg></button>' +
      '<span class="name">' + g[0] + '<b>' + g[1] + '</b></span><span class="studio">' + STUDIO[i % 3] + '</span>' +
      '<span class="play"><span><svg viewBox="0 0 24 24"><path d="M7 4v16l13-8z"/></svg></span></span></a>';
  }
  function rail(r) {
    return '<section class="rail" id="' + r.id + '"><div class="rail-head">' +
      '<span class="rail-icon' + (r.icon.indexOf('/') > 0 ? ' host' : '') + '"><img src="' + A + (r.icon.indexOf('/') > 0 ? '' : 'icons/') + r.icon + '.webp" alt=""></span><h2>' + r.title + '</h2>' +
      '<span class="tag">' + r.tag + '</span><a class="more" href="#">View all &rarr;</a>' +
      '<div class="arrows"><button class="arrow prev" aria-label="Previous"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m15 6-6 6 6 6"/></svg></button>' +
      '<button class="arrow next" aria-label="Next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m9 6 6 6-6 6"/></svg></button></div></div>' +
      '<div class="track">' + r.games.map(card).join('') + '</div></section>';
  }
  Object.keys(RAILS).forEach(function (k) {
    var host = document.getElementById('rails-' + k);
    if (host) host.innerHTML = RAILS[k].map(rail).join('');
  });

  document.addEventListener('click', function (e) {
    var a = e.target.closest('.arrow');
    if (a) {
      var t = a.closest('.rail').querySelector('.track');
      t.scrollBy({ left: (a.classList.contains('next') ? 1 : -1) * t.clientWidth * 0.9, behavior: reduce ? 'auto' : 'smooth' });
      return;
    }
    var f = e.target.closest('.fav');
    if (f) {
      e.preventDefault();
      f.classList.toggle('on');
      var n = document.querySelectorAll('.fav.on').length;
      document.getElementById('favCount').textContent = n;
      if (f.classList.contains('on')) host.react();
    }
  });

  // ---------- The host: follows (fixed corner, leans to the cursor, hops with the scroll), lives (bob, blink, wink), reacts, gets out of the way ----------
  var host = (function () {
    var B = document.getElementById('buddy'), body = document.getElementById('buddyBody'), bubble = document.getElementById('buddyBubble');
    var poses = {}, cur = 'idle', back = 0, said = false, minimised = false;
    [].forEach.call(B.querySelectorAll('.pose'), function (p) { poses[p.classList[1]] = p; });
    try { minimised = localStorage.getItem('pc-host-min') === '1'; } catch (e) {}
    function pose(n, ms) {
      if (minimised) return;
      if (poses[cur]) poses[cur].classList.remove('on');
      cur = n; poses[n].classList.add('on');
      B.classList.toggle('alt', n !== 'idle');
      if (!reduce) { body.classList.remove('swap'); void body.offsetWidth; body.classList.add('swap'); }
      clearTimeout(back);
      if (ms) back = setTimeout(function () { pose('idle'); }, ms);
    }
    function say(t, ms) {
      bubble.textContent = t; B.classList.add('talk');
      setTimeout(function () { B.classList.remove('talk'); }, ms);
    }
    function react() {
      if (minimised) return;
      pose('cheer', 1200);
      if (!reduce) { B.classList.remove('pop'); void B.offsetWidth; B.classList.add('pop'); }
    }
    function setMin(v) {
      minimised = v; B.classList.toggle('min', v);
      try { localStorage.setItem('pc-host-min', v ? '1' : '0'); } catch (e) {}
      if (!v) { pose('wink', 1100); }
    }
    document.getElementById('buddyMin').addEventListener('click', function () { setMin(true); });
    document.getElementById('buddyChip').addEventListener('click', function () { setMin(false); });
    if (minimised) B.classList.add('min');

    // never cover the Join buttons, the tab bar, a card's play/heart action or the rail controls: tuck behind the screen edge instead
    var AVOID = '.pill-gold, .legal a, .card .play span, .card .fav, .arrow, .rail-head .more, .promo .go, .chip, .empty .pill';
    function hits() {
      // test against the bucket's core (the face and medallion), not the floating gloves or the transparent corners of the box
      var r = B.getBoundingClientRect(), px = r.width * .3, py = r.height * .1, els = document.querySelectorAll(AVOID);
      for (var i = 0; i < els.length; i++) {
        var q = els[i].getBoundingClientRect();
        if (!q.width || q.bottom < 0 || q.top > innerHeight) continue;
        if (q.left < r.right - px && q.right > r.left + px && q.top < r.bottom - py && q.bottom > r.top + py) return true;
      }
      return false;
    }
    var ticking = false, lastY = scrollY, hopAt = 0;
    function frame() {
      ticking = false;
      B.classList.toggle('tuck', hits());
      var y = scrollY;
      if (!reduce && Math.abs(y - lastY) > 40 && Date.now() - hopAt > 650) {
        hopAt = Date.now(); B.classList.remove('hop'); void B.offsetWidth; B.classList.add('hop');
      }
      lastY = y;
      if (!said && B.classList.contains('in') && y > 120 && !minimised) { said = true; pose('point', 4200); say('Grab a seat, the show\u2019s on.', 4200); }
    }
    function queue() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    document.addEventListener('mouseover', function (e) {
      var c = e.target.closest && e.target.closest('.card:not(.loading)');
      if (c && c !== react.last) { react.last = c; react(); }
      if (!c) react.last = null;
    });

    if (!reduce) {
      // lean and look toward the cursor
      addEventListener('pointermove', function (e) {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        var r = B.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height * 0.35;
        var dx = Math.max(-1, Math.min(1, (e.clientX - cx) / 700)), dy = Math.max(-1, Math.min(1, (e.clientY - cy) / 500));
        body.style.setProperty('--lean', (dx * 9).toFixed(2) + 'deg');
        body.style.setProperty('--lx', (dx * 8).toFixed(1) + 'px');
        body.style.setProperty('--ly', (dy * 4).toFixed(1) + 'px');
      }, { passive: true });
      // idle life: blink every few seconds, a wink now and then
      (function blinkLoop() {
        setTimeout(function () {
          if (cur === 'idle' && !minimised) { B.classList.add('blink'); setTimeout(function () { B.classList.remove('blink'); }, 160); }
          blinkLoop();
        }, 2600 + Math.random() * 2600);
      })();
      setInterval(function () { if (cur === 'idle' && !minimised && !B.classList.contains('tuck')) pose('wink', 1300); }, 11000);
    }
    // on desktop he starts on the stage; when the stage scrolls away he jumps into the corner and follows from there
    var HH = document.getElementById('heroHost'), onStage = false;
    function stageWatch() {
      var vis = HH && HH.offsetParent !== null;
      if (!vis) { B.classList.add('in'); return; }
      var r = HH.getBoundingClientRect(), seen = r.bottom > 90 + r.height * .45 && r.top < innerHeight;
      if (seen !== onStage) {
        onStage = seen; HH.classList.toggle('gone', !seen);
        B.classList.toggle('in', !seen);
        if (!seen) { pose('wink', 900); queue(); }
      }
    }
    B.stageWatch = stageWatch;
    addEventListener('scroll', stageWatch, { passive: true }); addEventListener('resize', stageWatch);
    queue(); addEventListener('load', queue);
    if (document.fonts) document.fonts.ready.then(queue);
    setInterval(queue, 1200); // layout can move under a still host (fonts, lazy images, rail scroll)
    return { react: react, pose: pose };
  })();

  window.addEventListener('load', function () {
    setTimeout(function () { document.getElementById('loader').classList.add('done'); document.getElementById('buddy').stageWatch(); }, reduce ? 0 : 650);
  });
})();
