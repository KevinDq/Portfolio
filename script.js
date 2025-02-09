let container = document.querySelector(".container");
let navItems = document.querySelectorAll(".nav");


// Ajouter des écouteurs d'événements aux éléments de navigation
navItems.forEach(function(element) {
    element.addEventListener("click", showSection);
});

// Fonction pour afficher ou masquer les sections
function showSection(event) {
    let targetClass = event.currentTarget.getAttribute('data-target');
    let targetElement = document.querySelector(`.${targetClass}.box`);    

    // Masquer tous les éléments
    document.querySelectorAll(".box").forEach(box => {
        box.classList.remove('visible');
    });

    // Afficher l'élément cible
    targetElement.classList.toggle('visible');

    // Appliquer le décalage de la container
    if (targetElement.classList.contains('visible')) {
        container.style.transform = "translateX(-400px)";
    } else {
        container.style.transform = "none";
    }

    // Empêcher la propagation de l'événement pour éviter de masquer l'élément immédiatement
    event.stopPropagation();
}

// Ajouter un écouteur d'événement au document pour masquer les sections affichées lorsque l'on clique en dehors
document.addEventListener("click", function() {
    document.querySelectorAll(".box").forEach(box => {
        box.classList.remove('visible');
    });
    container.style.transform = "none";
});

// Empêcher la propagation de l'événement sur les éléments de navigation pour éviter de masquer l'élément immédiatement
navItems.forEach(function(element) {
    element.addEventListener("click", function(event) {
        event.stopPropagation();
    });
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