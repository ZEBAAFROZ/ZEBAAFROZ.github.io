// Theme toggle, mobile menu, and publication Abs/Bib panels.
(function () {
  var root = document.documentElement;

  // ----- Light / dark theme -----
  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // ----- Mobile menu -----
  var menuBtn = document.getElementById("menu-btn");
  var links = document.getElementById("nav-links");
  if (menuBtn && links) {
    menuBtn.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open);
    });
  }

  // ----- Publication buttons (Abs / Bib) -----
  // A button with data-toggle="abs" or "bib" opens the matching panel inside the same .pub
  document.querySelectorAll(".pub [data-toggle]").forEach(function (btn) {
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", function () {
      var pub = btn.closest(".pub");
      var target = pub.querySelector(".pub-panel." + btn.dataset.toggle);
      var willOpen = !target.classList.contains("open");
      pub.querySelectorAll(".pub-panel").forEach(function (p) { p.classList.remove("open"); });
      pub.querySelectorAll("[data-toggle]").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
      if (willOpen) {
        target.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // ----- Footer year -----
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
