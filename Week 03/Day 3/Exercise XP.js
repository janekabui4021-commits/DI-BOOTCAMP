// Exercise 1: Change the article
const article = document.querySelector("article");
const h1 = document.querySelector("article h1");
console.log(h1);

if (article) {
  const paragraphs = article.querySelectorAll("p");
  if (paragraphs.length > 0) {
    paragraphs[paragraphs.length - 1].remove();
  }
}

const h2 = document.querySelector("article h2");
if (h2) {
  h2.addEventListener("click", () => {
    h2.style.backgroundColor = "red";
  });
}

const h3 = document.querySelector("article h3");
if (h3) {
  h3.addEventListener("click", () => {
    h3.style.display = "none";
  });
}

const boldButton = document.getElementById("bold-button");
if (boldButton) {
  boldButton.addEventListener("click", () => {
    const paragraphs = document.querySelectorAll("article p");
    paragraphs.forEach((p) => {
      p.style.fontWeight = "bold";
    });
  });
}

if (h1) {
  h1.addEventListener("mouseenter", () => {
    const randomSize = Math.floor(Math.random() * 101);
    h1.style.fontSize = `${randomSize}px`;
  });
}

const secondParagraph = document.querySelectorAll("article p")[1];
if (secondParagraph) {
  secondParagraph.addEventListener("mouseenter", () => {
    secondParagraph.classList.add("fade-out");
  });

  secondParagraph.addEventListener("mouseleave", () => {
    secondParagraph.classList.remove("fade-out");
  });
}

// Exercise 2: Work with forms
const form = document.getElementById("userForm");
console.log(form);

const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
console.log(fname, lname);

const firstNameByName = document.getElementsByName("firstname");
const lastNameByName = document.getElementsByName("lastname");
console.log(firstNameByName, lastNameByName);

const usersAnswer = document.querySelector(".usersAnswer");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstNameValue = fname.value.trim();
    const lastNameValue = lname.value.trim();

    if (!firstNameValue || !lastNameValue) {
      alert("Please fill in both names.");
      return;
    }

    usersAnswer.innerHTML = "";

    const firstLi = document.createElement("li");
    firstLi.textContent = firstNameValue;
    usersAnswer.appendChild(firstLi);

    const secondLi = document.createElement("li");
    secondLi.textContent = lastNameValue;
    usersAnswer.appendChild(secondLi);
  });
}

// Exercise 3: Transform the sentence
let allBoldItems = [];

function getBoldItems() {
  allBoldItems = document.querySelectorAll("#sentence strong");
}

function highlight() {
  getBoldItems();
  allBoldItems.forEach((item) => {
    item.style.color = "blue";
  });
}

function returnItemsToDefault() {
  getBoldItems();
  allBoldItems.forEach((item) => {
    item.style.color = "black";
  });
}

const sentence = document.getElementById("sentence");
if (sentence) {
  sentence.addEventListener("mouseover", highlight);
  sentence.addEventListener("mouseout", returnItemsToDefault);
}

// Exercise 4: Volume of a sphere
const sphereForm = document.getElementById("MyForm");
const radiusInput = document.getElementById("radius");
const volumeInput = document.getElementById("volume");

if (sphereForm) {
  sphereForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const radius = Number(radiusInput.value);
    if (!radius || radius < 0) {
      alert("Please enter a valid radius.");
      return;
    }

    const volume = (4 / 3) * Math.PI * radius ** 3;
    volumeInput.value = volume.toFixed(2);
  });
}
