document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("[data-nav]");

  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("data-nav");
      if (target) {
        window.location.href = target;
      }
    });
  });
});