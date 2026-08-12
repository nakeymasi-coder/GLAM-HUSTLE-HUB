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
