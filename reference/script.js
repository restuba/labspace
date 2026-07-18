document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // ═══════════════════════════════════════════
    // 0. PRELOADER
    // ═══════════════════════════════════════════
    const preloader = document.getElementById('preloader');
    const preloaderLetters = document.querySelectorAll('.preloader-letter');
    const preloaderBarFill = document.querySelector('.preloader-bar-fill');

    const tlPreloader = gsap.timeline({
        onComplete: () => { preloader.classList.add('done'); initPage(); }
    });
    tlPreloader.to(preloaderLetters, { y: '0%', duration: 0.9, stagger: 0.06, ease: 'power4.out' });
    tlPreloader.to(preloaderBarFill, { width: '100%', duration: 1.4, ease: 'power2.inOut' }, '-=0.4');
    tlPreloader.to({}, { duration: 0.3 });

    // ═══════════════════════════════════════════
    // MAIN INIT
    // ═══════════════════════════════════════════
    function initPage() {
        // Lenis smooth scroll
        const lenis = new Lenis({ duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true, smoothTouch: false });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        initHeroEntrance();
        initHeroParticles();
        initHeroParallax();
        initHeroScrollFade();
        initStickyHeader();
        initRevealLines();
        initProjects();
        initServices();
        initStory();
        initCTA();
        initScrollCueHide();
    }

    // ═══════════════════════════════════════════
    // 1. HERO ENTRANCE
    // ═══════════════════════════════════════════
    function initHeroEntrance() {
        const tl = gsap.timeline({ delay: 0.15 });
        tl.from('.hero-title', { y: 80, opacity: 0, duration: 1.4, ease: 'power4.out' });
        tl.to('.hero-line-v', { height: '100%', duration: 1.3, ease: 'power4.inOut' }, '-=0.9');
        tl.to('.hero-line-h', { width: '100%', duration: 1.3, ease: 'power4.inOut' }, '-=1');
        tl.to('.hero-tagline', { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.7');
        tl.to('.hero-meta', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6');
        tl.to('.scroll-cue', { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.4');
        tl.call(() => {
            document.querySelectorAll('.hero-orb').forEach(o => o.classList.add('is-visible'));
            const c = document.getElementById('hero-particles');
            if (c) c.classList.add('is-visible');
        }, null, '-=0.9');
    }

    // ═══════════════════════════════════════════
    // 2. HERO PARTICLE FIELD
    // ═══════════════════════════════════════════
    function initHeroParticles() {
        const canvas = document.getElementById('hero-particles');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h, particles = [], mouse = { x: -9999, y: -9999 };
        const COUNT = 70, CONN = 110, RADIUS = 160;

        function resize() {
            const rect = canvas.parentElement.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            w = canvas.width = rect.width * dpr;
            h = canvas.height = rect.height * dpr;
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function seed() {
            particles = [];
            const rw = w / (window.devicePixelRatio || 1);
            const rh = h / (window.devicePixelRatio || 1);
            for (let i = 0; i < COUNT; i++) {
                particles.push({ x: Math.random() * rw, y: Math.random() * rh, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: Math.random() * 1.5 + 0.5, o: Math.random() * 0.4 + 0.1 });
            }
        }

        function draw() {
            const rw = w / (window.devicePixelRatio || 1);
            const rh = h / (window.devicePixelRatio || 1);
            ctx.clearRect(0, 0, rw, rh);
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const dx = p.x - mouse.x, dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < RADIUS) { const f = (RADIUS - dist) / RADIUS; p.vx += (dx / dist) * f * 0.25; p.vy += (dy / dist) * f * 0.25; }
                p.vx *= 0.985; p.vy *= 0.985;
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = rw; if (p.x > rw) p.x = 0;
                if (p.y < 0) p.y = rh; if (p.y > rh) p.y = 0;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59,91,219,${p.o})`; ctx.fill();
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const ddx = p.x - p2.x, ddy = p.y - p2.y;
                    const dd = Math.sqrt(ddx * ddx + ddy * ddy);
                    if (dd < CONN) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.strokeStyle = `rgba(59,91,219,${0.07 * (1 - dd / CONN)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
                }
            }
            requestAnimationFrame(draw);
        }

        resize(); seed(); draw();
        window.addEventListener('resize', () => { resize(); seed(); });
        document.getElementById('hero').addEventListener('mousemove', (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
        document.getElementById('hero').addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
    }

    // ═══════════════════════════════════════════
    // 3. HERO MOUSE PARALLAX
    // ═══════════════════════════════════════════
    function initHeroParallax() {
        const hero = document.getElementById('hero');
        const content = document.getElementById('hero-content');
        const orbs = document.querySelectorAll('.hero-orb');
        if (!hero || !content) return;
        let tx = 0, ty = 0, cx = 0, cy = 0;

        hero.addEventListener('mousemove', (e) => {
            const r = hero.getBoundingClientRect();
            tx = (e.clientX - r.left - r.width / 2) / r.width;
            ty = (e.clientY - r.top - r.height / 2) / r.height;
        });
        hero.addEventListener('mouseleave', () => { tx = 0; ty = 0; });

        (function tick() {
            cx += (tx - cx) * 0.05; cy += (ty - cy) * 0.05;
            gsap.set(content, { x: cx * 14, y: cy * 10 });
            orbs.forEach((orb, i) => { const s = (i + 1) * 18; gsap.set(orb, { x: cx * s, y: cy * s }); });
            requestAnimationFrame(tick);
        })();
    }

    // ═══════════════════════════════════════════
    // 4. HERO SCROLL-DRIVEN FADE
    // ═══════════════════════════════════════════
    function initHeroScrollFade() {
        gsap.to('#hero .hero-content', { y: -80, opacity: 0, scale: 0.97, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 } });
        gsap.to('#hero-particles', { opacity: 0, ease: 'none', scrollTrigger: { trigger: '#hero', start: '60% top', end: 'bottom top', scrub: 1 } });
        gsap.to('.hero-orb', { scale: 1.3, opacity: 0, ease: 'none', scrollTrigger: { trigger: '#hero', start: '40% top', end: 'bottom top', scrub: 1.2 } });
    }

    // ═══════════════════════════════════════════
    // 5. STICKY HEADER
    // ═══════════════════════════════════════════
    function initStickyHeader() {
        const header = document.getElementById('main-header');
        ScrollTrigger.create({
            trigger: '#about-intro', start: 'top 80%',
            onEnter: () => gsap.to(header, { y: '0%', duration: 0.6, ease: 'power3.out' }),
            onLeaveBack: () => gsap.to(header, { y: '-102%', duration: 0.5, ease: 'power3.in' }),
        });
        document.querySelectorAll('.dark-section, .services-wrapper').forEach(section => {
            ScrollTrigger.create({
                trigger: section, start: 'top 72px', end: 'bottom 72px',
                onEnter: () => header.classList.add('header-dark'),
                onLeave: () => header.classList.remove('header-dark'),
                onEnterBack: () => header.classList.add('header-dark'),
                onLeaveBack: () => header.classList.remove('header-dark'),
            });
        });
    }

    // ═══════════════════════════════════════════
    // 6. REVEAL LINES (smoother stagger)
    // ═══════════════════════════════════════════
    function initRevealLines() {
        document.querySelectorAll('[data-reveal]').forEach(line => {
            const inner = document.createElement('span');
            inner.className = 'reveal-line-inner';
            inner.innerHTML = line.innerHTML;
            line.innerHTML = '';
            line.appendChild(inner);

            gsap.to(inner, {
                y: '0%', rotation: 0, opacity: 1,
                duration: 1.4, ease: 'power4.out',
                scrollTrigger: { trigger: line, start: 'top 92%', once: true },
            });
        });
        gsap.to('.section-line', { width: 60, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.section-line', start: 'top 85%', once: true } });
        gsap.to('.section-line-svc', { width: 60, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.section-line-svc', start: 'top 85%', once: true } });
    }

    // ═══════════════════════════════════════════
    // 7. PROJECTS — Smoother card peel
    // ═══════════════════════════════════════════
    function initProjects() {
        const cards = gsap.utils.toArray('.project-card');
        const wrapper = document.querySelector('.project-wrapper');
        const counterEl = document.querySelector('.counter-current');
        const progressEl = document.querySelector('.project-progress');
        if (!wrapper || !cards.length) return;

        const total = cards.length;
        let lastIdx = 0;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapper, start: 'top top', end: 'bottom bottom', scrub: 2,
                onUpdate: (self) => {
                    const p = self.progress;
                    const idx = Math.min(total - 1, Math.floor(p * total * 0.99));
                    if (counterEl && lastIdx !== idx) {
                        counterEl.textContent = String(idx + 1).padStart(2, '0');
                        gsap.fromTo(counterEl, { y: idx > lastIdx ? 12 : -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', overwrite: true });
                        lastIdx = idx;
                    }
                    if (progressEl) progressEl.style.width = `${p * 100}%`;
                }
            }
        });

        cards.forEach((card, i) => {
            if (i === total - 1) return;
            const img = card.querySelector('.project-img');
            const desc = card.querySelector('.project-desc');
            const cta = card.querySelector('.project-cta');
            const tags = card.querySelectorAll('.project-tag');
            const title = card.querySelector('.project-title');
            const label = `r${i}`;

            if (desc) tl.to(desc, { opacity: 0, y: -15, duration: 0.3, ease: 'power2.in' }, label);
            if (cta) tl.to(cta, { opacity: 0, duration: 0.25, ease: 'power2.in' }, label);
            if (tags.length) tl.to(tags, { opacity: 0, scale: 0.9, stagger: 0.02, duration: 0.2, ease: 'power2.in' }, label);
            if (img) tl.to(img, { scale: 1.15, duration: 0.9, ease: 'power2.in' }, `${label}+=0.1`);
            if (title) tl.to(title, { y: -30, opacity: 0, duration: 0.45, ease: 'power3.in' }, `${label}+=0.2`);
            tl.to(card, { clipPath: 'inset(0 0 100% 0 round 16px)', duration: 0.8, ease: 'power3.inOut' }, `${label}+=0.15`);
            tl.to({}, { duration: 0.12 });
        });

        // Image tilt on hover
        cards.forEach(card => {
            const media = card.querySelector('.project-media');
            const img = card.querySelector('.project-img');
            if (!media || !img) return;
            media.addEventListener('mousemove', (e) => {
                const r = media.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                gsap.to(img, { x: x * 12, y: y * 8, duration: 0.7, ease: 'power2.out', overwrite: 'auto' });
            });
            media.addEventListener('mouseleave', () => {
                gsap.to(img, { x: 0, y: 0, duration: 0.9, ease: 'power3.out', overwrite: 'auto' });
            });
        });
    }

    // ═══════════════════════════════════════════
    // 8. SERVICES — Smoother horizontal compression
    // ═══════════════════════════════════════════
    function initServices() {
        const panels = gsap.utils.toArray('.service-panel');
        const wrapper = document.querySelector('.services-wrapper');
        if (!wrapper || !panels.length) return;

        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: { trigger: wrapper, start: 'top top', end: 'bottom bottom', scrub: 1.5 }
            });
            panels.forEach((panel, i) => {
                if (i === panels.length - 1) return;
                const desc = panel.querySelector('.service-desc');
                const line = panel.querySelector('.service-line');
                const label = `s${i}`;
                tl.to(panel, { width: 90, duration: 1, ease: 'power2.inOut' }, label);
                if (desc) tl.to(desc, { opacity: 0, duration: 0.5, ease: 'power2.in' }, label);
                if (line) tl.to(line, { width: 0, duration: 0.6 }, label);
                tl.to({}, { duration: 0.08 });
            });
        });
    }

    // ═══════════════════════════════════════════
    // 9. STORY — Image height expansion + parallax
    // ═══════════════════════════════════════════
    function initStory() {
        const imageWrap = document.querySelector('.story-image-wrap');
        const wrapper = document.querySelector('.story-wrapper');
        if (!imageWrap || !wrapper) return;

        gsap.to(imageWrap, {
            height: '80vh', duration: 1, ease: 'none',
            scrollTrigger: { trigger: wrapper, start: 'top top', end: 'bottom bottom', scrub: 1.2 }
        });

        // Subtle parallax on the image inside
        const img = imageWrap.querySelector('img');
        if (img) {
            gsap.to(img, {
                yPercent: -8, ease: 'none',
                scrollTrigger: { trigger: wrapper, start: 'top bottom', end: 'bottom top', scrub: 1 }
            });
        }
    }

    // ═══════════════════════════════════════════
    // 10. CTA — Text scramble + glow
    // ═══════════════════════════════════════════
    function initCTA() {
        const target = document.querySelector('.scramble-target');
        const glow = document.querySelector('.cta-glow');

        // Glow appears on scroll
        if (glow) {
            gsap.to(glow, { opacity: 1, scale: 1.1, ease: 'none', scrollTrigger: { trigger: '#cta', start: 'top 70%', end: 'center center', scrub: 1 } });
        }

        if (!target) return;
        const words = ['project', 'idea', 'success', 'vision', 'brand'];
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
        let wordIdx = 0;

        function scramble() {
            const word = words[wordIdx];
            const current = target.textContent;
            const maxLen = Math.max(current.length, word.length);
            let frame = 0; const total = 22;

            function step() {
                let result = '';
                for (let i = 0; i < maxLen; i++) {
                    const start = Math.floor(Math.random() * 5);
                    const end = start + Math.floor(Math.random() * 8) + 3;
                    if (frame >= end || i >= word.length) result += i < word.length ? word[i] : '';
                    else if (frame >= start) result += chars[Math.floor(Math.random() * chars.length)];
                    else result += i < current.length ? current[i] : '';
                }
                target.textContent = result;
                frame++;
                if (frame <= total) requestAnimationFrame(step);
                else { target.textContent = word; wordIdx = (wordIdx + 1) % words.length; setTimeout(scramble, 2800); }
            }
            step();
        }

        ScrollTrigger.create({ trigger: '#cta', start: 'top 70%', once: true, onEnter: () => setTimeout(scramble, 600) });
    }

    // ═══════════════════════════════════════════
    // 11. SCROLL CUE HIDE
    // ═══════════════════════════════════════════
    function initScrollCueHide() {
        ScrollTrigger.create({
            trigger: '#about-intro', start: 'top 90%',
            onEnter: () => gsap.to('.scroll-cue', { opacity: 0, y: 10, duration: 0.5, ease: 'power2.in' }),
        });
    }

}); // end DOMContentLoaded
