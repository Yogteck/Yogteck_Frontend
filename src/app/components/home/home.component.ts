import { AfterViewInit, Component, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* =========================================================
   YogTeck — home.component.ts
   Ported from the original vanilla-JS script.js.
   Contact form posts enquiries to the YogTeck backend API.
========================================================= */

interface TravelState {
  clone: HTMLElement;
  heroFrame: HTMLElement;
  heroNode: HTMLElement | null;
  stage: HTMLElement;
  sectionEl: HTMLElement;
  _heroRect?: { top: number; left: number; width: number; height: number };
  _targetRect?: { top: number; left: number; width: number; height: number };
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  private isBrowser: boolean;
  private prefersReducedMotion = false;
  private scrollTriggers: ScrollTrigger[] = [];
  private cleanupFns: Array<() => void> = [];

  private readonly RACK_SVGS: Record<string, string> = {
    wall: `<svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="6" width="84" height="108" stroke="#C98A3E" stroke-width="1" stroke-dasharray="2 3" opacity="0.4"/>
      <rect x="18" y="14" width="64" height="6" fill="#C98A3E" opacity="0.85"/>
      <rect x="18" y="34" width="64" height="4" fill="#8A8F97"/>
      <rect x="18" y="54" width="64" height="4" fill="#8A8F97"/>
      <rect x="18" y="74" width="64" height="4" fill="#8A8F97"/>
      <rect x="18" y="94" width="64" height="4" fill="#8A8F97"/>
      <line x1="20" y1="20" x2="20" y2="98" stroke="#C98A3E" stroke-width="1.5"/>
      <line x1="80" y1="20" x2="80" y2="98" stroke="#C98A3E" stroke-width="1.5"/>
      <rect x="24" y="24" width="10" height="8" fill="#C98A3E" opacity="0.5"/>
      <rect x="40" y="24" width="10" height="8" fill="#C98A3E" opacity="0.3"/>
      <rect x="56" y="24" width="10" height="8" fill="#C98A3E" opacity="0.5"/>
    </svg>`,
    garment: `<svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="80" height="100" stroke="#C98A3E" stroke-width="1" stroke-dasharray="2 3" opacity="0.4"/>
      <line x1="18" y1="18" x2="82" y2="18" stroke="#C98A3E" stroke-width="2"/>
      <line x1="24" y1="18" x2="24" y2="34" stroke="#8A8F97" stroke-width="1"/>
      <path d="M24 34 q6 -8 12 0 l0 20 l-12 0 z" stroke="#8A8F97" stroke-width="1" fill="rgba(201,138,62,0.12)"/>
      <line x1="42" y1="18" x2="42" y2="34" stroke="#8A8F97" stroke-width="1"/>
      <path d="M42 34 q6 -8 12 0 l0 24 l-12 0 z" stroke="#8A8F97" stroke-width="1" fill="rgba(201,138,62,0.12)"/>
      <line x1="60" y1="18" x2="60" y2="34" stroke="#8A8F97" stroke-width="1"/>
      <path d="M60 34 q6 -8 12 0 l0 18 l-12 0 z" stroke="#8A8F97" stroke-width="1" fill="rgba(201,138,62,0.12)"/>
      <line x1="18" y1="70" x2="82" y2="70" stroke="#C98A3E" stroke-width="2"/>
      <line x1="18" y1="102" x2="82" y2="102" stroke="#8A8F97" stroke-width="1"/>
      <line x1="18" y1="18" x2="18" y2="102" stroke="#C98A3E" stroke-width="1.5"/>
      <line x1="82" y1="18" x2="82" y2="102" stroke="#C98A3E" stroke-width="1.5"/>
    </svg>`,
    gondola: `<svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="16" width="80" height="90" stroke="#C98A3E" stroke-width="1" stroke-dasharray="2 3" opacity="0.4"/>
      <rect x="16" y="20" width="68" height="6" fill="#C98A3E" opacity="0.85"/>
      <rect x="16" y="40" width="68" height="4" fill="#8A8F97"/>
      <rect x="16" y="60" width="68" height="4" fill="#8A8F97"/>
      <rect x="16" y="80" width="68" height="4" fill="#8A8F97"/>
      <rect x="16" y="98" width="68" height="6" fill="#C98A3E" opacity="0.6"/>
      <line x1="50" y1="26" x2="50" y2="98" stroke="#C98A3E" stroke-width="2"/>
      <rect x="20" y="30" width="10" height="8" fill="#C98A3E" opacity="0.35"/>
      <rect x="34" y="30" width="10" height="8" fill="#C98A3E" opacity="0.55"/>
      <rect x="56" y="30" width="10" height="8" fill="#C98A3E" opacity="0.55"/>
      <rect x="70" y="30" width="10" height="8" fill="#C98A3E" opacity="0.35"/>
    </svg>`,
    corner: `<svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 108 L12 18 L50 18 L84 52 L84 108 Z" stroke="#C98A3E" stroke-width="1" stroke-dasharray="2 3" opacity="0.4"/>
      <line x1="12" y1="34" x2="50" y2="34" stroke="#8A8F97" stroke-width="1"/>
      <line x1="50" y1="34" x2="70" y2="54" stroke="#8A8F97" stroke-width="1"/>
      <line x1="12" y1="56" x2="50" y2="56" stroke="#8A8F97" stroke-width="1"/>
      <line x1="50" y1="56" x2="84" y2="70" stroke="#8A8F97" stroke-width="1"/>
      <line x1="12" y1="78" x2="50" y2="78" stroke="#C98A3E" stroke-width="1.5"/>
      <line x1="50" y1="78" x2="84" y2="88" stroke="#C98A3E" stroke-width="1.5"/>
      <circle cx="50" cy="18" r="2.5" fill="#C98A3E"/>
    </svg>`,
    heavy: `<svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="8" width="80" height="106" stroke="#C98A3E" stroke-width="1" stroke-dasharray="2 3" opacity="0.4"/>
      <rect x="16" y="14" width="68" height="10" fill="#C98A3E" opacity="0.85"/>
      <rect x="16" y="38" width="68" height="10" fill="#8A8F97"/>
      <rect x="16" y="62" width="68" height="10" fill="#8A8F97"/>
      <rect x="16" y="86" width="68" height="10" fill="#8A8F97"/>
      <line x1="20" y1="24" x2="20" y2="106" stroke="#C98A3E" stroke-width="3"/>
      <line x1="80" y1="24" x2="80" y2="106" stroke="#C98A3E" stroke-width="3"/>
      <line x1="20" y1="30" x2="80" y2="96" stroke="#8A8F97" stroke-width="0.75" opacity="0.6"/>
      <line x1="80" y1="30" x2="20" y2="96" stroke="#8A8F97" stroke-width="0.75" opacity="0.6"/>
    </svg>`,
    custom: `<svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="80" height="100" stroke="#C98A3E" stroke-width="1" stroke-dasharray="2 3" opacity="0.4"/>
      <path d="M18 100 L18 40 L38 20 L82 20 L82 100 Z" stroke="#8A8F97" stroke-width="1"/>
      <line x1="18" y1="60" x2="82" y2="60" stroke="#C98A3E" stroke-width="1.5"/>
      <line x1="18" y1="80" x2="82" y2="80" stroke="#8A8F97" stroke-width="1"/>
      <line x1="38" y1="20" x2="38" y2="100" stroke="#8A8F97" stroke-width="0.75" opacity="0.6"/>
      <circle cx="60" cy="40" r="3" fill="#C98A3E"/>
      <circle cx="60" cy="50" r="1.5" fill="#C98A3E" opacity="0.5"/>
    </svg>`
  };

  private readonly RACK_PHOTOS: Record<string, string> = {
    wall: 'assets/img/wall-rack.jpg',
    garment: 'assets/img/garment-rack.jpg',
    gondola: 'assets/img/gondola-rack.jpg',
    corner: 'assets/img/corner-rack.jpg',
    heavy: 'assets/img/heavy-rack.jpg',
    custom: 'assets/img/custom-rack.png'
  };

  private readonly RACK_ORDER = ['wall', 'garment', 'gondola', 'corner', 'heavy', 'custom'];

  private readonly RACK_LABELS: Record<string, string> = {
    wall: 'Wall Display Racks',
    garment: 'Garment Display Racks',
    gondola: 'Supermarket Gondola Racks',
    corner: 'Corner Rack Solutions',
    heavy: 'Heavy-Duty Storage Racks',
    custom: 'Custom Retail Display Racks'
  };

  private readonly PROJECT_ITEMS = [
    { key: 'wall', title: 'Wall Rack Layout', tag: 'Project Photo' },
    { key: 'garment', title: 'Garment Display Fit-out', tag: 'Project Photo' },
    { key: 'gondola', title: 'Supermarket Gondola Aisle', tag: 'Project Photo' },
    { key: 'heavy', title: 'Heavy-Duty Storage Bay', tag: 'Project Photo' },
    { key: 'corner', title: 'Corner Rack Installation', tag: 'Project Photo' },
    { key: 'custom', title: 'Custom Rack Build', tag: 'Reference' }
  ];

  private readonly CONTACT_API_URL = 'https://yogteck-backend.vercel.app/api/enquiries/contact';
  contactSubmitting = false;
  contactStatusMessage = '';
  contactStatusType: 'success' | 'error' = 'success';

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const footerYear = document.getElementById('footerYear');
    if (footerYear) footerYear.textContent = String(new Date().getFullYear());

    this.paintRackFrames();
    this.prefillRackStages();
    this.initializeThemeToggle();
    this.initializeNavigation();
    this.initializeMobileMenu();
    this.initializeHeroAnimations();
    this.initializeScrollProgress();
    this.initializeScrollReveal();
    this.initializeGallery();
    this.initializeLightbox();
    this.initializeProcessTrack();
    this.initializeReducedMotion();

    gsap.registerPlugin(ScrollTrigger);
    this.initializeRackScrollTransitions();
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach(t => t.kill());
    this.cleanupFns.forEach(fn => fn());
  }

  private rackVisualMarkup(key: string): string {
    if (this.RACK_PHOTOS[key]) {
      return `<img src="${this.RACK_PHOTOS[key]}" alt="${this.RACK_LABELS[key] || key}" loading="lazy">`;
    }
    return this.RACK_SVGS[key] || '';
  }

  private paintRackFrames(): void {
    document.querySelectorAll('.rack-frame[data-source]').forEach(el => {
      const key = el.getAttribute('data-source') || '';
      if (this.RACK_SVGS[key]) (el as HTMLElement).innerHTML = this.rackVisualMarkup(key);
    });
  }

  private prefillRackStages(): void {
    document.querySelectorAll('.rack-stage[data-target]').forEach(stage => {
      if (stage.querySelector('svg') || stage.querySelector('img')) return;
      const key = stage.getAttribute('data-target') || '';
      if (!this.RACK_SVGS[key]) return;
      const wrap = document.createElement('div');
      wrap.innerHTML = this.rackVisualMarkup(key);
      if (wrap.firstElementChild) stage.appendChild(wrap.firstElementChild);
    });
  }

  /* ---------------------------------------------------------
     Theme toggle — day / night mode, persisted in localStorage
  --------------------------------------------------------- */
  private initializeThemeToggle(): void {
    const root = document.documentElement;
    const buttons = [document.getElementById('themeToggle'), document.getElementById('themeToggleMobile')]
      .filter((b): b is HTMLElement => !!b);
    if (!buttons.length) return;

    const store = (val: string) => {
      try { localStorage.setItem('yogteck-theme', val); } catch (e) { /* storage unavailable */ }
    };

    const applyTheme = (theme: string) => {
      if (theme === 'light') {
        root.setAttribute('data-theme', 'light');
      } else {
        root.removeAttribute('data-theme');
      }
      buttons.forEach(btn => {
        const isLight = theme === 'light';
        btn.setAttribute('aria-pressed', String(isLight));
        btn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
        const label = btn.querySelector('.theme-toggle-label');
        if (label) label.textContent = isLight ? 'Dark mode' : 'Light mode';
      });
    };

    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    applyTheme(current);

    buttons.forEach(btn => {
      const handler = () => {
        const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        applyTheme(next);
        store(next);
      };
      btn.addEventListener('click', handler);
      this.cleanupFns.push(() => btn.removeEventListener('click', handler));
    });
  }

  /* ---------------------------------------------------------
     Navigation — transparent-to-solid, active link, smooth scroll
  --------------------------------------------------------- */
  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    if (!this.isBrowser) return;

    const targetEl = document.getElementById(sectionId);
    if (!targetEl) return;

    const offset = window.innerWidth <= 1080 ? 0 : parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0;
    const top = targetEl.getBoundingClientRect().top + window.scrollY - offset + 1;
    window.scrollTo({ top, behavior: this.prefersReducedMotion ? 'auto' : 'smooth' });
    window.history.replaceState(null, '', `#${sectionId}`);
    this.closeMobileMenu();
  }

  private initializeNavigation(): void {
    const navbar = document.getElementById('navbar');
    const sections = ['hero', 'about', 'racks', 'projects', 'team', 'contact']
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const setScrolled = () => {
      navbar?.classList.toggle('scrolled', window.scrollY > 60);
    };
    setScrolled();
    const scrollHandler = this.debounce(setScrolled, 10);
    window.addEventListener('scroll', scrollHandler, { passive: true });
    this.cleanupFns.push(() => window.removeEventListener('scroll', scrollHandler));

    const activateLink = (sectionId: string) => {
      document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.toggle('active', (l as HTMLElement).dataset['section'] === sectionId);
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) activateLink(entry.target.id);
        });
      }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
      sections.forEach(s => observer.observe(s));
      this.cleanupFns.push(() => observer.disconnect());
    }
  }

  /* ---------------------------------------------------------
     Mobile menu
  --------------------------------------------------------- */
  private initializeMobileMenu(): void {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    const handler = () => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };
    toggle.addEventListener('click', handler);
    this.cleanupFns.push(() => toggle.removeEventListener('click', handler));

    menu.querySelectorAll('a').forEach(a => {
      const close = () => this.closeMobileMenu();
      a.addEventListener('click', close);
      this.cleanupFns.push(() => a.removeEventListener('click', close));
    });
  }

  private closeMobileMenu(): void {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
    menu?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /* ---------------------------------------------------------
     Hero ambient animation — mouse parallax on desktop
  --------------------------------------------------------- */
  private initializeHeroAnimations(): void {
    const visual = document.getElementById('heroVisual');
    const glow = document.getElementById('heroGlow');
    if (!visual) return;
    const isDesktop = window.matchMedia('(min-width: 1081px)').matches;

    if (isDesktop && !this.prefersReducedMotion) {
      const moveHandler = (e: MouseEvent) => {
        const rect = visual.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        visual.querySelectorAll('.rack-node').forEach((node, i) => {
          const depth = (i % 3) + 1;
          (node as HTMLElement).style.transform = `translate(${x * depth * 10}px, ${y * depth * 10}px)`;
        });
        if (glow) glow.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
      };
      const leaveHandler = () => {
        visual.querySelectorAll('.rack-node').forEach(node => { (node as HTMLElement).style.transform = ''; });
      };
      visual.addEventListener('mousemove', moveHandler);
      visual.addEventListener('mouseleave', leaveHandler);
      this.cleanupFns.push(() => {
        visual.removeEventListener('mousemove', moveHandler);
        visual.removeEventListener('mouseleave', leaveHandler);
      });
    }
  }

  /* ---------------------------------------------------------
     Scroll progress bar
  --------------------------------------------------------- */
  private initializeScrollProgress(): void {
    const bar = document.getElementById('scrollProgressBar');
    if (!bar) return;
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop || document.body.scrollTop;
      const height = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
      bar.style.width = height > 0 ? `${(scrolled / height) * 100}%` : '0%';
    };
    update();
    const scrollHandler = this.debounce(update, 5);
    const resizeHandler = this.debounce(update, 100);
    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', resizeHandler);
    this.cleanupFns.push(() => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
    });
  }

  /* ---------------------------------------------------------
     Generic scroll reveal (non-rack content)
  --------------------------------------------------------- */
  private initializeScrollReveal(): void {
    const targets = document.querySelectorAll(
      '.rack-copy, .about-inner, .process-inner > .section-eyebrow, .process-inner > .section-title, .projects-inner > *, .team-card, .contact-info, .contact-form'
    );
    targets.forEach(t => t.classList.add('reveal'));

    if (!('IntersectionObserver' in window) || this.prefersReducedMotion) {
      targets.forEach(t => t.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    targets.forEach(t => observer.observe(t));
    this.cleanupFns.push(() => observer.disconnect());
  }

  /* ---------------------------------------------------------
     THE CORE FEATURE — Hero-to-section rack image movement.
     A travelling clone is absolutely positioned (document
     coordinates) and interpolated between the hero rect and
     the target stage rect based on ScrollTrigger progress.
  --------------------------------------------------------- */
  private initializeRackScrollTransitions(): void {
    const isMobile = window.matchMedia('(max-width: 1080px)').matches;
    const layer = document.getElementById('transitionLayer');
    if (!layer) return;

    this.RACK_ORDER.forEach((key, i) => {
      const heroFrame = document.querySelector(`.rack-frame[data-source="${key}"]`) as HTMLElement | null;
      const heroNode = document.querySelector(`.rack-node[data-rack="${key}"]`) as HTMLElement | null;
      const stage = document.querySelector(`.rack-stage[data-target="${key}"]`) as HTMLElement | null;
      const sectionEl = document.querySelector(`[data-rack-section="${key}"]`) as HTMLElement | null;
      if (!heroFrame || !stage || !sectionEl) return;

      const clone = document.createElement('div');
      clone.className = 'travel-clone';
      clone.innerHTML = this.rackVisualMarkup(key);
      layer.appendChild(clone);

      const state: TravelState = { clone, heroFrame, heroNode, stage, sectionEl };

      if (isMobile || this.prefersReducedMotion) {
        const st = ScrollTrigger.create({
          trigger: sectionEl,
          start: 'top 75%',
          end: 'top 35%',
          scrub: this.prefersReducedMotion ? false : 0.6,
          onUpdate: self => this.simpleMobileTransition(state, self.progress),
          onEnter: () => this.simpleMobileTransition(state, 1),
          onLeaveBack: () => this.simpleMobileTransition(state, 0)
        });
        this.scrollTriggers.push(st);
      } else {
        const prevKey = this.RACK_ORDER[i - 1];
        const prevSection = prevKey ? document.querySelector(`[data-rack-section="${prevKey}"]`) : null;
        const startTrigger = prevSection || heroNode;
        const startPoint = prevSection ? 'bottom 75%' : 'bottom 85%';

        const st = ScrollTrigger.create({
          trigger: startTrigger as Element,
          start: startPoint,
          endTrigger: sectionEl,
          end: 'center 55%',
          scrub: 0.7,
          onRefreshInit: () => this.resetTravelState(state),
          onUpdate: self => this.updateTravel(state, self.progress),
        });
        this.scrollTriggers.push(st);
      }
    });

    const resizeHandler = () => {
      clearTimeout((this as any)._resizeTimer);
      (this as any)._resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener('resize', resizeHandler);
    this.cleanupFns.push(() => window.removeEventListener('resize', resizeHandler));
  }

  private getDocRect(el: HTMLElement) {
    const r = el.getBoundingClientRect();
    return {
      top: r.top + window.scrollY,
      left: r.left + window.scrollX,
      width: r.width,
      height: r.height
    };
  }

  private resetTravelState(state: TravelState): void {
    state._heroRect = this.getDocRect(state.heroFrame);
    state._targetRect = this.getDocRect(state.stage);
  }

  private updateTravel(state: TravelState, progress: number): void {
    const { clone, heroFrame, stage } = state;
    if (!state._heroRect || !state._targetRect) {
      this.resetTravelState(state);
    }
    const a = state._heroRect;
    const b = state._targetRect;
    if (!a || !b || a.width === 0 || b.width === 0) return;

    if (progress <= 0.001) {
      clone.style.opacity = '0';
      heroFrame.style.opacity = '1';
      stage.classList.remove('filled');
      return;
    }
    if (progress >= 0.999) {
      clone.style.opacity = '0';
      heroFrame.style.opacity = '0.15';
      stage.classList.add('filled');
      return;
    }

    heroFrame.style.opacity = String(Math.max(0, 1 - progress * 3));
    stage.classList.toggle('filled', progress > 0.92);

    const ease = this.easeInOutCubic(progress);
    const top = this.lerp(a.top, b.top, ease);
    const left = this.lerp(a.left, b.left, ease);
    const width = this.lerp(a.width, b.width, ease);
    const height = this.lerp(a.height, b.height, ease);
    const rotate = this.lerp(-4, 0, ease);

    clone.style.opacity = String(Math.min(1, progress * 4) * (1 - Math.max(0, progress - 0.9) * 10));
    clone.style.top = `${top}px`;
    clone.style.left = `${left}px`;
    clone.style.width = `${width}px`;
    clone.style.height = `${height}px`;
    clone.style.transform = `rotate(${rotate}deg)`;
  }

  private simpleMobileTransition(state: TravelState, progress: number): void {
    const { heroFrame, stage } = state;
    if (progress >= 1) {
      heroFrame.style.opacity = '0.2';
      stage.classList.add('filled');
    } else if (progress <= 0) {
      heroFrame.style.opacity = '1';
      stage.classList.remove('filled');
    } else {
      heroFrame.style.opacity = String(1 - progress * 0.8);
      stage.classList.toggle('filled', progress > 0.5);
    }
  }

  private lerp(a: number, b: number, t: number): number { return a + (b - a) * t; }
  private easeInOutCubic(t: number): number { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  /* ---------------------------------------------------------
     Process track — active step highlight tied to scroll
  --------------------------------------------------------- */
  private initializeProcessTrack(): void {
    const steps = Array.from(document.querySelectorAll('.process-step'));
    const fill = document.getElementById('processLineFill');
    const track = document.querySelector('.process-track') as HTMLElement | null;
    if (!steps.length || !track) return;

    const update = () => {
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh * 0.75 - rect.top) / (rect.height || 1);
      const progress = Math.min(1, Math.max(0, raw));

      if (fill) fill.style.width = `${progress * 100}%`;

      const activeCount = Math.round(progress * steps.length);
      steps.forEach((step, i) => step.classList.toggle('active', i < activeCount));
    };

    update();
    const scrollHandler = this.debounce(update, 10);
    const resizeHandler = this.debounce(update, 100);
    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', resizeHandler);
    this.cleanupFns.push(() => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
    });
  }

  /* ---------------------------------------------------------
     Gallery / carousel — builds project grid + filtering
  --------------------------------------------------------- */
  private initializeGallery(): void {
    const grid = document.getElementById('galleryGrid');
    const filters = document.querySelectorAll('.filter-btn');
    if (!grid) return;

    const render = (filter: string) => {
      grid.innerHTML = '';
      this.PROJECT_ITEMS
        .filter(item => filter === 'all' || item.key === filter)
        .forEach((item, idx) => {
          const el = document.createElement('div');
          el.className = 'project-item reveal in-view' + (this.RACK_PHOTOS[item.key] ? ' has-photo' : '');
          el.dataset['key'] = item.key;
          el.dataset['index'] = String(idx);
          el.innerHTML = `
            <div class="proj-visual">${this.rackVisualMarkup(item.key)}</div>
            <div class="proj-overlay">
              <span class="proj-title">${item.title}</span>
              <span class="proj-tag">${item.tag}</span>
            </div>`;
          grid.appendChild(el);
        });
    };

    render('all');

    filters.forEach(btn => {
      const handler = () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        render((btn as HTMLElement).dataset['filter'] || 'all');
      };
      btn.addEventListener('click', handler);
      this.cleanupFns.push(() => btn.removeEventListener('click', handler));
    });
  }

  /* ---------------------------------------------------------
     Lightbox — fullscreen preview with prev/next + swipe
  --------------------------------------------------------- */
  private initializeLightbox(): void {
    const lightbox = document.getElementById('lightbox') as HTMLElement | null;
    const stage = document.getElementById('lightboxStage');
    const caption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const grid = document.getElementById('galleryGrid');
    if (!lightbox || !stage || !caption || !closeBtn || !prevBtn || !nextBtn || !grid) return;

    let currentIndex = 0;
    let items: Element[] = [];

    const open = (index: number) => {
      items = Array.from(grid.querySelectorAll('.project-item'));
      if (!items.length) return;
      currentIndex = ((index % items.length) + items.length) % items.length;
      const item = items[currentIndex] as HTMLElement;
      const key = item.dataset['key'] || '';
      const title = item.querySelector('.proj-title')?.textContent || '';
      const tag = item.querySelector('.proj-tag')?.textContent || '';
      stage.innerHTML = this.rackVisualMarkup(key);
      caption.textContent = `${title} — ${tag}`;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      lightbox.hidden = true;
      document.body.style.overflow = '';
    };

    const gridHandler = (e: Event) => {
      const item = (e.target as HTMLElement).closest('.project-item') as HTMLElement | null;
      if (!item) return;
      open(Number(item.dataset['index']));
    };
    grid.addEventListener('click', gridHandler);

    closeBtn.addEventListener('click', close);
    const lightboxClickHandler = (e: Event) => { if (e.target === lightbox) close(); };
    lightbox.addEventListener('click', lightboxClickHandler);
    prevBtn.addEventListener('click', () => open(currentIndex - 1));
    nextBtn.addEventListener('click', () => open(currentIndex + 1));

    const keyHandler = (e: KeyboardEvent) => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') open(currentIndex - 1);
      if (e.key === 'ArrowRight') open(currentIndex + 1);
    };
    document.addEventListener('keydown', keyHandler);

    let touchStartX = 0;
    const touchStartHandler = (e: TouchEvent) => { touchStartX = e.touches[0].clientX; };
    const touchEndHandler = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        if (dx > 0) open(currentIndex - 1); else open(currentIndex + 1);
      }
    };
    lightbox.addEventListener('touchstart', touchStartHandler, { passive: true });
    lightbox.addEventListener('touchend', touchEndHandler, { passive: true });

    this.cleanupFns.push(() => {
      grid.removeEventListener('click', gridHandler);
      lightbox.removeEventListener('click', lightboxClickHandler);
      document.removeEventListener('keydown', keyHandler);
      lightbox.removeEventListener('touchstart', touchStartHandler);
      lightbox.removeEventListener('touchend', touchEndHandler);
    });
  }

  /* ---------------------------------------------------------
     Contact form — validation + backend API submit
  --------------------------------------------------------- */
  async submitContactForm(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement | null;
    if (!form || this.contactSubmitting) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const payload: Record<string, FormDataEntryValue> = {};
    new FormData(form).forEach((value, key) => {
      payload[key] = value;
    });
    console.log('Contact form submit payload:', payload);

    this.contactSubmitting = true;
    this.contactStatusMessage = '';

    try {
      const response = await fetch(this.CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      console.log('Contact form API response:', {
        status: response.status,
        ok: response.ok,
        result
      });

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to send enquiry right now.');
      }

      form.reset();
      this.contactStatusType = 'success';
      this.contactStatusMessage = 'Thank you. Your enquiry has been received - our team will get back to you shortly.';
    } catch (error) {
      console.error('Contact form submit failed:', error);
      this.contactStatusType = 'error';
      this.contactStatusMessage = error instanceof Error ? error.message : 'Unable to send enquiry right now.';
    } finally {
      this.contactSubmitting = false;
    }
  }

  /* ---------------------------------------------------------
     Reduced motion — disable heavy movement, show images
     directly in their destination sections.
  --------------------------------------------------------- */
  private initializeReducedMotion(): void {
    if (!this.prefersReducedMotion) return;
    document.querySelectorAll('.rack-stage').forEach(stage => {
      const key = stage.getAttribute('data-target') || '';
      if (this.RACK_SVGS[key] && !stage.querySelector('svg') && !stage.querySelector('img')) {
        const wrap = document.createElement('div');
        wrap.innerHTML = this.rackVisualMarkup(key);
        if (wrap.firstElementChild) stage.appendChild(wrap.firstElementChild);
      }
      stage.classList.add('filled');
    });
  }

  /* ---------------------------------------------------------
     Utilities
  --------------------------------------------------------- */
  private debounce<T extends (...args: any[]) => void>(fn: T, wait: number): (...args: any[]) => void {
    let t: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }
}
