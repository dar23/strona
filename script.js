document.documentElement.classList.add('js-enabled');

const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const progressBar = document.querySelector('.scroll-progress span');
const siteHeader = document.querySelector('.site-header');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    entries.forEach(entry => entry.target.classList.toggle('is-visible', entry.isIntersecting));
  },  { threshold: .08, rootMargin: '0px 0px -30px 0px' });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

const process = document.querySelector('[data-process]');
const processSteps = [...document.querySelectorAll('[data-process-step]')];
let scrollFrame = 0;
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
  scrollFrame = 0;
};
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
