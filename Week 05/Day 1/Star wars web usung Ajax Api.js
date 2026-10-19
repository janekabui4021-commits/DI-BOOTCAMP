const TOTAL_CHARACTERS = 83;
const content = document.querySelector("#content");
const findButton = document.querySelector("#find-btn");

function getRandomCharacterId() {
  return Math.floor(Math.random() * TOTAL_CHARACTERS) + 1;
}

function showStatus(message, iconClass, statusClass = "") {
  content.innerHTML = `
    <div class="status ${statusClass}" role="status">
      <i class="fa-solid ${iconClass}" aria-hidden="true"></i>
      <span>${message}</span>
    </div>
  `;
}

function renderCharacter(character, homeworld) {
  content.innerHTML = `
    <div class="character-result">
      <span class="character-label">Transmission received</span>
      <h2>${character.name}</h2>
      <dl>
        <div><dt>Height</dt><dd>${character.height} cm</dd></div>
        <div><dt>Gender</dt><dd>${character.gender}</dd></div>
        <div><dt>Birth year</dt><dd>${character.birth_year}</dd></div>
        <div><dt>Homeworld</dt><dd>${homeworld}</dd></div>
      </dl>
    </div>
  `;
}

async function fetchHomeworld(homeworldUrl) {
  const response = await fetch(homeworldUrl);
  if (!response.ok) {
    throw new Error("Homeworld unavailable");
  }

  const data = await response.json();
  return data.result?.properties?.name || "Unknown";
}

async function findCharacter() {
  findButton.disabled = true;
  findButton.setAttribute("aria-busy", "true");
  findButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Searching...';
  showStatus("Searching the galaxy...", "fa-spinner fa-spin");

  try {
    const response = await fetch(`https://www.swapi.tech/api/people/${getRandomCharacterId()}`);
    if (!response.ok) {
      throw new Error("Character unavailable");
    }

    const data = await response.json();
    const character = data.result?.properties;
    if (!character) {
      throw new Error("Character data unavailable");
    }

    const homeworld = await fetchHomeworld(character.homeworld);
    renderCharacter(character, homeworld);
  } catch (error) {
    showStatus("Oh no! That character isn't available...", "fa-triangle-exclamation", "error");
  } finally {
    findButton.disabled = false;
    findButton.removeAttribute("aria-busy");
    findButton.innerHTML = '<i class="fa-solid fa-shuffle" aria-hidden="true"></i> Find Someone';
  }
}

findButton.addEventListener("click", findCharacter);
