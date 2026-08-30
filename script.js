/* Mansion interface bootstrap — preserves the existing site engine and links. */
(function mountMansionInterface() {
  const hero = document.querySelector(".agency-hero");
  if (!hero || document.querySelector(".mansion-world")) return;

  document.body.classList.add("mansion-mode");

  if (!document.querySelector('link[href="mansion.css"]')) {
    const mansionStyles = document.createElement("link");
    mansionStyles.rel = "stylesheet";
    mansionStyles.href = "mansion.css";
    document.head.appendChild(mansionStyles);
  }

  const mansion = document.createElement("section");
  mansion.className = "mansion-world";
  mansion.setAttribute("aria-label", "Explore the Glam Hustle Hub mansion");
  mansion.innerHTML = `
    <div class="mansion-intro rise">
      <small>THE GLAM HUSTLE HUB EXPERIENCE</small>
      <h1>GLAM <span>HUSTLE HUB</span></h1>
      <p>Step inside the Hub. Every room leads to the tools, workshops, resources, support, and products already built for you.</p>
    </div>

    <div class="mansion-building">
      <a class="mansion-room room-freebies" href="https://pin.it/7EFoolKlz">
        <span class="room-label"><small>START HERE</small><strong>Freebie Lounge</strong><em>Enter room →</em></span>
      </a>

      <a class="mansion-room room-templates" href="https://pin.it/LundB3IIK">
        <span class="room-label"><small>CREATE</small><strong>Template Gallery</strong><em>Explore templates →</em></span>
      </a>

      <a class="mansion-room room-community" href="https://payhip.com/b/54LoK">
        <span class="room-label"><small>CONNECT</small><strong>Glam Vault Lounge</strong><em>Join the community →</em></span>
      </a>

      <a class="mansion-room room-one" href="one-on-one.html">
        <span class="room-label"><small>GET SUPPORT</small><strong>One-on-One Suite</strong><em>Book support →</em></span>
      </a>

      <div class="mansion-center">
        <div class="mansion-center-copy">
          <small>FOR WOMEN READY TO CREATE, SELL &amp; SHINE</small>
          <h2>BIG IDEAS.<br><em>BOLD EXPERIENCES.</em></h2>
          <p>Creative tools, live workshops, and real support—built to help you stop overthinking and start creating.</p>
        </div>
        <a class="mansion-entry" href="https://payhip.com/GlowUpbyGlam/collection/all">
          <span>Enter the Main Hub</span>
          <small>Explore the shop →</small>
        </a>
      </div>

      <a class="mansion-room room-workshops" href="workshops.html">
        <span class="room-label"><small>LEARN</small><strong>Creator Studios</strong><em>Enter workshops →</em></span>
      </a>

      <a class="mansion-room room-reviews" href="#reviews">
        <span class="room-label"><small>REAL RESULTS</small><strong>Review Gallery</strong><em>See reviews →</em></span>
      </a>

      <a class="mansion-room room-generators" href="https://payhip.com/GlowUpbyGlam/collection/luxury-prompt-generators">
        <span class="room-label"><small>BUILD</small><strong>Prompt Generator Lab</strong><em>Shop generators →</em></span>
      </a>

      <a class="mansion-room room-bundles" href="https://payhip.com/GlowUpbyGlam/collection/bundles">
        <span class="room-label"><small>GO BIGGER</small><strong>Generator Bundle Vault</strong><em>Explore bundles →</em></span>
      </a>

      <a class="mansion-room room-best" href="#best">
        <span class="room-label"><small>FEATURED</small><strong>Best Sellers Suite</strong><em>See what’s moving →</em></span>
      </a>
    </div>

    <nav class="mansion-room-list" aria-label="Mansion rooms on mobile">
      <a href="https://pin.it/7EFoolKlz">Freebie Lounge</a>
      <a href="https://pin.it/LundB3IIK">Template Gallery</a>
      <a href="https://payhip.com/b/54LoK">Glam Vault Lounge</a>
      <a href="one-on-one.html">One-on-One Suite</a>
      <a href="workshops.html">Creator Studios</a>
      <a href="#reviews">Review Gallery</a>
      <a href="https://payhip.com/GlowUpbyGlam/collection/luxury-prompt-generators">Prompt Generator Lab</a>
      <a href="https://payhip.com/GlowUpbyGlam/collection/bundles">Generator Bundle Vault</a>
    </nav>
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

  if (openDrawerButton) {
    openDrawerButton.setAttribute("aria-expanded", "true");
  }

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

  if (openDrawerButton) {
    openDrawerButton.setAttribute("aria-expanded", "false");
  }

  if (menuButton) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open categories");
  }
}

if (openDrawerButton) {
  openDrawerButton.addEventListener("click", openDrawer);
}

if (menuButton) {
  menuButton.addEventListener("click", () => {
    if (drawer && drawer.classList.contains("open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });
}

if (closeDrawerButton) {
  closeDrawerButton.addEventListener("click", closeDrawer);
}

if (shade) {
  shade.addEventListener("click", closeDrawer);
}

if (drawer) {
  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && drawer && drawer.classList.contains("open")) {
    closeDrawer();
  }
});

if (nav) {
  nav.classList.remove("open");
}

const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
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
