const heartsLayer = document.getElementById('heartsLayer');
const matchaLayer = document.getElementById('matchaLayer');

for (let i = 0; i < 18; i += 1) {
  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.textContent = '❤';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${Math.random() * 1.6 + 1}rem`;
  heart.style.animationDuration = `${Math.random() * 10 + 12}s`;
  heart.style.animationDelay = `${Math.random() * 5}s`;
  heart.style.setProperty('--drift', `${(Math.random() - 0.5) * 180}px`);
  heartsLayer.appendChild(heart);
}

for (let i = 0; i < 4; i += 1) {
  const matcha = document.createElement('span');
  matcha.className = 'matcha';
  matcha.textContent = '🍵';
  matcha.style.left = `${Math.random() * 100}%`;
  matcha.style.fontSize = `${Math.random() * 1.1 + 1.1}rem`;
  matcha.style.animationDuration = `${Math.random() * 9 + 14}s`;
  matcha.style.animationDelay = `${Math.random() * 7}s`;
  matcha.style.setProperty('--drift', `${(Math.random() - 0.5) * 180}px`);
  matchaLayer.appendChild(matcha);
}

const navPills = document.querySelectorAll('.nav-pill');
const screens = document.querySelectorAll('.screen');
const screenLinks = document.querySelectorAll('[data-screen]');
const loveTimer = document.getElementById('loveTimer');
const startDate = new Date('2026-07-26T00:00:00');

const formatDuration = (totalSeconds) => {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
};

const updateLoveTimer = () => {
  if (!loveTimer) return;
  const now = new Date();
  const diffSeconds = Math.max(0, Math.floor((now - startDate) / 1000));
  loveTimer.textContent = formatDuration(diffSeconds);
};

const showScreen = (screenId) => {
  screens.forEach((screen) => {
    screen.classList.toggle('active-screen', screen.id === screenId);
  });

  navPills.forEach((pill) => {
    pill.classList.toggle('active', pill.dataset.screen === screenId);
  });
};

const openLetterBtn = document.getElementById('openLetterBtn');
const letterModal = document.getElementById('letterModal');
const closeLetterButtons = document.querySelectorAll('[data-close-letter]');
const letterNextButtons = document.querySelectorAll('.letter-next');
const secretBtn = document.getElementById('secretBtn');
const quizBtn = document.getElementById('quizBtn');
const secretModal = document.getElementById('secretModal');
const passwordForm = document.getElementById('passwordForm');
const secretPassword = document.getElementById('secretPassword');
const passwordError = document.getElementById('passwordError');
const passwordGate = document.getElementById('passwordGate');
const secretContent = document.getElementById('secretContent');
const loveButton = document.getElementById('secretloveButton');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');

const celebrateSprinkles = () => {
  const sprinkleLayer = document.createElement('div');
  sprinkleLayer.className = 'sprinkle-layer';
  const shapes = ['❤', '✦', '✧', '●', '◆'];
  const colors = ['rose', 'peach', 'lavender', 'white'];

  for (let i = 0; i < 28; i += 1) {
    const sprinkle = document.createElement('span');
    sprinkle.className = 'sprinkle';
    sprinkle.textContent = shapes[i % shapes.length];
    sprinkle.classList.add(colors[i % colors.length]);
    sprinkle.style.setProperty('--x', `${(Math.random() - 0.5) * 95}vw`);
    sprinkle.style.setProperty('--y', `${-Math.random() * 75 - 10}vh`);
    sprinkle.style.setProperty('--rotate', `${Math.random() * 720 - 360}deg`);
    sprinkle.style.setProperty('--delay', `${Math.random() * 0.15}s`);
    sprinkleLayer.appendChild(sprinkle);
  }

  document.body.appendChild(sprinkleLayer);
  setTimeout(() => sprinkleLayer.remove(), 1200);
};

const openModal = () => {
  secretModal.classList.add('open');
  secretModal.setAttribute('aria-hidden', 'false');
  passwordGate.hidden = false;
  secretContent.hidden = true;
  passwordError.textContent = '';
  secretPassword.value = '';
  setTimeout(() => secretPassword.focus(), 150);
};

const closeModal = () => {
  secretModal.classList.remove('open');
  secretModal.setAttribute('aria-hidden', 'true');
};

const openLetter = () => {
  letterModal.classList.add('open');
  letterModal.setAttribute('aria-hidden', 'false');
};

const closeLetter = () => {
  letterModal.classList.remove('open');
  letterModal.setAttribute('aria-hidden', 'true');
};

secretBtn.addEventListener('click', openModal);
openLetterBtn.addEventListener('click', openLetter);
quizBtn.addEventListener('click', openModal);
loveButton.addEventListener('click', () => {
  if (loveButton.textContent === 'I love you😘😘') {
    loveButton.textContent = 'I love you more😘😘';
    return;
  }

  celebrateSprinkles();
  closeModal();
  loveButton.textContent = 'I love you😘😘';
});

passwordForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (secretPassword.value === '191211') {
    passwordGate.hidden = true;
    secretContent.hidden = false;
    passwordError.textContent = '';
    return;
  }

  passwordError.textContent = 'That code is not quite right — try again, sweetheart 💕';
  secretPassword.select();
});

closeModalButtons.forEach((button) => button.addEventListener('click', closeModal));
closeLetterButtons.forEach((button) => button.addEventListener('click', closeLetter));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
  if (event.key === 'Escape') closeLetter();
});

screenLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    showScreen(link.dataset.screen);
  });

  letterNextButtons.forEach((button) => {
    button.addEventListener('click', closeLetter);
  });
});

const initialScreen = 'story';
showScreen(initialScreen);
updateLoveTimer();
setInterval(updateLoveTimer, 1000);
window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
window.addEventListener('load', () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
});
