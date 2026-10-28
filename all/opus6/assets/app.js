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
        ['Golden', 'Encore', art('tile-ticket', '45% 65% / 160%'), 'new']
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
      { id: 'originals', title: 'Popcorn originals', icon: 'bucket', tag: 'ONLY HERE', games: [
        ['Midnight', 'Sevens', art('tile-sevens', '50% 40% / 150%'), 'new'],
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
  // v6: the empty favourites row offers four of tonight's games to start with (hearts work), so the section is never a blank box
  var picks = document.getElementById('favPicks');
  if (picks) picks.innerHTML = [RAILS.top[0].games[0], RAILS.mid[1].games[0], RAILS.top[0].games[2], RAILS.mid[0].games[1]].map(card).join('');
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
      if (f.classList.contains('on')) spinHero();
    }
  });

  // ---------- v6: the bucket's 777 medallion spins and always lands on 7-7-7 (decoration, not a promise); kernels pop off the pile ----------
  [].forEach.call(document.querySelectorAll('.mbox'), function (m) {
    m.insertAdjacentHTML('beforeend', '<span class="pops" aria-hidden="true"><i></i><i></i><i></i></span><span class="reels" aria-hidden="true"><i><b></b></i><i><b></b></i><i><b></b></i><s></s><s></s><s></s><s></s></span>');
  });
  function spin(scope) {
    var rs = scope.querySelectorAll('.reels');
    if (reduce || !rs.length || rs[0].classList.contains('spin')) return;
    [].forEach.call(rs, function (r) { r.classList.remove('won'); void r.offsetWidth; r.classList.add('spin'); });
    setTimeout(function () { [].forEach.call(rs, function (r) { r.classList.remove('spin'); r.classList.add('won'); }); }, 1650);
    setTimeout(function () { [].forEach.call(rs, function (r) { r.classList.remove('won'); }); }, 2700);
  }

  // the bucket stays on the stage (no corner companion since v6): it spins soon after load, then every 6-9 s while the stage is on screen,
  // and once when a player hovers a game or adds a favourite (never mid-spin, never in a hidden tab, never with reduced motion)
  var HH = document.getElementById('heroHost'), lastHover = null;
  function onScreen() { if (!HH || HH.offsetParent === null) return false; var r = HH.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; }
  function spinHero() { if (!document.hidden && onScreen()) spin(HH); }
  if (HH && !reduce) {
    (function heroSpin(first) { setTimeout(function () { spinHero(); heroSpin(); }, first ? 2200 : 6000 + Math.random() * 3000); })(true);
    document.addEventListener('mouseover', function (e) {
      var c = e.target.closest && e.target.closest('.card:not(.loading)');
      if (c && c !== lastHover) spinHero();
      lastHover = c || null;
    });
  }

  window.addEventListener('load', function () {
    setTimeout(function () { document.getElementById('loader').classList.add('done'); }, reduce ? 0 : 650);
  });
})();
