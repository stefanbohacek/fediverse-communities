export default () => {
  const backToTopBtn = document.getElementById("back-to-top");

  backToTopBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });

  window.addEventListener("scroll", () => {
    backToTopBtn.classList.toggle(
      "d-none",
      window.scrollY <= screen.height / 4,
    );
  });
};
