// Remplacez ces valeurs par vos coordonnées et profils réels avant publication.
const PORTFOLIO_CONTACT = {
  email: "gorebibalezeoseeeric@gmail.com",
  whatsappNumber: "2250505827990",
};

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");

function closeMenu() {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
  navigation?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const projectCards = Array.from(document.querySelectorAll(".project-card"));
const filterButtons = document.querySelectorAll(".filter-button");
const emptyProjectsMessage = document.querySelector(".project-empty");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    let visibleProjects = 0;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-active", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });

    projectCards.forEach((card) => {
      const isVisible = selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.hidden = !isVisible;
      if (isVisible) visibleProjects += 1;
    });

    if (emptyProjectsMessage) emptyProjectsMessage.hidden = visibleProjects > 0;
  });
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const form = document.querySelector("#contact-form");
const feedback = document.querySelector("#form-feedback");
const emailLink = document.querySelector("[data-contact-email]");
const whatsappLink = document.querySelector("[data-contact-whatsapp]");
const whatsappLinks = document.querySelectorAll("[data-whatsapp]");

if (PORTFOLIO_CONTACT.email.trim() && emailLink) {
  emailLink.href = `mailto:${PORTFOLIO_CONTACT.email.trim()}`;
  emailLink.textContent = PORTFOLIO_CONTACT.email.trim();
}

const whatsappNumber = PORTFOLIO_CONTACT.whatsappNumber.replace(/\D/g, "");
whatsappLinks.forEach((link) => {
  if (!whatsappNumber) return;

  const message = link.dataset.whatsappMessage || "Bonjour, je vous contacte au sujet de vos services de développement web.";
  link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

if (whatsappNumber && whatsappLink) {
  whatsappLink.textContent = "+225 05 05 82 79 90";
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  if (!whatsappNumber) {
    if (feedback) feedback.textContent = "Ajoutez votre numéro WhatsApp dans PORTFOLIO_CONTACT (portfolio.js) pour recevoir les messages.";
    return;
  }

  const formData = new FormData(form);
  const message = encodeURIComponent(
    `Bonjour, j’ai reçu une demande depuis mon portfolio OSAFFICHE-Dev.\n\nNom : ${formData.get("name")}\nE-mail : ${formData.get("email")}\nSujet : ${formData.get("subject")}\n\nMessage :\n${formData.get("message")}`,
  );

  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank", "noopener,noreferrer");
  if (feedback) feedback.textContent = "WhatsApp s’ouvre avec les informations saisies. Vérifiez le message puis appuyez sur Envoyer pour me le transmettre.";
});

const yearLabel = document.querySelector("[data-year]");
if (yearLabel) yearLabel.textContent = String(new Date().getFullYear());
