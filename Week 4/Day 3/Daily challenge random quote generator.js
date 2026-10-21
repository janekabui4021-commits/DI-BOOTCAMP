//  Part 1: Quotes Array & Initial Setup 
const quotes = [
    { id: 0, author: "Albert Einstein", quote: "Life is like riding a bicycle. To keep your balance, you must keep moving.", likes: 0 },
    { id: 1, author: "Oscar Wilde", quote: "Be yourself; everyone else is already taken.", likes: 0 },
    { id: 2, author: "Albert Einstein", quote: "Strive not to be a success, but rather to be of value.", likes: 0 },
    { id: 3, author: "Mahatma Gandhi", quote: "Be the change that you wish to see in the world.", likes: 0 }
];

let lastQuoteId = null;
let currentDisplayedQuote = null;

const quoteSection = document.getElementById("quote-section");
const generateBtn = document.getElementById("generate-btn");
const statsOutput = document.getElementById("stats-output");

// Display quote in DOM
function displayQuote(quoteObj) {
    currentDisplayedQuote = quoteObj;
    quoteSection.innerHTML = `
        <p>"${quoteObj.quote}"</p>
        <p><strong>- ${quoteObj.author}</strong></p>
        <p><small>Likes: ${quoteObj.likes}</small></p>
    `;
    statsOutput.textContent = ""; 
}

// Generate random quote without repeating the last shown quote
generateBtn.addEventListener("click", () => {
    if (quotes.length === 0) return;
    if (quotes.length === 1) {
        displayQuote(quotes[0]);
        return;
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (quotes[randomIndex].id === lastQuoteId);

    const selectedQuote = quotes[randomIndex];
    lastQuoteId = selectedQuote.id;
    displayQuote(selectedQuote);
});

// --- Part 2: Add Quote & Analysis Buttons ---

const addQuoteForm = document.getElementById("add-quote-form");
addQuoteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const quoteText = document.getElementById("quote-input").value.trim();
    const authorText = document.getElementById("author-input").value.trim();

    if (quoteText && authorText) {
        const newQuote = {
            id: quotes.length,
            author: authorText,
            quote: quoteText,
            likes: 0
        };
        quotes.push(newQuote);
        addQuoteForm.reset();
        alert("Quote added successfully!");
    }
});

// Count characters with spaces
document.getElementById("btn-char-space").addEventListener("click", () => {
    if (!currentDisplayedQuote) return;
    statsOutput.textContent = `Character count (with spaces): ${currentDisplayedQuote.quote.length}`;
});

// Count characters without spaces
document.getElementById("btn-char-no-space").addEventListener("click", () => {
    if (!currentDisplayedQuote) return;
    const noSpaceLength = currentDisplayedQuote.quote.replace(/\s+/g, "").length;
    statsOutput.textContent = `Character count (without spaces): ${noSpaceLength}`;
});

// Count words
document.getElementById("btn-words").addEventListener("click", () => {
    if (!currentDisplayedQuote) return;
    const wordCount = currentDisplayedQuote.quote.trim().split(/\s+/).length;
    statsOutput.textContent = `Word count: ${wordCount}`;
});

// Like quote
document.getElementById("btn-like").addEventListener("click", () => {
    if (!currentDisplayedQuote) return;
    currentDisplayedQuote.likes += 1;
    displayQuote(currentDisplayedQuote);
});

// --- Part 3: Filter & Navigation ---

let filteredQuotes = [];
let currentFilterIndex = 0;

const filterForm = document.getElementById("filter-form");
const filterNavigation = document.getElementById("filter-navigation");
const filteredQuoteSection = document.getElementById("filtered-quote-section");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

function displayFilteredQuote() {
    if (filteredQuotes.length === 0) return;
    const q = filteredQuotes[currentFilterIndex];
    filteredQuoteSection.innerHTML = `
        <p>"${q.quote}"</p>
        <p><strong>- ${q.author}</strong></p>
        <p><small>Quote ${currentFilterIndex + 1} of ${filteredQuotes.length}</small></p>
    `;
}

// Filter quotes by author name
filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchAuthor = document.getElementById("author-filter-input").value.trim().toLowerCase();
    
    filteredQuotes = quotes.filter(q => q.author.toLowerCase().includes(searchAuthor));

    if (filteredQuotes.length === 0) {
        filterNavigation.style.display = "none";
        alert("No quotes found for this author.");
        return;
    }

    currentFilterIndex = 0;
    filterNavigation.style.display = "block";
    displayFilteredQuote();
});

// Previous button
prevBtn.addEventListener("click", () => {
    if (filteredQuotes.length === 0) return;
    currentFilterIndex = (currentFilterIndex - 1 + filteredQuotes.length) % filteredQuotes.length;
    displayFilteredQuote();
});

// Next button
nextBtn.addEventListener("click", () => {
    if (filteredQuotes.length === 0) return;
    currentFilterIndex = (currentFilterIndex + 1) % filteredQuotes.length;
    displayFilteredQuote();
});