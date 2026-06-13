/**
 * Component: Folding Origami Geometrics 404
 * Category: error-404
 */

export const component = {
  id: 'folding-origami-geometrics-404',
  name: 'Folding Origami Geometrics 404',
  category: 'error-404',
  tag: '3D Canvas',
  html: `<div class="origami-sandbox" id="origami-container">
  <canvas class="origami-canvas" id="origami-canvas"></canvas>

  <div class="origami-overlay">
    <div class="origami-badge">GEOMETRIC FOLD DEVIATION</div>
    <h1 class="origami-title">404</h1>
    <h3 class="origami-subtitle">ORIGAMI_SCULPTURE_LOST</h3>
    <p class="origami-desc">The structural geometry of this page has unfolded. Interact with your cursor to pivot the 3D crane fold mesh.</p>
    <a href="#landing" class="origami-btn">Refold Dimension</a>
  </div>
</div>`,
  js: `// Folding Origami Geometrics 404
const container = document.getElementById('origami-container');
if (container) {
  const canvas = container.querySelector('#origami-canvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: 0, y: 0, tx: 0, ty: 0, active: false };

  // 3D Crane vertices {x, y, z}
  const vertices = [
    { x: 0, y: -70, z: 0 },    // 0: Head tip
    { x: 0, y: 70, z: 0 },     // 1: Tail tip
    { x: -90, y: -10, z: -10 },// 2: Left Wing tip
    { x: 90, y: -10, z: -10 }, // 3: Right Wing tip
    { x: -30, y: 10, z: 20 },  // 4: Left Wing base
    { x: 30, y: 10, z: 20 },   // 5: Right Wing base
    { x: 0, y: -10, z: 35 },   // 6: Spine front
    { x: 0, y: 30, z: -25 }    // 7: Spine back
  ];

  // Faces: array of vertex indices and base shade multipliers
  const faces = [
    { indices: [0, 6, 4], color: '#6366f1', shade: 1.0 }, // Head to left body
    { indices: [0, 5, 6], color: '#4f46e5', shade: 0.85 }, // Head to right body
    { indices: [6, 1, 4], color: '#818cf8', shade: 0.95 }, // Spine to left body
    { indices: [6, 5, 1], color: '#4338ca', shade: 0.75 }, // Spine to right body
    
    // Left Wing panels
    { indices: [4, 2, 6], color: '#4f46e5', shade: 1.1 },
    { indices: [4, 1, 2], color: '#6366f1', shade: 0.8 },
    
    // Right Wing panels
    { indices: [5, 6, 2], color: '#4338ca', shade: 1.05 },
    { indices: [5, 2, 1], color: '#312e81', shade: 0.7 },

    // Bottom folding facets
    { indices: [4, 7, 1], color: '#312e81', shade: 0.6 },
    { indices: [5, 1, 7], color: '#1e1b4b', shade: 0.5 }
  ];

  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    // Map mouse position to rotation target angles
    mouse.tx = (mx - width / 2) * 0.008;
    mouse.ty = (my - height / 2) * 0.008;
    mouse.active = true;
  };

  const handleMouseLeave = () => {
    mouse.active = false;
    mouse.tx = 0;
    mouse.ty = 0;
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  };
  window.addEventListener('resize', resize);

  // Tab suspension & IntersectionObserver check
  let visible = true;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      visible = entry.isIntersecting;
    });
  }, { threshold: 0.05 });
  observer.observe(container);

  const handleVisibility = () => {
    visible = !document.hidden;
  };
  document.addEventListener('visibilitychange', handleVisibility);

  let active = true;
  
  // Rotation variables
  let rx = -0.4;
  let ry = 0.5;
  let rz = 0.0;

  // Wing flap animation variable
  let wingFlap = 0.0;

  const loop = () => {
    if (!active) return;
    requestAnimationFrame(loop);

    if (!visible) return;

    // Clear background with rich cosmic dark
    ctx.fillStyle = '#080a10';
    ctx.fillRect(0, 0, width, height);

    // Draw tech background grid
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let j = 0; j < height; j += 40) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(width, j);
      ctx.stroke();
    }

    // Interp rotation toward target
    if (mouse.active) {
      rx += (mouse.ty - rx) * 0.1;
      ry += (mouse.tx - ry) * 0.1;
    } else {
      // Auto spin
      ry += 0.006;
      rx = -0.3 + Math.sin(Date.now() * 0.001) * 0.15;
    }

    // Wing flap oscillation
    wingFlap = Math.sin(Date.now() * 0.003) * 15;

    // Project and render faces
    const projected = vertices.map((v, index) => {
      // Rotate around Y
      let x1 = v.x * Math.cos(ry) - v.z * Math.sin(ry);
      let z1 = v.x * Math.sin(ry) + v.z * Math.cos(ry);

      // Rotate around X
      let y2 = v.y * Math.cos(rx) - z1 * Math.sin(rx);
      let z2 = v.y * Math.sin(rx) + z1 * Math.cos(rx);

      // Add wing flap modification
      if (index === 2) { // Left wing tip
        y2 += wingFlap;
      }
      if (index === 3) { // Right wing tip
        y2 += wingFlap;
      }

      // Projection parameters
      const fov = 340;
      const zoom = 1.35;
      const scale = fov / (fov + z2);
      const cx = width / 2;
      const cy = height * 0.42;

      return {
        x: cx + x1 * scale * zoom,
        y: cy + y2 * scale * zoom,
        z: z2
      };
    });

    // Sort faces by average depth (Painter's algorithm)
    const sortedFaces = faces.map(f => {
      const avgZ = (projected[f.indices[0]].z + projected[f.indices[1]].z + projected[f.indices[2]].z) / 3;
      return { ...f, avgZ };
    }).sort((a, b) => b.avgZ - a.avgZ);

    // Draw faces
    sortedFaces.forEach(f => {
      const p0 = projected[f.indices[0]];
      const p1 = projected[f.indices[1]];
      const p2 = projected[f.indices[2]];

      // Flat shading calculation (Normal-based shading)
      const ux = p1.x - p0.x;
      const uy = p1.y - p0.y;
      const vx = p2.x - p0.x;
      const vy = p2.y - p0.y;
      const crossProduct = ux * vy - uy * vx;

      // Draw all triangles (or only facing front using crossProduct > 0)
      ctx.fillStyle = f.color;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });
  };

  loop();

  // Cleanup
  container.addEventListener('destroyed', () => {
    active = false;
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseleave', handleMouseLeave);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}`,
  ts: `// Folding Origami Geometrics 404 TS Definitions
interface OrigamiVert {
  x: number;
  y: number;
  z: number;
}

interface OrigamiFace {
  indices: number[];
  color: string;
  shade: number;
}

const container = document.getElementById('origami-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#origami-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: 0, y: 0, tx: 0, ty: 0, active: false };

  const vertices: OrigamiVert[] = [
    { x: 0, y: -70, z: 0 },
    { x: 0, y: 70, z: 0 },
    { x: -90, y: -10, z: -10 },
    { x: 90, y: -10, z: -10 },
    { x: -30, y: 10, z: 20 },
    { x: 30, y: 10, z: 20 },
    { x: 0, y: -10, z: 35 },
    { x: 0, y: 30, z: -25 }
  ];

  const faces: OrigamiFace[] = [
    { indices: [0, 6, 4], color: '#6366f1', shade: 1.0 },
    { indices: [0, 5, 6], color: '#4f46e5', shade: 0.85 },
    { indices: [6, 1, 4], color: '#818cf8', shade: 0.95 },
    { indices: [6, 5, 1], color: '#4338ca', shade: 0.75 },
    { indices: [4, 2, 6], color: '#4f46e5', shade: 1.1 },
    { indices: [4, 1, 2], color: '#6366f1', shade: 0.8 },
    { indices: [5, 6, 2], color: '#4338ca', shade: 1.05 },
    { indices: [5, 2, 1], color: '#312e81', shade: 0.7 },
    { indices: [4, 7, 1], color: '#312e81', shade: 0.6 },
    { indices: [5, 1, 7], color: '#1e1b4b', shade: 0.5 }
  ];

  const handleMouseMove = (e: MouseEvent) => {
    const rect = container!.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    mouse.tx = (mx - width / 2) * 0.008;
    mouse.ty = (my - height / 2) * 0.008;
    mouse.active = true;
  };

  const handleMouseLeave = () => {
    mouse.active = false;
    mouse.tx = 0;
    mouse.ty = 0;
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  const resize = () => {
    width = canvas.width = container!.clientWidth;
    height = canvas.height = container!.clientHeight;
  };
  window.addEventListener('resize', resize);

  let visible = true;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      visible = entry.isIntersecting;
    });
  }, { threshold: 0.05 });
  observer.observe(container);

  const handleVisibility = () => {
    visible = !document.hidden;
  };
  document.addEventListener('visibilitychange', handleVisibility);

  let active = true;
  let rx = -0.4;
  let ry = 0.5;
  let wingFlap = 0.0;

  const loop = () => {
    if (!active) return;
    requestAnimationFrame(loop);

    if (!visible) return;

    ctx.fillStyle = '#080a10';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(99, 102, 241, 0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let j = 0; j < height; j += 40) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(width, j);
      ctx.stroke();
    }

    if (mouse.active) {
      rx += (mouse.ty - rx) * 0.1;
      ry += (mouse.tx - ry) * 0.1;
    } else {
      ry += 0.006;
      rx = -0.3 + Math.sin(Date.now() * 0.001) * 0.15;
    }

    wingFlap = Math.sin(Date.now() * 0.003) * 15;

    const projected = vertices.map((v, index) => {
      const x1 = v.x * Math.cos(ry) - v.z * Math.sin(ry);
      const z1 = v.x * Math.sin(ry) + v.z * Math.cos(ry);

      let y2 = v.y * Math.cos(rx) - z1 * Math.sin(rx);
      const z2 = v.y * Math.sin(rx) + z1 * Math.cos(rx);

      if (index === 2 || index === 3) {
        y2 += wingFlap;
      }

      const fov = 340;
      const zoom = 1.35;
      const scale = fov / (fov + z2);
      const cx = width / 2;
      const cy = height * 0.42;

      return {
        x: cx + x1 * scale * zoom,
        y: cy + y2 * scale * zoom,
        z: z2
      };
    });

    const sortedFaces = faces.map(f => {
      const avgZ = (projected[f.indices[0]].z + projected[f.indices[1]].z + projected[f.indices[2]].z) / 3;
      return { ...f, avgZ };
    }).sort((a, b) => b.avgZ - a.avgZ);

    sortedFaces.forEach(f => {
      const p0 = projected[f.indices[0]];
      const p1 = projected[f.indices[1]];
      const p2 = projected[f.indices[2]];

      ctx.fillStyle = f.color;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });
  };

  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    container!.removeEventListener('mousemove', handleMouseMove);
    container!.removeEventListener('mouseleave', handleMouseLeave);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}`,
  css: `/* Folding Origami Geometrics 404 Styles */
.origami-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #080a10;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', system-ui, -apple-system, sans-serif;
  color: #ffffff;
  box-sizing: border-box;
}

.origami-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.origami-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 440px;
  padding: 32px;
  background: rgba(8, 10, 16, 0.5);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 24px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.65);
  pointer-events: auto;
  margin-top: 130px;
}

.origami-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 30px;
  background: rgba(99, 102, 241, 0.08);
  border: 1px solid rgba(99, 102, 241, 0.25);
  color: #818cf8;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 18px;
}

.origami-title {
  font-size: 110px;
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -3px;
  margin-bottom: 8px;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255,255,255,0.25), 0 0 20px rgba(99, 102, 241, 0.5);
}

.origami-subtitle {
  font-size: 13.5px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #818cf8;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.origami-desc {
  font-size: 13px;
  line-height: 1.6;
  color: #94a3b8;
  margin-bottom: 24px;
}

.origami-btn {
  display: inline-block;
  padding: 10px 26px;
  border-radius: 30px;
  background: transparent;
  border: 1px solid rgba(99, 102, 241, 0.45);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.origami-btn:hover {
  background: rgba(99, 102, 241, 0.1);
  border-color: #818cf8;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
  transform: translateY(-1px);
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#080a10] rounded-[24px] overflow-hidden flex items-center justify-center font-sans text-white" id="origami-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1]" id="origami-canvas"></canvas>

  <div class="relative z-[2] text-center max-w-[440px] p-[32px] bg-[#080a10]/50 backdrop-blur-[14px] border border-[#6366f1]/20 rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.65)] mt-[130px]">
    <div class="inline-block px-[12px] py-[4px] rounded-[30px] bg-[#6366f1]/8 border border-[#6366f1]/25 text-[#818cf8] text-[11px] font-extrabold tracking-[2px] mb-[18px]">GEOMETRIC FOLD DEVIATION</div>
    <h1 class="text-[110px] font-black leading-[0.95] tracking-[-3px] mb-[8px] text-white" style="text-shadow: 0 0 10px rgba(255,255,255,0.25), 0 0 20px rgba(99, 102, 241, 0.5);">404</h1>
    <h3 class="text-[13.5px] font-extrabold tracking-[1.5px] text-[#818cf8] mb-[12px] uppercase">ORIGAMI_SCULPTURE_LOST</h3>
    <p class="text-[13px] leading-relaxed text-[#94a3b8] mb-[24px]">The structural geometry of this page has unfolded. Interact with your cursor to pivot the 3D crane fold mesh.</p>
    <a href="#landing" class="inline-block px-[26px] py-[10px] rounded-[30px] bg-transparent border border-[#6366f1]/45 text-white text-[13px] font-bold hover:bg-[#6366f1]/10 hover:border-[#818cf8] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:translate-y-[-1px] transition-all duration-200">Refold Dimension</a>
  </div>
</div>`
};
