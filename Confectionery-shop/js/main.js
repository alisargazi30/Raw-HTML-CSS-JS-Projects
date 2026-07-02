// ─── Product Data ───────────────────────────────────────────────────────────
const products = [
  {
    id: 1,
    emoji: "🎂",
    category: "کیک",
    name: "کیک شکلاتی رویال",
    desc: "لایه‌های نرم شکلات بلژیکی با گاناش تلخ",
    price: "320,000",
    badge: "پرفروش",
    badgeClass: "badge--best",
    rating: "★★★★★",
    reviews: 124,
  },
  {
    id: 2,
    emoji: "🍰",
    category: "کیک",
    name: "کیک وانیلی توت‌فرنگی",
    desc: "کیک اسفنجی وانیلی با خامه و توت‌فرنگی تازه",
    price: "280,000",
    badge: "جدید",
    badgeClass: "badge--new",
    rating: "★★★★★",
    reviews: 89,
  },
  {
    id: 3,
    emoji: "🧁",
    category: "کاپ‌کیک",
    name: "کاپ‌کیک رد ولوت",
    desc: "بافت مخملی قرمز با خامه پنیر کرمی",
    price: "45,000",
    badge: "",
    badgeClass: "",
    rating: "★★★★☆",
    reviews: 56,
  },
  {
    id: 4,
    emoji: "🍪",
    category: "کلوچه",
    name: "کلوچه شکلات‌چیپس",
    desc: "کلوچه خانگی با تکه‌های شکلات تلخ بلژیکی",
    price: "38,000",
    badge: "تخفیف",
    badgeClass: "badge--sale",
    rating: "★★★★★",
    reviews: 201,
  },
  {
    id: 5,
    emoji: "🍫",
    category: "شکلات",
    name: "باکس شکلات لوکس",
    desc: "مجموعه ۱۲ تایی شکلات‌های دست‌ساز پرالین",
    price: "195,000",
    badge: "پرفروش",
    badgeClass: "badge--best",
    rating: "★★★★★",
    reviews: 143,
  },
  {
    id: 6,
    emoji: "🥐",
    category: "کروسان",
    name: "کروسان کره‌ای فرانسوی",
    desc: "لایه‌لایه و ترد با کره طبیعی فرانسوی",
    price: "52,000",
    badge: "جدید",
    badgeClass: "badge--new",
    rating: "★★★★☆",
    reviews: 67,
  },
  {
    id: 7,
    emoji: "🍮",
    category: "دسر",
    name: "پاناکوتا وانیل و انبه",
    desc: "دسر ایتالیایی نرم با سس انبه طبیعی",
    price: "68,000",
    badge: "",
    badgeClass: "",
    rating: "★★★★★",
    reviews: 78,
  },
  {
    id: 8,
    emoji: "🍩",
    category: "شیرینی",
    name: "دونات گلیزدار رنگین‌کمان",
    desc: "دونات نرم با روکش‌های رنگارنگ و تزیین مخصوص",
    price: "42,000",
    badge: "تخفیف",
    badgeClass: "badge--sale",
    rating: "★★★★☆",
    reviews: 92,
  },
];

// ─── Render Product Cards ───────────────────────────────────────────────────
function renderProductCard(p) {
  const badgeHtml = p.badge
    ? `<span class="badge ${p.badgeClass}">${p.badge}</span>`
    : "";
  return `
    <div class="product-card" onclick="openDetail(${p.id})">
      <div class="product-card__image">
        ${badgeHtml}
        <div class="product-emoji">${p.emoji}</div>
      </div>
      <div class="product-card__body">
        <div class="category">${p.category}</div>
        <div class="name">${p.name}</div>
        <div class="rating"><span class="stars">${p.rating}</span><span class="count">(${p.reviews} نظر)</span></div>
        <div class="desc">${p.desc}</div>
        <div class="card-footer">
          <div class="price"><span class="amount">${p.price}</span><div class="unit">تومان</div></div>
          <button class="btn-add" onclick="event.stopPropagation(); showToast('به سبد خرید اضافه شد! 🛒')">افزودن</button>
        </div>
      </div>
    </div>`;
}

function renderProducts() {
  const homeGrid = document.getElementById("homeProductsGrid");
  const allGrid = document.getElementById("allProductsGrid");
  if (homeGrid)
    homeGrid.innerHTML = products.slice(0, 4).map(renderProductCard).join("");
  if (allGrid) allGrid.innerHTML = products.map(renderProductCard).join("");
}

// ─── Page Navigation ─────────────────────────────────────────────────────────
function goTo(pageId) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
  document
    .querySelectorAll(".nav__links [data-link]")
    .forEach((l) => l.classList.remove("active-link"));
  const navLink = document.querySelector(`.nav__links [data-link="${pageId}"]`);
  if (navLink) navLink.classList.add("active-link");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openDetail(productId) {
  const p = products.find((x) => x.id === productId);
  if (!p) return;
  document.getElementById("detailMainImage").textContent = p.emoji;
  document.getElementById("detailName").textContent = p.name;
  document.getElementById("detailBreadcrumb").textContent = p.name;
  document.getElementById("detailPrice").textContent = p.price + " تومان";
  document.getElementById("detailDesc").textContent =
    `${p.name} یکی از محبوب‌ترین محصولات قنادی شیرین‌کده است. ${p.desc}. این محصول با بهترین مواد اولیه و دستور پخت سنتی تهیه می‌شود و برای جشن‌ها و مناسبت‌های خاص شما طراحی شده است.`;
  goTo("detail");
}

// ─── Detail Page Interactions ────────────────────────────────────────────────
let qty = 1;
function changeQty(delta) {
  qty = Math.max(1, qty + delta);
  document.getElementById("qtyNum").textContent = toPersianDigits(qty);
}

function toPersianDigits(num) {
  const persian = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(num).replace(/[0-9]/g, (d) => persian[d]);
}

function toggleFav(btn) {
  btn.textContent = btn.textContent === "🤍" ? "❤️" : "🤍";
}

function switchTab(evt, tabId) {
  document
    .querySelectorAll(".tab-nav button")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((c) => c.classList.remove("active"));
  evt.currentTarget.classList.add("active");
  document.getElementById(tabId).classList.add("active");
}

// ─── Size selector on detail page ───────────────────────────────────────────
document.addEventListener("click", function (e) {
  if (e.target.closest(".size-btns button")) {
    const btn = e.target.closest(".size-btns button");
    btn.parentElement
      .querySelectorAll("button")
      .forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
  }
});

// ─── Toast ───────────────────────────────────────────────────────────────────
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2800);
}

// ─── Mobile Menu ─────────────────────────────────────────────────────────────
let menuOpen = false;

function toggleMenu() {
  menuOpen = !menuOpen;
  const menu = document.getElementById("mobileMenu");
  const ham = document.getElementById("hamburger");

  menu.classList.toggle("is-open", menuOpen);
  ham.classList.toggle("is-open", menuOpen);
  document.body.classList.toggle("menu-open", menuOpen);
}

function menuGoTo(pageId) {
  toggleMenu();
  // wait for close animation, then navigate
  setTimeout(() => goTo(pageId), 350);
}

// ─── Generate Particles ──────────────────────────────────────────────────────
function createParticles() {
  const container = document.getElementById("menuParticles");
  if (!container) return;
  const emojis = ["🍰", "✦", "🧁", "·", "❋", "🍪", "✿", "○"];
  for (let i = 0; i < 22; i++) {
    const el = document.createElement("div");
    el.className = "particle";
    const size = Math.random() * 10 + 4;
    const useEmoji = Math.random() > 0.6;
    if (useEmoji) {
      el.style.cssText = `
        font-size: ${Math.random() * 14 + 10}px;
        left: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 12 + 8}s;
        animation-delay: ${Math.random() * 10}s;
        background: transparent;
        border-radius: 0;
      `;
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.color = `rgba(255,248,240,${Math.random() * 0.08 + 0.03})`;
    } else {
      el.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 12 + 8}s;
        animation-delay: ${Math.random() * 10}s;
        background: rgba(255,248,240,${Math.random() * 0.06 + 0.02});
      `;
    }
    container.appendChild(el);
  }
}

// ─── Init ────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  createParticles();
});
