gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// GSAP smooth scroll
if (!reduce) {
  ScrollSmoother.create({ wrapper: '#smooth-wrapper', content: '#smooth-content', smooth: 1.4, effects: false });
}

// split multi-line text into masked lines
document.querySelectorAll('.s1 h1, .body:not(.svc), .reach, .office').forEach(el => {
  el.innerHTML = el.innerHTML.split(/<br\s*\/?>/i).map(l => `<span class="ln"><span>${l}</span></span>`).join('');
});

// every slide animates in as it scrolls into view (and out again on the way back up)
if (!reduce) {
  document.querySelectorAll('.slide').forEach(slide => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: slide, start: 'top 65%', toggleActions: 'play none none reverse' }
    });
    const lines = slide.querySelectorAll('.ln > span');
    const logo = slide.querySelector('.logo');
    const head = slide.querySelectorAll('.head, .talk, .kc, .kc-india');
    if (logo) tl.from(logo, { opacity: 0, scale: .8, rotate: -25, duration: 1.2, ease: 'power3.out' }, 0);
    if (head.length) tl.from(head, { opacity: 0, x: -40, duration: 1, ease: 'power3.out' }, 0);
    if (lines.length) tl.from(lines, { yPercent: 110, opacity: 0, duration: 1.1, stagger: .12, ease: 'power4.out' }, .15);
    const svc = slide.querySelectorAll('.svc li');
    if (svc.length) tl.from(svc, { opacity: 0, y: 40, duration: .9, stagger: .09, ease: 'power3.out' }, .15);
    slide.querySelectorAll('.work').forEach((w, i) => {
      tl.from(w.querySelector('.thumb'), { clipPath: 'inset(0 0 100% 0)', duration: 1.3, ease: 'power4.inOut' }, .1 + i * .2);
      tl.from(w.querySelector('.thumb img'), { scale: 1.35, duration: 1.8, ease: 'power3.out' }, .1 + i * .2);
      tl.from(w.querySelector('figcaption'), { opacity: 0, y: 20, duration: .8, ease: 'power3.out' }, .7 + i * .2);
    });
    const social = slide.querySelector('.social');
    if (social) tl.from(social.children, { opacity: 0, y: 20, stagger: .08, duration: .7 }, .6);
    const copy = slide.querySelector('.copy');
    if (copy) tl.from(copy, { opacity: 0, duration: 1 }, .9);
  });
}

// services: strike through the hovered item and peek a random mapped project
const projects = {
  0: ['assets/work/w1.jpg'],                               // Brand Identity
  2: ['assets/work/w4.jpg'],                               // Launch & Activation
  3: ['assets/work/w7-crop.jpg'],                          // Brochure & Coffee Table Book
  4: ['assets/work/w3.jpg', 'assets/work/w5.jpg'],         // Packaging & Limited Edition
  5: ['assets/work/w6.jpg'],                               // AI Films & Digital Assets
  7: ['assets/work/w2-crop.jpg', 'assets/work/w1.jpg']     // Sustainable Design
};
Object.values(projects).flat().forEach(src => { new Image().src = src; });

const svc = document.querySelector('.svc');
const peek = document.querySelector('.peek');
const peekImg = peek.querySelector('img');
const vw = n => n + 'vw';
const small = matchMedia('(max-width:820px)');
svc.querySelectorAll('li span').forEach(span => {
  const i = +span.dataset.i;
  span.addEventListener('mouseenter', () => {
    span.classList.add('on');
    svc.classList.add('hovering');
    const list = projects[i];
    if (!list) { peek.classList.remove('show'); gsap.to(peek, { opacity: 0, duration: .2 }); return; }
    peekImg.src = list[Math.floor(Math.random() * list.length)];
    const rowY = 15.31 + i * 3.2;
    const top = Math.min(42, Math.max(9, rowY - 4 + (Math.random() * 4 - 2)));
    const left = top > 23 && Math.random() < .5 ? 7.5 + Math.random() * 9 : 78 + Math.random() * 1.5;
    gsap.killTweensOf(peek);
    peek.classList.toggle('show', small.matches);
    gsap.set(peek, small.matches ? { opacity: 1, clipPath: 'inset(0 0 100% 0)' } : { left: vw(left), top: vw(top), opacity: 1, clipPath: 'inset(0 0 100% 0)' });
    gsap.to(peek, { clipPath: 'inset(0 0 0% 0)', duration: .7, ease: 'power4.out' });
    gsap.fromTo(peekImg, { scale: 1.3 }, { scale: 1, duration: 1, ease: 'power3.out' });
  });
  span.addEventListener('mouseleave', () => {
    span.classList.remove('on');
    svc.classList.remove('hovering');
    if (!small.matches) gsap.to(peek, { opacity: 0, duration: .25 });
  });
});


// key clients: logos swap in place, never repeating in the same slot
const CLIENTS = [{"src": "assets/clients/fortune-housing.png", "ar": 1.442}, {"src": "assets/clients/g-square.png", "ar": 3.759}, {"src": "assets/clients/juniar-kuppanaa-logo-b-w.png", "ar": 0.944}, {"src": "assets/clients/lifecell-logo.png", "ar": 3.629}, {"src": "assets/clients/olympia-copy.png", "ar": 1.885}, {"src": "assets/clients/ramcons-since-1971.png", "ar": 2.618}, {"src": "assets/clients/sameera-estate-copy.png", "ar": 4.169}, {"src": "assets/clients/sameera-group.png", "ar": 4.343}, {"src": "assets/clients/tt.png", "ar": 1.055}, {"src": "assets/clients/casagrand.png", "ar": 4.235}, {"src": "assets/clients/gsus.png", "ar": 2.557}, {"src": "assets/clients/inventaa.png", "ar": 4.705}, {"src": "assets/clients/iratchi-kadai.png", "ar": 1.235}, {"src": "assets/clients/levista.png", "ar": 3.418}, {"src": "assets/clients/nayak.png", "ar": 2.03}, {"src": "assets/clients/prashanth.png", "ar": 2.89}, {"src": "assets/clients/radiance.png", "ar": 3.929}, {"src": "assets/clients/rajparis.png", "ar": 3.203}, {"src": "assets/clients/sixit.png", "ar": 2.37}, {"src": "assets/clients/sln.png", "ar": 0.841}, {"src": "assets/clients/sri-kanna.png", "ar": 2.199}, {"src": "assets/clients/tn-housing-board.png", "ar": 1.0}, {"src": "assets/clients/urban-land.png", "ar": 7.843}, {"src": "assets/clients/urbanrise.png", "ar": 1.347}, {"src": "assets/clients/veltrak.png", "ar": 4.802}, {"src": "assets/clients/vikas.png", "ar": 2.218}];
(() => {
  const wrap = document.getElementById('slots');
  const section = document.getElementById('clients');
  const COLS = 6, ROWS = 3;
  const mq = matchMedia('(max-width:820px)');
  // sizes are in vw; phones show 3 columns so the logos get scaled up
  const dims = () => mq.matches ? { AREA: 105, MAXW: 20, MAXH: 11 } : { AREA: 28, MAXW: 9.5, MAXH: 5.6 };
  const xs = [12, 27.2, 42.4, 57.6, 72.8, 88], ys = [18.1, 30.3, 43.4];
  CLIENTS.forEach(c => { new Image().src = c.src; });
  const sizeOf = c => { const { AREA, MAXW, MAXH } = dims(); const h = Math.min(MAXH, Math.sqrt(AREA / c.ar)); return { w: Math.min(MAXW, h * c.ar), h }; };
  const makeImg = c => {
    const im = document.createElement('img');
    const s = sizeOf(c);
    im.src = c.src; im.alt = ''; im.style.width = s.w + 'vw'; im.style.height = 'auto'; im.style.maxHeight = s.h + 'vw';
    return im;
  };

  const slots = [];
  const shown = new Set();
  const order = gsap.utils.shuffle(CLIENTS.map((_, i) => i));
  for (let r = 0; r < ROWS; r++) for (let k = 0; k < COLS; k++) {
    const el = document.createElement('div');
    el.className = 'slot';
    el.style.left = xs[k] + 'vw'; el.style.top = ys[r] + 'vw';
    const idx = order.shift();
    el.appendChild(makeImg(CLIENTS[idx]));
    wrap.appendChild(el);
    shown.add(idx);
    slots.push({ el, cur: idx, used: new Set([idx]), busy: false });
  }

  function swap(slot) {
    if (slot.busy) return;
    // candidates: not on screen now, never shown in this slot before
    let pool = CLIENTS.map((_, i) => i).filter(i => !shown.has(i) && !slot.used.has(i));
    if (!pool.length) { slot.used = new Set([slot.cur]); pool = CLIENTS.map((_, i) => i).filter(i => !shown.has(i) && !slot.used.has(i)); }
    if (!pool.length) return;
    const next = pool[Math.floor(Math.random() * pool.length)];
    const old = slot.el.firstElementChild;
    const inn = makeImg(CLIENTS[next]);
    slot.el.appendChild(inn);
    slot.busy = true;
    const blur = 10 + Math.random() * 10;   // random blur strength; the logo itself never moves
    const d = 1.5;
    shown.delete(slot.cur); shown.add(next);
    const prev = slot.cur; slot.cur = next; slot.used.add(next);
    gsap.timeline({ onComplete: () => { old.remove(); slot.busy = false; } })
      .to(old, { filter: `grayscale(1) blur(${blur}px)`, opacity: 0, duration: d, ease: 'power2.inOut' }, 0)
      .fromTo(inn, { filter: `grayscale(1) blur(${blur}px)`, opacity: 0 },
                   { filter: 'grayscale(1) blur(0px)', opacity: 1, duration: d, ease: 'power2.inOut' }, d * .3);
  }

  if (!reduce) gsap.from(slots.map(s => s.el), {
    opacity: 0, duration: 1.2, stagger: { each: .08, from: 'random' }, ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none reverse' }
  });

  let active = false, timer = null;
  const tick = () => {
    if (!active) return;
    const free = slots.filter(s => !s.busy);
    gsap.utils.shuffle(free).slice(0, 4 + Math.floor(Math.random() * 3)).forEach((s, i) => gsap.delayedCall(i * (.3 + Math.random() * .5), () => swap(s)));
  };
  ScrollTrigger.create({
    trigger: section, start: 'top bottom', end: 'bottom top',
    onToggle: self => {
      active = self.isActive;
      clearInterval(timer);
      if (active) timer = setInterval(tick, 3000);
    }
  });
})();

// custom cursor
const cursor = document.getElementById('cursor');
if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
  document.body.classList.add('has-cursor');
  const setX = gsap.quickTo(cursor, 'x', { duration: .25, ease: 'power3' });
  const setY = gsap.quickTo(cursor, 'y', { duration: .25, ease: 'power3' });
  const half = () => cursor.offsetWidth / 2;
  addEventListener('mousemove', e => {
    cursor.classList.add('on');
    setX(e.clientX - half());
    setY(e.clientY - half());
  });
  document.addEventListener('mouseleave', () => cursor.classList.remove('on'));
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('big'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
  });
}

// lightbox
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('img');
const lbCap = lb.querySelector('p');
document.querySelectorAll('.thumb').forEach(b => b.addEventListener('click', () => {
  lbImg.src = b.dataset.full;
  lbImg.alt = b.querySelector('img').alt;
  lbCap.textContent = b.dataset.cap;
  lb.hidden = false;
}));
lb.addEventListener('click', () => { lb.hidden = true; });
addEventListener('keydown', e => { if (e.key === 'Escape') lb.hidden = true; });
