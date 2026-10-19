const container = document.getElementById("container");
console.log(container);

const lists = document.querySelectorAll(".list");

// Change Pete to Richard
const secondListFirstItem = lists[0].querySelectorAll("li")[1];
if (secondListFirstItem) {
  secondListFirstItem.textContent = "Richard";
}

// Delete the second li of the second ul
const secondListItems = lists[1].querySelectorAll("li");
if (secondListItems[1]) {
  secondListItems[1].remove();
}

// Change the first li of each ul to your name
lists.forEach((list) => {
  const firstLi = list.querySelector("li");
  if (firstLi) {
    firstLi.textContent = "Your Name";
  }
});

// Add class to both ul elements
lists.forEach((list) => {
  list.classList.add("student_list");
});

// Add classes to first ul
if (lists[0]) {
  lists[0].classList.add("university", "attendance");
}

// Style the div
if (container) {
  container.style.backgroundColor = "lightblue";
  container.style.padding = "10px";
}

// Hide Dan
const danLi = Array.from(document.querySelectorAll("li")).find((li) => li.textContent.trim() === "Dan");
if (danLi) {
  danLi.style.display = "none";
}

// Border for Richard
const richardLi = Array.from(document.querySelectorAll("li")).find((li) => li.textContent.trim() === "Richard");
if (richardLi) {
  richardLi.style.border = "2px solid black";
}

// Change body font size
document.body.style.fontSize = "20px";

// Bonus
const divBackground = getComputedStyle(container).backgroundColor;
if (container && divBackground === "rgb(173, 216, 230)") {
  alert("Hello Your Name and Richard");
}
