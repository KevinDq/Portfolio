const container = document.querySelector(".container");
const navItems = document.querySelectorAll(".nav");
const boxes = document.querySelectorAll(".box");

// Fonction pour calculer le décalage dynamique
function getOffset() {
    if (window.innerWidth <= 500) {
        return -800; // Très petit écran (mobile portrait)
    } else if (window.innerWidth <= 1200) {
        return -850; // Mobile paysage / petites tablettes    
    } else {
        return -400; // Grand écran
    }
}

function showSection(event) {
    event.stopPropagation();

    const targetClass = event.currentTarget.dataset.target;
    const targetElement = document.querySelector(`.${targetClass}.box`);

    const isVisible = targetElement.classList.toggle("visible");

    // Masquer les autres éléments
    boxes.forEach(box => box !== targetElement && box.classList.remove("visible"));

    // Appliquer le décalage correct
    container.style.transform = isVisible ? `translateX(${getOffset()}px)` : "none";
}

// Ajouter les écouteurs d'événements
navItems.forEach(item => item.addEventListener("click", showSection));

// Cacher les sections au clic en dehors
document.addEventListener("click", () => {
    boxes.forEach(box => box.classList.remove("visible"));
    container.style.transform = "none";
});

// Vérifier et ajuster le décalage si la fenêtre est redimensionnée
window.addEventListener("resize", () => {
    if (document.querySelector(".box.visible")) {
        container.style.transform = `translateX(${getOffset()}px)`;
    }
});

let partThree = document.querySelector(".part-three")

partThree.addEventListener("click", showProject)

function showProject() {    
    partThree.classList.toggle("show");
    container.classList.toggle("hide");
    if (container.classList.contains("glass-box")) {
        container.classList.remove("glass-box");  // Supprime la classe si elle existe
      } else {
        container.classList.add("glass-box");    // Ajoute la classe si elle n'existe pas
      }    
}

window.setTimeout(remove, 5000) //la section disparait après 5 secondes.

function remove() {
    const header = document.querySelector("header");
    header.style.display = "none";
}
