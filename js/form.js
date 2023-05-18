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
const locationOneElement = document.getElementById("location1");
const locationTwoElement = document.getElementById("location2");
const locationThreeElement = document.getElementById("location3");
const locationFourElement = document.getElementById("location4");
const locationFiveElement = document.getElementById("location5");
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
locationOneElement.addEventListener("change", function () {
	formVerification.location = validateLocation(this);
	submitButtonState();
});
locationTwoElement.addEventListener("change", function () {
	formVerification.location = validateLocation(this);
	submitButtonState();
});
locationThreeElement.addEventListener("change", function () {
	formVerification.location = validateLocation(this);
	submitButtonState();
});
locationFourElement.addEventListener("change", function () {
	formVerification.location = validateLocation(this);
	submitButtonState();
});
locationFiveElement.addEventListener("change", function () {
	formVerification.location = validateLocation(this);
	submitButtonState();
});
cguElement.addEventListener("change", function () {
	formVerification.CGU = validateCGU(this);
	submitButtonState();
});

// Function to enable or disabled the submit button

function submitButtonState() {
	const isFormValid = Object.values(formVerification).every((v) => v === true);

	if (isFormValid) {
		submitButton.disabled = false;
		return isFormValid;
	} else {
		// submitButton.disabled = true;
		return isFormValid;
	}
}

// Functions to verify all the inputs

function validateFirstName(element) {
	if (firstNameRegex.test(element.value)) {
		return true;
	} else {
		return false;
	}
}

function validateLastName(element) {
	if (lastNameRegex.test(element.value)) {
		return true;
	} else {
		return false;
	}
}
function validateEmail(element) {
	if (emailRegex.test(element.value)) {
		return true;
	} else {
		return false;
	}
}

function validateBirthdate(element) {
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
		return true;
	} else {
		return false;
	}
}

function validateTournaments(element) {
	if (tournamentsRegex.test(element.value) && element.value >= 0) {
		return true;
	} else {
		return false;
	}
}

function validateLocation(element) {
	if (locationOneElement.value) {
		return true;
	} else if (locationTwoElement.value) {
		return true;
	} else if (locationThreeElement.value) {
		return true;
	} else if (locationFourElement.value) {
		return true;
	} else if (locationFiveElement.value) {
		return true;
	} else {
		return false;
	}
}

function validateCGU(element) {
	if (element.checked) {
		return true;
	} else {
		return false;
	}
}

// Gestion du comportement de la modal en fonction de la validité du formulaire
submitButton.addEventListener("click", (e) => {
	const errorMessageElement = document.querySelector(".error-msg");
	const formValidity = submitButtonState();
	if (!formValidity) {
		e.preventDefault();
		const errorMessage = errorMessageElement.dataset.errorMessage;
		errorMessageElement.textContent = errorMessage;
		console.log(formVerification);
		console.log("formulaire invalide");
	} else {
		console.log("formulaire valide");
	}
});
