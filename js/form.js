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
	CGU: true,
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

// Real time input verification with event listener
firstNameElement.addEventListener("keyup", function () {
	formVerification.firstName = validateFirstName(this);
	submitButtonState();
});
lastNameElement.addEventListener("keyup", function () {
	formVerification.lastName = validateLastName(this);
	submitButtonState();
});
emailElement.addEventListener("keyup", function () {
	formVerification.email = validateEmail(this);
	submitButtonState();
});
birthdateElement.addEventListener("change", function () {
	formVerification.birthdate = validateBirthdate(this);
	submitButtonState();
});
tournamentsElement.addEventListener("keyup", function () {
	formVerification.tournaments = validateTournaments(this);
	submitButtonState();
});

cguElement.addEventListener("change", function () {
	formVerification.CGU = validateCGU(this);
	submitButtonState();
});

locationsElement.addEventListener("focus", function () {
	formVerification.location = validateLocation(this);
	submitButtonState();
});

for(i = 0; i < locationsElement.length; i++){
	locationsElement[i].addEventListener('click', validateLocation)
}
// Function to enable or disabled the submit button

function submitButtonState() {
	const isFormValid = Object.values(formVerification).every((v) => v === true);

	if (isFormValid) {
		submitButton.disabled = false;
		return isFormValid;
	} else {
		submitButton.disabled = true;
		return isFormValid;
	}
}

// Functions to verify all the inputs

function validateFirstName(element) {
	const errorMessageElement = document.querySelector("#error-first");
	if (firstNameRegex.test(element.value)) {
		errorMessageElement.textContent = "";
		return true;
	} else {
		const errorMessage = errorMessageElement.dataset.errorMessage;
		errorMessageElement.textContent = errorMessage;
		return false;
	}
}

function validateLastName(element) {
	const errorMessageElement = document.querySelector("#error-last");
	if (lastNameRegex.test(element.value)) {
		errorMessageElement.textContent = "";
		return true;
	} else {
		const errorMessage = errorMessageElement.dataset.errorMessage;
		errorMessageElement.textContent = errorMessage;
		return false;
	}
}
function validateEmail(element) {
	const errorMessageElement = document.querySelector("#error-email");
	if (emailRegex.test(element.value)) {
		errorMessageElement.textContent = "";
		return true;
	} else {
		const errorMessage = errorMessageElement.dataset.errorMessage;
		errorMessageElement.textContent = errorMessage;
		return false;
	}
}

function validateBirthdate(element) {
	const errorMessageElement = document.querySelector("#error-birth");
	const currentDate = new Date();
	const birthdate = new Date(element.value);

	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();
	const currentDay = currentDate.getDate();
	const birthYear = birthdate.getFullYear();
	const birthMonth = birthdate.getMonth();
	const birthDay = birthdate.getDate();
	const date1 = currentYear + "/" + currentMonth + "/" + currentDay;
	const date2 = birthYear + "/" + birthMonth + "/" + birthDay;
	const isPersonBorn = date2 !== date1;

	if (birthdate.getTime() < currentDate.getTime() && isPersonBorn) {
		errorMessageElement.textContent = "";
		return true;
	} else {
		const errorMessage = errorMessageElement.dataset.errorMessage;
		errorMessageElement.textContent = errorMessage;
		return false;
	}
}

function validateTournaments(element) {
	const errorMessageElement = document.querySelector("#error-tournaments");
	if (tournamentsRegex.test(element.value) && element.value >= 0) {
		errorMessageElement.textContent = "";
		return true;
	} else {
		const errorMessage = errorMessageElement.dataset.errorMessage;
		errorMessageElement.textContent = errorMessage;
		return false;
	}
}

function validateLocation(element) {
	const errorMessageElement = document.querySelector("#error-location");
	const casesCochees = document.querySelectorAll('input[type="radio"]');

	let isCheckboxChecked = false;

	for (var i = 0; i < casesCochees.length; i++){

		const casesCochee = casesCochees[i];

		if (casesCochee.checked){
			isCheckboxChecked = true;
			break
		}
	}
	return isCheckboxChecked;
}

function validateCGU(element) {
	const errorMessageElement = document.querySelector("#error-checkbox1");
	if (element.checked) {
		return true;
	} else {
		const errorMessage = errorMessageElement.dataset.errorMessage;
		errorMessageElement.textContent = errorMessage;
		return false;
	}
}

// Gestion du comportement de la modal en fonction de la validité du formulaire
submitButton.addEventListener("click", (e) => {

	const formValidity = submitButtonState();
	if (!formValidity) {
		e.preventDefault();
		console.log("formulaire invalide");
	} else {
		console.log("formulaire valide");
	}
});
