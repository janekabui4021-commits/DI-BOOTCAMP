const faker = require("faker");

const users = [];

function addUser(name, addressStreet, country) {
	const user = { name, addressStreet, country };
	users.push(user);
	return user;
}

function addFakeUser() {
	return addUser(
		faker.name.findName(),
		faker.address.streetAddress(),
		faker.address.country(),
	);
}

function extractNumbers(text) {
	return text.match(/\d/g)?.join("") ?? "";
}

function isValidFullName(fullName) {
	return /^[A-Z][a-z]+ [A-Z][a-z]+$/.test(fullName);
}

module.exports = {
	users,
	addUser,
	addFakeUser,
	extractNumbers,
	isValidFullName,
};
