// ---------- Suara ----------
let audioCtx;
function ctx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function tone(freq, start, dur, type = 'sine', vol = 0.25, slideTo) {
  const ac = ctx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ac.currentTime + start);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, ac.currentTime + start + dur);
  gain.gain.setValueAtTime(vol, ac.currentTime + start);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + start + dur);
  osc.connect(gain).connect(ac.destination);
  osc.start(ac.currentTime + start);
  osc.stop(ac.currentTime + start + dur);
}

const sfx = {
  pop: () => tone(600, 0, 0.12, 'triangle', 0.35, 1400),
  tap: () => tone(500, 0, 0.1, 'sine', 0.2, 800),
  boing: () => tone(200, 0, 0.35, 'sine', 0.3, 600),
  wrong: () => tone(260, 0, 0.25, 'sine', 0.15, 200),
  win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.1, 0.25, 'triangle', 0.25))
};

function speak(text, opts = {}) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = opts.lang || 'id-ID';
  u.rate = opts.rate || 0.85;
  u.pitch = opts.pitch || 1.2;
  speechSynthesis.speak(u);
}

// ---------- Utilitas ----------
const $ = id => document.getElementById(id);
const rand = (min, max) => Math.random() * (max - min) + min;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function confetti(x, y, count = 18) {
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = x + 'px';
    c.style.top = y + 'px';
    c.style.background = pick(COLORS);
    const angle = rand(0, Math.PI * 2);
    const dist = rand(60, 180);
    c.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    c.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 950);
  }
}

function replayAnim(el, cls) {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}

// ---------- Navigasi ----------
const games = {};
let current = 'home';

function showScreen(id) {
  if (games[current] && games[current].stop) games[current].stop();
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
  current = id;
  if (games[id] && games[id].start) games[id].start();
}

// ---------- Game: Balon Huruf ----------
games.balon = (() => {
  let timer = null;
  let mode = 'abc';
  const field = $('balloon-field');

  function spawn() {
    if (field.children.length >= 6) return;
    const list = mode === 'abc' ? ABC_LIST : HIJAIYAH_LIST;
    const item = pick(list);
    const color = pick(COLORS);
    const b = document.createElement('button');
    b.className = 'balloon';
    b.textContent = item.label;
    b.style.setProperty('--c', color);
    b.style.left = rand(5, 75) + '%';
    b.style.animationDuration = rand(7, 10) + 's, 2.4s';
    b.addEventListener('pointerdown', e => {
      e.preventDefault();
      pop(b, item, color);
    });
    b.addEventListener('animationend', e => {
      if (e.animationName === 'rise') b.remove();
    });
    field.appendChild(b);
  }

  function pop(b, item, color) {
    const r = b.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    sfx.pop();
    confetti(x, y);
    b.classList.add('popped');
    setTimeout(() => b.remove(), 260);

    const big = document.createElement('div');
    big.className = 'big-letter';
    big.textContent = item.label;
    big.style.left = x + 'px';
    big.style.top = y + 'px';
    big.style.setProperty('--c', color);
    field.appendChild(big);
    setTimeout(() => big.remove(), 1250);

    speak(item.speak);
  }

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-btn').forEach(m => m.classList.remove('active'));
      btn.classList.add('active');
      mode = btn.dataset.mode;
      field.innerHTML = '';
      sfx.tap();
      spawn();
    });
  });

  return {
    start() { spawn(); timer = setInterval(spawn, 1300); },
    stop() { clearInterval(timer); field.innerHTML = ''; }
  };
})();

// ---------- Game: Suara Hewan ----------
games.hewan = (() => {
  const farm = $('farm');
  let timer = null;

  function build() {
    farm.innerHTML = '';
    shuffle(HEWAN_LIST).slice(0, 6).forEach(h => {
      const spot = document.createElement('button');
      spot.className = 'spot';
      spot.innerHTML = `<span class="name-tag">${h.name}</span><span class="animal">${h.emoji}</span><span class="bush"></span>`;
      spot.addEventListener('pointerdown', e => {
        e.preventDefault();
        sfx.boing();
        spot.classList.add('peek');
        replayAnim(spot, 'jump');
        clearTimeout(spot._t);
        spot._t = setTimeout(() => spot.classList.remove('jump', 'peek'), 2200);
        speak(`${h.name}... ${h.sound}!`);
      });
      farm.appendChild(spot);
    });
  }

  function peekRandom() {
    const spots = [...farm.querySelectorAll('.spot:not(.jump)')];
    if (!spots.length) return;
    const s = pick(spots);
    s.classList.add('peek');
    setTimeout(() => { if (!s.classList.contains('jump')) s.classList.remove('peek'); }, 1200);
  }

  return {
    start() { build(); timer = setInterval(peekRandom, 1100); },
    stop() { clearInterval(timer); }
  };
})();

// ---------- Game: Cari yang Mana? ----------
games.cari = (() => {
  const choicesEl = $('choices');
  const questionEl = $('question');
  const starsEl = $('stars');
  let stars = 0;
  let answer = null;
  let locked = false;

  function ask() {
    speak(`Mana ${answer.name}?`);
  }

  function round() {
    locked = false;
    const options = shuffle(HEWAN_LIST).slice(0, 3);
    answer = pick(options);
    questionEl.textContent = `🔊 Mana ${answer.name.toLowerCase()}?`;
    choicesEl.innerHTML = '';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'choice';
      btn.textContent = opt.emoji;
      btn.addEventListener('pointerdown', e => {
        e.preventDefault();
        choose(btn, opt);
      });
      choicesEl.appendChild(btn);
    });
    setTimeout(ask, 300);
  }

  function choose(btn, opt) {
    if (locked) return;
    if (opt === answer) {
      locked = true;
      btn.classList.add('right');
      const r = btn.getBoundingClientRect();
      confetti(r.left + r.width / 2, r.top + r.height / 2, 30);
      sfx.win();
      stars++;
      starsEl.textContent = `⭐ ${stars}`;
      replayAnim(starsEl, 'bump');
      speak(pick(['Hebat!', 'Pintar!', 'Betul sekali!', 'Yeay!']) + ` Ini ${answer.name}, ${answer.sound}!`);
      setTimeout(round, 2600);
    } else {
      sfx.wrong();
      replayAnim(btn, 'wrong');
      speak(`Ini ${opt.name}. Coba lagi ya!`);
    }
  }

  questionEl.addEventListener('click', () => { sfx.tap(); ask(); });

  return { start: round };
})();

// ---------- Game: Tata Surya ----------
games.planet = (() => {
  const solar = $('solar');
  const label = $('planet-label');
  let labelTimer;

  PLANET_LIST.forEach((p, i) => {
    const orbit = document.createElement('div');
    orbit.className = 'orbit';
    const pct = 22 + i * 10.5;
    orbit.style.width = pct + '%';
    orbit.style.height = pct + '%';

    const spin = document.createElement('div');
    spin.className = 'orbit-spin';
    spin.style.animationDuration = (8 + i * 4) + 's';
    spin.style.animationDelay = -rand(0, 20) + 's';

    const btn = document.createElement('button');
    btn.className = 'planet-btn' + (p.ring ? ' ring' : '');
    btn.style.width = p.size + 'px';
    btn.style.height = p.size + 'px';
    btn.style.background = `radial-gradient(circle at 35% 35%, #fff8 0 8%, ${p.color} 30%)`;
    btn.addEventListener('pointerdown', e => {
      e.preventDefault();
      sfx.boing();
      orbit.classList.add('paused');
      replayAnim(btn, 'zoom');
      setTimeout(() => orbit.classList.remove('paused'), 1200);
      show(p.name);
      speak(`Planet ${p.name}`);
    });

    spin.appendChild(btn);
    orbit.appendChild(spin);
    solar.appendChild(orbit);
  });

  $('sun').addEventListener('pointerdown', e => {
    e.preventDefault();
    sfx.win();
    show('Matahari');
    speak('Matahari. Panas sekali!');
  });

  function show(text) {
    label.textContent = text;
    label.classList.add('show');
    clearTimeout(labelTimer);
    labelTimer = setTimeout(() => label.classList.remove('show'), 2000);
  }

  return {};
})();

// ---------- Init ----------
document.querySelectorAll('.menu-btn').forEach(btn => {
  btn.addEventListener('click', () => { sfx.tap(); showScreen(btn.dataset.target); });
});
document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', () => { sfx.tap(); speechSynthesis.cancel(); showScreen('home'); });
});
$('mascot').addEventListener('click', () => {
  sfx.boing();
  replayAnim($('mascot'), 'wiggle');
  speak(pick(['Halo! Ayo main!', 'Cip cip cip!', 'Yuk belajar!']));
});
$('mascot').addEventListener('animationend', e => {
  if (e.animationName === 'wiggle') $('mascot').classList.remove('wiggle');
});
