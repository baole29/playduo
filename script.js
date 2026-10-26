/* ==========================================================================
   Hai tháng duo — toàn bộ logic của trang.
   Nội dung nằm trong config.js; file này chỉ dựng trang từ nội dung đó.
   ========================================================================== */
(() => {
  'use strict';

  const C = window.CONFIG;
  if (!C) { console.error('Thiếu config.js'); return; }

  /* ---------- Tiện ích ---------- */

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const T = s => String(s ?? '').replace(/\{me\}/g, C.me).replace(/\{her\}/g, C.her);
  const t = s => esc(T(s));
  const pad = (n, l = 2) => String(n).padStart(l, '0');
  const mq = q => (window.matchMedia ? window.matchMedia(q).matches : false);
  const reduce = mq('(prefers-reduced-motion: reduce)');
  const coarse = mq('(pointer: coarse)');
  const body = document.body;
  const scrollTop = () => window.scrollY || window.pageYOffset || 0;

  let start = new Date(C.startDate).getTime();
  if (Number.isNaN(start)) start = Date.now() - 60 * 864e5;
  const daysSince = () => Math.max(0, Math.floor((Date.now() - start) / 864e5));

  const state = { prog: 0, entered: false };

  /* ---------- Dựng nội dung từ config ---------- */

  const head = o => `<div class="ch-head rv"><h2>${t(o.title)}</h2>${o.intro ? `<p>${t(o.intro)}</p>` : ''}</div>`;

  // Tiêu đề đầu trang: màu chuyển dần từ xanh (Player 1) qua tím sang hồng (Player 2)
  const STOPS = [[111, 168, 255], [199, 168, 255], [255, 143, 166]];
  const gradColor = k => {
    const seg = k < .5 ? 0 : 1;
    const f = k < .5 ? k * 2 : (k - .5) * 2;
    const a = STOPS[seg], b = STOPS[seg + 1];
    return 'rgb(' + a.map((v, i) => Math.round(v + (b[i] - v) * f)).join(',') + ')';
  };
  const titleWords = text => {
    const words = text.split(/\s+/).filter(Boolean);
    return words.map((w, i) => {
      const k = words.length > 1 ? i / (words.length - 1) : 0;
      return `<span class="w" style="--i:${i};--base:300ms;color:${gradColor(k)}">${esc(w)}</span>`;
    }).join(' ');
  };

  const statValue = v => (v === '@days' ? daysSince() : v === '@games' ? C.games.items.filter(g => !g.notGame).length : Number(v) || 0);
  const pips = n => [1, 2, 3, 4, 5].map(k => `<i class="${k <= n ? 'on' : ''}"></i>`).join('');

  function render() {
    document.title = C.pageTitle || document.title;

    // Màn mời vào phòng
    const g = C.gate;
    $('#gateKicker').textContent = T(g.kicker);
    $('#gateTitle').textContent = T(g.title);
    $('#gateSub').textContent = T(g.sub);
    $('#startLabel').textContent = T(g.button);
    $('#avMe').textContent = Array.from(T(C.me))[0] || '1';
    $('#avHer').textContent = Array.from(T(C.her))[0] || '2';

    // Đầu trang
    const h = C.hero;
    $('#hero').innerHTML = `
      <div class="hero-in">
        <p class="px rv" style="--d:.2s">${t(h.kicker)}</p>
        <div class="duo rv" style="--d:.4s">
          <span class="duo-name p1"><i></i>${t(C.me)}</span>
          <span class="duo-link"></span>
          <span class="duo-name p2">${t(C.her)}<i></i></span>
        </div>
        <h1 class="hero-title">${titleWords(T(h.title))}</h1>
        <p class="hero-lead rv" style="--d:1.6s">${t(h.lead)}</p>
        <p class="clock-label rv" style="--d:2s">${t(h.counterLabel)}</p>
        <div class="clock rv" style="--d:2.1s" role="timer">
          <div><b id="cD">0</b><span>ngày</span></div>
          <div><b id="cH">00</b><span>giờ</span></div>
          <div><b id="cM">00</b><span>phút</span></div>
          <div><b id="cS">00</b><span>giây</span></div>
        </div>
      </div>
      <p class="cue rv" style="--d:3.2s">${t(h.cue)}</p>`;

    // Câu chuyện
    const S = C.story;
    $('#story').innerHTML = `<div class="wrap">
      <div class="ch-head rv"><h2>${t(S.title)}</h2></div>
      <div class="story">${S.paragraphs.map((p, i) => `<p class="rv" style="--d:${(i * .15).toFixed(2)}s">${t(p)}</p>`).join('')}</div>
    </div>`;

    // Thư viện game
    const G = C.games;
    $('#games').innerHTML = `<div class="wrap">${head(G)}<div class="cards">${G.items.map((x, i) => `
      <div class="card rv" role="button" tabindex="0" aria-expanded="false" style="--c1:${esc(x.c1 || '#6fa8ff')};--c2:${esc(x.c2 || '#ff8fa6')};--d:${((i % 3) * .1).toFixed(1)}s">
        <span class="card-more" aria-hidden="true">+</span>
        <div class="card-top">
          <span class="card-ico" aria-hidden="true">${esc(x.icon || '🎮')}</span>
          <div><h3>${t(x.name)}</h3><span class="card-tag">${t(x.tag || '')}</span></div>
        </div>
        ${x.img ? `<img class="card-img" src="${esc(x.img)}" alt="" loading="lazy">` : ''}
        <p class="card-line">${t(x.line)}</p>
        ${x.meter ? `<div class="card-meter"><span>${t(x.meter.label)}</span><span class="pips" role="img" aria-label="${esc(x.meter.value)} trên 5">${pips(x.meter.value)}</span></div>` : ''}
        <div class="card-note"><div><p>${t(x.note)}</p></div></div>
      </div>`).join('')}</div></div>`;

    // Chuyện vợ chồng
    const K = C.chat;
    $('#chat').innerHTML = `<div class="wrap">${head(K)}
      <div class="chat-col">
        <div class="chat rv">
          <div class="chat-top"><i></i><span># ${t(K.room)}</span></div>
          <div class="chat-body" id="chatBody" aria-live="polite"></div>
        </div>
        <p class="chat-outro late" id="chatOutro">${t(K.outro)} <button type="button" class="egg" id="egg">${t(K.egg)}</button></p>
      </div>
    </div>`;

    // Bản vá lỗi
    const P = C.patches;
    $('#patches').innerHTML = `<div class="wrap">${head(P)}
      <div class="log">${P.items.map(e => `
        <div class="entry rv">
          <span class="px">PATCH ${esc(e.v)}</span>
          <h3>${t(e.title)}</h3>
          <p><span class="chip bug">Lỗi</span><span>${t(e.bug)}</span></p>
          <p><span class="chip fix">Đã vá</span><span>${t(e.fix)}</span></p>
        </div>`).join('')}</div>
      <div class="known rv"><h3>${t(P.known.title)}</h3><ul>${P.known.list.map(x => `<li>${t(x)}</li>`).join('')}</ul></div>
    </div>`;

    // Thành tựu
    const A = C.achievements;
    $('#ach').innerHTML = `<div class="wrap">${head(A)}
      <div class="ach" id="achGrid">${A.items.map(a => `
        <div class="ach-item" data-title="${t(a.title)}">
          <span class="ach-ico" aria-hidden="true">${esc(a.icon)}</span>
          <div><h3>${t(a.title)}</h3><p>${t(a.desc)}</p></div>
        </div>`).join('')}</div>
    </div>`;

    // Con số
    const N = C.stats;
    $('#stats').innerHTML = `<div class="wrap">${head(N)}
      <div class="stats">${N.items.map(s => `
        <div class="stat rv" data-to="${statValue(s.value)}"><span class="num">0</span><span>${t(s.label)}</span></div>`).join('')}</div>
      <p class="stats-note rv">${t(N.note)}</p>
    </div>`;

    // Màn cuối + thư
    const O = C.coop;
    $('#coop').innerHTML = `<div class="wrap coop" id="coopBox">
      ${head(O)}
      <div class="coop-stage rv">
        <button class="coop-btn p1" id="btn1" type="button" aria-pressed="false" aria-label="Nút của Player 1">P1</button>
        <span class="rope" id="rope" aria-hidden="true"><i></i></span>
        <button class="coop-btn p2" id="btn2" type="button" aria-pressed="false" aria-label="Nút của Player 2">P2</button>
      </div>
      <p class="coop-status" id="coopStatus" aria-live="polite"></p>
      <p class="coop-hint">${t(coarse ? O.hintTouch : O.hintMouse)}</p>
      <div class="letter" id="letter" hidden></div>
    </div>`;

    // Chân trang
    $('#footer').innerHTML = `<p>${t(C.footer)}</p><a href="#" id="toTop">${t(C.toTop)}</a>`;
  }

  /* ---------- Âm thanh (tiếng bíp nhỏ tạo bằng WebAudio, không cần file) ---------- */

  let audio = null;
  let soundOn = true;
  let music = null;

  function tone(freqs, dur = .1, type = 'sine', vol = .04) {
    if (!soundOn) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      audio = audio || new AC();
      if (audio.state === 'suspended') audio.resume();
      const t0 = audio.currentTime;
      freqs.forEach((f, i) => {
        const o = audio.createOscillator();
        const gn = audio.createGain();
        const s = t0 + i * dur;
        o.type = type;
        o.frequency.value = f;
        gn.gain.setValueAtTime(0.0001, s);
        gn.gain.linearRampToValueAtTime(vol, s + .015);
        gn.gain.exponentialRampToValueAtTime(0.0001, s + dur * 1.9);
        o.connect(gn);
        gn.connect(audio.destination);
        o.start(s);
        o.stop(s + dur * 2);
      });
    } catch (_) { /* không có âm thanh cũng không sao */ }
  }

  function initSound() {
    if (C.music) {
      music = new Audio(C.music);
      music.loop = true;
      music.volume = .45;
    }
    $('#soundBtn').addEventListener('click', () => {
      soundOn = !soundOn;
      $('#soundBtn').setAttribute('aria-pressed', String(soundOn));
      if (music) { soundOn ? music.play().catch(() => {}) : music.pause(); }
    });
  }

  /* ---------- Thông báo nhỏ ---------- */

  let toastTimer = 0;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2300);
  }

  /* ---------- Bầu trời sao ----------
     Hai ngôi sao xanh và hồng bắt đầu ở hai đầu màn hình, càng cuộn xuống
     càng lại gần nhau, nhưng đến cuối vẫn chừa một khoảng nhỏ. */

  function initSky() {
    const cv = $('#sky');
    const ctx = cv.getContext ? cv.getContext('2d') : null;
    if (!ctx) return { burst() {} };

    const orbA = $('.orb-a'), orbB = $('.orb-b');
    const P = { x: .5, y: .5, tx: .5, ty: .5 };
    let w = 0, h = 0, stars = [], sparks = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(220, Math.round(w * h / 8500));
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        z: Math.random() * .85 + .15,
        r: Math.random() * 1.1 + .25,
        tw: Math.random() * 6.28,
        sp: Math.random() * .0018 + .0006
      }));
    }

    const glow = (x, y, r, rgb, a) => {
      const gr = ctx.createRadialGradient(x, y, 0, x, y, r);
      gr.addColorStop(0, `rgba(${rgb},${a})`);
      gr.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = gr;
      ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
    };
    const ease = k => 1 - Math.pow(1 - k, 2.2);

    function burst(x, y, n = 14) {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * 6.2832, v = .6 + Math.random() * 2.3;
        sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - .4, life: 1, r: 1 + Math.random() * 1.8, c: Math.random() < .5 ? '111,168,255' : '255,143,166' });
      }
      if (sparks.length > 180) sparks.splice(0, sparks.length - 180);
    }

    let time = 0, last = performance.now();
    function frame(now) {
      requestAnimationFrame(frame);
      if (document.hidden) { last = now; return; }
      const dt = Math.min(50, now - last); last = now;
      if (!reduce) time += dt;

      P.x += (P.tx - P.x) * .04;
      P.y += (P.ty - P.y) * .04;
      const sc = scrollTop();
      ctx.clearRect(0, 0, w, h);

      // Sao nền
      for (const s of stars) {
        const y = (((s.y - sc * s.z * .12) % h) + h) % h;
        const x = s.x + (P.x - .5) * s.z * 18;
        const a = (.25 + .75 * (.5 + .5 * Math.sin(time * s.sp + s.tw))) * (.3 + .7 * s.z);
        ctx.fillStyle = `rgba(235,233,247,${a.toFixed(3)})`;
        ctx.beginPath(); ctx.arc(x, y, s.r, 0, 6.2832); ctx.fill();
      }

      // Hai ngôi sao chính
      const prog = state.prog;
      const half = Math.min(w, 900) * (.40 - .365 * ease(prog));
      const cx = w / 2 + (P.x - .5) * 20, cy = h * .52 + (P.y - .5) * 16;
      const ax = cx - half + Math.sin(time * .0007) * 10, ay = cy + Math.cos(time * .0006) * 14;
      const bx = cx + half + Math.cos(time * .0008) * 10, by = cy + Math.sin(time * .0005) * 14;

      const lg = ctx.createLinearGradient(ax, ay, bx, by);
      const la = (.05 + .32 * prog).toFixed(3);
      lg.addColorStop(0, `rgba(111,168,255,${la})`);
      lg.addColorStop(1, `rgba(255,143,166,${la})`);
      ctx.strokeStyle = lg; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();

      const gr = 20 + 8 * prog;
      glow(ax, ay, gr, '111,168,255', .5); glow(bx, by, gr, '255,143,166', .5);
      ctx.fillStyle = 'rgba(214,230,255,1)'; ctx.beginPath(); ctx.arc(ax, ay, 2.4, 0, 6.2832); ctx.fill();
      ctx.fillStyle = 'rgba(255,224,230,1)'; ctx.beginPath(); ctx.arc(bx, by, 2.4, 0, 6.2832); ctx.fill();

      // Sao thả khi chạm
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx; s.y += s.vy; s.vy += .025; s.vx *= .99; s.life -= .014;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }
        glow(s.x, s.y, s.r * 5, s.c, s.life * .5);
        ctx.fillStyle = `rgba(${s.c},${s.life.toFixed(3)})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill();
      }

      // Ánh sáng mờ đi theo con trỏ
      if (orbA) orbA.style.transform = `translate3d(${(P.x - .5) * 70}px,${(P.y - .5) * 70 - sc * .04}px,0)`;
      if (orbB) orbB.style.transform = `translate3d(${(.5 - P.x) * 70}px,${(.5 - P.y) * 70 + sc * .03}px,0)`;
    }

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', e => { P.tx = e.clientX / (w || 1); P.ty = e.clientY / (h || 1); }, { passive: true });
    resize();
    requestAnimationFrame(frame);
    return { burst };
  }

  /* ---------- Quan sát khi cuộn tới ---------- */

  function observe(target, cb, opts) {
    const els = typeof target === 'string' ? $$(target) : [target];
    if (!('IntersectionObserver' in window)) { els.forEach(cb); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { io.unobserve(e.target); cb(e.target); } });
    }, opts || { threshold: .15 });
    els.forEach(el => io.observe(el));
  }

  /* ---------- Thanh trạng thái ---------- */

  function initHud() {
    const day = $('#hudDay'), fill = $('#hudFill'), stage = $('#hudStage');
    const sections = $$('[data-stage]');
    let cur = '', ticking = false;

    const setStage = (name, instant) => {
      if (name === cur) return;
      cur = name;
      if (instant) { stage.textContent = name; return; }
      stage.classList.add('swap');
      setTimeout(() => { stage.textContent = name; stage.classList.remove('swap'); }, 220);
    };

    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      state.prog = max > 0 ? Math.min(1, Math.max(0, scrollTop() / max)) : 0;
      day.textContent = pad(Math.round(state.prog * Math.max(1, daysSince())));
      fill.style.transform = `scaleX(${state.prog.toFixed(4)})`;
      let active = sections[0];
      sections.forEach(s => { if (s.getBoundingClientRect().top < window.innerHeight * .5) active = s; });
      if (active) setStage(C.stages[active.dataset.stage] || '');
    };

    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
    if (sections[0]) setStage(C.stages[sections[0].dataset.stage] || '', true);
  }

  /* ---------- Đồng hồ ---------- */

  function initClock() {
    const el = { d: $('#cD'), h: $('#cH'), m: $('#cM'), s: $('#cS') };
    const tick = () => {
      let ms = Math.max(0, Date.now() - start);
      const d = Math.floor(ms / 864e5); ms -= d * 864e5;
      const hh = Math.floor(ms / 36e5); ms -= hh * 36e5;
      const mm = Math.floor(ms / 6e4); ms -= mm * 6e4;
      const ss = Math.floor(ms / 1e3);
      el.d.textContent = d; el.h.textContent = pad(hh); el.m.textContent = pad(mm); el.s.textContent = pad(ss);
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Thẻ game ---------- */

  function initCards() {
    $$('.card').forEach(card => {
      const toggle = () => {
        const open = card.classList.toggle('open');
        card.setAttribute('aria-expanded', String(open));
        tone([open ? 660 : 520], .07, 'triangle', .025);
      };
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
      card.addEventListener('pointermove', e => {
        if (e.pointerType !== 'mouse') return;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      });
    });
  }

  /* ---------- Đoạn chat vợ chồng ---------- */

  function initChat(sky) {
    const box = $('#chatBody'), outro = $('#chatOutro');
    const msgs = C.chat.messages || [];
    const nameOf = who => (who === 'me' ? C.me : C.her);
    let i = 0;

    const make = (m, typing) => {
      const d = document.createElement('div');
      d.className = 'msg ' + m.who;
      d.innerHTML = `<small>${t(nameOf(m.who))}</small>` + (typing ? '<span class="dots"><i></i><i></i><i></i></span>' : t(m.text));
      return d;
    };

    function step() {
      if (i >= msgs.length) { outro.classList.add('in'); return; }
      const m = msgs[i++];
      const typing = make(m, true);
      box.append(typing);
      setTimeout(() => {
        typing.replaceWith(make(m, false));
        tone([m.who === 'me' ? 660 : 587], .05, 'triangle', .02);
        setTimeout(step, 650);
      }, 700 + Math.min(1400, T(m.text).length * 22));
    }

    observe($('#chat .chat'), () => setTimeout(step, 500), { threshold: .4 });

    $('#egg').addEventListener('click', e => {
      toast(T(C.chat.eggToast));
      tone([784, 988], .08, 'sine', .03);
      const r = e.currentTarget.getBoundingClientRect();
      sky.burst(r.left + r.width / 2, r.top + r.height / 2, 18);
    });
  }

  /* ---------- Thành tựu ---------- */

  function initAch() {
    const items = $$('.ach-item');
    observe($('#achGrid'), () => {
      items.forEach((el, i) => setTimeout(() => {
        el.classList.add('on');
        toast('🏆 ' + el.dataset.title);
        tone([784, 988], .07, 'sine', .03);
      }, 500 + i * 800));
    }, { threshold: .35 });
  }

  /* ---------- Con số ---------- */

  function initStats() {
    observe('.stat', el => {
      const to = Number(el.dataset.to) || 0;
      const num = $('.num', el);
      if (reduce || to === 0) { num.textContent = to; return; }
      const t0 = performance.now(), dur = 1600;
      const tick = now => {
        const k = Math.min(1, (now - t0) / dur);
        num.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: .6 });
  }

  /* ---------- Màn cuối: hai nút phải được giữ cùng lúc ---------- */

  function writeLetter() {
    const L = C.letter, box = $('#letter');
    box.hidden = false;
    let n = 0;
    const add = (text, cls) => {
      const p = document.createElement('p');
      if (cls) p.className = cls;
      T(text).split(/\s+/).filter(Boolean).forEach(word => {
        const s = document.createElement('span');
        s.className = 'w';
        s.style.setProperty('--i', n++);
        s.textContent = word;
        p.append(s, ' ');
      });
      box.append(p);
    };
    add(L.greeting);
    L.body.forEach(b => add(b));
    add(L.sign, 'sign');
    if (L.ps) add(L.ps, 'ps');
    return box;
  }

  function initCoop(sky) {
    const K = C.coop;
    const btn = { p1: $('#btn1'), p2: $('#btn2') };
    const rope = $('#rope'), status = $('#coopStatus'), wrap = $('#coopBox');
    const HOLD = 1500;
    const on = { p1: false, p2: false };
    let t0 = 0, raf = 0, done = false;

    const refresh = () => {
      const n = (on.p1 ? 1 : 0) + (on.p2 ? 1 : 0);
      status.textContent = done ? K.done : n === 2 ? K.holding : n === 1 ? K.waiting : K.idle;
    };

    function unlock() {
      done = true; raf = 0;
      rope.style.setProperty('--p', 1);
      wrap.classList.add('unlocked');
      refresh();
      tone([523.25, 659.25, 783.99, 1046.5, 1318.5], .1, 'sine', .04);
      const r = rope.getBoundingClientRect();
      sky.burst(r.left + r.width / 2, r.top + r.height / 2, 46);
      const letter = writeLetter();
      setTimeout(() => letter.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }), 600);
    }

    function loop(now) {
      if (done || !(on.p1 && on.p2)) { raf = 0; return; }
      const k = Math.min(1, (now - t0) / HOLD);
      rope.style.setProperty('--p', k.toFixed(3));
      if (k >= 1) { unlock(); return; }
      raf = requestAnimationFrame(loop);
    }

    function set(key, value) {
      if (done || on[key] === value) return;
      on[key] = value;
      btn[key].classList.toggle('on', value);
      btn[key].setAttribute('aria-pressed', String(value));
      tone([key === 'p1' ? 392 : 523.25], .09, 'triangle', .03);
      refresh();
      if (on.p1 && on.p2) {
        t0 = performance.now();
        if (!raf) raf = requestAnimationFrame(loop);
      } else {
        rope.style.setProperty('--p', 0);
      }
    }

    ['p1', 'p2'].forEach(key => {
      const el = btn[key];
      // Cảm ứng: giữ để sẵn sàng (hỗ trợ hai ngón cùng lúc). Chuột: bấm để bật/tắt.
      el.addEventListener('pointerdown', e => {
        e.preventDefault();
        if (e.pointerType === 'mouse') { set(key, !on[key]); return; }
        try { el.setPointerCapture(e.pointerId); } catch (_) { /* bỏ qua */ }
        set(key, true);
      });
      const release = e => { if (e.pointerType !== 'mouse') set(key, false); };
      el.addEventListener('pointerup', release);
      el.addEventListener('pointercancel', release);
      el.addEventListener('contextmenu', e => e.preventDefault());
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!e.repeat) set(key, !on[key]); }
      });
    });

    // Bàn phím: giữ F và J cùng lúc
    window.addEventListener('keydown', e => {
      if (e.repeat) return;
      const k = (e.key || '').toLowerCase();
      if (k === 'f') set('p1', true);
      if (k === 'j') set('p2', true);
    });
    window.addEventListener('keyup', e => {
      const k = (e.key || '').toLowerCase();
      if (k === 'f') set('p1', false);
      if (k === 'j') set('p2', false);
    });

    refresh();
  }

  /* ---------- Vào trang ---------- */

  function enter() {
    if (state.entered) return;
    state.entered = true;
    tone([523.25, 659.25, 783.99, 1046.5], .11, 'sine', .045);
    if (music && soundOn) music.play().catch(() => {});

    const gate = $('#gate');
    gate.classList.add('leave');
    body.classList.remove('locked');
    body.classList.add('ready');
    window.scrollTo(0, 0);
    setTimeout(() => gate.remove(), 1200);

    // Hiện dần nội dung khi cuộn tới (chỉ bắt đầu sau khi vào phòng)
    observe('.rv', el => el.classList.add('in'), { threshold: .12, rootMargin: '0px 0px -5% 0px' });
  }

  /* ---------- Khởi động ---------- */

  render();
  const sky = initSky();
  initSound();
  initHud();
  initClock();
  initCards();
  initChat(sky);
  initAch();
  initStats();
  initCoop(sky);

  const startBtn = $('#startBtn');
  startBtn.addEventListener('click', enter);
  try { startBtn.focus({ preventScroll: true }); } catch (_) { /* bỏ qua */ }

  // Chạm vào bầu trời để thả sao
  document.addEventListener('pointerdown', e => {
    if (!state.entered) return;
    if (e.target.closest && e.target.closest('button, a, .card, .coop-btn, .hud')) return;
    sky.burst(e.clientX, e.clientY);
  }, { passive: true });

  $('#toTop').addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
})();
