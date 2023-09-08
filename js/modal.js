/**
 * Fonction qui gère la barre de navigation en responsive
 */

function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCross = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.getElementById("close-btn");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

/**
 * Fonction qui affiche la modale
 */
function launchModal() {
    modalbg.style.display = "block";
}

// Close modal event
modalCross.forEach((btn) => btn.addEventListener("click", closeModal));
closeModalBtn.addEventListener("click", closeModal);

/**
 * Fonction qui ferme la modale
 */
function closeModal() {
    modalbg.style.display = "none";
}
