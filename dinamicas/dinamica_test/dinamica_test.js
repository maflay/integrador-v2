window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  document.querySelector(".parallax-bg").style.transform =
    `translateY(${scrolled * 0.3}px)`;
});
