"use strict";

// REGEX
const firstNameRegex = /^[a-zA-ZçéèêëïöÇÉÈÊËÏÖ\s-]{2,20}$/;
const lastNameRegex = /^[a-zA-Z\s-]{2,20}$/;
const emailRegex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const tournamentsRegex = /^[0-9\s-]{1,20}$/;

let formVerification = {
    firstName: false,
    lastName: false,
    email: false,
    birthdate: false,
    tournaments: false,
    location: false,
    CGU: false,
};

// DOM Elements

const firstNameElement = document.getElementById("first");
const lastNameElement = document.getElementById("last");
const emailElement = document.getElementById("email");
const birthdateElement = document.getElementById("birthdate");
const tournamentsElement = document.getElementById("quantity");
const locationsElement = document.querySelectorAll('input[type="radio"]');
const cguElement = document.getElementById("checkbox1");
const submitButton = document.getElementById("btn-submit");
const formElement = document.getElementById("reserve");
const modalElement = document.querySelector(".modal-body");
const modalConfirmElement = document.querySelector(".modal-confirm");

/**
 * Fonction qui vérifie si le prénom est valide
 */
function validateFirstName() {
    const errorMsg = document.getElementById("error-first");

    if (!firstNameElement.value) {
        errorMsg.textContent = firstNameElement.dataset.error;
        errorMsg.style.display = "block";
        firstNameElement.style.border = "2px solid red";
        return (formVerification.firstName = false);
    } else if (!firstNameRegex.test(firstNameElement.value)) {
        errorMsg.textContent = firstNameElement.dataset.errorPattern;
        errorMsg.style.display = "block";
        firstNameElement.style.border = "2px solid red";
        return (formVerification.firstName = false);
    } else {
        errorMsg.style.display = "none";
        firstNameElement.style.border = "none";
        return (formVerification.firstName = true);
    }
}

/**
 * Fonction qui vérifie si le nom est valide
 */
function validateLastName() {
    const errorMsg = document.getElementById("error-last");
    if (!lastNameElement.value) {
        errorMsg.textContent = lastNameElement.dataset.error;
        errorMsg.style.display = "block";
        lastNameElement.style.border = "2px solid red";

        return (formVerification.lastName = false);
    } else if (!lastNameRegex.test(lastNameElement.value)) {
        errorMsg.textContent = lastNameElement.dataset.errorPattern;
        errorMsg.style.display = "block";
        lastNameElement.style.border = "2px solid red";

        return (formVerification.lastName = false);
    } else {
        errorMsg.style.display = "none";
        lastNameElement.style.border = "none";

        return (formVerification.lastName = true);
    }
}

/**
 * Fonction qui vérifie si l'adresse mail est valide
 */
function validateEmail() {
    const errorMsg = document.getElementById("error-email");
    if (!emailElement.value) {
        errorMsg.textContent = emailElement.dataset.error;
        errorMsg.style.display = "block";
        emailElement.style.border = "2px solid red";
        return (formVerification.email = false);
    } else if (!emailRegex.test(emailElement.value)) {
        errorMsg.textContent = emailElement.dataset.errorPattern;
        emailElement.style.border = "2px solid red";
        errorMsg.style.display = "block";
        return (formVerification.email = false);
    } else {
        errorMsg.style.display = "none";
        emailElement.style.border = "none";
        return (formVerification.email = true);
    }
}

/**
 * Fonction qui vérifie si la date de naissance est valide
 */
function validateBirthdate() {
    const errorMsg = document.getElementById("error-birth");
    const currentDate = new Date();
    const birthdate = new Date(birthdateElement.value);
    const currentYear = currentDate.getFullYear();
    const birthYear = birthdate.getFullYear();
    const isPersonOld = currentYear - birthYear;

    if (birthdate.getTime() < currentDate.getTime() && isPersonOld >= 13) {
        errorMsg.style.display = "none";
        birthdateElement.style.border = "none";
        return (formVerification.birthdate = true);
    } else if (isPersonOld < 13) {
        errorMsg.textContent = birthdateElement.dataset.errorPattern;
        errorMsg.style.display = "block";
        birthdateElement.style.border = "2px solid red";
        return (formVerification.birthdate = false);
    } else {
        errorMsg.textContent = birthdateElement.dataset.error;
        errorMsg.style.display = "block";
        birthdateElement.style.border = "2px solid red";
        return (formVerification.birthdate = false);
    }
}

/**
 * Fonction qui vérifie si la valeur du nombre de tournois est valide
 */
function validateTournaments() {
    const errorMsg = document.getElementById("error-tournaments");
    if (
        tournamentsRegex.test(tournamentsElement.value) &&
        tournamentsElement.value >= 0 &&
        tournamentsElement.value <= 99
    ) {
        errorMsg.style.display = "none";
        tournamentsElement.style.border = "none";
        return (formVerification.tournaments = true);
    } else if (
        tournamentsRegex.test(tournamentsElement.value) ||
        tournamentsElement.value < 0 ||
        tournamentsElement.value > 99
    ) {
        errorMsg.style.display = "block";
        errorMsg.textContent = tournamentsElement.dataset.errorPattern;
        tournamentsElement.style.border = "2px solid red";
        return (formVerification.tournaments = false);
    } else {
        errorMsg.style.display = "block";
        errorMsg.textContent = tournamentsElement.dataset.error;
        tournamentsElement.style.border = "2px solid red";
        return (formVerification.tournaments = false);
    }
}

/**
 * Fonction qui vérifie si au moins une ville est cochée
 */
function validateLocation() {
    const errorMsg = document.getElementById("error-location");
    const radioChecked = document.querySelectorAll('input[type="radio"]');

    let isOneRadioChecked = false;

    for (var i = 0; i < radioChecked.length; i++) {
        const radioCheck = radioChecked[i];

        if (radioCheck.checked) {
            isOneRadioChecked = true;
            break;
        }
    }

    if (isOneRadioChecked) {
        errorMsg.style.display = "none";
        return (formVerification.location = isOneRadioChecked);
    } else {
        console.log("Veuillez choisir une ville");
        errorMsg.style.display = "block";
        errorMsg.textContent = "Veuillez choisir une ville";
        return (formVerification.location = isOneRadioChecked);
    }
}

/**
 * Fonction qui vérifie si les CGU sont acceptées
 */
function validateCGU() {
    const errorMsg = document.getElementById("error-checkbox1");
    if (cguElement.checked) {
        errorMsg.style.display = "none";
        return (formVerification.CGU = true);
    } else {
        errorMsg.textContent = cguElement.dataset.error;
        errorMsg.style.display = "block";
        return (formVerification.CGU = false);
    }
}

// Event sur le bouton submit du formulaire qui va vérifier si celui-ci est valide
submitButton.addEventListener("click", (e) => {
    validateFirstName();
    validateLastName();
    validateEmail();
    validateBirthdate();
    validateTournaments();
    validateLocation();
    validateCGU();

    const isFormValid = Object.values(formVerification).every(
        (v) => v === true
    );

    if (isFormValid) {
        e.preventDefault();
        formElement.style.display = "none";
        modalConfirmElement.style.display = "flex";
        console.log("formulaire valide");
    } else {
        e.preventDefault();
        console.log("formulaire non valide");
    }
});
