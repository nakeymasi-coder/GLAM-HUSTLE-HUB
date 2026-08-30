/* Sapphire mansion interface bootstrap — preserves the existing site engine and links. */
(function mountMansionInterface() {
  const hero = document.querySelector(".agency-hero");
  if (!hero || document.querySelector(".mansion-interface")) return;

  if (!document.querySelector('link[href="mansion.css"]')) {
    const mansionStyles = document.createElement("link");
    mansionStyles.rel = "stylesheet";
    mansionStyles.href = "mansion.css";
    document.head.appendChild(mansionStyles);
  }

  const mansion = document.createElement("section");
  mansion.className = "mansion-interface";
  mansion.setAttribute("aria-label", "Explore the Glam Hustle Hub mansion");
  mansion.innerHTML = `
    <div class="mansion-stage">
      <img src="images/glam-mansion-interface.svg" alt="Bright Caribbean Sapphire Glam Hustle Hub mansion with clickable creator rooms" />
      <a class="mansion-hotspot room-freebies" data-room="Freebie Lounge" href="https://pin.it/7EFoolKlz" aria-label="Enter the Freebie Lounge"></a>
      <a class="mansion-hotspot room-templates" data-room="Template Gallery" href="https://pin.it/LundB3IIK" aria-label="Enter the Template Gallery"></a>
      <a class="mansion-hotspot room-bestsellers" data-room="Best Sellers" href="#best" aria-label="View Best Sellers"></a>
      <a class="mansion-hotspot room-shop" data-room="Main Shop" href="https://payhip.com/GlowUpbyGlam/collection/all" aria-label="Enter the Main Shop"></a>
      <a class="mansion-hotspot room-creators" data-room="Creator Studios" href="workshops.html" aria-label="Enter Creator Studios and Workshops"></a>
      <a class="mansion-hotspot room-generators" data-room="Prompt Generator Lab" href="https://payhip.com/GlowUpbyGlam/collection/luxury-prompt-generators" aria-label="Enter the Prompt Generator Lab"></a>
      <a class="mansion-hotspot room-community" data-room="Glam Vault Lounge" href="https://payhip.com/b/54LoK" aria-label="Enter the Glam Vault Lounge"></a>
      <a class="mansion-hotspot room-bundles" data-room="Generator Bundle Vault" href="https://payhip.com/GlowUpbyGlam/collection/bundles" aria-label="Enter the Generator Bundle Vault"></a>
      <a class="mansion-hotspot room-reviews" data-room="Review Gallery" href="#reviews" aria-label="Enter the Review Gallery"></a>
      <div class="mansion-entry-note">Tap a room to enter</div>
    </div>
  `;

  hero.parentNode.insertBefore(mansion, hero);
})();

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
