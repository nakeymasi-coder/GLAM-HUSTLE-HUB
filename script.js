/* Sapphire mansion interface bootstrap — preserves the existing site engine and links. */
(function mountMansionInterface() {
  const hero = document.querySelector(".agency-hero");
  if (!hero || document.querySelector(".mansion-interface")) return;

  const mansion = document.createElement("section");
  mansion.className = "mansion-interface";
  mansion.setAttribute("aria-label", "Explore the Glam Hustle Hub market");
  mansion.innerHTML = `
    <div class="mansion-stage market-video-stage">
      <video
        class="market-hero-video"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        poster="images/sapphire-mansion-city.png"
        aria-label="Animated Glam Hustle Hub luxury creator market"
      >
        <source src="https://assets.grok.com/users/742979fd-7012-4f33-a191-67ba97a31205/generated/993c5acd-5371-4052-a329-246c1298831f/generated_video.mp4?cache=1" type="video/mp4" />
      </video>

      <!-- Primary click zones -->
      <a class="market-click zone-freebie-a" href="https://pin.it/7EFoolKlz" aria-label="Freebie Lounge"></a>
      <a class="market-click zone-template-a" href="https://pin.it/LundB3IIK" aria-label="Template Gallery"></a>
      <a class="market-click zone-best-a" href="#best" aria-label="Best-Seller Gallery"></a>
      <a class="market-click zone-shop-a" href="https://payhip.com/GlowUpbyGlam/collection/all" aria-label="The Grand Shop"></a>
      <a class="market-click zone-workshop-a" href="workshops.html" aria-label="Workshop Studio"></a>
      <a class="market-click zone-support-a" href="one-on-one.html" aria-label="One-on-One Support Suite"></a>
      <a class="market-click zone-generator-a" href="https://payhip.com/GlowUpbyGlam/collection/luxury-prompt-generators" aria-label="Generator Lab"></a>
      <a class="market-click zone-vault-a" href="https://payhip.com/b/54LoK" aria-label="Glam Vault Lounge"></a>
      <a class="market-click zone-community-a" href="https://www.facebook.com/share/g/1Sv3VVCSaR/" aria-label="Community Lounge"></a>
      <a class="market-click zone-bundle-a" href="https://payhip.com/GlowUpbyGlam/collection/bundles" aria-label="Bundle Vault"></a>
      <a class="market-click zone-png-a" href="https://pin.it/NGr63tHjX/" aria-label="PNG Gallery"></a>
      <a class="market-click zone-review-a" href="#reviews" aria-label="Review Salon"></a>

      <!-- Backup zones catch the duplicate/moving labels baked into the video -->
      <a class="market-click zone-freebie-b" href="https://pin.it/7EFoolKlz" aria-label="Freebie Lounge"></a>
      <a class="market-click zone-template-b" href="https://pin.it/LundB3IIK" aria-label="Template Gallery"></a>
      <a class="market-click zone-best-b" href="#best" aria-label="Best-Seller Gallery"></a>
      <a class="market-click zone-shop-b" href="https://payhip.com/GlowUpbyGlam/collection/all" aria-label="The Grand Shop"></a>
      <a class="market-click zone-workshop-b" href="workshops.html" aria-label="Workshop Studio"></a>
      <a class="market-click zone-support-b" href="one-on-one.html" aria-label="One-on-One Support Suite"></a>
      <a class="market-click zone-generator-b" href="https://payhip.com/GlowUpbyGlam/collection/luxury-prompt-generators" aria-label="Generator Lab"></a>
      <a class="market-click zone-vault-b" href="https://payhip.com/b/54LoK" aria-label="Glam Vault Lounge"></a>
      <a class="market-click zone-community-b" href="https://www.facebook.com/share/g/1Sv3VVCSaR/" aria-label="Community Lounge"></a>
      <a class="market-click zone-bundle-b" href="https://payhip.com/GlowUpbyGlam/collection/bundles" aria-label="Bundle Vault"></a>
      <a class="market-click zone-png-b" href="https://pin.it/NGr63tHjX/" aria-label="PNG Gallery"></a>
      <a class="market-click zone-review-b" href="#reviews" aria-label="Review Salon"></a>
    </div>
  `;

  hero.parentNode.insertBefore(mansion, hero);

  const style = document.createElement("style");
  style.textContent = `
    .market-video-stage {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      min-height: 0 !important;
      height: auto !important;
      overflow: hidden;
      background: #103b63;
    }
    .market-video-stage::before { display: none !important; }
    .market-hero-video {
      position: absolute;
      inset: 0;
      z-index: 0;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      pointer-events: none;
    }
    .market-click {
      position: absolute;
      z-index: 20;
      display: block;
      background: transparent;
      border: 0;
      border-radius: 18px;
      cursor: pointer;
      pointer-events: auto;
      text-decoration: none;
      touch-action: manipulation;
      -webkit-tap-highlight-color: rgba(22,143,234,.22);
    }
    .market-click:hover {
      box-shadow: inset 0 0 0 2px rgba(255,255,255,.18);
      background: rgba(255,255,255,.025);
    }
    .market-click:focus-visible {
      outline: 3px solid #fff;
      outline-offset: 2px;
      background: rgba(22,143,234,.12);
    }

    /* Main positions */
    .zone-freebie-a    { left: .2%;  top: 4.0%;  width: 16.5%; height: 12.0%; }
    .zone-template-a   { left: .3%;  top: 36.5%; width: 19.5%; height: 11.5%; }
    .zone-best-a       { left: 16.5%; top: 55.0%; width: 18.5%; height: 12.0%; }
    .zone-shop-a       { left: 22.0%; top: 20.0%; width: 15.5%; height: 12.0%; }
    .zone-workshop-a   { left: 58.0%; top: .2%;   width: 17.0%; height: 10.0%; }
    .zone-support-a    { left: 81.0%; top: .2%;   width: 18.0%; height: 10.0%; }
    .zone-generator-a  { left: 58.0%; top: 29.0%; width: 17.0%; height: 12.0%; }
    .zone-vault-a      { left: 78.0%; top: 26.0%; width: 20.0%; height: 12.0%; }
    .zone-community-a  { left: 66.0%; top: 51.0%; width: 18.0%; height: 12.0%; }
    .zone-bundle-a     { left: 84.0%; top: 53.0%; width: 15.5%; height: 12.0%; }
    .zone-png-a        { left: 14.0%; top: 68.0%; width: 19.0%; height: 12.0%; }
    .zone-review-a     { left: 55.0%; top: 66.0%; width: 16.0%; height: 12.0%; }

    /* Secondary positions seen while the generated video shifts labels */
    .zone-freebie-b    { left: .2%;  top: 9.0%;  width: 17.0%; height: 12.5%; }
    .zone-template-b   { left: 4.0%;  top: 39.0%; width: 20.0%; height: 12.0%; }
    .zone-best-b       { left: 17.0%; top: 59.0%; width: 18.0%; height: 12.0%; }
    .zone-shop-b       { left: 38.0%; top: 24.5%; width: 14.5%; height: 12.0%; }
    .zone-workshop-b   { left: 43.0%; top: 48.0%; width: 15.5%; height: 12.0%; }
    .zone-support-b    { left: 83.0%; top: 3.0%;  width: 16.5%; height: 12.0%; }
    .zone-generator-b  { left: 61.0%; top: 34.0%; width: 15.0%; height: 12.0%; }
    .zone-vault-b      { left: 80.0%; top: 30.0%; width: 18.5%; height: 12.0%; }
    .zone-community-b  { left: 69.0%; top: 55.0%; width: 17.5%; height: 12.0%; }
    .zone-bundle-b     { left: 86.0%; top: 58.0%; width: 13.5%; height: 12.0%; }
    .zone-png-b        { left: 28.0%; top: 68.0%; width: 18.5%; height: 12.0%; }
    .zone-review-b     { left: 56.0%; top: 70.0%; width: 15.0%; height: 12.0%; }

    @media (max-width: 760px) {
      .market-click { border-radius: 12px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .market-hero-video { display: none !important; }
      .market-video-stage {
        background: url("images/sapphire-mansion-city.png") center / cover no-repeat !important;
      }
    }
  `;
  document.head.appendChild(style);

  const video = mansion.querySelector(".market-hero-video");
  if (video) video.play().catch(() => {});
})();

/* Remove the retired homepage creative promo grid entirely. */
const creativeGrid = document.querySelector(".creative-grid");
if (creativeGrid) creativeGrid.remove();

const drawer = document.getElementById("drawer");
const shade = document.getElementById("shade");
const nav = document.getElementById("topNav");
const openDrawerButton = document.getElementById("openDrawer");
const menuButton = document.getElementById("menuButton");
const closeDrawerButton = document.getElementById("closeDrawer");

function openDrawer() {
  if (!drawer || !shade) return;
  drawer.classList.add("open");
  shade.classList.add("on");
  drawer.setAttribute("aria-hidden", "false");
  if (openDrawerButton) openDrawerButton.setAttribute("aria-expanded", "true");
  if (menuButton) {
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close categories");
  }
}

function closeDrawer() {
  if (!drawer || !shade) return;
  drawer.classList.remove("open");
  shade.classList.remove("on");
  drawer.setAttribute("aria-hidden", "true");
  if (openDrawerButton) openDrawerButton.setAttribute("aria-expanded", "false");
  if (menuButton) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open categories");
  }
}

if (openDrawerButton) openDrawerButton.addEventListener("click", openDrawer);
if (menuButton) {
  menuButton.addEventListener("click", () => {
    if (drawer && drawer.classList.contains("open")) closeDrawer();
    else openDrawer();
  });
}
if (closeDrawerButton) closeDrawerButton.addEventListener("click", closeDrawer);
if (shade) shade.addEventListener("click", closeDrawer);
if (drawer) drawer.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeDrawer));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && drawer && drawer.classList.contains("open")) closeDrawer();
});

if (nav) nav.classList.remove("open");

const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  }),
  { threshold: 0.12 },
);

document.querySelectorAll(".rise").forEach((item) => observer.observe(item));

/* Slow luxury carousel for Best Sellers in Motion */
const bestSellerRow = document.querySelector(".product-row");
if (bestSellerRow && !bestSellerRow.dataset.carouselReady) {
  bestSellerRow.dataset.carouselReady = "true";
  const originalProducts = Array.from(bestSellerRow.children);
  originalProducts.forEach((product) => {
    const duplicate = product.cloneNode(true);
    duplicate.setAttribute("aria-hidden", "true");
    duplicate.classList.remove("rise");
    duplicate.classList.add("visible");
    bestSellerRow.appendChild(duplicate);
  });
}
