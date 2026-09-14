let currentPokemonId = null;
const TOTAL_POKEMON = 1025; 

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

  imgEl.src = data.sprites.other["official-artwork"].front_default
    || data.sprites.front_default
    || "";
  imgEl.alt = `${data.name} artwork`;
  nameEl.textContent = data.name.toUpperCase();
  idEl.textContent = `#${String(data.id).padStart(4, "0")}`;
  heightEl.textContent = `${(data.height / 10).toFixed(1)} m`;
  weightEl.textContent = `${(data.weight / 10).toFixed(1)} kg`;
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
  if (currentPokemonId) {
    const previousId = currentPokemonId === 1
      ? TOTAL_POKEMON
      : currentPokemonId - 1;
    await fetchPokemon(previousId);
  }
});

nextBtn.addEventListener("click", async () => {
  if (currentPokemonId) {
    const nextId = currentPokemonId === TOTAL_POKEMON
      ? 1
      : currentPokemonId + 1;
    await fetchPokemon(nextId);
  } else {
    await fetchPokemon(1);
  }
});
