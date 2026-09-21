// Virginie Biagi — Sage-femme — script partagé
(function () {
  "use strict";

  // Ombre + fond opaque du header au scroll
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Menu mobile
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Année courante dans le footer
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Formulaire de contact : pas encore de back-end de réservation en ligne.
  // On construit un mailto: pré-rempli avec les infos saisies, en secours simple et fiable.
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var nom = (data.get("nom") || "").toString();
      var email = (data.get("email") || "").toString();
      var tel = (data.get("telephone") || "").toString();
      var sujet = (data.get("sujet") || "Demande via le site").toString();
      var message = (data.get("message") || "").toString();

      var body = [
        "Nom : " + nom,
        "Téléphone : " + tel,
        "Email : " + email,
        "",
        message,
      ].join("\n");

      var mailto =
        "mailto:contact@virginiebiagi-sagefemme.be" +
        "?subject=" + encodeURIComponent("[Site web] " + sujet) +
        "&body=" + encodeURIComponent(body);

      var status = document.querySelector("#form-status");
      if (status) {
        status.textContent =
          "Merci " + (nom || "") + " ! Votre messagerie va s'ouvrir avec votre message pré-rempli — il ne reste qu'à l'envoyer.";
        status.classList.add("is-visible", "ok");
      }
      window.location.href = mailto;
    });
  }
})();
