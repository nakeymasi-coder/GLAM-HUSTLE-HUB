const drawer = document.getElementById("drawer");
const shade = document.getElementById("shade");
const nav = document.getElementById("topNav");

document.getElementById("openDrawer").onclick = () => {
  drawer.classList.add("open");
  shade.classList.add("on");
};

document.getElementById("closeDrawer").onclick = closeDrawer;
shade.onclick = closeDrawer;

function closeDrawer() {
  drawer.classList.remove("open");
  shade.classList.remove("on");
}

document.getElementById("menuButton").onclick = () => {
  nav.classList.toggle("open");
};

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".rise").forEach((item) => {
  observer.observe(item);
});

// Exact, seamless Best Sellers carousel
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

  let loopWidth = 0;
  let position = 0;
  let lastTime = 0;
  let paused = false;

  const pixelsPerSecond = 18;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function measureLoop() {
    const firstOriginal = bestSellerRow.children[0];
    const firstDuplicate = bestSellerRow.children[originalProducts.length];

    if (firstOriginal && firstDuplicate) {
      loopWidth = firstDuplicate.offsetLeft - firstOriginal.offsetLeft;

      position = position % loopWidth;
      bestSellerRow.scrollLeft = position;
    }
  }

  function animateCarousel(time) {
    if (!lastTime) {
      lastTime = time;
    }

    const elapsed = Math.min(time - lastTime, 50);
    lastTime = time;

    if (!paused && !reduceMotion.matches && loopWidth > 0) {
      position += pixelsPerSecond * (elapsed / 1000);

      if (position >= loopWidth) {
        position -= loopWidth;
      }

      bestSellerRow.scrollLeft = position;
    }

    requestAnimationFrame(animateCarousel);
  }

  bestSellerRow.addEventListener("mouseenter", () => {
    paused = true;
  });

  bestSellerRow.addEventListener("mouseleave", () => {
    paused = false;
  });

  bestSellerRow.addEventListener(
    "touchstart",
    () => {
      paused = true;
    },
    { passive: true },
  );

  bestSellerRow.addEventListener(
    "touchend",
    () => {
      position = bestSellerRow.scrollLeft;
      paused = false;
    },
    { passive: true },
  );

  window.addEventListener("resize", measureLoop);
  window.addEventListener("load", measureLoop);

  requestAnimationFrame(() => {
    measureLoop();
    requestAnimationFrame(animateCarousel);
  });
}
