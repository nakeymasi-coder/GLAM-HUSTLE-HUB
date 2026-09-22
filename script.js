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


/* =========================================================
   GLAM HUSTLE HUB — SITE CONFIG CONTROLLER
   Reads site-config.js without replacing the existing site engine.
   ========================================================= */

(function applyGlamSiteConfig() {
  const config = window.GLAM_SITE_CONFIG;
  if (!config) return;

  const visibility = config.visibility || {};
  const navigation = config.navigation || {};
  const links = config.links || {};

  function hide(element) {
    if (!element) return;
    element.hidden = true;
    element.style.setProperty("display", "none", "important");
  }

  function show(element) {
    if (!element) return;
    element.hidden = false;
    element.style.removeProperty("display");
  }

  function setVisible(element, value) {
    if (!element) return;
    value === false ? hide(element) : show(element);
  }

  function findLinkByText(container, text) {
    if (!container) return null;

    return Array.from(container.querySelectorAll("a")).find((link) =>
      link.textContent.toLowerCase().includes(text.toLowerCase())
    );
  }

  // Remove sidebar numbers
  document.querySelectorAll("#drawer a > span").forEach((number) => {
    number.remove();
  });

  // Remove Templates completely
  const drawerTemplate = findLinkByText(
    document.getElementById("drawer"),
    "Templates"
  );

  if (drawerTemplate) drawerTemplate.remove();

  const mansionTemplate = document.querySelector(".room-templates");
  if (mansionTemplate) mansionTemplate.remove();

  // Hide Workshops without deleting them
  const topWorkshop = document.querySelector(
    '#topNav a[href="workshops.html"]'
  );

  const drawerWorkshop = findLinkByText(
    document.getElementById("drawer"),
    "Workshop"
  );

  const mansionWorkshop = document.querySelector(".room-creators");

  setVisible(topWorkshop, navigation.showWorkshops);
  setVisible(drawerWorkshop, visibility.workshops);
  setVisible(mansionWorkshop, visibility.workshops);

  // Main sections
  setVisible(document.querySelector("#best"), visibility.bestSellers);
  setVisible(document.querySelector("#about"), visibility.about);
  setVisible(document.querySelector("#reviews"), visibility.reviews);
  setVisible(
    document.querySelector(".community"),
    visibility.communitySection
  );

  // Mansion rooms
  setVisible(
    document.querySelector(".room-freebies"),
    visibility.freebies
  );

  setVisible(
    document.querySelector(".room-bestsellers"),
    visibility.bestSellers
  );

  setVisible(
    document.querySelector(".room-generators"),
    visibility.promptGenerators
  );

  setVisible(
    document.querySelector(".room-bundles"),
    visibility.generatorBundles
  );

  setVisible(
    document.querySelector(".room-pngs"),
    visibility.pngs
  );

  setVisible(
    document.querySelector(".room-support"),
    visibility.oneOnOne
  );

  setVisible(
    document.querySelector(".room-community"),
    visibility.skoolCommunity
  );

  setVisible(
    document.querySelector(".room-facebook"),
    visibility.facebookCommunity
  );

  setVisible(
    document.querySelector(".room-reviews"),
    visibility.reviews
  );

  // Hero
  if (config.hero) {
    const eyebrow = document.querySelector(".hero-text small");
    const headline = document.querySelector(".hero-text h1");
    const description = document.querySelector(".hero-text p");
    const button = document.querySelector(".hero-text > a");

    if (eyebrow && config.hero.eyebrow) {
      eyebrow.textContent = config.hero.eyebrow;
    }

    if (headline && config.hero.headlineHTML) {
      headline.innerHTML = config.hero.headlineHTML;
    }

    if (description && config.hero.description) {
      description.textContent = config.hero.description;
    }

    if (button && config.hero.buttonText) {
      button.innerHTML = `${config.hero.buttonText} <b>→</b>`;
    }

    if (button && links.shop) {
      button.href = links.shop;
    }
  }

  // Marquee
  const marquee = document.querySelector(".marquee");
  const marqueeText = document.querySelector(".marquee > div");

  if (config.marquee) {
    setVisible(marquee, config.marquee.enabled);

    if (marqueeText && config.marquee.text) {
      marqueeText.textContent = config.marquee.text;
    }
  }

  // About
  if (config.about) {
    const eyebrow = document.querySelector(".about-copy small");
    const headline = document.querySelector(".about-copy h2");
    const description = document.querySelector(".about-copy p");
    const button = document.querySelector(".about-copy a");
    const image = document.querySelector(".about-image img");

    if (eyebrow && config.about.eyebrow) {
      eyebrow.textContent = config.about.eyebrow;
    }

    if (headline && config.about.headlineHTML) {
      headline.innerHTML = config.about.headlineHTML;
    }

    if (description && config.about.description) {
      description.textContent = config.about.description;
    }

    if (button && config.about.buttonText) {
      button.textContent = config.about.buttonText;
    }

    if (image && config.about.image) {
      image.src = config.about.image;
    }
  }

  // Community
  if (config.community) {
    const eyebrow = document.querySelector(".community small");
    const headline = document.querySelector(".community h2");
    const description = document.querySelector(".community p");
    const button = document.querySelector(".community a");
    const logo = document.querySelector(".community-logo");

    if (eyebrow && config.community.eyebrow) {
      eyebrow.textContent = config.community.eyebrow;
    }

    if (headline && config.community.headlineHTML) {
      headline.innerHTML = config.community.headlineHTML;
    }

    if (description && config.community.description) {
      description.textContent = config.community.description;
    }

    if (button && config.community.buttonText) {
      button.textContent = config.community.buttonText;
    }

    if (button && links.skoolCommunity) {
      button.href = links.skoolCommunity;
    }

    if (logo && config.community.logo) {
      logo.src = config.community.logo;
    }
  }

  // Help & Support
  if (visibility.helpSupport !== false && config.support?.enabled !== false) {
    const drawer = document.getElementById("drawer");

    if (drawer && !drawer.querySelector(".glam-help-support")) {
      const supportLink = document.createElement("a");

      supportLink.className = "glam-help-support";
      supportLink.href =
        config.support?.url ||
        links.helpSupport ||
        "#";

      supportLink.innerHTML = `${
        config.support?.menuLabel || "Help & Support"
      }<b>›</b>`;

      drawer.appendChild(supportLink);
    }

    const footerLinks = document.querySelector("footer div");

    if (
      footerLinks &&
      !footerLinks.querySelector(".glam-help-support")
    ) {
      const footerSupport = document.createElement("a");

      footerSupport.className = "glam-help-support";
      footerSupport.href =
        config.support?.url ||
        links.helpSupport ||
        "#";

      footerSupport.textContent =
        config.support?.menuLabel || "Help & Support";

      footerLinks.appendChild(footerSupport);
    }
  }

  // Footer links
  const footerLinks = Array.from(
    document.querySelectorAll("footer a")
  );

  const socialMap = {
    Pinterest: links.pinterest,
    TikTok: links.tiktok,
    Lemon8: links.lemon8,
    Facebook: links.facebook,
    YouTube: links.youtube
  };

  footerLinks.forEach((link) => {
    const label = link.textContent.trim();

    if (socialMap[label]) {
      link.href = socialMap[label];
    }

    if (label === "Contact" && links.contactEmail) {
      link.href = `mailto:${links.contactEmail}`;
    }
  });

  const copyright = document.querySelector("footer p");

  if (copyright && config.site?.copyright) {
    copyright.textContent = config.site.copyright;
  }
})();