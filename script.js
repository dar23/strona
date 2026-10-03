document.documentElement.classList.add('js-enabled');

const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const progressBar = document.querySelector('.scroll-progress span');
const siteHeader = document.querySelector('.site-header');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
  const sky = document.createElement('div');
  sky.className = 'gulls';
  sky.setAttribute('aria-hidden', 'true');
  const gull = '<svg viewBox="0 0 80 40" focusable="false"><path class="gull-wing" d="M37 21C32 13 22 7 10 7C5 7 2 9 1 11C10 10 18 13 25 18C30 22 34 25 38 25Z"/><path class="gull-wing gull-wing-far" d="M41 21C46 13 56 7 68 7C73 7 76 9 77 11C68 10 60 13 53 18C48 22 44 25 40 25Z"/><path class="gull-body" d="M30 24C34 20 42 19 50 19.5C53 19 56 19.8 58 21L66 21.8L58 23C54 25.5 46 26.5 40 26C36 26 33 25.5 30 24Z"/></svg>';
  [['30%', 42, 0, .8, 1.0, 0], ['55%', 36, 18, .6, 1.7, .5], ['calc(100% + 1rem)', 48, 9, .65, 1.4, .3]].forEach(([top, dur, delay, scale, flap, flapDelay]) => {
    const g = document.createElement('span');
    g.className = 'gull';
    g.style.cssText = `--top:${top};--dur:${dur}s;--delay:-${delay}s;--s:${scale};--flap:${flap}s;--flap-delay:-${flapDelay}s`;
    g.innerHTML = gull;
    sky.appendChild(g);
  });
  const area = document.querySelector('.services-section .section-topline');
  if (area) area.prepend(sky);
}

const setMenu = open => {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
  mobileMenu.classList.toggle('is-open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('menu-open', open);
};

menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
mobileMenu?.addEventListener('click', event => {
  if (event.target instanceof HTMLAnchorElement) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') setMenu(false);
});
document.addEventListener('click', event => {
  if (menuButton?.getAttribute('aria-expanded') !== 'true') return;
  if (event.target instanceof Element && !event.target.closest('.site-header')) setMenu(false);
});

const revealItems = [...document.querySelectorAll('[data-reveal]')];
if ('IntersectionObserver' in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
      else if (entry.boundingClientRect.top > 0) entry.target.classList.remove('is-visible');
    });
  },  { threshold: .08, rootMargin: '0px 0px -30px 0px' });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}
const teamCards = [...document.querySelectorAll('.team-lead')];
if ('IntersectionObserver' in window && !reducedMotion) {
  const nameObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => teamCards.forEach(card => card.classList.toggle('names-in', entry.isIntersecting)));
  }, { rootMargin: '-48% 0px -48% 0px' });
  nameObserver.observe(document.querySelector('.team-grid'));
} else {
  teamCards.forEach(card => card.classList.add('names-in'));
}

const process = document.querySelector('[data-process]');
const processSteps = [...document.querySelectorAll('[data-process-step]')];
let scrollFrame = 0;
const heroSection = document.querySelector('.hero');
const updateScroll = () => {
  siteHeader?.classList.toggle('is-scrolled', window.scrollY > 40);
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.transform = `scaleX(${maxScroll > 0 ? window.scrollY / maxScroll : 0})`;
  if (process) {
    const rect = process.getBoundingClientRect();
    const range = Math.max(1, rect.height - window.innerHeight * .35);
    const progress = Math.max(0, Math.min(1, (window.innerHeight * .65 - rect.top) / range));
    const fill = process.querySelector('.process-rail span');
    process.style.setProperty('--process-progress', progress);
    fill.style.transform = `scale${window.innerWidth <= 680 ? 'Y' : 'X'}(${progress})`;
    processSteps.forEach((step, index) => step.classList.toggle('is-active', progress >= index / processSteps.length));
  }
  const banner = document.querySelector('.project-banner');
  if (heroSection && !reducedMotion) {
    const heroP = Math.min(1, Math.max(0, window.scrollY / heroSection.offsetHeight));
    heroSection.style.setProperty('--hero-p', heroP.toFixed(3));
  }
  if (banner) {
    const r = banner.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * .95 - r.top) / (innerHeight * .3)));
    banner.style.setProperty('--chart-p', p.toFixed(3));
  }
  scrollFrame = 0;
};
const wheel =  document.querySelector('.service-wheel');
const wheelAngles = [-50, 50, -110, 110];
document.querySelectorAll('.service-card').forEach((card, index) => {
  const turn = () => wheel?.style.setProperty('--wheel-rot', `${wheelAngles[index] ?? 0}deg`);
  const reset = () => wheel?.style.setProperty('--wheel-rot', '0deg');
  card.addEventListener('pointerenter', turn);
  card.addEventListener('pointerleave', reset);
  card.addEventListener('focus', turn);
  card.addEventListener('blur', reset);
});
window.addEventListener('scroll', () => {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(updateScroll);
}, { passive: true });
window.addEventListener('resize', updateScroll, { passive: true });
updateScroll();

const videos = [...document.querySelectorAll('.hero-video')];
const shots = [
  { src: 'media/sailing-01.mp4', poster: 'media/sailing-01.jpg', start: 0 },
  { src: 'media/sailing-02.mp4', poster: 'media/sailing-02.jpg', start: 0 },
  { src: 'media/sailing-03.mp4', poster: 'media/sailing-03.jpg', start: 0 }
];
const heroPoster = document.querySelector('.hero-poster');
let shotIndex = 0;
let activeVideo = 0;
let shotTimer;
let loadToken = 0;

const showShot = (index, initial = false) => {
  if (reducedMotion || videos.length !== 2) return;
  const token = ++loadToken;
  const nextVideoIndex = initial ? activeVideo : 1 - activeVideo;
  const nextVideo = videos[nextVideoIndex];
  const shot = shots[index];
  nextVideo.pause();
  nextVideo.classList.remove('is-active');
  nextVideo.poster = shot.poster;
  if (heroPoster) heroPoster.src = shot.poster;
  const sourceChanged = nextVideo.getAttribute('src') !== shot.src;
  if (sourceChanged) nextVideo.src = shot.src;
  nextVideo.onloadedmetadata = () => {
    if (token !== loadToken) return;
    const maxStart = Math.max(0, nextVideo.duration - 3.8);
    nextVideo.currentTime = Math.min(shot.start, maxStart);
    nextVideo.play().then(() => {
      if (token !== loadToken) return;
      nextVideo.classList.add('is-active');
      if (!initial) {
        videos[activeVideo].pause();
        videos[activeVideo].classList.remove('is-active');
      }
      activeVideo = nextVideoIndex;
      shotIndex = (index + 1) % shots.length;
      clearTimeout(shotTimer);
      shotTimer = window.setTimeout(() => showShot(shotIndex), 3800);
    }).catch(error => console.warn('Sailing video could not autoplay; the poster remains visible.', error));
  };
  nextVideo.onerror = () => console.error('Sailing video failed to load.', nextVideo.error);
  if (sourceChanged || nextVideo.readyState < HTMLMediaElement.HAVE_METADATA) {
    nextVideo.load();
  } else {
    nextVideo.onloadedmetadata();
  }
};

if (reducedMotion) {
  videos.forEach(video => {
    video.autoplay = false;
    video.pause();
    video.classList.remove('is-active');
  });
} else if (videos.length === 2) {
  showShot(0, true);
}








const anatomy = document.querySelector('[data-anatomy]');
if (anatomy) {
  const parts = {
    mast: ['01', 'Maszty i takielunek', 'Aluminium, węgiel i drewno. Maszty oraz takielunek dobrane do jachtu i sposobu żeglowania.', 'maszty-i-takielunek.html'],
    fittings: ['02', 'Okucia i osprzęt', 'Bezpieczeństwo w każdym detalu: okucia, windy i osprzęt, który wytrzymuje obciążenia na wodzie.', 'okucia-i-osprzet.html'],
    hull: ['03', 'Custom design', 'Projekt od podstaw: rozwiązania szyte na miarę konkretnego jachtu.', 'custom-design.html'],
    rigging: ['04', 'Architektoniczne systemy cięgnowe', 'Technologia takielunku przeniesiona do architektury.', 'systemy-ciegowe.html']
  };
  const panel = anatomy.querySelector('.anatomy-panel');
  const spots = [...anatomy.querySelectorAll('.hotspot')];
  const select = key => {
    if (anatomy.dataset.active === key && panel.dataset.ready) return;
    const [num, title, text, href] = parts[key];
    anatomy.dataset.active = key;
    panel.dataset.ready = '1';
    anatomy.querySelector('[data-anatomy-num]').textContent = num;
    anatomy.querySelector('[data-anatomy-title]').textContent = title;
    anatomy.querySelector('[data-anatomy-text]').textContent = text;
    anatomy.querySelector('[data-anatomy-link]').href = href;
    spots.forEach(spot => spot.classList.toggle('is-active', spot.dataset.part === key));
    panel.classList.remove('is-swapping');
    void panel.offsetWidth;
    panel.classList.add('is-swapping');
  };
  spots.forEach(spot => {
    ['pointerenter', 'focus', 'click'].forEach(type => spot.addEventListener(type, () => select(spot.dataset.part)));
  });
  spots[0].classList.add('is-active');
}
