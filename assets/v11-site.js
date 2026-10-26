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
      ["How do I join?", 'Choose <a href="#/join">Join</a>, fill in one short form and confirm your mobile number with a code. It takes about two minutes.'],
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
      ["Where are the full rules?", 'Under More details on every offer. See all of them on <a href="#/promotions">Promotions</a>.']
    ]],
    ["games", "Games", [
      ["Can I try a game for free?", "Where the studio offers one, yes: open a game and choose <b>Try the demo</b> to play with play money. Games without a demo say so on their page, and live tables have none."],
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
    ["GB", "+44", "United Kingdom"],
    ["IE", "+353", "Ireland"],
    ["DE", "+49", "Germany"],
    ["AT", "+43", "Austria"],
    ["CH", "+41", "Switzerland"],
    ["FR", "+33", "France"],
    ["ES", "+34", "Spain"],
    ["IT", "+39", "Italy"],
    ["PT", "+351", "Portugal"],
    ["NL", "+31", "Netherlands"],
    ["BE", "+32", "Belgium"],
    ["SE", "+46", "Sweden"],
    ["NO", "+47", "Norway"],
    ["FI", "+358", "Finland"],
    ["DK", "+45", "Denmark"],
    ["PL", "+48", "Poland"],
    ["CZ", "+420", "Czechia"],
    ["CA", "+1", "Canada"],
    ["AU", "+61", "Australia"],
    ["NZ", "+64", "New Zealand"]
  ];
  var UJ = '<rect width="60" height="30" fill="#012169"/><path d="M0 0L60 30M60 0L0 30" stroke="#ffffff" stroke-width="6"/><path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" stroke-width="2"/><path d="M30 0V30M0 15H60" stroke="#ffffff" stroke-width="10"/><path d="M30 0V30M0 15H60" stroke="#C8102E" stroke-width="6"/>';
  function bands(dir, cols) {
    var n = cols.length;
    return cols.map(function(c, i) {
      return dir === "h" ? '<rect y="' + i * 30 / n + '" width="60" height="' + (30 / n + 0.2) + '" fill="' + c + '"/>' : '<rect x="' + i * 60 / n + '" width="' + (60 / n + 0.2) + '" height="30" fill="' + c + '"/>';
    }).join("");
  }
  function nordic(bg, cross, inner) {
    return '<rect width="60" height="30" fill="' + bg + '"/><rect x="16" width="8" height="30" fill="' + cross + '"/><rect y="11" width="60" height="8" fill="' + cross + '"/>' + (inner ? '<rect x="18" width="4" height="30" fill="' + inner + '"/><rect y="13" width="60" height="4" fill="' + inner + '"/>' : "");
  }
  function stars(fill, stroke) {
    return [[45, 6], [40, 14], [51, 12], [45, 25]].map(function(p) {
      return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2" fill="' + fill + '"' + (stroke ? ' stroke="' + stroke + '" stroke-width=".8"' : "") + "/>";
    }).join("");
  }
  var FLAGS = {
    GB: UJ,
    IE: bands("v", ["#169B62", "#ffffff", "#FF883E"]),
    DE: bands("h", ["#000000", "#DD0000", "#FFCE00"]),
    AT: bands("h", ["#ED2939", "#ffffff", "#ED2939"]),
    CH: '<rect width="60" height="30" fill="#DA291C"/><rect x="27" y="6" width="6" height="18" fill="#ffffff"/><rect x="21" y="12" width="18" height="6" fill="#ffffff"/>',
    FR: bands("v", ["#0055A4", "#ffffff", "#EF4135"]),
    ES: bands("h", ["#AA151B", "#F1BF00", "#F1BF00", "#AA151B"]),
    IT: bands("v", ["#009246", "#ffffff", "#CE2B37"]),
    PT: '<rect width="60" height="30" fill="#FF0000"/><rect width="24" height="30" fill="#006600"/><circle cx="24" cy="15" r="6" fill="#FFCC00"/>',
    NL: bands("h", ["#AE1C28", "#ffffff", "#21468B"]),
    BE: bands("v", ["#000000", "#FAE042", "#ED2939"]),
    SE: nordic("#006AA7", "#FECC00"),
    NO: nordic("#BA0C2F", "#ffffff", "#00205B"),
    FI: nordic("#ffffff", "#003580"),
    DK: nordic("#C8102E", "#ffffff"),
    PL: bands("h", ["#ffffff", "#DC143C"]),
    CZ: bands("h", ["#ffffff", "#D7141A"]) + '<path d="M0 0L28 15L0 30Z" fill="#11457E"/>',
    CA: bands("v", ["#D80621", "#ffffff", "#ffffff", "#D80621"]) + '<path d="M30 5l1.6 3.2 2.2-1-.7 4.4 2.9-2.2.7 1.7 2.2-.4-1.1 3.3 1.3.7-4.7 3.3.4 1.7-3.7-.6V24h-1.1v-3.9l-3.7.6.4-1.7-4.7-3.3 1.3-.7-1.1-3.3 2.2.4.7-1.7 2.9 2.2-.7-4.4 2.2 1z" fill="#D80621"/>',
    AU: '<rect width="60" height="30" fill="#012169"/><svg width="30" height="15" viewBox="0 0 60 30">' + UJ + '</svg><circle cx="15" cy="23" r="3.2" fill="#ffffff"/>' + stars("#ffffff"),
    NZ: '<rect width="60" height="30" fill="#012169"/><svg width="30" height="15" viewBox="0 0 60 30">' + UJ + "</svg>" + stars("#C8102E", "#ffffff")
  };
  function flag(iso) {
    return '<svg class="flag" data-iso="' + iso + '" viewBox="0 0 60 30" preserveAspectRatio="none" aria-hidden="true" focusable="false">' + (FLAGS[iso] || "") + "</svg>";
  }
  function ccPicker(opts) {
    return '<span class="cc"><button type="button" class="cc-btn" id="jCCbtn" aria-haspopup="listbox" aria-expanded="false" aria-controls="jCClist"></button><ul class="cc-list" id="jCClist" role="listbox" aria-label="Country calling code" tabindex="-1" hidden>' + CC.map(function(c) {
      return '<li role="option" id="cc-' + c[0] + '" data-v="' + c[1] + '" aria-selected="false" tabindex="-1">' + flag(c[0]) + "<span>" + c[2] + "</span><b>" + c[1] + "</b></li>";
    }).join("") + '</ul><select id="jCC" hidden tabindex="-1" aria-hidden="true">' + opts + "</select></span>";
  }
  function docHead(kick, title2, sub) {
    return '<header class="doc-head"><p class="doc-kick">' + kick + '</p><h1 id="pgTitle" tabindex="-1">' + title2 + "</h1>" + (sub ? '<p class="doc-sub">' + sub + "</p>" : "") + "</header>";
  }
  function icon(n) {
    return '<img src="assets/icons/' + n + '.webp" alt="" loading="lazy">';
  }
  function railOf(title2, ids, ic, more) {
    return '<section class="rail pg-rail" aria-label="' + esc(title2) + '"><div class="rail-head"><span class="rail-icon">' + svg(ic || "star") + "</span><h2>" + title2 + "</h2>" + (more || "") + '<div class="arrows"><button class="arrow prev" aria-label="Previous"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m15 6-6 6 6 6"/></svg></button><button class="arrow next" aria-label="Next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m9 6 6 6-6 6"/></svg></button></div></div><div class="track">' + ids.map(function(id) {
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
  function gameHead(id, extra) {
    var g = G[id], badges = (g.c.indexOf("new") >= 0 ? '<span class="gd-badge new">New</span>' : "") + (g.c.indexOf("hot") >= 0 ? '<span class="gd-badge hot">Hot</span>' : "") + ((META[id] || [""])[0] === "Live casino" ? '<span class="gd-badge live">Live</span>' : "");
    return '<div class="gd-head"><a class="gd-back" href="#/" data-back>&larr; Back</a><nav class="crumbs gd-crumbs" aria-label="You are here"><ol><li><a href="#/games">All games</a></li><li><a href="#/providers/' + P.pslug(g.p) + '">' + esc(g.p) + "</a></li>" + (extra ? '<li><a href="#/game/' + id + '">' + esc(g.n) + "</a></li>" : "") + '</ol></nav><h1 id="pgTitle" tabindex="-1">' + (extra ? "<small>" + extra + "</small>" : "") + esc(g.n) + (badges ? ' <span class="gd-badges">' + badges + "</span>" : "") + "</h1></div>";
  }
  function gameFrame(g, inner) {
    return `<div class="gd-frame"><div class="gd-bg" style="background-image:url('` + g.t + `')" aria-hidden="true"></div><span class="curtain l" aria-hidden="true"></span><span class="curtain r" aria-hidden="true"></span><div class="gd-launch"><span class="tc-bulbs bulbs" aria-hidden="true"></span>` + inner + "</div></div>";
  }
  function gamePage(id) {
    var g = G[id], m = META[id] || ["", ""], demo = hasDemo(id), live = m[0] === "Live casino";
    var same = P.ALL.filter(function(x) {
      return x !== id && G[x].p === g.p;
    });
    var near = P.ALL.filter(function(x) {
      return x !== id && G[x].p !== g.p && G[x].c.some(function(c) {
        return g.c.indexOf(c) >= 0;
      });
    });
    var rel = same.concat(near).slice(0, 12);
    return gameHead(id) + '<article class="gp" aria-labelledby="pgTitle">' + gameFrame(
      g,
      '<img class="gd-thumb" src="' + g.t + '" alt="' + esc(g.n) + ' cover art" width="104" height="104"><h2>' + esc(g.n) + '</h2><p class="gd-prov">' + esc(g.p) + '</p><div class="gp-ctas"><a class="pill pill-gold pill-lg" href="#/game/' + id + '/play">Play for real money</a>' + (demo ? '<a class="pill pill-ghost" href="#/game/' + id + '/demo">Try the demo</a>' : "") + '</div><p class="gd-note">Real-money play needs a log-in. 18+ &middot; <a href="#/responsible">Play responsibly</a></p>' + (demo ? "" : '<p class="gp-nodemo" id="noDemo">' + (live ? "Live tables have no demo." : "Demo not offered by this studio.") + "</p>")
    ) + "</article>" + (rel.length ? railOf("Similar games", rel, "sparkle", '<a class="more gd-more" href="#/providers/' + P.pslug(g.p) + '">More from ' + esc(g.p) + " &rarr;</a>") : "");
  }
  function demoPage(id) {
    var g = G[id], ok = hasDemo(id);
    return gameHead(id, ok ? "Demo &middot; play money" : "No demo") + '<section class="demo" aria-labelledby="pgTitle">' + gameFrame(
      g,
      '<img class="gd-thumb" src="' + g.t + '" alt="" width="104" height="104"><h2>' + (ok ? "The demo loads here" : "No demo for this game") + '</h2><p class="gd-prov">' + (ok ? "On the live site " + esc(g.p) + "&rsquo;s demo of " + esc(g.n) + " plays in this frame with play money. This preview loads no game and calls no studio." : esc(g.p) + " does not offer a demo of " + esc(g.n) + " here. Log in to play for real, or open a game that shows Try the demo.") + '</p><div class="gp-ctas"><a class="pill pill-gold" href="#/game/' + id + '/play">Play for real money</a><a class="pill pill-ghost" href="#/game/' + id + '" data-back="#/game/' + id + '">&larr; Back to game</a></div>'
    ) + (ok ? '<p class="demo-foot">Demo play uses play money only and has no cash value. 18+. <a href="#/responsible">Play responsibly</a>.</p>' : "") + "</section>";
  }
  var PROMO_ART = { welcome: "promo-welcome", premiere: "promo-premiere", encore: "promo-encore", club: "promo-club" };
  function promoCard(k, open) {
    var o = OFFERS[k];
    return '<article class="promo' + (open ? " open" : "") + '" id="offer-' + k + '" style="--oc:' + o.color + ";--obg:" + o.bg + '"><div class="promo-art" aria-hidden="true"><img class="pc-art" src="assets/art/' + PROMO_ART[k] + '.webp" alt="" width="520" height="693"' + (open ? "" : ' loading="lazy"') + '><span class="pa-shine"></span><span class="pa-bulbs bulbs"></span></div><div class="promo-body"><div class="ohead"><span class="okind">' + o.kind + '</span><span class="b-sample" title="Sample offer for this preview: the casino sets the real figures and terms.">Sample</span></div><h2 id="ot-' + k + '" tabindex="-1">' + o.title + '</h2><p class="oval">' + o.value + '</p><p class="oterms">' + o.line + '</p><div class="promo-ctas"><a class="pill pill-ghost promo-see" href="#/promotions' + (open ? "" : "/" + k) + '" aria-expanded="' + open + '" aria-controls="more-' + k + '">' + (open ? "Hide the offer" : "See the offer") + '<span class="sr"> (' + o.title + ")</span></a></div></div>" + (open ? '<div class="promo-more" id="more-' + k + '"><div class="promo-go"><a class="pill pill-gold" href="' + o.cta[1] + '">' + o.cta[0] + '</a></div><dl class="okeys">' + o.keys.map(function(r) {
      return "<div><dt>" + r[0] + "</dt><dd>" + r[1] + "</dd></div>";
    }).join("") + "</dl>" + (o.soon ? "" : '<p class="o-choice">Or <a href="#/join">join with no bonus</a>: no wagering at all.</p>') + '<section class="offer-rules" aria-labelledby="rules-' + k + '"><h3 id="rules-' + k + '">' + (o.soon ? "What we know so far" : "Full rules") + "</h3><ol>" + o.rules.map(function(r) {
      return "<li>" + r + "</li>";
    }).join("") + '</ol><p class="rules-note">General bonus terms in the <a href="#/terms/bonuses">Terms &amp; conditions</a> also apply. ' + OP("the final figures and the licence-specific wording.") + '</p><p class="safe-line">Play for the show, not the money. Set a deposit limit before you claim. <a href="#/responsible">Responsible play</a></p></section></div>' : "") + "</article>";
  }
  function promosPage(k) {
    return '<header class="st-head pr-head"><img class="st-host" src="assets/showman/point-right.webp" alt="" width="551" height="720"><div class="st-sign"><span class="bill-bulbs" aria-hidden="true"></span><h1 id="pgTitle" tabindex="-1"><small>Popcorn presents</small>Promotions</h1><span class="st-sub">Tonight&rsquo;s line-up &middot; every bonus is a choice</span></div><a class="more st-back lobby-back" href="#/">&larr; Back to lobby</a></header><div class="promo-grid">' + OFFER_ORDER.map(function(x) {
      return promoCard(x, x === k);
    }).join("") + '</div><p class="offers-foot"><span class="b-sample">Sample</span> Offers, figures and terms on this page are samples for this preview, in euro (pound accounts get the same figures in &pound;). Prefer to play without a bonus? You can, every time. <a href="#/responsible/limits">Set your limits</a> &middot; <a href="#/help/bonuses">How bonuses work</a></p>';
  }
  var POPULAR = [["payments", 1], ["payments", 3], ["account", 1], ["bonuses", 1], ["payments", 0], ["games", 2]];
  function helpQA(sec, i) {
    for (var k = 0; k < HELP.length; k++)
      if (HELP[k][0] === sec)
        return HELP[k][2][i];
    return null;
  }
  function helpPage(sec) {
    return docHead("Help centre", "How can we help?", 'Answers first. A person when you need one: <a href="#/contact">contact us</a>.') + '<div class="help"><div class="help-search" role="search"><label class="hs-lbl" for="hQ">Search for answers</label><input id="hQ" type="search" autocomplete="off" spellcheck="false" placeholder="Search for answers" aria-describedby="hQs"><button type="button" class="hs-clear" id="hQx" hidden>Clear</button></div><p class="hs-status" id="hQs" role="status" aria-live="polite"></p><div id="helpBrowse"><h2 class="doc-sec" id="hPopT">Popular questions</h2><ul class="help-pop" aria-labelledby="hPopT">' + POPULAR.map(function(q) {
      return '<li><button type="button" data-qa="' + q[0] + ":" + q[1] + '">' + helpQA(q[0], q[1])[0] + "</button></li>";
    }).join("") + '</ul><h2 class="doc-sec">Browse by topic</h2><nav class="help-topics" aria-label="Help topics">' + HELP.map(function(h) {
      return '<a href="#/help/' + h[0] + '"' + (h[0] === sec ? ' aria-current="true"' : "") + "><b>" + h[1] + "</b><span>" + h[2].length + " answers</span></a>";
    }).join("") + '</nav></div><div class="help-body">' + HELP.map(function(h) {
      return '<section class="help-sec" id="help-' + h[0] + '" aria-labelledby="hs-' + h[0] + '"><h2 id="hs-' + h[0] + '" tabindex="-1">' + h[1] + "</h2>" + h[2].map(function(qa, i) {
        return '<details id="qa-' + h[0] + "-" + i + '"' + (h[0] === sec && !i ? " open" : "") + "><summary>" + qa[0] + "</summary><div>" + qa[1] + "</div></details>";
      }).join("") + "</section>";
    }).join("") + '</div><p class="hs-empty" id="hQe" hidden><b>No answers match that.</b> Try a different word, or <a href="#/contact">contact us</a>.</p></div>';
  }
  function hNorm(s) {
    return String(s || "").toLowerCase().replace(/[\u2019']/g, "").replace(/\s+/g, " ").trim();
  }
  function helpFilter() {
    var inp = $("hQ");
    if (!inp)
      return;
    var toks = hNorm(inp.value).split(" ").filter(function(t) {
      return t.length > 1;
    }), on = toks.length > 0, n = 0;
    [].forEach.call(page.querySelectorAll(".help-sec"), function(sec) {
      var any = false;
      [].forEach.call(sec.querySelectorAll("details"), function(d) {
        var txt = hNorm(d.querySelector("summary").textContent + " " + d.querySelector("div").textContent);
        var hit = !on || toks.every(function(t) {
          return txt.indexOf(t) >= 0;
        });
        d.hidden = !hit;
        if (hit) {
          any = true;
          if (on)
            n++;
        }
      });
      sec.hidden = !any;
    });
    $("helpBrowse").hidden = on;
    $("hQx").hidden = !inp.value;
    $("hQe").hidden = !on || n > 0;
    $("hQs").textContent = !on ? "" : n ? n === 1 ? "1 answer matches." : n + " answers match." : "No answers match.";
  }
  function wireHelp() {
    var inp = $("hQ");
    if (!inp)
      return;
    inp.addEventListener("input", helpFilter);
    inp.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && inp.value) {
        e.preventDefault();
        inp.value = "";
        helpFilter();
      }
      if (e.key === "Enter")
        e.preventDefault();
    });
    $("hQx").addEventListener("click", function() {
      inp.value = "";
      helpFilter();
      inp.focus();
    });
    page.querySelector(".help-pop").addEventListener("click", function(e) {
      var b = e.target.closest("[data-qa]");
      if (!b)
        return;
      var d = $("qa-" + b.getAttribute("data-qa").replace(":", "-"));
      d.open = true;
      window.scrollTo({ top: Math.max(0, d.getBoundingClientRect().top + scrollY - $("top").offsetHeight - 14), behavior: "auto" });
      d.querySelector("summary").focus({ preventScroll: true });
    });
  }
  function field(id, label, input2, hint) {
    return '<div class="f" data-f="' + id + '"><label for="' + id + '">' + label + "</label>" + input2 + (hint ? '<small class="f-hint" id="' + id + '-hint">' + hint + "</small>" : "") + '<p class="f-err" id="' + id + '-err" hidden></p></div>';
  }
  function input(id, type, ac, extra) {
    return '<input id="' + id + '" type="' + type + '" autocomplete="' + ac + '"' + (extra || "") + ">";
  }
  function pw(id, ac, ph) {
    return '<span class="pw">' + input(id, "password", ac, ' minlength="8"' + (ph ? ' placeholder="' + ph + '"' : "")) + '<button type="button" class="pw-eye" data-eye="' + id + '" aria-label="Show password" aria-pressed="false">Show</button></span>';
  }
  function contactPage() {
    return docHead("Help centre", "Contact us", "Real people, every night of the week.") + '<div class="contact"><div class="channels"><article class="chan">' + icon("spotlight") + '<h2>Live chat</h2><p>Fastest. Open the chat from any page once the live site is up.</p><p class="chan-meta">Hours: ' + OP() + '</p></article><article class="chan">' + icon("ticket") + '<h2>Email</h2><p>For documents and anything that needs a paper trail. We answer within 24 hours.</p><p class="chan-meta">Address: ' + OP() + '</p></article><article class="chan">' + icon("star") + '<h2>Complaints</h2><p>Not happy with an answer? Our complaints process and the independent dispute service are in the terms.</p><p class="chan-meta"><a href="#/terms/complaints">How complaints work</a></p></article></div><div class="doc-card contact-card"><h2 class="tc-title">Send us a message</h2><form class="pf" id="fContact" novalidate onsubmit="return false"><div class="pf-sum" role="alert" hidden></div>' + field("cTopic", "Topic", '<select id="cTopic"><option value="">Choose a topic</option><option>My account</option><option>Payments</option><option>Bonuses</option><option>A game</option><option>Something else</option></select>') + field("cEmail", "Your email", input("cEmail", "email", "email", ' inputmode="email" spellcheck="false"')) + field("cMsg", "Message", '<textarea id="cMsg" rows="5" maxlength="1000"></textarea>', "At least 10 characters.") + '<button class="pill pill-gold pf-go" type="submit">Send message</button><p class="pf-note">' + previewNote() + "</p></form></div></div>";
  }
  function aboutPage() {
    return docHead("Popcorn Casino", "About Popcorn", "Saturday night in Vegas, any night.") + '<div class="prose"><section><h2>The idea</h2><p>Popcorn Casino is a casino built like a night at the theatre: a marquee, a showman, a red curtain and a front row of games from the studios players already love. The show is the fun. The rules are printed on the ticket.</p></section><section><h2>What we promise</h2><ul class="promise"><li>' + icon("ticket") + "<b>Terms on the ticket</b><span>Deposit, wagering and time limit next to every offer, full rules one tap away.</span></li><li>" + icon("spotlight") + "<b>You set the limits</b><span>Deposit limits, reminders and breaks, from the first day.</span></li><li>" + icon("star") + '<b>Bonus is a choice</b><span>"Join without a bonus" is always one tap away. No pre-ticked boxes.</span></li><li>' + icon("kernel") + '<b>Light and quick</b><span>A lobby built to load fast on a phone.</span></li></ul></section><section><h2>Who runs Popcorn</h2><dl class="legal-dl"><div><dt>Operator</dt><dd>' + OP("company name and address.") + "</dd></div><div><dt>Company number</dt><dd>" + OP() + "</dd></div><div><dt>Licence</dt><dd>" + OP("licence holder, regulator and licence number. None is shown in this preview.") + '</dd></div></dl></section><section><h2>The games</h2><p>Every game comes from a licensed studio. Browse all of them on <a href="#/providers">Providers</a>.</p></section></div>';
  }
  function respPage(sec) {
    return docHead("Play safe", "Responsible play", "The show is the fun. Never the money.") + '<div class="prose resp"><section class="resp-intro"><p>Gambling should be a night out, not a way to make money. Decide your budget before you play, play only what you can afford to lose, and stop when it stops being fun.</p><p class="age"><span>18+</span> Popcorn is for adults only. Every player&rsquo;s age is checked. ' + OP("when and how, as the licence requires.") + '</p></section><div class="tools">' + RESP.map(function(r) {
      return '<section class="tool" id="resp-' + r[0] + '" aria-labelledby="rt-' + r[0] + '"><h2 id="rt-' + r[0] + '" tabindex="-1">' + r[1] + "</h2><p>" + r[2] + '</p><a class="pill pill-ghost" href="#/login">' + r[3] + "</a><small>Log in first: tools live in your account.</small></section>";
    }).join("") + '</div><section id="resp-help" aria-labelledby="rt-help"><h2 id="rt-help" tabindex="-1">Signs it may be time for a break</h2><ul class="ticks"><li>You play longer or spend more than you planned.</li><li>You chase losses to win them back.</li><li>You borrow money or skip bills to play.</li><li>Gambling makes you anxious, or you hide it from people close to you.</li></ul><p>Free, confidential help: ' + OP("the national helplines and support organisations for each licence country.") + "</p></section></div>";
  }
  var TERMS = [
    ["intro", "About these terms", "Who you agree with and when these terms apply."],
    ["account", "Your account", "Who can join, one account per person, keeping your log-in safe."],
    ["payments", "Deposits and withdrawals", "Methods, limits, checks before a withdrawal."],
    ["bonuses", "Bonuses", "General rules for every offer; each offer adds its own under More details."],
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
    return docHead("Legal", title2, "Draft structure. " + (kind === "terms" ? "The operator supplies the binding text." : "The operator supplies the final notice.")) + '<div class="legal-doc"><nav class="toc" aria-label="Sections"><h2>On this page</h2><ol>' + L.map(function(s) {
      return '<li><a href="' + base + "/" + s[0] + '"' + (s[0] === sec ? ' aria-current="true"' : "") + ">" + s[1] + "</a></li>";
    }).join("") + '</ol></nav><div class="legal-body"><p class="draft">' + OP("the full legal text. This page shows the structure and a plain summary of each section; it is not a binding document and no licence number is shown.") + "</p>" + L.map(function(s, i) {
      var body = s[2] ? "<p>" + s[2] + '</p><div class="op-block">' + OP("the binding wording for this section.") + "</div>" : '<p>This preview sets <b>no cookies</b> and keeps <b>nothing</b> in your browser&rsquo;s storage: not your favourites, not anything you type.</p><p>The live site will use cookies only for: keeping you logged in (needed), remembering your settings (needed), and measuring visits (only if you say yes).</p><div class="op-block">' + OP("the cookie list, providers and retention.") + "</div>";
      return '<section id="lg-' + s[0] + '" aria-labelledby="lh-' + s[0] + '"><h2 id="lh-' + s[0] + '" tabindex="-1"><span>' + (i + 1) + ".</span> " + s[1] + "</h2>" + body + "</section>";
    }).join("") + '<p class="legal-upd">Last updated: ' + OP() + "</p></div></div>";
  }
  function notFound(h) {
    return '<section class="nf" aria-labelledby="pgTitle">' + docHead("Error 404", "Wrong door", "There is no seat at <code>" + esc(h || "#") + "</code>. The show is this way.") + '<div class="nf-ctas"><a class="pill pill-gold" href="#/">Back to the lobby</a><a class="pill pill-ghost" href="#/games">All games</a><a class="pill pill-ghost" href="#/help">Help centre</a></div></section>';
  }
  function previewNote() {
    return "<b>Preview:</b> nothing you type is sent or saved. No account is created and nobody is logged in.";
  }
  function authPage(tab, inner) {
    return '<div class="auth" data-tab="' + tab + '"><a class="box-x auth-x" href="#/" data-back aria-label="Close and go back">&times;</a><div class="auth-brand"><a class="logo" href="#/" aria-label="Popcorn Casino home"><img src="assets/icons/bucket.webp" alt=""><span class="wordmark"><b>POPCORN</b><i>CASINO</i><span class="bulbs bulbs-mini"></span></span></a><h1 id="pgTitle" tabindex="-1">' + (tab === "join" ? "Join the show" : tab === "login" ? "Welcome back" : "Lost your ticket?") + ' <span>&middot; welcome package inside</span></h1></div><div class="auth-card"><span class="tc-bulbs bulbs" aria-hidden="true"></span><div class="box-tabs auth-tabs" role="navigation" aria-label="Log in or join"><a href="#/login"' + (tab !== "join" ? ' aria-current="page"' : "") + '>Log in</a><a href="#/join"' + (tab === "join" ? ' aria-current="page"' : "") + ">Join</a></div>" + inner + "</div></div>";
  }
  var PW_MIN = 8;
  var RESERVED = { email: "taken@example.com", phone: "7700900000", users: ["admin", "popcorn", "support", "root", "moderator"], code: "000000" };
  var srv = {}, verifiedPhone = null;
  function joinPage() {
    var cc = CC.map(function(c) {
      return '<option value="' + c[1] + '" data-iso="' + c[0] + '">' + c[2] + " " + c[1] + "</option>";
    }).join("");
    return authPage(
      "join",
      '<form class="pf join" id="fJoin" novalidate onsubmit="return false"><div class="jstep" data-step="0"><h2 class="step-h sr" id="jStep0" tabindex="-1">Create your account</h2><div class="pf-sum" role="alert" hidden></div><fieldset class="f offer-pick" data-f="jOffer"><legend class="sr">Choose your welcome bonus</legend><button type="button" class="ob-row" id="jOffer" aria-expanded="false" aria-controls="jOfferBox"><span class="ob-ico" aria-hidden="true">&#127873;</span><span class="ob-txt" id="jOfferRow"></span><span class="ob-act" id="jOfferAct">Choose</span></button><div class="ob-box" id="jOfferBox" hidden><p class="ob-cur" id="jOfferCur"></p><div class="offer-tiles"><label class="radio"><input type="radio" name="jOfferPick" value="none" id="jOfferN"><span><b>No bonus</b> No offer, no conditions.</span></label><label class="radio"><input type="radio" name="jOfferPick" value="welcome" id="jOfferW"><span><b>Welcome package</b> <span id="jOfferVal"></span><small class="radio-terms" id="jOfferTerms"></small> <a href="#/promotions/welcome" target="_blank" rel="noopener">Full rules</a></span></label></div></div><p class="f-err" id="jOffer-err" hidden></p></fieldset><div class="f-row">' + field("jFirst", "First name", input("jFirst", "text", "given-name", ' autocapitalize="words" placeholder="First name"')) + field("jLast", "Last name", input("jLast", "text", "family-name", ' autocapitalize="words" placeholder="Last name"')) + '</div><div class="f-row">' + field("jPhone", "Mobile number", '<span class="tel">' + ccPicker(cc) + input("jPhone", "tel", "tel-national", ' inputmode="tel" placeholder="Mobile number"') + "</span>") + field("jEmail", "Email", input("jEmail", "email", "email", ' inputmode="email" spellcheck="false" autocapitalize="none" placeholder="Email address"')) + "</div>" + field("jCur", "Account currency", '<select id="jCur"><option value="GBP">GBP &pound;</option><option value="EUR">EUR &euro;</option></select>') + '<div class="f-row">' + field("jUser", "Username <em>optional</em>", input("jUser", "text", "username", ' spellcheck="false" autocapitalize="none" maxlength="20" placeholder="Username"')) + field("jPw", "Password", pw("jPw", "new-password", "Password")) + '</div><div class="f tick" data-f="jAge"><label class="check"><input type="checkbox" id="jAge"><span>I am <b>18+</b> and accept the <a href="#/terms" target="_blank" rel="noopener">Terms &amp; conditions</a> and the <a href="#/privacy" target="_blank" rel="noopener">Privacy notice</a>.</span></label><p class="f-err" id="jAge-err" hidden></p></div><button class="pill pill-gold pf-go auth-go" type="submit" data-next>Create account</button></div><div class="jstep" data-step="1" hidden><h2 class="step-h" id="jStep1" tabindex="-1">Verify your mobile</h2><div class="pf-sum" role="alert" hidden></div><div class="vsend" id="jSendBox"><p class="pf-lead">We&rsquo;ll text a 6-digit code to</p><p class="v-number" id="jFull"></p><div class="f" data-f="jSend"><p class="f-err" id="jSend-err" hidden></p></div><button class="pill pill-gold pf-go auth-go" type="submit" id="jSendGo">Send verification code</button></div><div class="vcode" id="jCodeBox" hidden><p class="pf-lead">Enter your code. Sent to <b id="jMasked"></b>.</p>' + field("jCode", "6-digit code", input("jCode", "text", "one-time-code", ' inputmode="numeric" maxlength="6" class="code" placeholder="123456"')) + '<button class="pill pill-gold pf-go auth-go" type="submit" data-next>Verify and create account</button><button class="link-btn" type="button" data-resend>Resend code</button><p class="pf-msg" id="jResend" role="status"></p></div><button class="link-btn" type="button" data-prev>Change number</button></div></form><div class="done" id="joinDone" hidden><img src="assets/showman/welcome.webp" alt="" loading="lazy"><h2 tabindex="-1" id="joinDoneH"><small>Curtain up</small>Welcome to the show</h2><p>That is the whole sign-up: one form and a mobile code. On the live site your account would be open now.</p><p class="pf-flag">This is a design preview: no account was created, nothing you typed was sent or kept, and you are not logged in.</p><div class="pf-row"><a class="pill pill-gold" href="#/">Back to the lobby</a><a class="pill pill-ghost" href="#/promotions">Promotions</a></div></div>'
    );
  }
  function priceOffer() {
    var c = ($("jCur") || {}).value || "EUR";
    if ($("jOfferVal")) {
      $("jOfferVal").innerHTML = welcomeValue(c) + ".";
      $("jOfferTerms").innerHTML = "Min. " + sym(c) + S.wMin + " &middot; " + sym(c) + S.wMax + " for the full bonus &middot; " + S.wWag + "x wagering &middot; " + S.wDays + " days";
      $("jOfferCur").textContent = "Priced in " + c;
      offerRow();
    }
  }
  function offerRow() {
    var c = ($("jCur") || {}).value || "EUR", pick = document.querySelector('input[name="jOfferPick"]:checked'), v = welcomeValue(c).replace(" free spins", " spins");
    $("jOfferRow").innerHTML = !pick ? '<span class="ob-pre">Welcome bonus? </span><b>' + v + "</b>" : pick.value === "none" ? '<i class="ob-ok">&#10003;</i> <b>No bonus</b> &middot; no conditions' : '<i class="ob-ok">&#10003;</i> <span class="ob-pre">Welcome package: </span><b>' + v + "</b>";
    $("jOfferAct").textContent = pick ? "Change" : "Choose";
    $("jOffer").classList.toggle("picked", !!pick);
    $("jOffer").setAttribute("aria-label", pick ? (pick.value === "none" ? "No bonus chosen" : "Welcome package chosen: " + welcomeValue(c)) + ". Change" : "Choose your welcome bonus: " + welcomeValue(c) + ", or no bonus");
  }
  function offerOpen(open, focus) {
    $("jOfferBox").hidden = !open;
    $("jOffer").setAttribute("aria-expanded", open);
    if (open && focus)
      (document.querySelector('input[name="jOfferPick"]:checked') || $("jOfferW")).focus();
    if (!open && focus)
      $("jOffer").focus();
  }
  function ccSync() {
    var sel = $("jCC"), o = sel.selectedOptions[0], iso = o.getAttribute("data-iso"), c = CC.filter(function(x) {
      return x[0] === iso;
    })[0];
    $("jCCbtn").innerHTML = flag(iso) + "<span>" + c[1] + "</span>";
    $("jCCbtn").setAttribute("aria-label", "Country calling code: " + c[2] + " " + c[1]);
    [].forEach.call($("jCClist").children, function(li) {
      li.setAttribute("aria-selected", li.id === "cc-" + iso);
    });
  }
  function ccOpen(open) {
    var list = $("jCClist");
    list.hidden = !open;
    $("jCCbtn").setAttribute("aria-expanded", open);
    if (open) {
      var cur = list.querySelector('[aria-selected="true"]');
      cur.focus();
      cur.scrollIntoView({ block: "nearest" });
    }
  }
  function ccPick(li) {
    var sel = $("jCC");
    if (sel.value !== li.getAttribute("data-v")) {
      sel.value = li.getAttribute("data-v");
      sel.dispatchEvent(new Event("change"));
    }
    ccOpen(false);
    $("jCCbtn").focus();
  }
  function wireJoinPickers() {
    var btn = $("jCCbtn"), list = $("jCClist");
    $("jCC").addEventListener("change", ccSync);
    ccSync();
    btn.addEventListener("click", function() {
      ccOpen(list.hidden);
    });
    btn.addEventListener("keydown", function(e) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        ccOpen(true);
      }
    });
    list.addEventListener("click", function(e) {
      var li = e.target.closest('[role="option"]');
      if (li)
        ccPick(li);
    });
    list.addEventListener("keydown", function(e) {
      var li = document.activeElement.closest('[role="option"]'), k = e.key;
      if (!li)
        return;
      if (k === "ArrowDown" || k === "ArrowUp" || k === "Home" || k === "End") {
        e.preventDefault();
        var n = k === "ArrowDown" ? li.nextElementSibling : k === "ArrowUp" ? li.previousElementSibling : k === "Home" ? list.firstElementChild : list.lastElementChild;
        if (n)
          n.focus();
      } else if (k === "Enter" || k === " ") {
        e.preventDefault();
        ccPick(li);
      } else if (k === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        ccOpen(false);
        btn.focus();
      } else if (k === "Tab") {
        ccOpen(false);
      } else if (k.length === 1 && /\w/.test(k)) {
        var m = [].filter.call(list.children, function(x) {
          return x.querySelector("span").textContent.toLowerCase().indexOf(k.toLowerCase()) === 0;
        })[0];
        if (m)
          m.focus();
      }
    });
    document.addEventListener("pointerdown", function(e) {
      if (!list.hidden && !e.target.closest(".cc"))
        ccOpen(false);
    });
    $("jOffer").addEventListener("click", function() {
      offerOpen($("jOfferBox").hidden, !$("jOfferBox").hidden ? false : true);
    });
    var box = $("jOfferBox");
    box.addEventListener("change", function() {
      offerRow();
      var f = box.closest(".f");
      if (f.classList.contains("bad")) {
        $("jOffer-err").hidden = true;
        f.classList.remove("bad");
        $("jOffer").setAttribute("aria-invalid", "false");
      }
    });
    box.addEventListener("click", function(e) {
      var r = e.target.closest("label.radio");
      if (r && !e.target.closest("a") && e.detail > 0)
        setTimeout(function() {
          offerOpen(false, true);
        }, 120);
    });
    box.addEventListener("keydown", function(e) {
      if (e.key === "Enter" && e.target.name === "jOfferPick") {
        e.preventDefault();
        e.target.checked = true;
        e.target.dispatchEvent(new Event("change", { bubbles: true }));
        offerOpen(false, true);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        offerOpen(false, true);
      }
    });
  }
  function joinCountry() {
    var o = $("jCC").selectedOptions[0];
    $("jCur").value = o && o.getAttribute("data-iso") === "GB" ? "GBP" : "EUR";
    priceOffer();
  }
  function loginPage(gate) {
    return authPage(
      "login",
      '<form class="pf" id="fLogin" novalidate onsubmit="return false"><h2 class="step-h sr" tabindex="-1">Log in</h2>' + (gate ? '<p class="pf-flag gate" id="playGate">Log in to play <b>' + esc(G[gate].n) + '</b>. New here? <a href="#/join">Join</a>.</p>' : "") + '<div class="pf-sum" role="alert" hidden></div>' + field("lUser", "Email or username", input("lUser", "text", "username", ' spellcheck="false" autocapitalize="none" placeholder="Enter your email or username"')) + field("lPw", "Password", pw("lPw", "current-password", "Enter your password")) + '<button class="pill pill-gold pf-go auth-go" type="submit">Log in</button><p class="pf-alt"><a class="link-a" href="#/reset">Forgot password?</a></p></form><div class="done" id="loginDone" hidden><img src="assets/showman/host-right.webp" alt="" loading="lazy"><h2 tabindex="-1"><small>Preview</small>Log-in checked</h2><p>Both fields were filled in correctly. On the live site you would be in your account now.</p><p class="pf-flag">This preview has no accounts: nothing was sent and you are still logged out.</p><div class="pf-row"><a class="pill pill-gold" href="#/">Back to the lobby</a><a class="pill pill-ghost" href="#/join">Join instead</a></div></div>'
    );
  }
  function resetPage(step) {
    if (step === "new")
      return authPage(
        "reset",
        '<form class="pf" id="fNewPw" novalidate onsubmit="return false"><h2 class="step-h" tabindex="-1">Choose a new password</h2><div class="pf-sum" role="alert" hidden></div>' + field("nPw", "New password", pw("nPw", "new-password"), "At least " + PW_MIN + " characters.") + field("nPw2", "Repeat new password", pw("nPw2", "new-password")) + '<button class="pill pill-gold pf-go auth-go" type="submit">Set new password</button><p class="pf-alt"><a href="#/login">Back to log in</a></p></form><div class="done" id="newPwDone" hidden><img src="assets/showman/welcome.webp" alt="" loading="lazy"><h2 tabindex="-1"><small>Preview</small>Password set</h2><p>On the live site your new password would work now.</p><p class="pf-flag">Nothing was sent or saved.</p><div class="pf-row"><a class="pill pill-gold" href="#/login">Log in</a></div></div>'
      );
    return authPage(
      "reset",
      '<form class="pf" id="fReset" novalidate onsubmit="return false"><h2 class="step-h" tabindex="-1">Forgot your password?</h2><div class="pf-sum" role="alert" hidden></div><p class="pf-lead">Type the email on your account and we will send you a link to choose a new password.</p>' + field("rEmail", "Email", input("rEmail", "email", "email", ' inputmode="email" spellcheck="false" autocapitalize="none" placeholder="Email address"')) + '<button class="pill pill-gold pf-go auth-go" type="submit">Send reset link</button><p class="pf-alt"><a href="#/login">Back to log in</a></p></form><div class="done" id="resetDone" hidden><img src="assets/showman/point-right.webp" alt="" loading="lazy"><h2 tabindex="-1"><small>Check your inbox</small>Link on its way</h2><p>If an account uses that email, a reset link would arrive in a minute. It works once and only for a short time.</p><p class="pf-flag">Preview: no email was sent.</p><div class="pf-row"><a class="pill pill-gold" href="#/login">Back to log in</a><a class="pill pill-ghost" href="#/reset/new">See the next step</a></div></div>'
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
  var DEP_MIN = 10, DEP_MAX = 1e4, depMethod = null;
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
    return '<div class="cash-modal" role="dialog" aria-modal="true" aria-labelledby="pgTitle"><a class="cash-scrim" href="#/" data-back tabindex="-1" aria-hidden="true"></a><div class="cash-box"><span class="tc-bulbs bulbs" aria-hidden="true"></span><a class="box-x cash-x" href="#/" data-back aria-label="Close the cashier">&times;</a><h1 id="pgTitle" tabindex="-1">Add funds</h1><p class="pf-flag cash-flag" id="cashFlag"><b>Preview of the logged-in cashier.</b> You are not logged in: no real balance, no payment window, nothing is charged or sent.</p><p class="cash-bal">Cash <b>&euro;0.00</b> &middot; Bonus money <b>&euro;0.00</b> &middot; Free spins <b>0</b></p><form class="pf dep" id="fDep" novalidate onsubmit="return false"><div class="jstep" data-step="0"><h2 class="step-h sr" tabindex="-1">Amount</h2><div class="pf-sum" role="alert" hidden></div><div class="chips-amt">' + CHIPS_EUR.map(function(a) {
      return '<button type="button" class="chip-amt" data-amt="' + a + '" aria-pressed="false">&euro;' + a + "</button>";
    }).join("") + '</div><div class="f amt" data-f="dAmt"><label for="dAmt">Amount (EUR)</label><span class="amt-in"><b aria-hidden="true">&euro;</b><input id="dAmt" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" maxlength="8" placeholder="50.00"></span><small class="f-hint" id="dAmt-hint">From &euro;10. The most per deposit depends on the method.</small><p class="f-err" id="dAmt-err" hidden></p></div><fieldset class="f offer-pick" data-f="dOffer"><legend>Add an offer to this deposit?</legend><label class="radio"><input type="radio" name="dOfferPick" value="none" id="dOfferN" checked><span><b>No bonus</b> Play with your own money. No wagering, withdraw any time.</span></label><label class="radio"><input type="radio" name="dOfferPick" value="welcome" id="dOfferW"><span><b>Welcome package</b> ' + welcomeValue("EUR") + '.<small class="radio-terms">' + welcomeLine("EUR").replace(/^18\+\. /, "") + '</small></span></label><label class="radio"><input type="radio" name="dOfferPick" value="premiere" id="dOfferP"><span><b>Premiere spins</b> ' + OFFERS.premiere.value + '.<small class="radio-terms" id="dPremTerms"></small></span></label><p class="f-err" id="dOffer-err" hidden></p></fieldset><div class="calc" id="dCalc" aria-live="polite"></div><button class="pill pill-gold pf-go auth-go" type="submit" data-next>Continue</button></div><div class="jstep" data-step="1" hidden><div class="dm-head"><button class="link-btn dm-back" type="button" data-prev>&lsaquo; Back</button><h2 class="step-h" tabindex="-1">Depositing <b id="dAmtShow"></b></h2></div><div class="f methods" data-f="dMethod"><div class="mtiles">' + METHODS.map(function(m) {
      return '<button type="button" class="mtile" data-method="' + m[0] + '"><b>' + m[1] + "</b><span>" + m[2] + "</span><small>" + money(m[3]) + " to " + money(m[4]) + " &middot; " + m[5] + "</small></button>";
    }).join("") + '</div><p class="f-err" id="dMethod-err" role="alert" hidden></p></div></div><p class="pf-note">You&rsquo;ll be taken to our secure payment provider to finish. Popcorn never sees your card or wallet details. <b>Preview:</b> nothing you choose or type is sent or saved.</p><p class="cash-foot"><a href="#/responsible/limits">Set a deposit limit</a> &middot; Before your first withdrawal we check your ID and address once (<a href="#/help/payments">help</a>).</p></form><div class="done" id="depDone" hidden><h2 tabindex="-1"><small>Preview only</small>Nothing was charged</h2><dl class="dsum" id="dSum"></dl><p>On the live site our payment provider&rsquo;s secure page opens now to finish this deposit.</p><p class="pf-flag">This is a design preview: no payment window opened, no request was sent, no money moved and nothing was saved.</p><div class="pf-row"><a class="pill pill-gold" href="#/">Back to the lobby</a><a class="pill pill-ghost" href="#/deposit">Start again</a></div></div></div></div>';
  }
  function depOffers() {
    var a = depAmount(), p = $("dOfferP");
    if (!p)
      return;
    var ok = a >= S.pMin;
    p.disabled = !ok;
    if (!ok && p.checked)
      $("dOfferN").checked = true;
    p.closest(".radio").classList.toggle("off", !ok);
    $("dPremTerms").innerHTML = (ok ? "" : '<b class="needs">Needs a deposit of &euro;' + S.pMin + " or more.</b> ") + OFFERS.premiere.line;
    depCalc();
  }
  function depCalc() {
    var a = depAmount(), o = depPick("dOfferPick"), b = Math.min(a * S.wMatch / 100, S.wMax), t;
    if (isNaN(a))
      t = "Choose an amount to see what you play with.";
    else if (o === "welcome")
      t = "You play with <b>" + money(a + b) + "</b>: your " + money(a) + " + " + money(b) + " bonus, plus " + S.wSpins + " free spins. The bonus needs " + money(b * S.wWag) + " of bets before it can be withdrawn." + (a < S.wMax ? " Deposit " + money(S.wMax) + " for the full bonus." : "");
    else if (o === "premiere")
      t = "You play with <b>" + money(a) + "</b> and get " + S.pSpins + " free spins at &euro;" + S.pVal + ". Spin winnings need " + S.pWag + "x wagering.";
    else
      t = "You play with <b>" + money(a) + "</b> of your own money. No wagering.";
    $("dCalc").innerHTML = t;
  }
  function depSummary() {
    var a = depAmount(), m = method(depMethod), o = depPick("dOfferPick"), b = Math.min(a * S.wMatch / 100, S.wMax);
    var rows = [
      ["Amount", money(a)],
      ["Method", m[1] + " (" + m[5].toLowerCase() + ")"],
      ["Offer", o === "welcome" ? "Welcome package" : o === "premiere" ? "Premiere spins" : "No bonus"],
      ["Wagering", o === "welcome" ? money(b * S.wWag) + " of bets on the bonus" : o === "premiere" ? S.pWag + "x the spin winnings" : "None"],
      ["You play with", o === "welcome" ? money(a + b) + " + " + S.wSpins + " free spins" : o === "premiere" ? money(a) + " + " + S.pSpins + " free spins" : money(a)]
    ];
    $("dSum").innerHTML = rows.map(function(r) {
      return "<div><dt>" + r[0] + "</dt><dd>" + r[1] + "</dd></div>";
    }).join("");
  }
  function wireDeposit() {
    var f = $("fDep");
    if (!f)
      return;
    depMethod = null;
    f.addEventListener("click", function(e) {
      var c = e.target.closest("[data-amt]");
      if (c) {
        $("dAmt").value = c.getAttribute("data-amt");
        $("dAmt").dispatchEvent(new Event("input", { bubbles: true }));
      }
      if (e.target.closest("[data-prev]")) {
        depMethod = null;
        $("dMethod-err").hidden = true;
        f.querySelector('[data-f="dMethod"]').classList.remove("bad");
        showStep(f, 0);
      }
      var t = e.target.closest("[data-method]");
      if (t) {
        depMethod = t.getAttribute("data-method");
        [].forEach.call(f.querySelectorAll("[data-method]"), function(b) {
          b.setAttribute("aria-pressed", String(b === t));
        });
        if (!check(f.querySelector('.jstep[data-step="1"]'))) {
          t.focus();
          return;
        }
        depSummary();
        finish(f, "depDone");
        depMethod = null;
      }
    });
    f.addEventListener("input", function(e) {
      if (e.target.id === "dAmt") {
        chipState();
        depOffers();
      }
    });
    f.addEventListener("change", function(e) {
      if (e.target.name === "dOfferPick")
        depCalc();
    });
    f.addEventListener("submit", function(e) {
      e.preventDefault();
      var step = f.querySelector(".jstep:not([hidden])"), n = +step.getAttribute("data-step");
      if (n === 0 && check(step)) {
        $("dAmtShow").innerHTML = money(depAmount());
        showStep(f, 1);
      }
    });
    function chipState() {
      [].forEach.call(f.querySelectorAll("[data-amt]"), function(b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-amt") === val("dAmt")));
      });
    }
    depOffers();
  }
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function val(id) {
    var e = $(id);
    return e ? e.value.trim() : "";
  }
  function phoneDigits() {
    return val("jPhone").replace(/[\s()-]/g, "").replace(/^0/, "");
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
      return !v ? "Type your mobile number." : !/^\d{6,14}$/.test(v) ? "Use digits only, 6 to 14 of them, without the country code." : "";
    },
    jSend: function() {
      return srv.jPhone && srv.jPhone === phoneDigits() ? "That number is already registered. Use another number, or log in." : "";
    },
    jOffer: function() {
      return document.querySelector('input[name="jOfferPick"]:checked') ? "" : "Choose a welcome bonus, or join without one.";
    },
    jAge: function() {
      return $("jAge").checked ? "" : "Tick to confirm you are 18 or older and accept the terms.";
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
      var raw = val("dAmt"), a = depAmount();
      return !raw ? "Choose or type an amount." : isNaN(a) ? "Use a number, like 50 or 25.50." : a < DEP_MIN ? "The minimum deposit is " + money(DEP_MIN).replace("&euro;", "€") + "." : a > DEP_MAX ? "The most you can deposit is " + money(DEP_MAX).replace("&euro;", "€") + "." : "";
    },
    dMethod: function() {
      var m = method(depMethod), a = depAmount();
      if (!m)
        return "Choose a payment method.";
      return a < m[3] ? "The minimum deposit by " + m[1].toLowerCase() + " is " + money(m[3]).replace("&euro;", "€") + "." : a > m[4] ? "The most you can deposit by " + m[1].toLowerCase() + " is " + money(m[4]).replace("&euro;", "€") + "." : "";
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
      if (f.closest("[hidden]") && f.closest("[hidden]") !== scope && scope.contains(f.closest("[hidden]")))
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
    var box = form.closest(".cash-box");
    if (box) {
      box.scrollTop = 0;
      return;
    }
    window.scrollTo({ top: Math.max(0, d.getBoundingClientRect().top + scrollY - 120), behavior: "auto" });
  }
  function showStep(form, n) {
    [].forEach.call(form.querySelectorAll(".jstep"), function(s) {
      s.hidden = +s.getAttribute("data-step") !== n;
    });
    var cur = form.querySelector('.jstep[data-step="' + n + '"]');
    cur.querySelector(".step-h").focus();
    var box = form.closest(".cash-box");
    if (box) {
      box.scrollTop = 0;
      return;
    }
    var top = form.getBoundingClientRect().top + scrollY - 110;
    if (scrollY > top)
      window.scrollTo({ top, behavior: "auto" });
  }
  function verifyStep(j, sent) {
    $("jFull").textContent = $("jCC").value + " " + val("jPhone");
    $("jMasked").textContent = $("jCC").value + " •••• " + phoneDigits().slice(-2);
    $("jSendBox").hidden = sent;
    $("jCodeBox").hidden = !sent;
    if (!sent) {
      $("jSend-err").hidden = true;
      $("jSendBox").querySelector(".f").classList.remove("bad");
    }
    j.querySelector('.jstep[data-step="1"] .pf-sum').hidden = true;
  }
  function register(j) {
    var em = val("jEmail").toLowerCase(), u = val("jUser").toLowerCase(), s0 = j.querySelector('.jstep[data-step="0"]');
    if (em === RESERVED.email) {
      srv.jEmail = em;
      showStep(j, 0);
      check(s0);
      return;
    }
    if (u && RESERVED.users.indexOf(u) >= 0) {
      srv.jUser = u;
      showStep(j, 0);
      check(s0);
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
      wireJoinPickers();
      $("jCC").addEventListener("change", joinCountry);
      $("jCur").addEventListener("change", priceOffer);
      joinCountry();
    }
    if (j)
      j.addEventListener("submit", function(e) {
        e.preventDefault();
        var step = j.querySelector(".jstep:not([hidden])"), n = +step.getAttribute("data-step");
        if (n === 0) {
          if (!check(step))
            return;
          if (verifiedPhone === $("jCC").value + phoneDigits()) {
            register(j);
            return;
          }
          verifyStep(j, false);
          showStep(j, 1);
          return;
        }
        if (!$("jSendBox").hidden) {
          if (phoneDigits() === RESERVED.phone) {
            srv.jPhone = phoneDigits();
            check($("jSendBox"));
            j.querySelector('.jstep[data-step="1"] [data-prev]').focus();
            return;
          }
          verifyStep(j, true);
          $("jCode").focus();
          return;
        }
        if (!check($("jCodeBox")))
          return;
        if (val("jCode") === RESERVED.code) {
          srv.jCode = RESERVED.code;
          check($("jCodeBox"));
          return;
        }
        verifiedPhone = $("jCC").value + phoneDigits();
        $("jCode").value = "";
        register(j);
      });
    if (j)
      j.addEventListener("click", function(e) {
        if (e.target.closest("[data-prev]")) {
          showStep(j, 0);
          $("jPhone").focus();
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
  var inerted = [];
  function modalOn() {
    var keep = page;
    inerted = [];
    for (var el = keep; el && el !== document.body; el = el.parentElement) {
      [].forEach.call(el.parentElement.children, function(sib) {
        if (sib !== el && !sib.inert && !/^(SCRIPT|STYLE|LINK)$/.test(sib.tagName)) {
          sib.inert = true;
          inerted.push(sib);
        }
      });
    }
  }
  function modalOff() {
    inerted.forEach(function(el) {
      el.inert = false;
    });
    inerted = [];
  }
  function boxFocusables(box) {
    return [].filter.call(box.querySelectorAll("a[href], button, input, select, textarea, [tabindex]"), function(el) {
      if (el.disabled || el.getAttribute("tabindex") === "-1" || el.closest("[hidden]") || !el.getClientRects().length)
        return false;
      if (el.type === "radio" && !el.checked) {
        var g = box.querySelectorAll('input[type="radio"][name="' + el.name + '"]');
        return ![].some.call(g, function(r) {
          return r.checked;
        }) && g[0] === el;
      }
      return true;
    });
  }
  document.addEventListener("keydown", function(e) {
    var box = page.querySelector(".cash-modal .cash-box");
    if (!box || page.hidden)
      return;
    if (e.key === "Escape") {
      e.preventDefault();
      var x = box.querySelector(".cash-x");
      if (x)
        x.click();
      return;
    }
    if (e.key !== "Tab")
      return;
    var f = boxFocusables(box), a = document.activeElement, inside = box.contains(a);
    if (!f.length)
      return;
    var before = inside && f.some(function(el) {
      return el !== a && el.compareDocumentPosition(a) & 4;
    }), after = inside && f.some(function(el) {
      return el !== a && el.compareDocumentPosition(a) & 2;
    });
    if (e.shiftKey && !before) {
      e.preventDefault();
      f[f.length - 1].focus();
    } else if (!e.shiftKey && !after) {
      e.preventDefault();
      f[0].focus();
    }
  }, true);
  document.addEventListener("focusin", function(e) {
    var box = page.querySelector(".cash-modal .cash-box");
    if (!box || page.hidden || box.contains(e.target))
      return;
    var t = box.querySelector("#pgTitle") || boxFocusables(box)[0];
    if (t)
      t.focus({ preventScroll: true });
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
    page.innerHTML = (/(^| )pg-(help|contact|about|resp|legal)( |$)/.test(cls) ? '<div class="lobby-bar"><a class="more lobby-back" href="#/">&larr; Back to lobby</a></div>' : "") + html;
    page.hidden = false;
    P.setChip(null);
    document.body.classList.toggle("v-auth", / pg-box/.test(" " + cls));
    wireForms();
    wireDeposit();
    wireHelp();
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
    document.body.classList.remove("v-auth", "v-modal");
    modalOff();
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
        P.openSearch(!!opt.restore);
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
        P.showLobby();
        page.className = "page pg-deposit";
        page.innerHTML = depositPage();
        page.hidden = false;
        document.body.classList.add("v-modal");
        wireDeposit();
        modalOn();
        y = null;
        break;
      case "reset":
        showPage(resetPage(r.step), "pg-box");
        break;
      case "promotions":
        showPage(promosPage(), "pg-promos");
        break;
      case "offer":
        showPage(promosPage(r.k), "pg-promos pg-offer");
        focusEl = $("ot-" + r.k);
        y = $("offer-" + r.k).getBoundingClientRect().top + scrollY - $("top").offsetHeight - 14;
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
      var rs = opt.restore.rails;
      if (rs)
        rails().forEach(function(t, i) {
          if (rs[i] != null && t.scrollLeft !== rs[i])
            t.scrollTo({ left: rs[i], behavior: "auto" });
        });
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
  var seq = 0, key = 0, mem = {}, hashAt = {}, prevOf = {};
  function rails() {
    return [].filter.call(document.querySelectorAll(".track"), function(t) {
      return t.offsetParent !== null;
    });
  }
  history.scrollRestoration = "manual";
  function remember(opener) {
    var o = opener || document.activeElement;
    var at = place(o);
    mem[key] = { y: window.scrollY, opener: o && o !== document.body ? o : null, href: o && o.getAttribute && o.getAttribute("href"), region: at.region, nth: at.nth, rails: rails().map(function(t) {
      return t.scrollLeft;
    }) };
  }
  function norm(h) {
    return h === "#" || h === "" ? "#/" : h;
  }
  function go(href, opener) {
    href = norm(href);
    // data-back: return to the entry before this one (same page, rail, scroll and control) instead of stacking a new one.
    // An empty data-back returns to whatever came before; data-back="<address>" only when that address came before.
    if (opener && opener.hasAttribute && opener.hasAttribute("data-back") && key > 0 && prevOf[key] !== void 0) {
      var want = opener.getAttribute("data-back");
      if (!want || norm(hashAt[prevOf[key]] || "") === norm(want)) {
        history.back();
        return;
      }
    }
    var r = parse(href);
    if (r.canon)
      href = r.canon;
    if (href === norm(location.hash) && r.v !== "search") {
      render(r, {});
      return;
    }
    if (opener && opener.closest && opener.closest(".auth-tabs") && route && /^(join|login|reset|play)$/.test(route.v)) {
      history.replaceState({ k: key }, "", href);
      hashAt[key] = href;
      render(r, {});
      return;
    }
    remember(opener);
    var from = key;
    history.pushState({ k: key = ++seq }, "", href);
    prevOf[key] = from;
    hashAt[key] = href;
    render(r, {});
  }
  window.addEventListener("popstate", function(e) {
    remember(null);
    var k = e.state && e.state.k;
    if (k == null) {
      k = ++seq;
      prevOf[k] = key;
      history.replaceState({ k }, "", location.hash || "#/");
    }
    hashAt[k] = norm(location.hash);
    key = k;
    var r = parse(location.hash);
    if (r.canon) {
      history.replaceState({ k }, "", r.canon);
      hashAt[k] = r.canon;
    }
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
        var from = key;
        history.pushState({ k: key = ++seq }, "", "#/search");
        prevOf[key] = from;
        hashAt[key] = "#/search";
        route = { v: "search" };
        P.hidePage();
        P.hideStudios();
        document.body.classList.remove("v-prov");
        title("Search");
      }
      if (!on && route && route.v === "search") {
        sQuery = "";
        history.replaceState({ k: key }, "", "#/");
        hashAt[key] = "#/";
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
    hashAt[0] = norm(location.hash);
    render(r, { initial: true });
  })();
})();
