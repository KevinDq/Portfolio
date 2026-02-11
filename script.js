// ===== Helpers
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const container  = $(".container");
const header     = $("header");
const navBlocks  = $$(".nav");        // conteneurs (chaque .nav regroupe un titre + panneau)
const boxes      = $$(".box");        // panneaux
const partOne  = $(".part-one");  // section projets
const partThree  = $(".part-three");  // section projets

// Utiliser une seule variable CSS comme source de vérité (définie en CSS via media queries)
const readShiftOpen = () =>
  getComputedStyle(document.documentElement).getPropertyValue("--shift-open").trim() || "-400px";

const applyShift = (open) => {
  const rootStyle = document.documentElement.style;
  if (open) {
    rootStyle.setProperty("--shift", readShiftOpen());
    container?.classList.remove("--no-shift");
  } else {
    rootStyle.setProperty("--shift", "0px");
    container?.classList.add("--no-shift");
  }
};

// Fermer toutes les boxes
const closeAllBoxes = () => {
  boxes.forEach(b => {
    b.classList.remove("visible");
    // ARIA
    b.setAttribute("aria-hidden", "true");
  });
  // Tous les triggers aria-expanded = false
  $$("[data-target][aria-expanded='true']").forEach(btn => btn.setAttribute("aria-expanded", "false"));

  applyShift(false);
};

// Ouvrir/fermer une box cible
const toggleBox = (targetClass) => {
  const target = $(`.${targetClass}.box`);
  if (!target) return;

  const willOpen = !target.classList.contains("visible");

  // Fermer les autres avant
  closeAllBoxes();

  if (willOpen) {
    target.classList.add("visible");
    target.setAttribute("aria-hidden", "false");
    // marquer le trigger
    const trigger = $(`[data-target="${targetClass}"]`);
    trigger?.setAttribute("aria-expanded", "true");
    applyShift(true);
  }
};

// ===== Event delegation sur les blocs nav
// (on clique sur un élément qui porte data-target)
document.addEventListener("click", (e) => {
  const trigger = e.target.closest("[data-target]");
  const clickedInsideBox = e.target.closest(".box");

  // 1) Click sur un trigger -> toggle la box correspondante
  if (trigger) {
    e.preventDefault();
    e.stopPropagation();
    const targetClass = trigger.dataset.target;
    toggleBox(targetClass);
    return;
  }

  // 2) Click ailleurs que dans une box -> fermer
  if (!clickedInsideBox) {
    closeAllBoxes();
  }
}, { passive: true });

// ===== Clavier (accessibilité): Enter/Space sur triggers, Esc pour fermer
document.addEventListener("keydown", (e) => {
  const activeTrigger = document.activeElement?.closest?.("[data-target]");

  // Enter/Space pour ouvrir quand le focus est sur un trigger
  if (activeTrigger && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    toggleBox(activeTrigger.dataset.target);
  }

  // Esc pour fermer tout
  if (e.key === "Escape") {
    closeAllBoxes();
  }
});

// ===== Redimensionnement: recalcule le shift si une box est ouverte
let resizeRaf = null;
window.addEventListener("resize", () => {
  if (resizeRaf) return;
  resizeRaf = requestAnimationFrame(() => {
    resizeRaf = null;
    const isAnyOpen = boxes.some(b => b.classList.contains("visible"));
    if (isAnyOpen) {
      // On relit la valeur responsive et on la réapplique
      applyShift(true);
    }
  });
}, { passive: true });

// ===== Partie Projets (part-three)
if (partThree) {
  partThree.addEventListener("click", () => {
    partThree.classList.toggle("show");
    partOne.classList.toggle("u-hidden");

    // alterner la classe "glass-box"
    container?.classList.toggle("glass-box");
  }, { passive: true });
}

// ===== Initialisation ARIA : triggers et boîtes
// (optionnel mais recommandé)
navBlocks.forEach(nav => {
  const trigger = nav.querySelector("[data-target]");
  const targetClass = trigger?.dataset.target;
  const panel = targetClass ? $(`.${targetClass}.box`) : null;

  if (trigger && panel) {
    // lier trigger ↔ panneau
    const panelId = panel.id || `box-${targetClass}`;
    if (!panel.id) panel.id = panelId;

    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");
    trigger.setAttribute("aria-controls", panelId);
    trigger.setAttribute("aria-expanded", "false");

    panel.setAttribute("role", "region");
    panel.setAttribute("aria-hidden", "true");
    panel.setAttribute("aria-labelledby", trigger.id || `${panelId}-label`);
  }
});

// générer les projets

const projectsContainer = document.getElementById("projects-container");

projects.forEach(project => {
  const card = document.createElement("article");
  card.className = "project-card";

  card.innerHTML = `
    <a href="${project.url}" target="_blank" rel="noopener">
        <img src="${project.image}" alt="${project.title}">
        <h4>${project.title}</h4>
    </a>
  `;

  projectsContainer.appendChild(card);
});