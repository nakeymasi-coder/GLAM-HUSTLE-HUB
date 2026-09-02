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

      <a class="mansion-hotspot room-freebies" href="https://pin.it/7EFoolKlz" aria-label="Enter the Freebie Lounge"><b>Freebie Lounge</b><span>Claim your gifts</span></a>
      <a class="mansion-hotspot room-templates" href="https://pin.it/LundB3IIK" aria-label="Enter the Template Gallery"><b>Template Gallery</b><span>Canva-ready designs</span></a>
      <a class="mansion-hotspot room-bestsellers" href="#best" aria-label="View Best Sellers"><b>Best-Seller Gallery</b><span>Customer favorites</span></a>
      <a class="mansion-hotspot room-shop" href="https://payhip.com/GlowUpbyGlam/collection/all" aria-label="Enter the Main Shop"><b>The Grand Shop</b><span>Explore every collection</span></a>
      <a class="mansion-hotspot room-creators" href="workshops.html" aria-label="Enter Creator Studios and Workshops"><b>Workshop Studio</b><span>Learn live with Glam</span></a>
      <a class="mansion-hotspot room-support" href="one-on-one.html" aria-label="Enter the One-on-One Support Suite"><b>1:1 Support Suite</b><span>Private help, real clarity</span></a>
      <a class="mansion-hotspot room-generators" href="https://payhip.com/GlowUpbyGlam/collection/luxury-prompt-generators" aria-label="Enter the Prompt Generator Lab"><b>Generator Lab</b><span>Luxury prompt tools</span></a>
      <a class="mansion-hotspot room-community" href="https://payhip.com/b/54LoK" aria-label="Enter the Glam Vault Lounge"><b>Glam Vault Lounge</b><span>Skool community</span></a>
      <a class="mansion-hotspot room-facebook" href="https://www.facebook.com/share/g/1Sv3VVCSaR/" aria-label="Enter the Facebook Community Lounge"><b>Community Lounge</b><span>Connect on Facebook</span></a>
      <a class="mansion-hotspot room-bundles" href="https://payhip.com/GlowUpbyGlam/collection/bundles" aria-label="Enter the Generator Bundle Vault"><b>Bundle Vault</b><span>More tools, one collection</span></a>
      <a class="mansion-hotspot room-pngs" href="https://pin.it/NGr63tHjX/" aria-label="Enter the two dollar PNG gallery"><b>$2 PNG Gallery</b><span>Quick creative finds</span></a>
      <a class="mansion-hotspot room-reviews" href="#reviews" aria-label="Enter the Review Gallery"><b>Review Salon</b><span>Real women, real results</span></a>
    </div>
  `;

  hero.parentNode.insertBefore(mansion, hero);

  /* Keep Glam's original navigation names visible over the animated market.
     The frosted-glass buttons cover the labels baked into the source video
     without changing the market itself. */
  const style = document.createElement("style");
  style.textContent = `
    .market-video-stage {
      width: 100%;
      aspect-ratio: 1168 / 784;
      min-height: 0 !important;
      height: auto !important;
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
      z-index: 5;
      display: flex !important;
      width: max-content !important;
      max-width: 190px !important;
      height: auto !important;
      flex-direction: column;
      gap: 2px;
      padding: 8px 12px 7px !important;
      color: #103b63 !important;
      border: 1px solid rgba(255,255,255,.90) !important;
      border-radius: 14px !important;
      background: rgba(238,249,255,.72) !important;
      box-shadow: 0 8px 26px rgba(16,59,99,.16), inset 0 1px 0 rgba(255,255,255,.85) !important;
      -webkit-backdrop-filter: blur(12px) saturate(1.15);
      backdrop-filter: blur(12px) saturate(1.15) !important;
      opacity: 1 !important;
      transform: none !important;
      text-decoration: none;
    }
    .market-video-stage .mansion-hotspot::before {
      display: block !important;
      left: 13px !important;
      top: -8px !important;
      width: 14px !important;
      height: 14px !important;
      background: #168fea !important;
      border: 4px solid #fff !important;
      box-shadow: 0 0 0 2px rgba(22,143,234,.16), 0 0 18px rgba(22,143,234,.50) !important;
    }
    .market-video-stage .mansion-hotspot b {
      display: block !important;
      font-size: clamp(8px, .78vw, 12px) !important;
      line-height: 1.05;
      font-weight: 900;
      letter-spacing: .03em;
      text-transform: uppercase;
      color: #103b63 !important;
      white-space: nowrap;
    }
    .market-video-stage .mansion-hotspot span {
      display: block !important;
      font-size: clamp(6px, .52vw, 8px) !important;
      line-height: 1.15;
      font-weight: 700;
      color: #3f6e91 !important;
      white-space: nowrap;
    }
    .market-video-stage .mansion-hotspot:hover,
    .market-video-stage .mansion-hotspot:focus-visible {
      color: #103b63 !important;
      background: rgba(255,255,255,.84) !important;
      box-shadow: 0 12px 34px rgba(16,59,99,.22), 0 0 0 2px rgba(255,255,255,.55) !important;
      transform: translateY(-2px) !important;
      outline: none !important;
    }

    .market-video-stage .room-freebies    { left: 1.7% !important; top: 22.0% !important; }
    .market-video-stage .room-templates   { left: 2.6% !important; top: 46.5% !important; }
    .market-video-stage .room-bestsellers { left: 18.8% !important; top: 61.0% !important; }
    .market-video-stage .room-shop        { left: 41.0% !important; top: 38.3% !important; }
    .market-video-stage .room-creators    { left: 59.7% !important; top: 18.5% !important; }
    .market-video-stage .room-support     { left: 82.0% !important; top: 18.5% !important; }
    .market-video-stage .room-generators  { left: 59.5% !important; top: 42.0% !important; }
    .market-video-stage .room-community   { left: 79.5% !important; top: 40.5% !important; }
    .market-video-stage .room-facebook    { left: 67.7% !important; top: 59.7% !important; }
    .market-video-stage .room-bundles     { left: 84.5% !important; top: 62.3% !important; }
    .market-video-stage .room-pngs        { left: 31.0% !important; top: 71.1% !important; }
    .market-video-stage .room-reviews     { left: 56.8% !important; top: 69.5% !important; }

    @media (max-width: 800px) {
      .market-video-stage .mansion-hotspot {
        padding: 6px 8px 5px !important;
        border-radius: 10px !important;
      }
      .market-video-stage .mansion-hotspot::before {
        width: 10px !important;
        height: 10px !important;
        border-width: 3px !important;
        left: 9px !important;
        top: -6px !important;
      }
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
  if (video) {
    video.play().catch(() => {});
  }
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