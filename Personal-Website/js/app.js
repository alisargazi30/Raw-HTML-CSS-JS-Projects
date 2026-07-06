document.getElementById("year").textContent = new Date().getFullYear();

const themes = document.querySelectorAll(".theme-btn");
themes.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.documentElement.removeAttribute("data-theme");
    const t = btn.getAttribute("data-t");
    if (t !== "dark") document.documentElement.setAttribute("data-theme", t);
    themes.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

const words = [
  "مهندس DevOps",
  "توسعه‌دهنده نرم‌افزار",
  "طراح وب‌سایت",
  "مشاور دیجیتال مارکتینگ",
  "متخصص هوش مصنوعی",
];
let wi = 0,
  ci = 0,
  del = false;
const tw = document.getElementById("typewriter-text");
function typeLoop() {
  const word = words[wi];
  if (!del) {
    tw.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      del = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    tw.textContent = word.slice(0, --ci);
    if (ci === 0) {
      del = false;
      wi = (wi + 1) % words.length;
    }
  }
  setTimeout(typeLoop, del ? 60 : 100);
}
typeLoop();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

(function initGalaxy() {
  const canvas = document.getElementById("canvas3d");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.set(0, 3, 5);

  const params = {
    count: 8000,
    radius: 4,
    branches: 5,
    spin: 0.7,
    randomness: 0.4,
    power: 2.5,
  };

  function createGalaxy() {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(params.count * 3);
    const colors = new Float32Array(params.count * 3);
    const rootEl = document.documentElement;
    const style = getComputedStyle(rootEl);

    const innerC = new THREE.Color();
    const outerC = new THREE.Color();

    for (let i = 0; i < params.count; i++) {
      const i3 = i * 3;
      const r = Math.random() * params.radius;
      const branch = ((i % params.branches) / params.branches) * Math.PI * 2;
      const spin = r * params.spin;

      const rx =
        Math.pow(Math.random(), params.power) *
        (Math.random() < 0.5 ? 1 : -1) *
        params.randomness *
        r;
      const ry =
        Math.pow(Math.random(), params.power) *
        (Math.random() < 0.5 ? 1 : -1) *
        params.randomness *
        r *
        0.3;
      const rz =
        Math.pow(Math.random(), params.power) *
        (Math.random() < 0.5 ? 1 : -1) *
        params.randomness *
        r;

      positions[i3] = Math.cos(branch + spin) * r + rx;
      positions[i3 + 1] = ry;
      positions[i3 + 2] = Math.sin(branch + spin) * r + rz;

      const theme = rootEl.getAttribute("data-theme");
      if (theme === "gold") {
        innerC.set("#f59e0b");
        outerC.set("#ef4444");
      } else if (theme === "green") {
        innerC.set("#10b981");
        outerC.set("#06b6d4");
      } else if (theme === "pink") {
        innerC.set("#ec4899");
        outerC.set("#8b5cf6");
      } else {
        innerC.set("#7c3aed");
        outerC.set("#06b6d4");
      }

      const mixed = new THREE.Color().lerpColors(
        innerC,
        outerC,
        r / params.radius,
      );
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }

  let galaxyGeo = createGalaxy();
  const mat = new THREE.PointsMaterial({
    size: 0.012,
    sizeAttenuation: true,
    depthWrite: false,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
  });
  let galaxy = new THREE.Points(galaxyGeo, mat);
  scene.add(galaxy);

  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      scene.remove(galaxy);
      galaxyGeo.dispose();
      setTimeout(() => {
        galaxyGeo = createGalaxy();
        galaxy = new THREE.Points(galaxyGeo, mat);
        scene.add(galaxy);
      }, 50);
    });
  });

  let mouseX = 0,
    mouseY = 0;
  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.2;
  });

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  let scroll = 0;
  window.addEventListener("scroll", () => {
    scroll = window.scrollY;
  });

  const clock = new THREE.Clock();
  (function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    galaxy.rotation.y = t * 0.05;
    camera.position.x += (mouseX - camera.position.x) * 0.03;
    camera.position.y +=
      (-mouseY + 1.5 + scroll * 0.0008 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  })();
})();
