let currentPokemonId = null;
const TOTAL_POKEMON = 1025; // Current total count in PokéAPI

// DOM Elements
const randomBtn = document.getElementById("random-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error-message");
const detailsEl = document.getElementById("pokemon-details");

const imgEl = document.getElementById("pokemon-img");
const nameEl = document.getElementById("pokemon-name");
const idEl = document.getElementById("pokemon-id");
const heightEl = document.getElementById("pokemon-height");
const weightEl = document.getElementById("pokemon-weight");
const typeEl = document.getElementById("pokemon-type");

// Utility function to reset views
function resetView() {
  loadingEl.classList.add("hidden");
  errorEl.classList.add("hidden");
  detailsEl.classList.add("hidden");
}

// Fetch Pokémon by ID or Name
async function fetchPokemon(identifier) {
  resetView();
  loadingEl.classList.remove("hidden");

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
    
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }

    const data = await response.json();
    displayPokemon(data);
  } catch (err) {
    loadingEl.classList.add("hidden");
    errorEl.classList.remove("hidden");
  }
}

// Display retrieved data in HTML
function displayPokemon(data) {
  currentPokemonId = data.id;

  imgEl.src = data.sprites.front_default || "";
  nameEl.textContent = data.name.toUpperCase();
  idEl.textContent = data.id;
  heightEl.textContent = data.height;
  weightEl.textContent = data.weight;
  typeEl.textContent = data.types.map(t => t.type.name).join(", ");

  loadingEl.classList.add("hidden");
  detailsEl.classList.remove("hidden");
}

// Event Listeners
randomBtn.addEventListener("click", async () => {
  const randomId = Math.floor(Math.random() * TOTAL_POKEMON) + 1;
  await fetchPokemon(randomId);
});

prevBtn.addEventListener("click", async () => {
  if (currentPokemonId && currentPokemonId > 1) {
    await fetchPokemon(currentPokemonId - 1);
  }
});

nextBtn.addEventListener("click", async () => {
  if (currentPokemonId) {
    await fetchPokemon(currentPokemonId + 1);
  } else {
    await fetchPokemon(1);
  }
});
