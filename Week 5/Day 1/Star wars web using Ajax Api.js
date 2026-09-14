const content = document.querySelector("#content");
const findButton = document.querySelector("#find-btn");

const randomCharacterUrl = () =>
	`https://www.swapi.tech/api/people/${Math.floor(Math.random() * 82) + 1}`;

const renderCharacter = (character) => {
	const { name, height, gender, birth_year: birthYear, homeworld } = character;

	content.innerHTML = `
		<div class="character-result">
			<span class="character-label">Transmission received</span>
			<h2>${name}</h2>
			<dl>
				<div><dt>Height</dt><dd>${height} cm</dd></div>
				<div><dt>Gender</dt><dd>${gender}</dd></div>
				<div><dt>Birth year</dt><dd>${birthYear}</dd></div>
				<div><dt>Homeworld</dt><dd>${homeworld}</dd></div>
			</dl>
		</div>
	`;
};

const findCharacter = async () => {
	findButton.disabled = true;
	content.innerHTML = `
		<div class="status" role="status" aria-live="polite">
			<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>
			<span>Searching the galaxy...</span>
		</div>
	`;

	try {
		const response = await fetch(randomCharacterUrl());

		if (!response.ok) {
			throw new Error("The character could not be found.");
		}

		const result = await response.json();
		renderCharacter(result.result.properties);
	} catch (error) {
		content.innerHTML = `
			<div class="status error" role="alert">
				<i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
				<span>${error.message} Try again.</span>
			</div>
		`;
	} finally {
		findButton.disabled = false;
	}
};

findButton.addEventListener("click", findCharacter);
