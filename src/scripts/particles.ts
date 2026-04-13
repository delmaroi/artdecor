class ParticleTerrain {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private time = 0;
  private points: { x: number; y: number; scale: number }[] = [];
  private gridSize = { x: 35, z: 35 };
  private spacing = 70;
  private fov = 450;
  private camera = { x: 0, y: -280, z: -800 };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  private project(x: number, y: number, z: number) {
    const px = x - this.camera.x;
    const py = y - this.camera.y;
    const pz = z - this.camera.z;

    const scale = this.fov / (this.fov + pz);
    const x2d = px * scale + this.width / 2;
    const y2d = py * scale + this.height / 2;

    return { x: x2d, y: y2d, scale };
  }

  private update() {
    this.time += 0.006;
    this.points = [];

    for (let z = 0; z < this.gridSize.z; z++) {
      for (let x = 0; x < this.gridSize.x; x++) {
        const posX = (x - this.gridSize.x / 2) * this.spacing;
        const posZ = (z - this.gridSize.z / 2) * this.spacing;

        const dist = Math.sqrt(posX * posX + posZ * posZ) * 0.0015;
        const height = Math.sin(posX * 0.004 + this.time) * 45 +
                       Math.cos(posZ * 0.003 + this.time * 0.7) * 40 +
                       Math.sin(dist * 8 - this.time * 1.5) * 20;

        const p = this.project(posX, height, posZ);
        this.points.push(p);
      }
    }
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.beginPath();
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    this.ctx.lineWidth = 0.5;

    for (let z = 0; z < this.gridSize.z; z++) {
      for (let x = 0; x < this.gridSize.x; x++) {
        const i = z * this.gridSize.x + x;
        const p = this.points[i];

        if (p.scale <= 0) continue;

        if (x < this.gridSize.x - 1) {
          const nextX = this.points[i + 1];
          if (nextX.scale > 0) {
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(nextX.x, nextX.y);
          }
        }

        if (z < this.gridSize.z - 1) {
          const nextZ = this.points[i + this.gridSize.x];
          if (nextZ.scale > 0) {
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(nextZ.x, nextZ.y);
          }
        }
      }
    }
    this.ctx.stroke();

    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i];
      if (p.scale <= 0) continue;

      const alpha = Math.min(Math.max(p.scale * 0.8, 0), 1) * 0.5;
      this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.scale * 1.8, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

const canvas = document.getElementById('hero-particles');
if (canvas instanceof HTMLCanvasElement) {
  const terrain = new ParticleTerrain(canvas);
  window.addEventListener('resize', () => terrain.resize());
  terrain.animate();
}
