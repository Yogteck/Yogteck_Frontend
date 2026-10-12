import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  Inject,
  PLATFORM_ID,
  HostListener
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LocaleService } from '../../services/locale.service';

interface Node3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  isOrange: boolean;
}

interface Cube3D {
  label: string;
  x: number;
  y: number;
  z: number;
  baseY: number;
  size: number;
  color: string;
  strokeColor: string;
  phase: number;
  rotX: number;
  rotY: number;
}

interface ServerRack {
  x: number;
  y: number;
  z: number;
  baseY: number;
  width: number;
  height: number;
  depth: number;
  phase: number;
}

@Component({
  selector: 'app-hero-canvas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas #heroCanvas class="hero-3d-canvas" aria-hidden="true"></canvas>
  `,
  styles: [`
    :host {
      display: block;
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }
    .hero-3d-canvas {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  `]
})
export class HeroCanvasComponent implements OnInit, OnDestroy {
  @ViewChild('heroCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | null = null;
  private animId: number | null = null;
  private isBrowser = false;
  private isVisible = true;
  private prefersReducedMotion = false;

  // Scene dimensions & camera
  private width = 1200;
  private height = 700;
  private dpr = 1;
  private focalLength = 550;
  private cameraDistance = 380;

  // Parallax angles
  private mouseX = 0;
  private mouseY = 0;
  private targetRotY = 0;
  private targetRotX = 0;
  private curRotY = 0;
  private curRotX = 0;

  // Timers & animation state
  private startTime = 0;
  private lastTime = 0;
  private gridOffset = 0;

  // 3D Objects
  private nodes: Node3D[] = [];
  private cubes: Cube3D[] = [];
  private serverRacks: ServerRack[] = [];

  // Observers
  private intersectionObserver: IntersectionObserver | null = null;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    public localeService: LocaleService,
    private elRef: ElementRef
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // Lazy initialization after first paint so LCP is never delayed
    setTimeout(() => {
      this.initCanvas();
      this.initSceneObjects();
      this.setupObservers();
      this.startLoop();
    }, 80);
  }

  ngOnDestroy(): void {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d', { alpha: true });

    this.resizeCanvas();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.isBrowser) return;
    this.resizeCanvas();
    this.reinitNodes();
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
    this.width = Math.max(rect.width, 320);
    this.height = Math.max(rect.height, 480);

    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(this.width * this.dpr);
    canvas.height = Math.floor(this.height * this.dpr);

    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(this.dpr, this.dpr);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (this.prefersReducedMotion) return;
    const nx = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    this.targetRotY = nx * 0.18;
    this.targetRotX = -ny * 0.12;
  }

  private setupObservers(): void {
    // 1. IntersectionObserver to pause when offscreen
    if ('IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        const entry = entries[0];
        this.isVisible = entry ? entry.isIntersecting : true;
        if (this.isVisible && !this.animId) {
          this.startLoop();
        }
      }, { threshold: 0.05 });
      this.intersectionObserver.observe(this.elRef.nativeElement);
    }

    // 2. Visibility change to pause when tab is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.isVisible = false;
      } else {
        this.isVisible = true;
        if (!this.animId) this.startLoop();
      }
    });
  }

  private initSceneObjects(): void {
    this.reinitNodes();

    // 4 Floating 3D Cubes (ERP, SaaS, CRM, POS)
    // ERP orange (#FF9A1F), SaaS blue (#2F7BFF), CRM teal (#14B8A6), POS violet (#8B5CF6)
    // Note: ERP sits comfortably to the right/center so it never overlaps the left headline!
    this.cubes = [
      {
        label: 'ERP',
        x: 180,
        y: -30,
        z: 320,
        baseY: -30,
        size: 38,
        color: 'rgba(255, 154, 31, 0.22)',
        strokeColor: '#FF9A1F',
        phase: 0,
        rotX: 0.2,
        rotY: 0.4
      },
      {
        label: 'SaaS',
        x: -90,
        y: -110,
        z: 360,
        baseY: -110,
        size: 34,
        color: 'rgba(47, 123, 255, 0.22)',
        strokeColor: '#3AA0FF',
        phase: Math.PI * 0.5,
        rotX: -0.2,
        rotY: 0.6
      },
      {
        label: 'CRM',
        x: 240,
        y: 110,
        z: 340,
        baseY: 110,
        size: 32,
        color: 'rgba(20, 184, 166, 0.22)',
        strokeColor: '#14B8A6',
        phase: Math.PI,
        rotX: 0.3,
        rotY: -0.3
      },
      {
        label: 'POS',
        x: 40,
        y: 140,
        z: 300,
        baseY: 140,
        size: 30,
        color: 'rgba(139, 92, 246, 0.22)',
        strokeColor: '#A78BFA',
        phase: Math.PI * 1.5,
        rotX: -0.15,
        rotY: 0.5
      }
    ];

    // 2 Floating server racks (3 slabs each)
    this.serverRacks = [
      {
        x: -210,
        y: 60,
        z: 420,
        baseY: 60,
        width: 70,
        height: 110,
        depth: 55,
        phase: 0.2
      },
      {
        x: 320,
        y: -40,
        z: 460,
        baseY: -40,
        width: 75,
        height: 120,
        depth: 60,
        phase: 1.8
      }
    ];
  }

  private reinitNodes(): void {
    const isMobile = this.width < 600;
    const nodeCount = isMobile ? 30 : 64;

    this.nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      this.nodes.push({
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 500,
        z: 120 + Math.random() * 450,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.25,
        isOrange: i % 7 === 0 // Every 7th node is orange, others light blue
      });
    }
  }

  private startLoop(): void {
    if (!this.ctx) return;
    this.startTime = performance.now();
    this.lastTime = this.startTime;

    const frame = (time: number) => {
      if (!this.isVisible) {
        this.animId = null;
        return;
      }

      this.render(time);

      if (this.prefersReducedMotion) {
        // Draw one clean static frame and do not loop
        this.animId = null;
        return;
      }

      this.animId = requestAnimationFrame(frame);
    };

    this.animId = requestAnimationFrame(frame);
  }

  // --- Rendering & 3D Math Engine ---
  private render(timestamp: number): void {
    const ctx = this.ctx;
    if (!ctx) return;

    const t = (timestamp - this.startTime) * 0.001; // elapsed in seconds
    const dt = Math.min((timestamp - this.lastTime) * 0.001, 0.1);
    this.lastTime = timestamp;

    // Clear canvas
    ctx.clearRect(0, 0, this.width, this.height);

    // RTL awareness: in RTL, the visual center is at ~38% width, in LTR at ~62%
    const isRtl = this.localeService.isRtl();
    const cx = isRtl ? this.width * 0.38 : this.width * 0.62;
    const cy = this.height * 0.52;

    // Smooth lerp rotation with touch auto-sway fallback
    const autoSwayY = Math.sin(t * 0.45) * 0.08;
    const autoSwayX = Math.cos(t * 0.35) * 0.04;
    this.curRotY += ((this.targetRotY || autoSwayY) - this.curRotY) * 0.05;
    this.curRotX += ((this.targetRotX || autoSwayX) - this.curRotX) * 0.05;

    // Protected text zone:
    // In LTR: Left side from 0 to width*0.52
    // In RTL: Right side from width*0.48 to width
    const protectedZone = {
      x0: isRtl ? this.width * 0.46 : 0,
      x1: isRtl ? this.width : this.width * 0.54,
      y0: 0,
      y1: this.height
    };

    // 1. Moving perspective grid floor
    this.gridOffset = (this.gridOffset + dt * 55) % 80;
    this.drawGridFloor(ctx, cx, cy, t);

    // 2. Server Racks (bobbing + blinking LEDs + floor shadow)
    this.drawServerRacks(ctx, cx, cy, t, protectedZone);

    // 3. 3D Network of glowing nodes and connection lines
    this.drawNetworkNodes(ctx, cx, cy, dt, protectedZone);

    // 4. Floating 3D Cubes (ERP, SaaS, CRM, POS)
    this.drawFloatingCubes(ctx, cx, cy, t, protectedZone);

    // 5. 6 Orbiting Pill Tags (Cloud, API, E-commerce, Billing, Mobile apps, SEO)
    this.drawOrbitingTags(ctx, cx, cy, t, protectedZone);
  }

  /**
   * Projects a 3D coordinate (x, y, z) into 2D canvas coordinates (sx, sy)
   */
  private project(
    x: number,
    y: number,
    z: number,
    cx: number,
    cy: number
  ): { sx: number; sy: number; scale: number; valid: boolean; depth: number } {
    // 3D rotation around Y
    const cosY = Math.cos(this.curRotY);
    const sinY = Math.sin(this.curRotY);
    const x1 = x * cosY + z * sinY;
    const z1 = -x * sinY + z * cosY + this.cameraDistance;

    // 3D rotation around X
    const cosX = Math.cos(this.curRotX);
    const sinX = Math.sin(this.curRotX);
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;

    if (z2 <= 20) {
      return { sx: cx, sy: cy, scale: 0, valid: false, depth: z2 };
    }

    const scale = this.focalLength / z2;
    const sx = cx + x1 * scale;
    const sy = cy + y2 * scale;

    return { sx, sy, scale, valid: true, depth: z2 };
  }

  /**
   * Determines opacity factor: fades elements down to 6% when entering the protected text zone
   */
  private getZoneFade(sx: number, sy: number, zone: { x0: number; x1: number; y0: number; y1: number }): number {
    if (sx >= zone.x0 && sx <= zone.x1 && sy >= zone.y0 && sy <= zone.y1) {
      return 0.06; // 6% protected zone opacity
    }
    return 1.0;
  }

  // --- Sub-renderer: Perspective Grid Floor ---
  private drawGridFloor(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    t: number
  ): void {
    const floorY = 210;
    const zMin = 70;
    const zMax = 850;
    const stepZ = 70;
    const xRange = 700;
    const stepX = 100;

    ctx.save();
    ctx.lineWidth = 1;

    // Z lines
    for (let x = -xRange; x <= xRange; x += stepX) {
      const p1 = this.project(x, floorY, zMin, cx, cy);
      const p2 = this.project(x, floorY, zMax, cx, cy);

      if (p1.valid && p2.valid) {
        const grad = ctx.createLinearGradient(p1.sx, p1.sy, p2.sx, p2.sy);
        grad.addColorStop(0, 'rgba(47, 123, 255, 0.22)');
        grad.addColorStop(1, 'rgba(47, 123, 255, 0.0)');
        ctx.strokeStyle = grad;

        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();
      }
    }

    // X lines (scrolling towards viewer)
    for (let z = zMin; z <= zMax; z += stepZ) {
      const curZ = z - this.gridOffset;
      if (curZ < zMin) continue;

      const pLeft = this.project(-xRange, floorY, curZ, cx, cy);
      const pRight = this.project(xRange, floorY, curZ, cx, cy);

      if (pLeft.valid && pRight.valid) {
        const alpha = Math.max(0, 0.24 * (1 - curZ / zMax));
        ctx.strokeStyle = `rgba(58, 160, 255, ${alpha.toFixed(3)})`;

        ctx.beginPath();
        ctx.moveTo(pLeft.sx, pLeft.sy);
        ctx.lineTo(pRight.sx, pRight.sy);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  // --- Sub-renderer: Server Racks ---
  private drawServerRacks(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    t: number,
    zone: { x0: number; x1: number; y0: number; y1: number }
  ): void {
    ctx.save();

    for (const rack of this.serverRacks) {
      const bobY = rack.baseY + Math.sin(t * 1.3 + rack.phase) * 12;
      const floorY = 210;

      // Floor Shadow
      const shadowProj = this.project(rack.x, floorY, rack.z, cx, cy);
      if (shadowProj.valid) {
        ctx.save();
        const sw = rack.width * shadowProj.scale * 1.3;
        const sh = rack.depth * shadowProj.scale * 0.7;
        const shadowGrad = ctx.createRadialGradient(
          shadowProj.sx, shadowProj.sy, 2,
          shadowProj.sx, shadowProj.sy, sw
        );
        shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
        shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = shadowGrad;
        ctx.beginPath();
        ctx.ellipse(shadowProj.sx, shadowProj.sy, sw, sh, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw 3 Slabs per Rack
      const slabCount = 3;
      const slabGap = 6;
      const slabHeight = (rack.height - slabGap * (slabCount - 1)) / slabCount;

      for (let s = 0; s < slabCount; s++) {
        const sy = bobY - (rack.height / 2) + s * (slabHeight + slabGap);
        const centerProj = this.project(rack.x, sy + slabHeight / 2, rack.z, cx, cy);
        if (!centerProj.valid) continue;

        const zoneFade = this.getZoneFade(centerProj.sx, centerProj.sy, zone);
        const alpha = Math.min(1, Math.max(0.06, (0.85 * (1 - centerProj.depth / 900)) * zoneFade));

        // Draw slab front face
        const w2 = (rack.width / 2);
        const d2 = (rack.depth / 2);

        const pTopLeft = this.project(rack.x - w2, sy, rack.z - d2, cx, cy);
        const pTopRight = this.project(rack.x + w2, sy, rack.z - d2, cx, cy);
        const pBotRight = this.project(rack.x + w2, sy + slabHeight, rack.z - d2, cx, cy);
        const pBotLeft = this.project(rack.x - w2, sy + slabHeight, rack.z - d2, cx, cy);

        if (pTopLeft.valid && pTopRight.valid && pBotRight.valid && pBotLeft.valid) {
          ctx.beginPath();
          ctx.moveTo(pTopLeft.sx, pTopLeft.sy);
          ctx.lineTo(pTopRight.sx, pTopRight.sy);
          ctx.lineTo(pBotRight.sx, pBotRight.sy);
          ctx.lineTo(pBotLeft.sx, pBotLeft.sy);
          ctx.closePath();

          ctx.fillStyle = `rgba(13, 20, 48, ${alpha * 0.9})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(58, 160, 255, ${alpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Blinking LEDs on server slab face
          const ledY = (pTopLeft.sy + pBotLeft.sy) / 2;
          const ledSpacing = 8 * centerProj.scale;
          const startLedX = pTopLeft.sx + 10 * centerProj.scale;

          const ledColors = ['#10B981', '#38BDF8', '#F59E0B'];
          for (let l = 0; l < 4; l++) {
            const blink = Math.sin(t * 4 + s * 2 + l * 1.5 + rack.phase) > 0;
            const ledColor = blink ? ledColors[l % 3] : 'rgba(255, 255, 255, 0.15)';
            const ledRadius = Math.max(1, 2 * centerProj.scale);

            ctx.beginPath();
            ctx.arc(startLedX + l * ledSpacing, ledY, ledRadius, 0, Math.PI * 2);
            ctx.fillStyle = ledColor;
            ctx.globalAlpha = alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    ctx.restore();
  }

  // --- Sub-renderer: 3D Network Nodes ---
  private drawNetworkNodes(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    dt: number,
    zone: { x0: number; x1: number; y0: number; y1: number }
  ): void {
    ctx.save();

    // Update node positions with drift
    for (const node of this.nodes) {
      node.x += node.vx * dt * 45;
      node.y += node.vy * dt * 45;
      node.z += node.vz * dt * 45;

      // Wrap boundaries
      if (node.x < -420) node.x = 420;
      if (node.x > 420) node.x = -420;
      if (node.y < -260) node.y = 260;
      if (node.y > 260) node.y = -260;
      if (node.z < 100) node.z = 580;
      if (node.z > 580) node.z = 100;
    }

    // Project nodes
    const projected = this.nodes.map(node => ({
      node,
      proj: this.project(node.x, node.y, node.z, cx, cy)
    }));

    // Connect nearby nodes with alpha based on distance & depth
    const maxDist = 140;
    const count = projected.length;

    for (let i = 0; i < count; i++) {
      const pA = projected[i];
      if (!pA.proj.valid) continue;

      for (let j = i + 1; j < count; j++) {
        const pB = projected[j];
        if (!pB.proj.valid) continue;

        const dx = pA.node.x - pB.node.x;
        const dy = pA.node.y - pB.node.y;
        const dz = pA.node.z - pB.node.z;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDist * maxDist) {
          const dist = Math.sqrt(distSq);
          const midX = (pA.proj.sx + pB.proj.sx) / 2;
          const midY = (pA.proj.sy + pB.proj.sy) / 2;
          const zoneFade = this.getZoneFade(midX, midY, zone);

          const depthAlpha = Math.max(0, 1 - (pA.proj.depth + pB.proj.depth) / 1300);
          const lineAlpha = (1 - dist / maxDist) * 0.35 * depthAlpha * zoneFade;

          if (lineAlpha > 0.01) {
            ctx.strokeStyle = pA.node.isOrange || pB.node.isOrange
              ? `rgba(255, 154, 31, ${lineAlpha.toFixed(3)})`
              : `rgba(96, 165, 250, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pA.proj.sx, pA.proj.sy);
            ctx.lineTo(pB.proj.sx, pB.proj.sy);
            ctx.stroke();
          }
        }
      }
    }

    // Draw glowing node points
    for (const item of projected) {
      if (!item.proj.valid) continue;
      const zoneFade = this.getZoneFade(item.proj.sx, item.proj.sy, zone);
      const alpha = Math.max(0.06, (0.85 * (1 - item.proj.depth / 800)) * zoneFade);
      const radius = Math.max(1.8, (item.node.isOrange ? 4.5 : 3.2) * item.proj.scale);

      ctx.beginPath();
      ctx.arc(item.proj.sx, item.proj.sy, radius, 0, Math.PI * 2);
      ctx.fillStyle = item.node.isOrange ? '#FF9A1F' : '#60A5FA';
      ctx.globalAlpha = alpha;
      ctx.fill();

      // Outer glow for orange nodes
      if (item.node.isOrange) {
        ctx.beginPath();
        ctx.arc(item.proj.sx, item.proj.sy, radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 154, 31, 0.25)';
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    ctx.restore();
  }

  // --- Sub-renderer: 4 Floating 3D Cubes (ERP, SaaS, CRM, POS) ---
  private drawFloatingCubes(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    t: number,
    zone: { x0: number; x1: number; y0: number; y1: number }
  ): void {
    ctx.save();

    for (const cube of this.cubes) {
      const bobY = cube.baseY + Math.sin(t * 1.4 + cube.phase) * 16;
      const rotY = cube.rotY + t * 0.25;
      const rotX = cube.rotX + Math.sin(t * 0.5 + cube.phase) * 0.15;
      const s = cube.size;

      // 8 Vertices of the 3D cube
      const rawVertices = [
        [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s], // front face (0,1,2,3)
        [-s, -s, s],  [s, -s, s],  [s, s, s],  [-s, s, s]   // back face (4,5,6,7)
      ];

      // Rotate around cube center, then translate to cube (x, bobY, z)
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const transformed = rawVertices.map(([vx, vy, vz]) => {
        // Rot Y
        const rx = vx * cosY + vz * sinY;
        const rz = -vx * sinY + vz * cosY;
        // Rot X
        const ry = vy * cosX - rz * sinX;
        const rz2 = vy * sinX + rz * cosX;
        // Translate
        return {
          x: rx + cube.x,
          y: ry + bobY,
          z: rz2 + cube.z
        };
      });

      // Project vertices
      const projected = transformed.map(v => this.project(v.x, v.y, v.z, cx, cy));
      if (!projected.every(p => p.valid)) continue;

      const centerProj = this.project(cube.x, bobY, cube.z, cx, cy);
      const zoneFade = this.getZoneFade(centerProj.sx, centerProj.sy, zone);
      const baseAlpha = Math.min(1, Math.max(0.06, (0.9 * (1 - centerProj.depth / 900)) * zoneFade));

      // Define 6 faces by vertex indices
      const faces = [
        { indices: [0, 1, 2, 3], isFront: true },  // Front
        { indices: [5, 4, 7, 6], isFront: false }, // Back
        { indices: [4, 0, 3, 7], isFront: false }, // Left
        { indices: [1, 5, 6, 2], isFront: false }, // Right
        { indices: [4, 5, 1, 0], isFront: false }, // Top
        { indices: [3, 2, 6, 7], isFront: false }  // Bottom
      ];

      // Draw cube edges & faces
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = cube.strokeColor;
      ctx.fillStyle = cube.color;
      ctx.globalAlpha = baseAlpha;

      for (const face of faces) {
        ctx.beginPath();
        const p0 = projected[face.indices[0]];
        ctx.moveTo(p0.sx, p0.sy);
        for (let i = 1; i < 4; i++) {
          const pt = projected[face.indices[i]];
          ctx.lineTo(pt.sx, pt.sy);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      // Draw Latin text label on cube front (ERP, SaaS, CRM, POS)
      const fontSize = Math.max(10, Math.floor(14 * centerProj.scale));
      ctx.font = `bold ${fontSize}px var(--font-sans), sans-serif`;
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(cube.label, centerProj.sx, centerProj.sy);

      ctx.globalAlpha = 1;
    }

    ctx.restore();
  }

  // --- Sub-renderer: 6 Orbiting Pill Tags ---
  private drawOrbitingTags(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    t: number,
    zone: { x0: number; x1: number; y0: number; y1: number }
  ): void {
    const orbitTags = this.localeService.currentDict().hero.orbitTags || [
      'Cloud', 'API', 'E-commerce', 'Billing', 'Mobile apps', 'SEO'
    ];

    const count = orbitTags.length;
    const rx = 340;
    const rz = 210;
    const speed = 0.35;
    const centerZ = 340;

    ctx.save();

    for (let i = 0; i < count; i++) {
      const angle = t * speed + (i * (Math.PI * 2) / count);
      const tagX = Math.cos(angle) * rx;
      const tagZ = Math.sin(angle) * rz + centerZ;
      const tagY = Math.sin(t * 1.1 + i) * 25 + (i % 2 === 0 ? -40 : 40);

      const proj = this.project(tagX, tagY, tagZ, cx, cy);
      if (!proj.valid) continue;

      const zoneFade = this.getZoneFade(proj.sx, proj.sy, zone);
      const depthAlpha = Math.max(0.1, 1 - proj.depth / 900);
      const alpha = Math.min(1, Math.max(0.06, depthAlpha * zoneFade));

      const tagText = orbitTags[i];
      const fontSize = Math.max(10, Math.floor(12 * proj.scale));
      ctx.font = `600 ${fontSize}px var(--font-sans), sans-serif`;

      const metrics = ctx.measureText(tagText);
      const textWidth = metrics.width;
      const padX = 10 * proj.scale;
      const padY = 5 * proj.scale;
      const pillWidth = textWidth + padX * 2;
      const pillHeight = fontSize + padY * 2;
      const pillRadius = pillHeight / 2;

      const px = proj.sx - pillWidth / 2;
      const py = proj.sy - pillHeight / 2;

      ctx.globalAlpha = alpha;

      // Draw rounded pill background
      ctx.beginPath();
      ctx.roundRect(px, py, pillWidth, pillHeight, pillRadius);
      ctx.fillStyle = 'rgba(10, 19, 48, 0.88)';
      ctx.fill();
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(255, 154, 31, 0.65)' : 'rgba(58, 160, 255, 0.55)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Text inside pill
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(tagText, proj.sx, proj.sy + 1);

      ctx.globalAlpha = 1;
    }

    ctx.restore();
  }
}
