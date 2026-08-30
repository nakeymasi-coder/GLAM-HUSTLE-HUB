/* Sapphire mansion interface bootstrap — preserves the existing site engine and links. */
(function mountMansionInterface() {
  const hero = document.querySelector(".agency-hero");
  if (!hero || document.querySelector(".mansion-interface")) return;

  const mansion = document.createElement("section");
  mansion.className = "mansion-interface";
  mansion.setAttribute("aria-label", "Explore the Glam Hustle Hub mansion");
  mansion.innerHTML = `
    <div class="mansion-stage">
      <img src="images/sapphire-mansion-city.png" alt="Bright Caribbean Sapphire Glam City mansion filled with Black creators, glass rooms, sweeping stairs, balconies, and creator wings" />
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
      <div class="mansion-entry-note">Choose a room to enter</div>
    </div>
  `;

  hero.parentNode.insertBefore(mansion, hero);
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
