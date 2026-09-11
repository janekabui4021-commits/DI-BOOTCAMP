const API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const form = document.getElementById("gif-form");
const categoryInput = document.getElementById("category-input");
const gifContainer = document.getElementById("gif-container");
const deleteAllButton = document.getElementById("delete-all-btn");

form.addEventListener("submit", async event => {
    event.preventDefault();

    const category = categoryInput.value.trim();
    if (!category) {
        return;
    }

    const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${encodeURIComponent(category)}&rating=g`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Giphy request failed: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        const gif = result.data;

        if (!gif || !gif.images) {
            throw new Error(`No GIF found for "${category}".`);
        }

        const gifItem = document.createElement("div");
        const image = document.createElement("img");
        const deleteButton = document.createElement("button");

        image.src = gif.images.fixed_height.url;
        image.alt = gif.title || `${category} GIF`;
        image.loading = "lazy";

        deleteButton.type = "button";
        deleteButton.textContent = "DELETE";
        deleteButton.addEventListener("click", () => {
            gifItem.remove();
        });

        gifItem.append(image, deleteButton);
        gifContainer.appendChild(gifItem);
    } catch (error) {
        console.error("Unable to fetch GIF:", error.message);
    } finally {
        categoryInput.value = "";
    }
});

deleteAllButton.addEventListener("click", () => {
    gifContainer.replaceChildren();
});
