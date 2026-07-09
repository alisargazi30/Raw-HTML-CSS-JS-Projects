/* ═══════════════════════════════════════════════
     HERO — Floating architectural wireframe city
  ═══════════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById("hero-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 8, 30);
  camera.lookAt(0, 0, 0);

  // Fog
  scene.fog = new THREE.FogExp2(0x0d0d0d, 0.018);

  const matWire = new THREE.LineBasicMaterial({
    color: 0x3a4a5c,
    transparent: true,
    opacity: 0.6,
  });
  const matAccent = new THREE.LineBasicMaterial({
    color: 0xb04a2a,
    transparent: true,
    opacity: 0.8,
  });
  const matSand = new THREE.LineBasicMaterial({
    color: 0xc8b89a,
    transparent: true,
    opacity: 0.35,
  });

  // Build city of wireframe boxes
  const buildings = [];
  for (let i = 0; i < 40; i++) {
    const w = Math.random() * 1.5 + 0.5;
    const h = Math.random() * 6 + 1;
    const d = Math.random() * 1.5 + 0.5;
    const geo = new THREE.BoxGeometry(w, h, d);
    const edges = new THREE.EdgesGeometry(geo);
    const mat =
      Math.random() > 0.85
        ? matAccent
        : Math.random() > 0.5
          ? matWire
          : matSand;
    const line = new THREE.LineSegments(edges, mat);
    line.position.set(
      (Math.random() - 0.5) * 40,
      h / 2 - 0.5,
      (Math.random() - 0.5) * 30,
    );
    scene.add(line);
    buildings.push({
      mesh: line,
      baseY: line.position.y,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
    });
  }

  // Ground grid
  const gridGeo = new THREE.BufferGeometry();
  const gSize = 40,
    gStep = 2;
  const gPoints = [];
  for (let x = -gSize; x <= gSize; x += gStep) {
    gPoints.push(x, 0, -gSize, x, 0, gSize);
  }
  for (let z = -gSize; z <= gSize; z += gStep) {
    gPoints.push(-gSize, 0, z, gSize, 0, z);
  }
  gridGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(gPoints, 3),
  );
  const grid = new THREE.LineSegments(
    gridGeo,
    new THREE.LineBasicMaterial({
      color: 0x3a4a5c,
      transparent: true,
      opacity: 0.2,
    }),
  );
  grid.position.y = -0.5;
  scene.add(grid);

  // Particles
  const pGeo = new THREE.BufferGeometry();
  const pCount = 200;
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 60;
    pPos[i * 3 + 1] = Math.random() * 20;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 40;
  }
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  const particles = new THREE.Points(
    pGeo,
    new THREE.PointsMaterial({
      color: 0xc8b89a,
      size: 0.08,
      transparent: true,
      opacity: 0.5,
    }),
  );
  scene.add(particles);

  let mouseX = 0,
    mouseY = 0;
  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.005;

    buildings.forEach((b) => {
      b.mesh.position.y = b.baseY + Math.sin(t + b.phase) * 0.15;
      b.mesh.rotation.y += b.speed * 0.02;
    });

    particles.rotation.y = t * 0.02;

    camera.position.x += (mouseX * 3 - camera.position.x) * 0.03;
    camera.position.y += (mouseY * 2 + 8 - camera.position.y) * 0.03;
    camera.lookAt(0, 2, 0);

    renderer.render(scene, camera);
  }
  animate();
})();

/* ═══════════════════════════════════════════════
     PROJECT CARDS — mini Three.js per card
  ═══════════════════════════════════════════════ */
const projects = [
  {
    year: "1403",
    name: "ویلای کوهستان",
    type: "مسکونی — شمال ایران",
    color: 0x3a4a5c,
    shape: "angular",
  },
  {
    year: "1402",
    name: "مرکز فرهنگی آرا",
    type: "فرهنگی — تهران",
    color: 0xb04a2a,
    shape: "tower",
  },
  {
    year: "1400",
    name: "دفتر هرمس",
    type: "تجاری — اصفهان",
    color: 0xc8b89a,
    shape: "grid",
  },
  {
    year: "1403",
    name: "دفتر آرامیس",
    type: "تجاری — زاهدان",
    color: 0xc8b89a,
    shape: "build",
  },
  {
    year: "1403",
    name: "خانه باغ",
    type: "مسکونی — شیراز",
    color: 0x3a4a5c,
    shape: "angular",
  },
  {
    year: "1402",
    name: "مرکز خرید دبی",
    type: "تجاری — زاهدان",
    color: 0xb04a2a,
    shape: "tower",
  }
];

const grid2 = document.getElementById("projectsGrid");
projects.forEach((p, idx) => {
  const card = document.createElement("div");
  card.className = "project-card";
  card.innerHTML = `
      <div class="project-canvas-wrap" id="pcanvas-${idx}"></div>
      <div class="project-info">
        <p class="project-year">${p.year}</p>
        <h3 class="project-name">${p.name}</h3>
        <p class="project-type">${p.type}</p>
      </div>`;
  grid2.appendChild(card);

  const wrap = document.getElementById(`pcanvas-${idx}`);
  const pc = document.createElement("canvas");
  wrap.appendChild(pc);

  const pr = new THREE.WebGLRenderer({
    canvas: pc,
    antialias: true,
    alpha: true,
  });
  pr.setPixelRatio(Math.min(devicePixelRatio, 2));
  pr.setSize(wrap.offsetWidth, wrap.offsetHeight);

  const ps = new THREE.Scene();
  ps.fog = new THREE.FogExp2(0x1a1a1a, 0.06);
  const pc2 = new THREE.PerspectiveCamera(
    50,
    wrap.offsetWidth / wrap.offsetHeight,
    0.1,
    100,
  );
  pc2.position.set(0, 3, 8);
  pc2.lookAt(0, 0, 0);

  const col = p.color;
  const mw = new THREE.LineBasicMaterial({
    color: col,
    transparent: true,
    opacity: 0.7,
  });

  const meshes = [];
  if (p.shape === "angular") {
    [
      [0, 0, 0, 3, 5],
      [1.5, 0, -0.5, 1.5, 3],
      [-1.5, 0, 0.5, 1, 4],
    ].forEach(([x, z, rz, w, h]) => {
      const g = new THREE.BoxGeometry(w, h, w * 0.8);
      const e = new THREE.EdgesGeometry(g);
      const l = new THREE.LineSegments(e, mw);
      l.position.set(x, h / 2, z);
      l.rotation.z = rz * 0.1;
      ps.add(l);
      meshes.push(l);
    });
  } else if (p.shape === "tower") {
    for (let i = 0; i < 5; i++) {
      const r = 1.5 - i * 0.2;
      const g = new THREE.BoxGeometry(r * 2, 1.2, r * 2);
      const e = new THREE.EdgesGeometry(g);
      const l = new THREE.LineSegments(
        e,
        new THREE.LineBasicMaterial({
          color: col,
          transparent: true,
          opacity: 0.5 + i * 0.1,
        }),
      );
      l.position.y = i * 1.3;
      ps.add(l);
      meshes.push(l);
    }
  } else {
    for (let x = -2; x <= 2; x += 2) {
      for (let z = -1; z <= 1; z += 2) {
        const h = Math.random() * 3 + 1;
        const g = new THREE.BoxGeometry(0.8, h, 0.8);
        const e = new THREE.EdgesGeometry(g);
        const l = new THREE.LineSegments(e, mw);
        l.position.set(x, h / 2, z);
        ps.add(l);
        meshes.push(l);
      }
    }
  }

  // ground
  const gg = new THREE.GridHelper(10, 10, 0x222222, 0x222222);
  ps.add(gg);

  let pt = Math.random() * 100;
  let hovering = false;
  wrap.addEventListener("mouseenter", () => (hovering = true));
  wrap.addEventListener("mouseleave", () => (hovering = false));

  (function loop() {
    requestAnimationFrame(loop);
    pt += hovering ? 0.025 : 0.008;
    meshes.forEach((m, i) => {
      m.rotation.y = pt * 0.3 + i * 0.5;
    });
    ps.rotation.y = pt * 0.05;
    pr.render(ps, pc2);
  })();
});

/* ═══════════════════════════════════════════════
     SKILLS
  ═══════════════════════════════════════════════ */
const skills = [
  { name: "طراحی مفهومی", pct: 95 },
  { name: "رویت و BIM", pct: 90 },
  { name: "طراحی پایدار", pct: 85 },
  { name: "رندرینگ ۳بعدی", pct: 88 },
  { name: "مدیریت پروژه", pct: 80 },
  { name: "طراحی داخلی", pct: 78 },
];

const sl = document.getElementById("skillsList");
skills.forEach((s) => {
  sl.innerHTML += `
      <div class="skill-item">
        <span class="skill-name">${s.name}</span>
        <div class="skill-bar-wrap"><div class="skill-bar" data-pct="${s.pct}"></div></div>
      </div>`;
});

// Animate bars on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll(".skill-bar").forEach((b) => {
          b.style.width = b.dataset.pct + "%";
        });
      }
    });
  },
  { threshold: 0.3 },
);
io.observe(document.getElementById("skills"));

/* ═══════════════════════════════════════════════
     CURSOR
  ═══════════════════════════════════════════════ */
const dot = document.getElementById("cursorDot");
const ring = document.getElementById("cursorRing");
let rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  const x = e.clientX,
    y = e.clientY;
  dot.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
  rx += (x - 18 - rx) * 0.12;
  ry += (y - 18 - ry) * 0.12;
  ring.style.transform = `translate(${rx}px, ${ry}px)`;
});

(function cursorLoop() {
  requestAnimationFrame(cursorLoop);
  // lazy follow already handled above
})();
