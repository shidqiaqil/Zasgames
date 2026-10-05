function speak(text, lang) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang || 'id-ID';
  utter.rate = 0.85;
  utter.pitch = 1.1;
  window.speechSynthesis.speak(utter);
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showStage(emoji, label, speakText, lang) {
  const stage = document.getElementById('big-stage');
  document.getElementById('big-emoji').textContent = emoji;
  document.getElementById('big-label').textContent = label;
  stage.classList.add('active');
  speak(speakText, lang);
  clearTimeout(window._stageTimer);
  window._stageTimer = setTimeout(() => stage.classList.remove('active'), 1600);
}

function buildLetterGrid(containerId, list, lang) {
  const grid = document.getElementById(containerId);
  list.forEach((item, i) => {
    const btn = document.createElement('button');
    btn.className = 'letter-btn';
    btn.style.background = colorFor(i);
    btn.textContent = item.label;
    btn.addEventListener('click', () => showStage(item.label, item.speak, item.speak, lang));
    grid.appendChild(btn);
  });
}

function buildCardGrid(containerId, list, lang) {
  const grid = document.getElementById(containerId);
  list.forEach((item, i) => {
    const btn = document.createElement('button');
    btn.className = 'card-btn';
    btn.style.background = colorFor(i);
    btn.innerHTML = `<span class="emoji">${item.emoji}</span><span class="label">${item.label}</span>`;
    btn.addEventListener('click', () => showStage(item.emoji, item.label, item.speak, lang));
    grid.appendChild(btn);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildLetterGrid('abc-grid', ABC_LIST, 'id-ID');
  buildLetterGrid('hijaiyah-grid', HIJAIYAH_LIST, 'id-ID');
  buildCardGrid('hewan-grid', HEWAN_LIST, 'id-ID');
  buildCardGrid('angka-grid', ANGKA_LIST, 'id-ID');
  buildCardGrid('planet-grid', PLANET_LIST, 'id-ID');

  document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('click', () => showScreen(btn.dataset.target));
  });

  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => showScreen('home'));
  });

  document.getElementById('big-stage').addEventListener('click', () => {
    document.getElementById('big-stage').classList.remove('active');
  });
});
