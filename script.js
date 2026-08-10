const drawer = document.getElementById("drawer"),
  shade = document.getElementById("shade"),
  nav = document.getElementById("topNav");
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
document.getElementById("menuButton").onclick = () =>
  nav.classList.toggle("open");
nav
  .querySelectorAll("a")
  .forEach((link) =>
    link.addEventListener("click", () => nav.classList.remove("open")),
  );
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".rise").forEach((item) => observer.observe(item));
// Slow luxury carousel for Best Sellers in Motion
const bestSellerRow = document.querySelector(".product-row");

if (bestSellerRow && !bestSellerRow.dataset.carouselReady) {
  bestSellerRow.dataset.carouselReady = "true";

  const originalProducts = Array.from(bestSellerRow.children);

  originalProducts.forEach((product) => {
    const duplicate = product.cloneNode(true);
    duplicate.setAttribute("aria-hidden", "true");
    bestSellerRow.appendChild(duplicate);
  });
}
