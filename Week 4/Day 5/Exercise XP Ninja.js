const API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const form = document.getElementById("search-form");
const categoryInput = document.getElementById("category-input");
const gifContainer = document.getElementById("gif-container");
const deleteAllButton = document.getElementById("delete-all-btn");

form.addEventListener("submit", async event => {
    event.preventDefault();

    const category = categoryInput.value.trim();
    if (!category) {
        return;
    }

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(category)}&rating=g&limit=10`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Giphy request failed: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        result.data.forEach(gif => {
            const image = document.createElement("img");
            image.src = gif.images.fixed_height.url;
            image.alt = gif.title || `${category} GIF`;
            image.loading = "lazy";
            gifContainer.appendChild(image);
        });
    } catch (error) {
        console.error("Unable to fetch GIFs:", error.message);
    } finally {
        categoryInput.value = "";
    }
});

deleteAllButton.addEventListener("click", () => {
    gifContainer.replaceChildren();
});

function resolveAfter2Seconds() {
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
}

function resolveAfter1Second() {
    console.log("starting fast promise");
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
}

function concurrentPromise() {
    console.log("==CONCURRENT START with Promise.all==");

    return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then(messages => {
        console.log(messages[0]);
        console.log(messages[1]);
    });
}

async function parallel() {
    console.log("==PARALLEL with await Promise.all==");

    await Promise.all([
        (async () => console.log(await resolveAfter2Seconds()))(),
        (async () => console.log(await resolveAfter1Second()))()
    ]);
}

function parallelPromise() {
    console.log("==PARALLEL with Promise.then==");
    resolveAfter2Seconds().then(message => console.log(message));
    resolveAfter1Second().then(message => console.log(message));
}

setTimeout(concurrentPromise, 1000);
setTimeout(parallel, 5000);
setTimeout(parallelPromise, 13000);
