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

      <a class="mansion-hotspot room-freebies" href="https://pin.it/7EFoolKlz" aria-label="Enter the Freebie Lounge"></a>
      <a class="mansion-hotspot room-templates" href="https://pin.it/LundB3IIK" aria-label="Enter the Template Gallery"></a>
      <a class="mansion-hotspot room-bestsellers" href="#best" aria-label="View Best Sellers"></a>
      <a class="mansion-hotspot room-shop" href="https://payhip.com/GlowUpbyGlam/collection/all" aria-label="Enter the Grand Shop"></a>
      <a class="mansion-hotspot room-creators" href="workshops.html" aria-label="Enter Workshop Studio"></a>
      <a class="mansion-hotspot room-support" href="one-on-one.html" aria-label="Enter the One-on-One Support Suite"></a>
      <a class="mansion-hotspot room-generators" href="https://payhip.com/GlowUpbyGlam/collection/luxury-prompt-generators" aria-label="Enter Creator Lab"></a>
      <a class="mansion-hotspot room-community" href="https://payhip.com/b/54LoK" aria-label="Enter the Glam Vault Lounge"></a>
      <a class="mansion-hotspot room-facebook" href="https://www.facebook.com/share/g/1Sv3VVCSaR/" aria-label="Enter the Community Lounge"></a>
      <a class="mansion-hotspot room-bundles" href="https://payhip.com/GlowUpbyGlam/collection/bundles" aria-label="Enter the Bundle Vault"></a>
      <a class="mansion-hotspot room-pngs" href="https://pin.it/NGr63tHjX/" aria-label="Enter the PNG Gallery"></a>
      <a class="mansion-hotspot room-reviews" href="#reviews" aria-label="Enter the Review Salon"></a>
    </div>
  `;

  hero.parentNode.insertBefore(mansion, hero);

  /* The source video already contains its own visible glass labels.
     Keep the real website links as invisible click zones so nothing is duplicated. */
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
    }
    .market-video-stage .mansion-hotspot {
      position: absolute;
      z-index: 5;
      display: block !important;
      width: auto !important;
      max-width: none !important;
      height: auto !important;
      padding: 0 !important;
      border: 0 !important;
      border-radius: 16px !important;
      background: transparent !important;
      box-shadow: none !important;
      backdrop-filter: none !important;
      opacity: 0 !important;
      transform: none !important;
    }
    .market-video-stage .mansion-hotspot::before,
    .market-video-stage .mansion-hotspot b,
    .market-video-stage .mansion-hotspot span { display: none !important; }
    .market-video-stage .mansion-hotspot:focus-visible {
      opacity: 1 !important;
      outline: 3px solid #fff !important;
      outline-offset: 2px !important;
      background: rgba(22,143,234,.12) !important;
    }

    .market-video-stage .room-freebies    { left: 1.0% !important; top: 20.5% !important; width: 14.8% !important; height: 9.2% !important; }
    .market-video-stage .room-templates   { left: 2.0% !important; top: 43.5% !important; width: 18.3% !important; height: 9.5% !important; }
    .market-video-stage .room-bestsellers { left: 17.8% !important; top: 58.5% !important; width: 16.8% !important; height: 9.5% !important; }
    .market-video-stage .room-shop        { left: 24.0% !important; top: 27.5% !important; width: 15.0% !important; height: 9.0% !important; }
    .market-video-stage .room-creators    { left: 44.0% !important; top: 51.0% !important; width: 14.8% !important; height: 8.5% !important; }
    .market-video-stage .room-support     { left: 82.5% !important; top: 15.0% !important; width: 15.5% !important; height: 9.0% !important; }
    .market-video-stage .room-generators  { left: 61.0% !important; top: 35.0% !important; width: 13.5% !important; height: 9.0% !important; }
    .market-video-stage .room-community   { left: 77.5% !important; top: 57.0% !important; width: 15.5% !important; height: 9.0% !important; }
    .market-video-stage .room-facebook    { left: 79.0% !important; top: 43.5% !important; width: 18.0% !important; height: 9.5% !important; }
    .market-video-stage .room-bundles     { left: 85.5% !important; top: 60.0% !important; width: 13.8% !important; height: 9.0% !important; }
    .market-video-stage .room-pngs        { left: 15.0% !important; top: 69.0% !important; width: 15.5% !important; height: 9.0% !important; }
    .market-video-stage .room-reviews     { left: 55.5% !important; top: 68.0% !important; width: 14.5% !important; height: 9.0% !important; }

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
