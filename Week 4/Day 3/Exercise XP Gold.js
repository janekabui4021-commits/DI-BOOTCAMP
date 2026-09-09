const params = new URLSearchParams(window.location.search);
const name = params.get("name");
const lastname = params.get("lastname");
const dataSection = document.getElementById("data-container");

if (name && lastname) {
	dataSection.textContent = `Name: ${name}, Last Name: ${lastname}`;
} else {
	dataSection.textContent = "No form data submitted.";
}
