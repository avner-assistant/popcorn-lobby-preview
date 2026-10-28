(function() {
  var P = window.__app, G = P.G, esc = P.esc, svg = P.svg;
  var META = window.GAMEMETA || {};
  function $(id) {
    return document.getElementById(id);
  }
  var page = $("page"), lobby = $("lobby"), results = $("results"), studios = $("studios");
  var OP = function(t) {
    return '<span class="op"><b>Operator supplies this</b>' + (t ? " " + t : "") + "</span>";
  };
  var S = {
    wMatch: 100,
    wMax: 200,
    wSpins: 50,
    wSpinVal: "0.10",
    wSpinGame: "Big Bass Halloween 2",
    wMin: 10,
    wWag: 10,
    wDays: 30,
    wSpinDays: 7,
    maxBet: 5,
    slotW: 100,
    tableW: 10,
    pSpins: 25,
    pMin: 20,
    pVal: "0.20",
    pWag: 10,
    pDays: 7,
    eRate: 10,
    eMax: 100,
    eWag: 1,
    eClaim: 3,
    eMinLoss: 20
  };
  function sym(c) {
    return c === "GBP" ? "&pound;" : "&euro;";
  }
  function welcomeValue(c) {
    return S.wMatch + "% up to " + sym(c) + S.wMax + " + " + S.wSpins + " free spins";
  }
  function welcomeLine(c) {
    return "18+. First deposit only. Min. deposit " + sym(c) + S.wMin + ", " + S.wWag + "x wagering on the bonus, " + S.wDays + " days. Deposit " + sym(c) + S.wMax + " for the full bonus.";
  }
  var OFFERS = {
    welcome: {
      kind: "New players",
      icon: "ticket",
      title: "Welcome package",
      color: "#f5c451",
      bg: "linear-gradient(160deg,#7a0d1c,#2a0610 70%)",
      value: welcomeValue("EUR"),
      cta: ["Join now", "#/join"],
      line: welcomeLine("EUR"),
      keys: [
        ["Who", "New players, first deposit only"],
        ["Needs a deposit", "Yes, &euro;" + S.wMin + " or more"],
        ["Bonus", S.wMatch + "% of your deposit, up to &euro;" + S.wMax],
        ["For the full bonus", "Deposit &euro;" + S.wMax],
        ["Free spins", S.wSpins + " on " + S.wSpinGame + ", &euro;" + S.wSpinVal + " each"],
        ["Wagering", S.wWag + "x the bonus (not the deposit)"],
        ["Max. bet", "&euro;" + S.maxBet + " while the bonus is active"],
        ["Time limit", S.wDays + " days"],
        ["Pound accounts", "Same figures in &pound;: &pound;" + S.wMin + " min., up to &pound;" + S.wMax + ", spins &pound;" + S.wSpinVal + ", max. bet &pound;" + S.maxBet]
      ],
      rules: [
        "The welcome package is open to new players aged 18 or over who open their first account with Popcorn Casino.",
        'Choose the welcome package when you join, or on the cashier page before your first deposit. You can also choose "No bonus for me": your deposit then has no wagering at all.',
        "Your first deposit of at least &euro;" + S.wMin + " is matched " + S.wMatch + "% up to &euro;" + S.wMax + " in bonus money. A deposit of &euro;" + S.wMax + " or more gets the full &euro;" + S.wMax + " bonus.",
        "Figures on this page are in euro. An account in pounds (GBP) gets the same figures in pounds: minimum deposit &pound;" + S.wMin + ", bonus up to &pound;" + S.wMax + ", spins worth &pound;" + S.wSpinVal + " each and a maximum bet of &pound;" + S.maxBet + ".",
        S.wSpins + " free spins are added on " + S.wSpinGame + ", each worth &euro;" + S.wSpinVal + ". Use them within " + S.wSpinDays + " days. Winnings from the spins are paid as bonus money.",
        "Bonus money must be wagered " + S.wWag + " times before it can be withdrawn: a &euro;50 bonus means &euro;500 of bets. Real money is always played first.",
        "Games count towards wagering at different rates: slots " + S.slotW + "%, table and live games " + S.tableW + "%. The full list sits on the cashier page.",
        "The maximum bet while bonus money is active is &euro;" + S.maxBet + " per spin or hand.",
        "Unused bonus money expires after " + S.wDays + " days.",
        "You can cancel the bonus at any time on the cashier page. Bonus money and bonus winnings are then removed; your own deposit stays yours.",
        "One welcome package per person, household, payment method and device.",
        "Popcorn Casino may end or change this offer with notice on this page. Changes never apply to a bonus you already hold."
      ]
    },
    premiere: {
      kind: "Weekly &middot; opt in",
      icon: "reel",
      title: "Premiere spins",
      color: "#ff8fb5",
      bg: "linear-gradient(160deg,#5c0b45,#1d0822 70%)",
      value: S.pSpins + " free spins on the week&rsquo;s new game",
      cta: ["Opt in", "#/login"],
      line: "Opt in, then deposit &euro;" + S.pMin + " or more. Spins worth &euro;" + S.pVal + " each, " + S.pWag + "x wagering on spin winnings, " + S.pDays + " days.",
      keys: [
        ["Who", "Every player with an account, opt in each week"],
        ["Needs a deposit", "Yes, &euro;" + S.pMin + " or more in one go"],
        ["Spins", S.pSpins + " at &euro;" + S.pVal + " each"],
        ["Wagering", S.pWag + "x the spin winnings"],
        ["Time limit", S.pDays + " days"]
      ],
      rules: [
        "Premiere spins run every week from Monday 10:00 to Sunday 23:59 (UK time).",
        "Opt in on this page while you are logged in. Deposits made before you opt in do not count.",
        "After opting in, deposit at least &euro;" + S.pMin + " in one go to receive " + S.pSpins + " free spins on the premiere game, shown on this page each week.",
        "Each spin is worth &euro;" + S.pVal + ". Winnings are paid as bonus money and must be wagered " + S.pWag + " times.",
        "Free spins expire " + S.pDays + " days after they are added.",
        "One set of premiere spins per player per week.",
        "Standard bonus rules apply: maximum bet, game weighting and cancellation as in the welcome package rules 5 to 9."
      ]
    },
    encore: {
      kind: "Mondays &middot; everyone",
      icon: "kernel",
      title: "Encore cashback",
      color: "#9cc2ff",
      bg: "linear-gradient(160deg,#16306a,#0b1230 70%)",
      value: S.eRate + "% back on last week&rsquo;s net losses",
      cta: ["Log in to see yours", "#/login"],
      line: "Same rate for every player, no status needed. Up to &euro;" + S.eMax + " a week, " + S.eWag + "x wagering, claim within " + S.eClaim + " days.",
      keys: [
        ["Who", "Every player, the same rate"],
        ["Needs a deposit", "No new deposit: based on last week&rsquo;s play"],
        ["Rate", S.eRate + "% of net losses"],
        ["Maximum", "&euro;" + S.eMax + " a week"],
        ["Wagering", S.eWag + "x"],
        ["Claim within", S.eClaim + " days"]
      ],
      rules: [
        "Net losses are your real-money deposits minus your withdrawals and your balance, from Monday 00:00 to Sunday 23:59 (UK time).",
        "Every Monday, " + S.eRate + "% of last week&rsquo;s net losses is offered back as cashback, up to &euro;" + S.eMax + ". Weeks with net losses under &euro;" + S.eMinLoss + " get none.",
        "Cashback is never automatic: it waits on the cashier page and you choose whether to claim it, within " + S.eClaim + " days.",
        "Cashback must be wagered " + S.eWag + " time before it can be withdrawn.",
        "Weeks in which you played with an active bonus count only real-money play.",
        "If you have set a loss limit or taken a break, no cashback is offered for that period."
      ]
    },
    club: {
      kind: "Loyalty",
      icon: "star",
      title: "Popcorn Club",
      color: "#ffd36b",
      bg: "linear-gradient(160deg,#5a3d0c,#1a1208 70%)",
      value: "Points on every game, rewards you choose",
      cta: ["Join now", "#/join"],
      line: "Details and terms coming soon. Nothing to claim yet.",
      soon: true,
      keys: [
        ["Who", "Every player, from the first game"],
        ["Needs a deposit", "No, points come from play"],
        ["Points", "1 per &euro;10 on slots, 1 per &euro;50 on table and live games"],
        ["Rewards", "Free spins and cash, from 500 points"],
        ["Wagering", "Not set yet: printed here before the club opens"],
        ["Status", "Coming soon"]
      ],
      rules: [
        "The Popcorn Club is not open yet. There is nothing to claim and no points are collected in this preview.",
        "When it opens, every player collects points on every real-money game: 1 point per &euro;10 on slots and 1 per &euro;50 on table and live games.",
        "Points can be swapped for rewards you choose from a published list, from 500 points. Points never expire while your account is active.",
        "The full club rules will be printed on this page before the club opens."
      ]
    }
  };
  var OFFER_ORDER = ["welcome", "premiere", "encore", "club"];
  var HELP = [
    ["account", "Your account", [
      ["How do I join?", 'Choose <a href="#/join">Join</a>, fill in your details in three short steps and confirm your mobile number with a code. It takes about two minutes.'],
      ["I forgot my password", 'Choose <a href="#/reset">Forgot password</a> on the log-in page. We send a link to the email on your account; it works once and only for a short time.'],
      ["Why do you need my phone number?", "We confirm it with a one-time code, so nobody can open an account in your name. We never call you for marketing unless you say yes."],
      ["Can I change my details?", "Your name is checked once and then fixed. You can change your email, phone and password in your account at any time."]
    ]],
    ["payments", "Wallet &amp; payments", [
      ["Which payment methods can I use?", 'Cards, Apple Pay, Google Pay, bank transfer and e-wallets, from &euro;10 a deposit. See them in the <a href="#/deposit">cashier</a>. ' + OP("the final list per country.")],
      ["How long do withdrawals take?", "We review a withdrawal within 24 hours. After that it depends on your method: e-wallets are fastest (usually the same day), bank transfers take 1 to 3 working days."],
      ["Are there fees?", "Any fees are shown before you confirm a payment. " + OP("the fee table, if any.")],
      ["Why do you ask for documents?", "The licence requires us to confirm who you are before your first withdrawal. You upload them once in your account."]
    ]],
    ["bonuses", "Bonuses &amp; offers", [
      ["Do I have to take a bonus?", 'No. Every bonus is a choice, and "No bonus for me" is always one tap away. Without a bonus there is no wagering at all.'],
      ["What does wagering mean?", "It is how much you play before bonus money becomes cash. A &euro;10 bonus with " + S.wWag + "x wagering means &euro;" + 10 * S.wWag + " of bets first. Some sites count wagering on the deposit too; ours is on the bonus only."],
      ["Where are the full rules?", 'On every offer&rsquo;s own page. See all of them on <a href="#/promotions">Promotions</a>.']
    ]],
    ["games", "Games", [
      ["Can I try a game for free?", "Where the studio offers one, yes: open a game and choose <b>Try demo</b> to play with play money. Games without a demo say so on their page, and live tables have none."],
      ["Are the games fair?", "Every game comes from a licensed studio and is tested by an independent lab. " + OP("the testing lab and certificates.")],
      ["A game froze. What now?", "Your bet is safe: the studio finishes the round on its server. Reopen the game to see the result, or ask us in live chat."]
    ]],
    ["app", "Get the app", [
      ["Is there an app?", "Popcorn runs in your phone&rsquo;s browser and can be added to your home screen like an app. " + OP("store apps, if any.")],
      ["How do I add it to my home screen?", "iPhone: Share, then Add to Home Screen. Android: the menu, then Install app."]
    ]],
    ["safety", "Playing safely", [
      ["How do I set a limit?", 'In your account under Responsible play. Read how each tool works on <a href="#/responsible/limits">Deposit limits</a>.'],
      ["I need a break", 'Take a break from 24 hours to 6 weeks, or close your account for longer with <a href="#/responsible/exclusion">self-exclusion</a>.']
    ]]
  ];
  var RESP = [
    ["limits", "Deposit and loss limits", "Set how much you can deposit or lose per day, week or month. Lowering a limit works at once; raising it waits 24 hours, so the decision is never made in the heat of a game.", "Set a limit"],
    ["reality", "Reality check", "A reminder pops up every 15, 30 or 60 minutes (you choose) with how long you have played and what you have won or lost.", "Turn on reminders"],
    ["break", "Take a break", "Pause your account for 24 hours, a week or up to 6 weeks. You cannot play or deposit until the break ends, and we stop all offers.", "Take a break"],
    ["exclusion", "Self-exclusion", "Close your account for 6 months, a year or for good. It cannot be reopened early. " + OP("the national self-exclusion schemes that apply in your country."), "Self-exclude"]
  ];
  var CC = [
    ["GB", "+44"],
    ["IE", "+353"],
    ["DE", "+49"],
    ["AT", "+43"],
    ["CH", "+41"],
    ["FR", "+33"],
    ["ES", "+34"],
    ["IT", "+39"],
    ["PT", "+351"],
    ["NL", "+31"],
    ["BE", "+32"],
    ["SE", "+46"],
    ["NO", "+47"],
    ["FI", "+358"],
    ["DK", "+45"],
    ["PL", "+48"],
    ["CZ", "+420"],
    ["CA", "+1"],
    ["AU", "+61"],
    ["NZ", "+64"]
  ];
  function sign(kicker, title2, sub, opts) {
    opts = opts || {};
    return '<div class="st-head pg-head' + (opts.host ? "" : " no-host") + '">' + (opts.host ? '<img class="st-host" src="assets/showman/' + opts.host + '.webp" alt="" loading="lazy">' : "") + '<div class="st-sign"><span class="bill-bulbs" aria-hidden="true"></span><h1 id="pgTitle" tabindex="-1"><small>' + kicker + "</small>" + title2 + "</h1>" + (sub ? '<span class="st-sub">' + sub + "</span>" : "") + "</div>" + (opts.back === false ? "" : '<a class="more st-back" href="' + (opts.back || "#/") + '">&larr; ' + (opts.backLabel || "Back to lobby") + "</a>") + "</div>";
  }
  function crumbs(list) {
    return '<nav class="crumbs" aria-label="You are here"><ol>' + list.map(function(c, i) {
      return "<li>" + (i < list.length - 1 ? '<a href="' + c[1] + '">' + c[0] + "</a>" : '<span aria-current="page">' + c[0] + "</span>") + "</li>";
    }).join("") + "</ol></nav>";
  }
  function icon(n) {
    return '<img src="assets/icons/' + n + '.webp" alt="" loading="lazy">';
  }
  function railOf(title2, ids, ic) {
    return '<section class="rail pg-rail" aria-label="' + esc(title2) + '"><div class="rail-head"><span class="rail-icon">' + svg(ic || "star") + "</span><h2>" + title2 + '</h2><div class="arrows"><button class="arrow prev" aria-label="Previous"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m15 6-6 6 6 6"/></svg></button><button class="arrow next" aria-label="Next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m9 6 6 6-6 6"/></svg></button></div></div><div class="track">' + ids.map(function(id) {
      return P.tile(id);
    }).join("") + "</div></section>";
  }
  function provName(slug) {
    var all = P.PV.list.concat(P.C.providers);
    for (var i = 0; i < all.length; i++)
      if (P.pslug(all[i].n) === slug)
        return all[i].n;
    return null;
  }
  function hasDemo(id) {
    var m = META[id] || ["", ""];
    return G[id].p === "Pragmatic Play" && m[0] !== "Live casino";
  }
  function gamePage(id) {
    var g = G[id], m = META[id] || ["", ""], demo = hasDemo(id), live = m[0] === "Live casino", cats = g.c.filter(function(c) {
      return P.NAME[c];
    });
    var main = cats[0] ? [P.NAME[cats[0]], "#/games/" + cats[0]] : ["Games", "#/games"];
    var same = P.ALL.filter(function(x) {
      return x !== id && G[x].p === g.p;
    });
    var near = P.ALL.filter(function(x) {
      return x !== id && G[x].p !== g.p && G[x].c.some(function(c) {
        return g.c.indexOf(c) >= 0;
      });
    });
    var rel = same.concat(near).slice(0, 12);
    var fav = !!P.favs[id];
    return crumbs([["Lobby", "#/"], main, [esc(g.n)]]) + `<article class="gp" aria-labelledby="pgTitle"><div class="gp-back" style="background-image:url('` + g.t + `')" aria-hidden="true"></div><span class="curtain l" aria-hidden="true"></span><span class="curtain r" aria-hidden="true"></span><div class="gp-art"><span class="gp-frame"><span class="bill-bulbs" aria-hidden="true"></span><img src="` + g.t + '" alt="' + esc(g.n) + ' cover art" width="380" height="380"></span></div><div class="gp-copy"><a class="gp-studio" href="#/providers/' + P.pslug(g.p) + '">' + esc(g.p) + '</a><h1 id="pgTitle" tabindex="-1">' + esc(g.n) + '</h1><div class="gp-tags">' + cats.map(function(c) {
      return '<a class="gp-tag" href="#/games/' + c + '">' + svg(P.ICON[c]) + esc(P.NAME[c]) + "</a>";
    }).join("") + '</div><dl class="gp-facts"><div><dt>Studio</dt><dd>' + esc(g.p) + "</dd></div>" + (m[0] ? "<div><dt>Type</dt><dd>" + m[0] + "</dd></div>" : "") + (m[1] ? "<div><dt>Plays on</dt><dd>" + m[1] + "</dd></div>" : "") + "<div><dt>Demo</dt><dd>" + (demo ? "Play money" : live ? "Live table, no demo" : "Not offered by this studio") + '</dd></div></dl><div class="gp-ctas"><a class="pill pill-gold pill-lg" href="#/game/' + id + '/play">Play for real</a>' + (demo ? '<a class="pill pill-ghost pill-lg" href="#/game/' + id + '/demo">Try demo</a>' : "") + '<button type="button" class="gp-fav' + (fav ? " on" : "") + '" data-gfav="' + id + '" aria-pressed="' + fav + '" aria-label="Add ' + esc(g.n) + ' to favourites">' + svg("heart") + "</button></div>" + (demo ? "" : '<p class="gp-nodemo" id="noDemo">' + (live ? "Live tables have no demo." : "Demo not offered by this studio.") + "</p>") + '<p class="gp-note">RTP and volatility come from the studio&rsquo;s game sheet on the live site. This preview shows none.</p><p class="gp-terms">18+. Play for real needs an account: log in, or join first. <a href="#/responsible">Play responsibly</a>.</p></div></article>' + (rel.length ? railOf("More like this", rel, "sparkle") : "");
  }
  function demoPage(id) {
    var g = G[id];
    if (!hasDemo(id))
      return crumbs([["Lobby", "#/"], [esc(g.n), "#/game/" + id], ["Demo"]]) + '<section class="demo" aria-labelledby="pgTitle"><div class="demo-bar"><h1 id="pgTitle" tabindex="-1"><small>No demo</small>' + esc(g.n) + '</h1><a class="pill pill-ghost" href="#/game/' + id + '">&larr; Back to game</a><a class="pill pill-gold" href="#/game/' + id + `/play">Play for real</a></div><div class="dstage"><span class="stage-bulbs bulbs" aria-hidden="true"></span><span class="curtain l" aria-hidden="true"></span><span class="curtain r" aria-hidden="true"></span><div class="stage-floor" style="background-image:url('` + g.t + `')" aria-hidden="true"></div><div class="stage-card"><img src="` + g.t + '" alt="" width="120" height="120"><b>No demo for this game</b><span>' + esc(g.p) + " does not offer a demo of " + esc(g.n) + ' here. Log in to play for real, or open a game that shows Try demo.</span></div><span class="footlights bulbs" aria-hidden="true"></span></div></section>';
    return crumbs([["Lobby", "#/"], [esc(g.n), "#/game/" + id], ["Demo"]]) + '<section class="demo" aria-labelledby="pgTitle"><div class="demo-bar"><h1 id="pgTitle" tabindex="-1"><small>Demo &middot; play money</small>' + esc(g.n) + '</h1><a class="pill pill-ghost" href="#/game/' + id + '">&larr; Back to game</a><a class="pill pill-gold" href="#/game/' + id + `/play">Play for real</a></div><div class="dstage"><span class="stage-bulbs bulbs" aria-hidden="true"></span><span class="curtain l" aria-hidden="true"></span><span class="curtain r" aria-hidden="true"></span><div class="stage-floor" style="background-image:url('` + g.t + `')" aria-hidden="true"></div><div class="stage-card"><img src="` + g.t + '" alt="" width="120" height="120"><b>The demo loads here</b><span>On the live site ' + esc(g.p) + "&rsquo;s demo of " + esc(g.n) + ' plays on this stage with play money. This preview loads no game and calls no studio.</span></div><span class="footlights bulbs" aria-hidden="true"></span></div><p class="demo-foot">Demo play uses play money only and has no cash value. 18+. <a href="#/responsible">Play responsibly</a>.</p></section>';
  }
  function promosPage() {
    return sign("Popcorn presents", "Tonight&rsquo;s offers", "Every offer prints its rules in full. Every bonus is a choice.", { host: "point-right" }) + '<p class="pg-lead">Every ticket prints the minimum deposit, the wagering and the time limit in one line; the full rules are one tap away. Figures are in euro: pound accounts get the same figures in &pound;.</p><div class="promo-list">' + OFFER_ORDER.map(function(k) {
      var o = OFFERS[k];
      return '<article class="promo" style="--oc:' + o.color + ";--obg:" + o.bg + '"><div class="promo-art">' + icon(o.icon) + '</div><div class="promo-body"><span class="okind">' + o.kind + '</span><h2><a href="#/promotions/' + k + '">' + o.title + '</a></h2><p class="oval">' + o.value + '</p><p class="oterms">' + o.line + '</p></div><div class="promo-ctas"><a class="pill pill-gold" href="' + o.cta[1] + '">' + o.cta[0] + '</a><a class="pill pill-ghost" href="#/promotions/' + k + '">Full rules</a></div></article>';
    }).join("") + '</div><p class="offers-foot">Prefer to play without a bonus? You can, every time. <a href="#/responsible/limits">Set your limits</a> &middot; <a href="#/help/bonuses">How bonuses work</a></p>';
  }
  function offerPage(k) {
    var o = OFFERS[k];
    return crumbs([["Lobby", "#/"], ["Promotions", "#/promotions"], [o.title]]) + sign(o.kind, o.title, o.value, { back: "#/promotions", backLabel: "All promotions" }) + '<div class="ofr" style="--oc:' + o.color + ";--obg:" + o.bg + '"><aside class="offer-ticket"><div class="ohead">' + icon(o.icon) + '<span class="okind">' + o.kind + '</span></div><p class="oval">' + o.value + '</p><dl class="okeys">' + o.keys.map(function(r) {
      return "<div><dt>" + r[0] + "</dt><dd>" + r[1] + "</dd></div>";
    }).join("") + '</dl><a class="pill pill-gold" href="' + o.cta[1] + '">' + o.cta[0] + "</a>" + (o.soon ? "" : '<p class="o-choice">Or <a href="#/join">join with no bonus</a>: no wagering at all.</p>') + '</aside><section class="offer-rules" aria-labelledby="rulesTitle"><h2 id="rulesTitle">' + (o.soon ? "What we know so far" : "Full rules") + "</h2><ol>" + o.rules.map(function(r) {
      return "<li>" + r + "</li>";
    }).join("") + '</ol><p class="rules-note">General bonus terms in the <a href="#/terms">Terms &amp; conditions</a> also apply. ' + OP("the final figures and the licence-specific wording.") + '</p><div class="safe-box">' + icon("spotlight") + '<p><b>Play for the show, not the money.</b> Set a deposit limit before you claim. <a href="#/responsible">Responsible play</a></p></div></section></div><section class="pg-more" aria-labelledby="otherTitle"><h2 id="otherTitle">Other offers tonight</h2><div class="pg-chips">' + OFFER_ORDER.filter(function(x) {
      return x !== k;
    }).map(function(x) {
      return '<a class="pg-chip" href="#/promotions/' + x + '">' + icon(OFFERS[x].icon) + OFFERS[x].title + "</a>";
    }).join("") + "</div></section>";
  }
  function helpPage(sec) {
    return sign("Box office", "Help &amp; FAQ", "Answers first. A person when you need one.", { host: "welcome" }) + '<div class="help"><nav class="help-nav" aria-label="Help topics">' + HELP.map(function(h) {
      return '<a href="#/help/' + h[0] + '"' + (h[0] === sec ? ' aria-current="true"' : "") + ">" + h[1] + "</a>";
    }).join("") + '<a class="help-contact" href="#/contact">Contact us &rarr;</a></nav><div class="help-body">' + HELP.map(function(h) {
      return '<section class="help-sec" id="help-' + h[0] + '" aria-labelledby="hs-' + h[0] + '"><h2 id="hs-' + h[0] + '" tabindex="-1">' + h[1] + "</h2>" + h[2].map(function(qa, i) {
        return "<details" + (h[0] === sec && !i ? " open" : "") + "><summary>" + qa[0] + "</summary><div>" + qa[1] + "</div></details>";
      }).join("") + "</section>";
    }).join("") + "</div></div>";
  }
  function field(id, label, input2, hint) {
    return '<div class="f" data-f="' + id + '"><label for="' + id + '">' + label + "</label>" + input2 + (hint ? '<small class="f-hint" id="' + id + '-hint">' + hint + "</small>" : "") + '<p class="f-err" id="' + id + '-err" hidden></p></div>';
  }
  function input(id, type, ac, extra) {
    return '<input id="' + id + '" type="' + type + '" autocomplete="' + ac + '"' + (extra || "") + ">";
  }
  function pw(id, ac) {
    return '<span class="pw">' + input(id, "password", ac, ' minlength="8"') + '<button type="button" class="pw-eye" data-eye="' + id + '" aria-label="Show password" aria-pressed="false">Show</button></span>';
  }
  function contactPage() {
    return sign("Stage door", "Contact us", "Real people, every night of the week.", { back: "#/help", backLabel: "Help &amp; FAQ" }) + '<div class="contact"><div class="channels"><article class="chan">' + icon("spotlight") + '<h2>Live chat</h2><p>Fastest. Open the chat from any page once the live site is up.</p><p class="chan-meta">Hours: ' + OP() + '</p></article><article class="chan">' + icon("ticket") + '<h2>Email</h2><p>For documents and anything that needs a paper trail. We answer within 24 hours.</p><p class="chan-meta">Address: ' + OP() + '</p></article><article class="chan">' + icon("star") + '<h2>Complaints</h2><p>Not happy with an answer? Our complaints process and the independent dispute service are in the terms.</p><p class="chan-meta"><a href="#/terms/complaints">How complaints work</a></p></article></div>' + formCard("contact", "Send us a message", '<form class="pf" id="fContact" novalidate onsubmit="return false"><div class="pf-sum" role="alert" hidden></div>' + field("cTopic", "Topic", '<select id="cTopic"><option value="">Choose a topic</option><option>My account</option><option>Payments</option><option>Bonuses</option><option>A game</option><option>Something else</option></select>') + field("cEmail", "Your email", input("cEmail", "email", "email", ' inputmode="email" spellcheck="false"')) + field("cMsg", "Message", '<textarea id="cMsg" rows="5" maxlength="1000"></textarea>', "At least 10 characters.") + '<button class="pill pill-gold pf-go" type="submit">Send message</button><p class="pf-note">' + previewNote() + "</p></form>") + "</div>";
  }
  function aboutPage() {
    return sign("Popcorn presents", "About Popcorn", "Saturday night in Vegas, any night.", { host: "host-left" }) + '<div class="prose"><section><h2>The idea</h2><p>Popcorn Casino is a casino built like a night at the theatre: a marquee, a showman, a red curtain and a front row of games from the studios players already love. The show is the fun. The rules are printed on the ticket.</p></section><section><h2>What we promise</h2><ul class="promise"><li>' + icon("ticket") + "<b>Terms on the ticket</b><span>Deposit, wagering and time limit next to every offer, full rules one tap away.</span></li><li>" + icon("spotlight") + "<b>You set the limits</b><span>Deposit limits, reminders and breaks, from the first day.</span></li><li>" + icon("star") + '<b>Bonus is a choice</b><span>"No bonus for me" is always one tap away. No pre-ticked boxes.</span></li><li>' + icon("kernel") + '<b>Light and quick</b><span>A lobby built to load fast on a phone.</span></li></ul></section><section><h2>Who runs Popcorn</h2><dl class="legal-dl"><div><dt>Operator</dt><dd>' + OP("company name and address.") + "</dd></div><div><dt>Company number</dt><dd>" + OP() + "</dd></div><div><dt>Licence</dt><dd>" + OP("licence holder, regulator and licence number. None is shown in this preview.") + '</dd></div></dl></section><section><h2>The games</h2><p>Every game comes from a licensed studio. Browse all of them on <a href="#/providers">Providers</a>.</p></section></div>';
  }
  function respPage(sec) {
    return sign("Play safe", "Responsible play", "The show is the fun. Never the money.", { host: "welcome" }) + '<div class="prose resp"><section class="resp-intro"><p>Gambling should be a night out, not a way to make money. Decide your budget before you play, play only what you can afford to lose, and stop when it stops being fun.</p><p class="age"><span>18+</span> Popcorn is for adults only. Every player&rsquo;s age is checked. ' + OP("when and how, as the licence requires.") + '</p></section><div class="tools">' + RESP.map(function(r) {
      return '<section class="tool" id="resp-' + r[0] + '" aria-labelledby="rt-' + r[0] + '"><h2 id="rt-' + r[0] + '" tabindex="-1">' + r[1] + "</h2><p>" + r[2] + '</p><a class="pill pill-ghost" href="#/login">' + r[3] + "</a><small>Log in first: tools live in your account.</small></section>";
    }).join("") + '</div><section id="resp-help" aria-labelledby="rt-help"><h2 id="rt-help" tabindex="-1">Signs it may be time for a break</h2><ul class="ticks"><li>You play longer or spend more than you planned.</li><li>You chase losses to win them back.</li><li>You borrow money or skip bills to play.</li><li>Gambling makes you anxious, or you hide it from people close to you.</li></ul><p>Free, confidential help: ' + OP("the national helplines and support organisations for each licence country.") + "</p></section></div>";
  }
  var TERMS = [
    ["intro", "About these terms", "Who you agree with and when these terms apply."],
    ["account", "Your account", "Who can join, one account per person, keeping your log-in safe."],
    ["payments", "Deposits and withdrawals", "Methods, limits, checks before a withdrawal."],
    ["bonuses", "Bonuses", "General rules for every offer; each offer page adds its own."],
    ["games", "Games and bets", "Game rules, malfunctions, voided bets."],
    ["safe", "Responsible play", "Limits, breaks and self-exclusion, and how we enforce them."],
    ["closing", "Closing an account", "How you or we can close an account, and what happens to the balance."],
    ["complaints", "Complaints", "How to complain and the independent dispute service."],
    ["law", "Law and changes", "Governing law and how we tell you about changes."]
  ];
  var PRIV = [
    ["who", "Who looks after your data", "The data controller and how to reach the privacy team."],
    ["what", "What we collect", "Account details, payments, play history, device data."],
    ["why", "Why we use it", "Running your account, the law (age and identity checks, anti-money-laundering), safer gambling, and marketing only if you say yes."],
    ["share", "Who we share it with", "Payment providers, identity checks, the regulator, game studios (play data only)."],
    ["keep", "How long we keep it", "Retention periods set by the licence."],
    ["rights", "Your rights", "Access, correction, deletion, objection, complaint to the data protection authority."],
    ["cookies", "Cookies", null]
  ];
  function legalPage(kind, sec) {
    var L = kind === "terms" ? TERMS : PRIV, base = "#/" + kind;
    var title2 = kind === "terms" ? "Terms &amp; conditions" : "Privacy &amp; cookies";
    return sign("The small print, printed big", title2, "Draft structure. " + (kind === "terms" ? "The operator supplies the binding text." : "The operator supplies the final notice."), { host: "point-right", back: "#/help", backLabel: "Help &amp; FAQ" }) + '<div class="legal-doc"><nav class="toc" aria-label="Sections"><h2>Sections</h2><ol>' + L.map(function(s) {
      return '<li><a href="' + base + "/" + s[0] + '"' + (s[0] === sec ? ' aria-current="true"' : "") + ">" + s[1] + "</a></li>";
    }).join("") + '</ol></nav><div class="legal-body"><p class="draft">' + OP("the full legal text. This page shows the structure and a plain summary of each section; it is not a binding document and no licence number is shown.") + "</p>" + L.map(function(s, i) {
      var body = s[2] ? "<p>" + s[2] + '</p><div class="op-block">' + OP("the binding wording for this section.") + "</div>" : '<p>This preview sets <b>no cookies</b> and keeps <b>nothing</b> in your browser&rsquo;s storage: not your favourites, not anything you type.</p><p>The live site will use cookies only for: keeping you logged in (needed), remembering your settings (needed), and measuring visits (only if you say yes).</p><div class="op-block">' + OP("the cookie list, providers and retention.") + "</div>";
      return '<section id="lg-' + s[0] + '" aria-labelledby="lh-' + s[0] + '"><h2 id="lh-' + s[0] + '" tabindex="-1"><span>' + (i + 1) + ".</span> " + s[1] + "</h2>" + body + "</section>";
    }).join("") + '<p class="legal-upd">Last updated: ' + OP() + "</p></div></div>";
  }
  function notFound(h) {
    return '<section class="nf" aria-labelledby="pgTitle"><img class="nf-host" src="assets/showman/point-right.webp" alt="" loading="lazy"><div class="st-sign nf-sign"><span class="bill-bulbs" aria-hidden="true"></span><h1 id="pgTitle" tabindex="-1"><small>Error 404</small>Wrong door</h1><span class="st-sub">There is no seat at <code>' + esc(h || "#") + '</code>. The show is this way.</span></div><div class="nf-ctas"><a class="pill pill-gold" href="#/">Back to the lobby</a><a class="pill pill-ghost" href="#/games">All games</a><a class="pill pill-ghost" href="#/help">Help &amp; FAQ</a></div></section>';
  }
  function previewNote() {
    return "<b>Preview:</b> nothing you type is sent or saved. No account is created and nobody is logged in.";
  }
  function formCard(kind, title2, inner) {
    return '<div class="ticket-card ' + kind + '"><span class="tc-bulbs bulbs" aria-hidden="true"></span><h2 class="tc-title">' + title2 + "</h2>" + inner + "</div>";
  }
  function boxOffice(tab, inner, side) {
    return '<div class="box"><aside class="box-side"><img class="box-host" src="assets/showman/' + (side || "welcome") + '.webp" alt="" loading="lazy"><div class="st-sign box-sign"><span class="bill-bulbs" aria-hidden="true"></span><h1 id="pgTitle" tabindex="-1"><small>Box office</small>' + (tab === "join" ? "Your seat is waiting" : tab === "login" ? "Welcome back" : "Lost your ticket?") + '</h1></div><ul class="box-perks"><li>' + icon("ticket") + '<span><b>Welcome package</b> <span id="jPerkVal">' + welcomeValue("EUR") + "</span>, or no bonus at all: your choice.</span></li><li>" + icon("spotlight") + "<span><b>Limits from day one.</b> Set them in your account.</span></li><li>" + icon("kernel") + '<span><b>Two minutes.</b> Three short steps.</span></li></ul></aside><div class="box-main"><div class="box-tabs" role="navigation" aria-label="Join or log in"><a href="#/join"' + (tab === "join" ? ' aria-current="page"' : "") + '>Join</a><a href="#/login"' + (tab !== "join" ? ' aria-current="page"' : "") + '>Log in</a><a class="box-x" href="#/" data-back aria-label="Close and go back">&times;</a></div>' + inner + "</div></div>";
  }
  var STEPS = ["Your account", "About you", "Verify mobile"];
  function stepper(n, list) {
    return '<ol class="steps" aria-label="Steps">' + (list || STEPS).map(function(s, i) {
      return '<li class="' + (i < n ? "done" : i === n ? "on" : "") + '"' + (i === n ? ' aria-current="step"' : "") + "><i>" + (i < n ? "&#10003;" : i + 1) + "</i><span>" + s + "</span></li>";
    }).join("") + "</ol>";
  }
  var COUNTRIES = [
    ["GB", "United Kingdom"],
    ["IE", "Ireland"],
    ["DE", "Germany"],
    ["AT", "Austria"],
    ["FI", "Finland"],
    ["NL", "Netherlands"],
    ["NO", "Norway"],
    ["SE", "Sweden"],
    ["ES", "Spain"],
    ["PT", "Portugal"],
    ["FR", "France"],
    ["IT", "Italy"],
    ["CA", "Canada"],
    ["NZ", "New Zealand"]
  ];
  var PW_MIN = 8;
  var RESERVED = { email: "taken@example.com", phone: "7700900000", users: ["admin", "popcorn", "support", "root", "moderator"], code: "000000" };
  var srv = {}, verifiedPhone = null;
  function joinPage() {
    var cc = CC.map(function(c) {
      return '<option value="' + c[1] + '" data-iso="' + c[0] + '">' + c[0] + " " + c[1] + "</option>";
    }).join("");
    var co = COUNTRIES.map(function(c) {
      return '<option value="' + c[0] + '">' + c[1] + "</option>";
    }).join("");
    return boxOffice(
      "join",
      '<form class="pf join" id="fJoin" novalidate onsubmit="return false"><div class="jstep" data-step="0"><h2 class="step-h" id="jStep0" tabindex="-1"><small>Step 1 of 3</small>Your account</h2>' + stepper(0) + '<div class="pf-sum" role="alert" hidden></div>' + field("jEmail", "Email", input("jEmail", "email", "email", ' inputmode="email" spellcheck="false" autocapitalize="none"')) + field("jPw", "Password", pw("jPw", "new-password"), "At least " + PW_MIN + " characters.") + '<div class="f-row">' + field("jCountry", "Country", '<select id="jCountry">' + co + "</select>") + field("jCur", "Account currency", '<select id="jCur"><option value="GBP">GBP &pound;</option><option value="EUR">EUR &euro;</option></select>', "Cannot be changed later.") + '</div><button class="pill pill-gold pf-go" type="submit" data-next>Continue</button></div><div class="jstep" data-step="1" hidden><h2 class="step-h" id="jStep1" tabindex="-1"><small>Step 2 of 3</small>About you</h2>' + stepper(1) + '<div class="pf-sum" role="alert" hidden></div><div class="f-row">' + field("jFirst", "First name", input("jFirst", "text", "given-name", ' autocapitalize="words"')) + field("jLast", "Last name", input("jLast", "text", "family-name", ' autocapitalize="words"')) + "</div>" + field("jPhone", "Mobile number", '<span class="tel"><select id="jCC" aria-label="Country calling code">' + cc + "</select>" + input("jPhone", "tel", "tel-national", ' inputmode="tel"') + "</span>", "We text you a code to confirm it is yours.") + field("jUser", "Username <em>optional</em>", input("jUser", "text", "username", ' spellcheck="false" autocapitalize="none" maxlength="20"'), "Left empty, we pick a neutral one for you.") + '<fieldset class="f offer-pick" data-f="jOffer"><legend>Your welcome offer <span class="leg-sub" id="jOfferCur"></span></legend><label class="radio"><input type="radio" name="jOfferPick" value="welcome" id="jOfferW"><span><b>Welcome package</b> <span id="jOfferVal"></span><small class="radio-terms" id="jOfferTerms"></small> <a href="#/promotions/welcome" target="_blank" rel="noopener">Full rules</a></span></label><label class="radio"><input type="radio" name="jOfferPick" value="none" id="jOfferN"><span><b>No bonus for me</b> My deposits have no wagering. I can still choose an offer later in the cashier.</span></label><p class="f-err" id="jOffer-err" hidden></p></fieldset><div class="f tick" data-f="jAge"><label class="check"><input type="checkbox" id="jAge"><span>I am <b>18 or older</b>.</span></label><p class="f-err" id="jAge-err" hidden></p></div><div class="f tick" data-f="jTerms"><label class="check"><input type="checkbox" id="jTerms"><span>I accept the <a href="#/terms" target="_blank" rel="noopener">Terms &amp; conditions</a> and have read the <a href="#/privacy" target="_blank" rel="noopener">Privacy notice</a>.</span></label><p class="f-err" id="jTerms-err" hidden></p></div><div class="f tick"><label class="check"><input type="checkbox" id="jNews"><span>Send me offers by email and text. <em>Optional, off unless you tick it.</em></span></label></div><div class="pf-row"><button class="pill pill-ghost" type="button" data-prev>Back</button><button class="pill pill-gold pf-go" type="submit" data-next>Text me a code</button></div></div><div class="jstep" data-step="2" hidden><h2 class="step-h" id="jStep2" tabindex="-1"><small>Step 3 of 3</small>Verify your mobile</h2>' + stepper(2) + '<div class="pf-sum" role="alert" hidden></div><p class="pf-lead">We would text a 6-digit code to <b id="jMasked"></b>.</p><p class="pf-flag">Preview: no text message is sent. Type any 6 digits (000000 shows the wrong-code message).</p>' + field("jCode", "6-digit code", input("jCode", "text", "one-time-code", ' inputmode="numeric" maxlength="6" class="code"')) + '<div class="pf-row"><button class="pill pill-ghost" type="button" data-prev>Change number</button><button class="pill pill-gold pf-go" type="submit" data-next>Verify and join</button></div><button class="link-btn" type="button" data-resend>Resend code</button><p class="pf-msg" id="jResend" role="status"></p></div><p class="pf-note">' + previewNote() + '</p></form><div class="done" id="joinDone" hidden><img src="assets/showman/welcome.webp" alt="" loading="lazy"><h2 tabindex="-1" id="joinDoneH"><small>Curtain up</small>Welcome to the show</h2><p>That is the whole sign-up: account, details and a mobile code. On the live site your account would be open now.</p><p class="pf-flag">This is a design preview: no account was created, nothing you typed was sent or kept, and you are not logged in.</p><div class="pf-row"><a class="pill pill-gold" href="#/">Back to the lobby</a><a class="pill pill-ghost" href="#/promotions">Tonight&rsquo;s offers</a></div></div>'
    );
  }
  function priceOffer() {
    var c = ($("jCur") || {}).value || "EUR";
    if ($("jOfferVal")) {
      $("jOfferVal").innerHTML = welcomeValue(c) + ".";
      $("jOfferTerms").innerHTML = welcomeLine(c).replace(/^18\+\. /, "");
      $("jOfferCur").textContent = "priced in " + c;
    }
    if ($("jPerkVal"))
      $("jPerkVal").innerHTML = welcomeValue(c);
  }
  function joinCountry() {
    var iso = $("jCountry").value;
    $("jCur").value = iso === "GB" ? "GBP" : "EUR";
    var o = document.querySelector('#jCC option[data-iso="' + iso + '"]');
    if (o)
      $("jCC").value = o.value;
    priceOffer();
  }
  function loginPage(gate) {
    return boxOffice(
      "login",
      '<form class="pf" id="fLogin" novalidate onsubmit="return false"><h2 class="step-h" tabindex="-1"><small>Members</small>Log in</h2>' + (gate ? '<p class="pf-flag gate" id="playGate">Real-money play needs an account. Log in to play <b>' + esc(G[gate].n) + '</b>, or <a href="#/join">join in three short steps</a>.</p>' : "") + '<div class="pf-sum" role="alert" hidden></div>' + field("lUser", "Email or username", input("lUser", "text", "username", ' spellcheck="false" autocapitalize="none"')) + field("lPw", "Password", pw("lPw", "current-password")) + '<div class="pf-row spread"><a class="link-a" href="#/reset">Forgot password?</a><button class="pill pill-gold pf-go" type="submit">Log in</button></div><p class="pf-alt">New here? <a href="#/join">Join in three short steps</a></p><p class="pf-note">' + previewNote() + '</p></form><div class="done" id="loginDone" hidden><img src="assets/showman/host-right.webp" alt="" loading="lazy"><h2 tabindex="-1"><small>Preview</small>Log-in checked</h2><p>Both fields were filled in correctly. On the live site you would be in your account now.</p><p class="pf-flag">This preview has no accounts: nothing was sent and you are still logged out.</p><div class="pf-row"><a class="pill pill-gold" href="#/">Back to the lobby</a><a class="pill pill-ghost" href="#/join">Join instead</a></div></div>',
      "host-right"
    );
  }
  function resetPage(step) {
    if (step === "new")
      return boxOffice(
        "reset",
        '<form class="pf" id="fNewPw" novalidate onsubmit="return false"><h2 class="step-h" tabindex="-1"><small>From the emailed link</small>Choose a new password</h2><div class="pf-sum" role="alert" hidden></div>' + field("nPw", "New password", pw("nPw", "new-password"), "At least " + PW_MIN + " characters.") + field("nPw2", "Repeat new password", pw("nPw2", "new-password")) + '<button class="pill pill-gold pf-go" type="submit">Set new password</button><p class="pf-alt"><a href="#/login">Back to log in</a></p><p class="pf-note">' + previewNote() + '</p></form><div class="done" id="newPwDone" hidden><img src="assets/showman/welcome.webp" alt="" loading="lazy"><h2 tabindex="-1"><small>Preview</small>Password set</h2><p>On the live site your new password would work now.</p><p class="pf-flag">Nothing was sent or saved.</p><div class="pf-row"><a class="pill pill-gold" href="#/login">Log in</a></div></div>',
        "host-right"
      );
    return boxOffice(
      "reset",
      '<form class="pf" id="fReset" novalidate onsubmit="return false"><h2 class="step-h" tabindex="-1"><small>Members</small>Reset your password</h2><div class="pf-sum" role="alert" hidden></div><p class="pf-lead">Type the email on your account and we will send you a link to choose a new password.</p>' + field("rEmail", "Email", input("rEmail", "email", "email", ' inputmode="email" spellcheck="false" autocapitalize="none"')) + '<button class="pill pill-gold pf-go" type="submit">Send reset link</button><p class="pf-alt"><a href="#/login">Back to log in</a></p><p class="pf-note">' + previewNote() + '</p></form><div class="done" id="resetDone" hidden><img src="assets/showman/point-right.webp" alt="" loading="lazy"><h2 tabindex="-1"><small>Check your inbox</small>Link on its way</h2><p>If an account uses that email, a reset link would arrive in a minute. It works once and only for a short time.</p><p class="pf-flag">Preview: no email was sent.</p><div class="pf-row"><a class="pill pill-gold" href="#/login">Back to log in</a><a class="pill pill-ghost" href="#/reset/new">See the next step</a></div></div>',
      "point-right"
    );
  }
  var METHODS = [
    ["card", "Card", "Visa, Mastercard", 10, 5e3, "Instant"],
    ["apple", "Apple Pay", "From your iPhone or Mac", 10, 2e3, "Instant"],
    ["google", "Google Pay", "From your Android phone", 10, 2e3, "Instant"],
    ["bank", "Bank transfer", "Pay from your bank app", 20, 1e4, "Instant to 1 hour"],
    ["wallet", "E-wallet", "Your e-wallet account", 10, 5e3, "Instant"]
  ];
  var CHIPS_EUR = [10, 20, 50, 100, 200];
  var DSTEPS = ["Amount &amp; method", "Your offer", "Confirm"];
  function money(v) {
    var n = +v;
    return "&euro;" + (n % 1 ? n.toFixed(2) : n.toLocaleString("en-GB"));
  }
  function method(k) {
    for (var i = 0; i < METHODS.length; i++)
      if (METHODS[i][0] === k)
        return METHODS[i];
    return null;
  }
  function depAmount() {
    var v = val("dAmt").replace(",", ".");
    return /^\d+(\.\d{1,2})?$/.test(v) ? +v : NaN;
  }
  function depPick(n) {
    var x = document.querySelector('input[name="' + n + '"]:checked');
    return x ? x.value : "";
  }
  function depositPage() {
    return crumbs([["Lobby", "#/"], ["Cashier"]]) + sign("Box office", "Cashier", "Deposit in three short steps. The bonus is always your choice.", { host: "host-right" }) + '<p class="pf-flag cash-flag" id="cashFlag"><b>Preview of the logged-in cashier.</b> You are not logged in: there is no real balance, no payment window opens, and nothing is charged or sent.</p><div class="cash"><div class="ticket-card cashier"><span class="tc-bulbs bulbs" aria-hidden="true"></span><div class="cash-tabs" aria-label="Cashier sections"><span class="on" aria-current="true">Deposit</span><span aria-disabled="true" title="Not part of this preview">Withdraw</span><span aria-disabled="true" title="Not part of this preview">History</span></div><form class="pf dep" id="fDep" novalidate onsubmit="return false"><div class="jstep" data-step="0"><h2 class="step-h" tabindex="-1"><small>Step 1 of 3</small>Amount and method</h2>' + stepper(0, DSTEPS) + '<div class="pf-sum" role="alert" hidden></div><fieldset class="f amt" data-f="dAmt"><legend>Amount <span class="leg-sub">EUR account</span></legend><div class="chips-amt">' + CHIPS_EUR.map(function(a) {
      return '<button type="button" class="chip-amt" data-amt="' + a + '" aria-pressed="false">&euro;' + a + "</button>";
    }).join("") + '</div><label for="dAmt" class="amt-l">Or type an amount</label><span class="amt-in"><b aria-hidden="true">&euro;</b><input id="dAmt" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" maxlength="8"></span><small class="f-hint" id="dAmt-hint">From &euro;10. The most per deposit depends on the method.</small><p class="f-err" id="dAmt-err" hidden></p></fieldset><fieldset class="f methods" data-f="dMethod"><legend>Payment method</legend><div class="mtiles">' + METHODS.map(function(m) {
      return '<label class="mtile"><input type="radio" name="dMethodPick" value="' + m[0] + '"><span><b>' + m[1] + "</b><span>" + m[2] + "</span><small>" + money(m[3]) + " to " + money(m[4]) + " &middot; " + m[5] + "</small></span></label>";
    }).join("") + '</div><p class="f-err" id="dMethod-err" hidden></p></fieldset><button class="pill pill-gold pf-go" type="submit" data-next>Continue</button></div><div class="jstep" data-step="1" hidden><h2 class="step-h" tabindex="-1"><small>Step 2 of 3</small>Your offer</h2>' + stepper(1, DSTEPS) + '<div class="pf-sum" role="alert" hidden></div><fieldset class="f offer-pick" data-f="dOffer"><legend>Add an offer to this deposit?</legend><label class="radio"><input type="radio" name="dOfferPick" value="none" id="dOfferN" checked><span><b>No bonus</b> Play with your own money. No wagering, withdraw any time.</span></label><label class="radio"><input type="radio" name="dOfferPick" value="welcome" id="dOfferW"><span><b>Welcome package</b> ' + welcomeValue("EUR") + '.<small class="radio-terms">' + welcomeLine("EUR").replace(/^18\+\. /, "") + '</small></span></label><label class="radio"><input type="radio" name="dOfferPick" value="premiere" id="dOfferP"><span><b>Premiere spins</b> ' + OFFERS.premiere.value + '.<small class="radio-terms" id="dPremTerms"></small></span></label><p class="f-err" id="dOffer-err" hidden></p></fieldset><div class="calc" id="dCalc" aria-live="polite"></div><div class="pf-row"><button class="pill pill-ghost" type="button" data-prev>Back</button><button class="pill pill-gold pf-go" type="submit" data-next>Review deposit</button></div></div><div class="jstep" data-step="2" hidden><h2 class="step-h" tabindex="-1"><small>Step 3 of 3</small>Confirm your deposit</h2>' + stepper(2, DSTEPS) + '<div class="pf-sum" role="alert" hidden></div><dl class="dsum" id="dSum"></dl><p class="pf-lead">On the live site your payment provider&rsquo;s secure window opens next for your card or wallet details. Popcorn never sees them.</p><div class="pf-row"><button class="pill pill-ghost" type="button" data-prev>Change</button><button class="pill pill-gold pf-go" type="submit" data-next id="dGo">Confirm deposit</button></div></div><p class="pf-note"><b>Preview:</b> nothing you choose or type is sent or saved, and no money moves.</p></form><div class="done" id="depDone" hidden><img src="assets/showman/point-right.webp" alt="" loading="lazy"><h2 tabindex="-1"><small>Preview only</small>Nothing was charged</h2><p>That is the whole deposit: amount, method, offer and a confirm step. On the live site the payment window would open now.</p><p class="pf-flag">This is a design preview: no payment window opened, no request was sent, no money moved and nothing was saved.</p><div class="pf-row"><a class="pill pill-gold" href="#/">Back to the lobby</a><a class="pill pill-ghost" href="#/deposit">Start again</a></div></div></div><aside class="cash-side" aria-label="Your wallet"><section class="wcard"><h2>Your wallet <small>preview</small></h2><dl><div><dt>Cash</dt><dd>&euro;0.00</dd></div><div><dt>Bonus money</dt><dd>&euro;0.00</dd></div><div><dt>Free spins</dt><dd>0</dd></div></dl><p>Cash and bonus money are always shown apart, in your account currency.</p></section><section class="wcard">' + icon("spotlight") + '<h2>Deposit limit</h2><p>Not set. Choose a daily, weekly or monthly limit before you play.</p><a class="pill pill-ghost" href="#/responsible/limits">Set a limit</a></section><section class="wcard">' + icon("ticket") + '<h2>Before your first withdrawal</h2><p>We check your ID and address once. Withdrawals are reviewed within 24 hours.</p><a class="more" href="#/help/payments">Wallet &amp; payments help</a></section></aside></div>';
  }
  function depOffers() {
    var a = depAmount(), p = $("dOfferP"), ok = a >= S.pMin;
    p.disabled = !ok;
    if (!ok && p.checked)
      $("dOfferN").checked = true;
    p.closest(".radio").classList.toggle("off", !ok);
    $("dPremTerms").innerHTML = (ok ? "" : '<b class="needs">Needs a deposit of &euro;' + S.pMin + " or more.</b> ") + OFFERS.premiere.line;
    depCalc();
  }
  function depCalc() {
    var a = depAmount(), o = depPick("dOfferPick"), b = Math.min(a * S.wMatch / 100, S.wMax), t;
    if (o === "welcome")
      t = "You play with <b>" + money(a + b) + "</b>: your " + money(a) + " + " + money(b) + " bonus, plus " + S.wSpins + " free spins. The bonus needs " + money(b * S.wWag) + " of bets before it can be withdrawn." + (a < S.wMax ? " Deposit " + money(S.wMax) + " for the full bonus." : "");
    else if (o === "premiere")
      t = "You play with <b>" + money(a) + "</b> and get " + S.pSpins + " free spins at &euro;" + S.pVal + ". Spin winnings need " + S.pWag + "x wagering.";
    else
      t = "You play with <b>" + money(a) + "</b> of your own money. No wagering.";
    $("dCalc").innerHTML = t;
  }
  function depSummary() {
    var a = depAmount(), m = method(depPick("dMethodPick")), o = depPick("dOfferPick");
    var rows = [
      ["Amount", money(a)],
      ["Method", m[1] + " (" + m[5].toLowerCase() + ")"],
      ["Offer", o === "welcome" ? "Welcome package" : o === "premiere" ? "Premiere spins" : "No bonus"],
      ["Wagering", o === "welcome" ? money(Math.min(a * S.wMatch / 100, S.wMax) * S.wWag) + " of bets on the bonus" : o === "premiere" ? S.pWag + "x the spin winnings" : "None"],
      ["You play with", $("dCalc").querySelector("b").textContent + (o === "welcome" ? " + " + S.wSpins + " free spins" : o === "premiere" ? " + " + S.pSpins + " free spins" : "")]
    ];
    $("dSum").innerHTML = rows.map(function(r) {
      return "<div><dt>" + r[0] + "</dt><dd>" + r[1] + "</dd></div>";
    }).join("");
    $("dGo").innerHTML = "Confirm " + money(a) + " deposit";
  }
  function wireDeposit() {
    var f = $("fDep");
    if (!f)
      return;
    f.addEventListener("click", function(e) {
      var c = e.target.closest("[data-amt]");
      if (c) {
        $("dAmt").value = c.getAttribute("data-amt");
        $("dAmt").dispatchEvent(new Event("input", { bubbles: true }));
      }
      if (e.target.closest("[data-prev]")) {
        var n = +f.querySelector(".jstep:not([hidden])").getAttribute("data-step");
        showStep(f, n - 1);
      }
    });
    f.addEventListener("input", function(e) {
      if (e.target.id === "dAmt")
        chipState();
    });
    f.addEventListener("change", function(e) {
      if (e.target.name === "dOfferPick")
        depCalc();
    });
    f.addEventListener("submit", function(e) {
      e.preventDefault();
      var step = f.querySelector(".jstep:not([hidden])"), n = +step.getAttribute("data-step");
      if (!check(step))
        return;
      if (n === 0) {
        showStep(f, 1);
        depOffers();
      } else if (n === 1) {
        depSummary();
        showStep(f, 2);
      } else {
        finish(f, "depDone");
      }
    });
    function chipState() {
      [].forEach.call(f.querySelectorAll("[data-amt]"), function(b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-amt") === val("dAmt")));
      });
    }
  }
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function val(id) {
    var e = $(id);
    return e ? e.value.trim() : "";
  }
  var RULES = {
    jEmail: function() {
      var v = val("jEmail");
      return !v ? "Type your email." : !EMAIL.test(v) ? "That email looks incomplete, like name@example.com." : srv.jEmail && srv.jEmail === v.toLowerCase() ? "This email is already registered. Log in, or reset your password." : "";
    },
    jPw: function() {
      var v = $("jPw").value;
      return !v ? "Choose a password." : v.length < PW_MIN ? "That password is too weak: use at least " + PW_MIN + " characters." : "";
    },
    jCountry: function() {
      return val("jCountry") ? "" : "Choose your country.";
    },
    jCur: function() {
      return /^(EUR|GBP)$/.test(val("jCur")) ? "" : "Choose EUR or GBP.";
    },
    jUser: function() {
      var v = val("jUser");
      return v && v.length < 3 ? "Username must be at least 3 characters." : v && !/^[a-z0-9_.]{3,20}$/i.test(v) ? "Use 3 to 20 letters, numbers, dots or underscores." : srv.jUser && srv.jUser === v.toLowerCase() ? "That username is reserved. Choose another, or leave it empty." : "";
    },
    jFirst: function() {
      return val("jFirst") ? "" : "Type your first name.";
    },
    jLast: function() {
      return val("jLast") ? "" : "Type your last name.";
    },
    jPhone: function() {
      var v = val("jPhone").replace(/[\s()-]/g, "");
      return !v ? "Type your mobile number." : !/^\d{6,14}$/.test(v) ? "Use digits only, 6 to 14 of them, without the country code." : srv.jPhone && srv.jPhone === v.replace(/^0/, "") ? "That number is already registered. Use another number, or log in." : "";
    },
    jOffer: function() {
      return document.querySelector('input[name="jOfferPick"]:checked') ? "" : "Choose an offer, or no bonus.";
    },
    jAge: function() {
      return $("jAge").checked ? "" : "You must be 18 or older to join.";
    },
    jTerms: function() {
      return $("jTerms").checked ? "" : "Please accept the terms to join.";
    },
    jCode: function() {
      var v = val("jCode");
      return !v ? "Type the 6-digit code." : !/^\d{6}$/.test(v) ? "The code is 6 digits." : srv.jCode && srv.jCode === v ? "That code isn’t correct. Check the text message and try again." : "";
    },
    lUser: function() {
      return val("lUser") ? "" : "Type your email or username.";
    },
    lPw: function() {
      return $("lPw").value ? "" : "Type your password.";
    },
    rEmail: function() {
      var v = val("rEmail");
      return !v ? "Type your email." : !EMAIL.test(v) ? "That email looks incomplete, like name@example.com." : "";
    },
    nPw: function() {
      var v = $("nPw").value;
      return !v ? "Choose a new password." : v.length < PW_MIN ? "That password is too weak: use at least " + PW_MIN + " characters." : "";
    },
    nPw2: function() {
      return !$("nPw2").value ? "Repeat the new password." : $("nPw2").value !== $("nPw").value ? "The two passwords do not match." : "";
    },
    cTopic: function() {
      return val("cTopic") ? "" : "Choose a topic.";
    },
    cEmail: function() {
      var v = val("cEmail");
      return !v ? "Type your email." : !EMAIL.test(v) ? "That email looks incomplete, like name@example.com." : "";
    },
    cMsg: function() {
      return val("cMsg").length >= 10 ? "" : "Write at least 10 characters.";
    },
    dAmt: function() {
      var raw = val("dAmt"), a = depAmount(), m = method(depPick("dMethodPick")), lo = m ? m[3] : 10, hi = m ? m[4] : 1e4;
      return !raw ? "Choose or type an amount." : isNaN(a) ? "Use a number, like 50 or 25.50." : a < lo ? "The minimum deposit" + (m ? " by " + m[1].toLowerCase() : "") + " is " + money(lo).replace("&euro;", "€") + "." : a > hi ? "The most you can deposit" + (m ? " by " + m[1].toLowerCase() : "") + " is " + money(hi).replace("&euro;", "€") + "." : "";
    },
    dMethod: function() {
      return depPick("dMethodPick") ? "" : "Choose a payment method.";
    },
    dOffer: function() {
      return depPick("dOfferPick") ? "" : "Choose an offer, or no bonus.";
    }
  };
  function check(scope) {
    var bad = [];
    [].forEach.call(scope.querySelectorAll("[data-f]"), function(f) {
      var id = f.getAttribute("data-f"), rule = RULES[id];
      if (!rule)
        return;
      var msg = rule(), err = $(id + "-err"), ctl = $(id) || f.querySelector("input");
      err.textContent = msg;
      err.hidden = !msg;
      f.classList.toggle("bad", !!msg);
      if (ctl) {
        ctl.setAttribute("aria-invalid", !!msg);
        var hint = $(id + "-hint");
        ctl.setAttribute("aria-describedby", (msg ? id + "-err" : "") + (hint ? (msg ? " " : "") + id + "-hint" : ""));
      }
      if (msg)
        bad.push([id, msg, ctl]);
    });
    var sum = scope.querySelector(".pf-sum");
    if (sum) {
      sum.hidden = !bad.length;
      sum.innerHTML = bad.length ? "<b>" + (bad.length === 1 ? "One thing to fix" : bad.length + " things to fix") + "</b><ul>" + bad.map(function(b) {
        return "<li>" + esc(b[1]) + "</li>";
      }).join("") + "</ul>" : "";
    }
    if (bad.length && bad[0][2])
      bad[0][2].focus();
    return !bad.length;
  }
  function wipe(form) {
    [].forEach.call(form.querySelectorAll("input,textarea,select"), function(e) {
      if (e.type === "checkbox" || e.type === "radio")
        e.checked = false;
      else if (e.tagName !== "SELECT")
        e.value = "";
    });
  }
  function finish(form, doneId) {
    wipe(form);
    form.hidden = true;
    var d = $(doneId);
    d.hidden = false;
    var h = d.querySelector("h2");
    if (h)
      h.focus();
    window.scrollTo({ top: Math.max(0, d.getBoundingClientRect().top + scrollY - 120), behavior: "auto" });
  }
  function showStep(form, n) {
    [].forEach.call(form.querySelectorAll(".jstep"), function(s) {
      s.hidden = +s.getAttribute("data-step") !== n;
    });
    var cur = form.querySelector('.jstep[data-step="' + n + '"]');
    cur.querySelector(".step-h").focus();
    if (n === 2 && $("jMasked")) {
      var p = val("jPhone").replace(/\D/g, "");
      $("jMasked").textContent = $("jCC").value + " •••• " + p.slice(-2);
    }
    var top = form.getBoundingClientRect().top + scrollY - 110;
    if (scrollY > top)
      window.scrollTo({ top, behavior: "auto" });
  }
  function register(j) {
    var em = val("jEmail").toLowerCase(), u = val("jUser").toLowerCase();
    if (em === RESERVED.email) {
      srv.jEmail = em;
      showStep(j, 0);
      check(j.querySelector('.jstep[data-step="0"]'));
      return;
    }
    if (u && RESERVED.users.indexOf(u) >= 0) {
      srv.jUser = u;
      showStep(j, 1);
      check(j.querySelector('.jstep[data-step="1"]'));
      return;
    }
    srv = {};
    verifiedPhone = null;
    finish(j, "joinDone");
  }
  function wireForms() {
    var j = $("fJoin");
    if (j) {
      srv = {};
      verifiedPhone = null;
      $("jCountry").addEventListener("change", joinCountry);
      $("jCur").addEventListener("change", priceOffer);
      joinCountry();
    }
    if (j)
      j.addEventListener("submit", function(e) {
        e.preventDefault();
        var step = j.querySelector(".jstep:not([hidden])"), n = +step.getAttribute("data-step");
        if (!check(step))
          return;
        var phone = val("jPhone").replace(/[\s()-]/g, "").replace(/^0/, "");
        if (n === 0)
          showStep(j, 1);
        else if (n === 1) {
          if (phone === RESERVED.phone) {
            srv.jPhone = phone;
            check(step);
            return;
          }
          if (verifiedPhone === $("jCC").value + phone)
            register(j);
          else
            showStep(j, 2);
        } else {
          if (val("jCode") === RESERVED.code) {
            srv.jCode = RESERVED.code;
            check(step);
            return;
          }
          verifiedPhone = $("jCC").value + phone;
          register(j);
        }
      });
    if (j)
      j.addEventListener("click", function(e) {
        if (e.target.closest("[data-prev]")) {
          var n = +j.querySelector(".jstep:not([hidden])").getAttribute("data-step");
          showStep(j, n - 1);
        }
        if (e.target.closest("[data-resend]")) {
          $("jResend").textContent = "Preview: nothing is sent. Type any 6 digits.";
        }
      });
    [["fLogin", "loginDone"], ["fReset", "resetDone"], ["fNewPw", "newPwDone"], ["fContact", "contactDone"]].forEach(function(x) {
      var f = $(x[0]);
      if (!f)
        return;
      if (x[0] === "fContact" && !$("contactDone"))
        f.insertAdjacentHTML("afterend", '<div class="done" id="contactDone" hidden><img src="assets/showman/host-right.webp" alt="" loading="lazy"><h2 tabindex="-1"><small>Preview</small>Message ready</h2><p>On the live site it would reach the support team now, and you would get a copy by email.</p><p class="pf-flag">Preview: nothing was sent.</p><div class="pf-row"><a class="pill pill-gold" href="#/help">Back to Help</a></div></div>');
      f.addEventListener("submit", function(e) {
        e.preventDefault();
        if (check(f))
          finish(f, x[1]);
      });
    });
  }
  page.addEventListener("click", function(e) {
    var b = e.target.closest("[data-eye]");
    if (!b)
      return;
    var i = $(b.getAttribute("data-eye")), show = i.type === "password";
    i.type = show ? "text" : "password";
    b.textContent = show ? "Hide" : "Show";
    b.setAttribute("aria-pressed", show);
    b.setAttribute("aria-label", show ? "Hide password" : "Show password");
  });
  page.addEventListener("input", function(e) {
    var f = e.target.closest("[data-f]");
    if (!f || !f.classList.contains("bad"))
      return;
    var id = f.getAttribute("data-f"), msg = RULES[id] && RULES[id]();
    if (msg === void 0)
      return;
    var err = $(id + "-err");
    err.textContent = msg;
    err.hidden = !msg;
    f.classList.toggle("bad", !!msg);
  });
  page.addEventListener("click", function(e) {
    var b = e.target.closest("[data-gfav]");
    if (!b)
      return;
    var id = b.getAttribute("data-gfav");
    P.favs[id] = !P.favs[id];
    if (!P.favs[id])
      delete P.favs[id];
    [].forEach.call(document.querySelectorAll('.gcard[data-id="' + id + '"] .fav, [data-gfav="' + id + '"]'), function(x) {
      x.classList.toggle("on", !!P.favs[id]);
      x.setAttribute("aria-pressed", !!P.favs[id]);
    });
    $("favCount").textContent = Object.keys(P.favs).length;
  });
  var CATS = {};
  P.CHIPS.forEach(function(c) {
    CATS[c[0]] = 1;
  });
  CATS.favs = 1;
  Object.keys(P.NAME).forEach(function(k) {
    CATS[k] = 1;
  });
  var HELPS = {};
  HELP.forEach(function(h) {
    HELPS[h[0]] = 1;
  });
  var RESPS = { help: 1 };
  RESP.forEach(function(r) {
    RESPS[r[0]] = 1;
  });
  var TERMSS = {};
  TERMS.forEach(function(t) {
    TERMSS[t[0]] = 1;
  });
  var PRIVS = {};
  PRIV.forEach(function(t) {
    PRIVS[t[0]] = 1;
  });
  function parse(hash) {
    var h = (hash || "").replace(/^#/, "");
    if (h === "" || h === "/")
      return { v: "lobby" };
    if (h.charAt(0) !== "/") {
      if (h === "studios")
        return { v: "providers", canon: "#/providers" };
      var el = document.getElementById(h);
      if (el && lobby.contains(el))
        return { v: "lobby", anchor: h };
      return { v: "404", raw: "#" + h };
    }
    var p = h.slice(1).replace(/\/$/, "").split("/"), a = p[0], b = p[1], c = p[2];
    try {
      b = b && decodeURIComponent(b);
    } catch (err) {
      return { v: "404", raw: "#" + h };
    }
    var nf = { v: "404", raw: "#" + h }, one = p.length === 1, two = p.length === 2;
    switch (a) {
      case "games":
        return one ? { v: "games", cat: "every" } : two && b === "all" ? { v: "lobby" } : two && CATS[b] ? { v: "games", cat: b } : nf;
      case "search":
        return one ? { v: "search" } : nf;
      case "providers":
        if (one)
          return { v: "providers" };
        var n = two && provName(b);
        return n ? { v: "provider", name: n } : nf;
      case "game":
        return G[b] ? two ? { v: "game", id: b } : p.length === 3 && c === "demo" ? { v: "demo", id: b } : p.length === 3 && c === "play" ? { v: "play", id: b } : nf : nf;
      case "deposit":
        return one ? { v: "deposit" } : nf;
      case "join":
      case "login":
      case "contact":
      case "about":
        return one ? { v: a } : nf;
      case "reset":
        return one ? { v: "reset" } : two && b === "new" ? { v: "reset", step: "new" } : nf;
      case "promotions":
        return one ? { v: "promotions" } : two && OFFERS[b] ? { v: "offer", k: b } : nf;
      case "help":
        return one ? { v: "help" } : two && HELPS[b] ? { v: "help", sec: b } : nf;
      case "responsible":
        return one ? { v: "responsible" } : two && RESPS[b] ? { v: "responsible", sec: b } : nf;
      case "terms":
        return one ? { v: "terms" } : two && TERMSS[b] ? { v: "terms", sec: b } : nf;
      case "privacy":
        return one ? { v: "privacy" } : two && PRIVS[b] ? { v: "privacy", sec: b } : nf;
    }
    return nf;
  }
  var NAV = { lobby: 0, games: 1, search: 1, game: 1, demo: 1, play: 1, promotions: 2, offer: 2, providers: 3, provider: 3 };
  var TAB = { games: "games", game: "games", demo: "games", play: "games", promotions: "promotions", offer: "promotions", join: "join" };
  var TITLES = {
    join: "Join",
    login: "Log in",
    deposit: "Cashier",
    reset: "Reset password",
    promotions: "Promotions",
    help: "Help & FAQ",
    contact: "Contact us",
    about: "About Popcorn",
    responsible: "Responsible play",
    terms: "Terms & conditions",
    privacy: "Privacy & cookies",
    providers: "Providers",
    search: "Search",
    "404": "Page not found"
  };
  var BASE_TITLE = document.title;
  function showPage(html, cls) {
    P.hideStudios();
    lobby.hidden = true;
    results.hidden = true;
    document.body.classList.remove("v-prov", "v-studios");
    document.body.classList.add("v-page");
    page.className = "page " + cls;
    page.innerHTML = html;
    page.hidden = false;
    P.setChip(null);
    wireForms();
    wireDeposit();
  }
  var route = null, sQuery = "";
  function render(r, opt) {
    opt = opt || {};
    if (r.v !== "search" && P.q.value) {
      sQuery = P.q.value;
      P.q.value = "";
      document.body.classList.remove("has-q", "searching");
    }
    route = r;
    var focusEl = null, y = 0;
    switch (r.v) {
      case "lobby":
        P.showLobby();
        focusEl = null;
        if (r.anchor) {
          var an = $(r.anchor);
          y = an.getBoundingClientRect().top + scrollY - $("top").offsetHeight - 8;
        }
        break;
      case "games":
        P.filterCat(r.cat, false);
        focusEl = $("resTitle");
        y = null;
        break;
      case "search":
        P.showLobby();
        if (sQuery) {
          P.q.value = sQuery;
          P.runSearch();
        }
        P.openSearch();
        y = 0;
        break;
      case "providers":
        P.showStudios();
        focusEl = $("stTitle");
        break;
      case "provider":
        P.showProvider(r.name);
        focusEl = $("resTitle");
        y = null;
        break;
      case "game":
        showPage(gamePage(r.id), "pg-game");
        break;
      case "demo":
        showPage(demoPage(r.id), "pg-demo");
        break;
      case "join":
        showPage(joinPage(), "pg-box");
        break;
      case "login":
        showPage(loginPage(), "pg-box");
        break;
      case "play":
        showPage(loginPage(r.id), "pg-box");
        break;
      case "deposit":
        showPage(depositPage(), "pg-deposit");
        break;
      case "reset":
        showPage(resetPage(r.step), "pg-box");
        break;
      case "promotions":
        showPage(promosPage(), "pg-promos");
        break;
      case "offer":
        showPage(offerPage(r.k), "pg-offer");
        break;
      case "help":
        showPage(helpPage(r.sec), "pg-help");
        break;
      case "contact":
        showPage(contactPage(), "pg-contact");
        break;
      case "about":
        showPage(aboutPage(), "pg-about");
        break;
      case "responsible":
        showPage(respPage(r.sec), "pg-resp");
        break;
      case "terms":
      case "privacy":
        showPage(legalPage(r.v, r.sec), "pg-legal");
        break;
      default:
        showPage(notFound(r.raw), "pg-404");
    }
    if (page.hidden === false && !focusEl)
      focusEl = $("pgTitle");
    if (r.sec) {
      var se = page.querySelector("#help-" + r.sec + ", #resp-" + r.sec + ", #lg-" + r.sec);
      if (se) {
        y = se.getBoundingClientRect().top + scrollY - $("top").offsetHeight - 14;
        focusEl = se.querySelector("h2");
      }
    }
    var nv = document.querySelectorAll(".nav a");
    [].forEach.call(nv, function(a, i) {
      a.classList.toggle("on", NAV[r.v] === i);
      if (NAV[r.v] === i)
        a.setAttribute("aria-current", "page");
      else
        a.removeAttribute("aria-current");
    });
    [].forEach.call(document.querySelectorAll(".tabbar [data-tab]"), function(a) {
      a.classList.toggle("on", TAB[r.v] === a.getAttribute("data-tab"));
    });
    var t = r.v === "play" ? "Log in to play " + G[r.id].n : r.v === "game" || r.v === "demo" ? G[r.id].n + (r.v === "demo" ? " demo" : "") : r.v === "offer" ? OFFERS[r.k].title : r.v === "provider" ? r.name : r.v === "games" ? $("resTitle").textContent : TITLES[r.v];
    document.title = t ? t + " | Popcorn Casino preview" : BASE_TITLE;
    if (opt.restore) {
      window.scrollTo({ top: opt.restore.y, behavior: "auto" });
      var o = opt.restore.opener, back = o && o.isConnected && o.offsetParent !== null ? o : findLike(opt.restore);
      if (back) {
        back.focus({ preventScroll: true });
        return;
      }
    } else if (y !== null)
      window.scrollTo({ top: Math.max(0, y), behavior: "auto" });
    if (focusEl && !(opt.initial && r.v === "lobby"))
      focusEl.focus({ preventScroll: true });
  }
  function findLike(m) {
    if (!m.href)
      return null;
    var reg = m.region && $(m.region), same = reg && reg.querySelectorAll('a[href="' + m.href + '"]')[m.nth];
    if (same && same.offsetParent !== null)
      return same;
    var c = [].filter.call(document.querySelectorAll('a[href="' + m.href + '"]'), function(e) {
      return e.offsetParent !== null;
    });
    return c[0] || null;
  }
  function place(o) {
    var href = o && o.getAttribute && o.getAttribute("href"), reg = href && o.parentElement && o.parentElement.closest("[id]");
    return reg ? { region: reg.id, nth: [].indexOf.call(reg.querySelectorAll('a[href="' + href + '"]'), o) } : {};
  }
  var seq = 0, key = 0, mem = {};
  history.scrollRestoration = "manual";
  function remember(opener) {
    var o = opener || document.activeElement;
    var at = place(o);
    mem[key] = { y: window.scrollY, opener: o && o !== document.body ? o : null, href: o && o.getAttribute && o.getAttribute("href"), region: at.region, nth: at.nth };
  }
  function norm(h) {
    return h === "#" || h === "" ? "#/" : h;
  }
  function go(href, opener) {
    href = norm(href);
    if (opener && opener.hasAttribute && opener.hasAttribute("data-back") && key > 0) {
      history.back();
      return;
    }
    var r = parse(href);
    if (r.canon)
      href = r.canon;
    if (href === norm(location.hash) && r.v !== "search") {
      render(r, {});
      return;
    }
    remember(opener);
    history.pushState({ k: key = ++seq }, "", href);
    render(r, {});
  }
  window.addEventListener("popstate", function(e) {
    remember(null);
    var k = e.state && e.state.k;
    if (k == null) {
      k = ++seq;
      history.replaceState({ k }, "", location.hash || "#/");
    }
    key = k;
    var r = parse(location.hash);
    if (r.canon)
      history.replaceState({ k }, "", r.canon);
    render(r, { restore: mem[k] });
  });
  window.__site = { hasDemo, reserved: RESERVED, sample: S };
  window.__router = {
    go,
    parse,
    route: function() {
      return route;
    },
    // typing in the search opens the #/search address once; clearing it goes back to the lobby's address
    searching: function(on) {
      if (on && route && route.v !== "search") {
        remember(P.q);
        history.pushState({ k: key = ++seq }, "", "#/search");
        route = { v: "search" };
        P.hidePage();
        P.hideStudios();
        document.body.classList.remove("v-prov");
        title("Search");
      }
      if (!on && route && route.v === "search") {
        sQuery = "";
        history.replaceState({ k: key }, "", "#/");
        route = { v: "lobby" };
        title(null);
      }
    }
  };
  function title(t) {
    document.title = t ? t + " | Popcorn Casino preview" : BASE_TITLE;
  }
  (function() {
    var r = parse(location.hash);
    history.replaceState({ k: 0 }, "", r.canon || (location.hash ? location.hash : location.pathname + location.search));
    render(r, { initial: true });
  })();
})();
