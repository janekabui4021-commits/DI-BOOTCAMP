// Exercise 1: Select a kind of Music
const musicSelect = document.getElementById("genres");

if (musicSelect) {
  console.log(musicSelect.value);

  const classicOption = document.createElement("option");
  classicOption.value = "classic";
  classicOption.textContent = "Classic";
  musicSelect.appendChild(classicOption);
  musicSelect.value = "classic";
}

// Exercise 2: Delete colors
const colorSelect = document.getElementById("colorSelect");
const removeButton = document.querySelector('input[type="button"][value="Select and Remove"]');

if (colorSelect && removeButton) {
  removeButton.addEventListener("click", removecolor);
}

function removecolor() {
  if (colorSelect.selectedIndex >= 0) {
    colorSelect.remove(colorSelect.selectedIndex);
  }
}

// Exercise 3: Create a shopping list
const root = document.getElementById("root");

if (root) {
  let shoppingList = [];

  const form = document.createElement("form");
  form.setAttribute("id", "shoppingForm");

  const input = document.createElement("input");
  input.type = "text";
  input.id = "itemInput";
  input.placeholder = "Add an item";

  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.textContent = "AddItem";

  const clearButton = document.createElement("button");
  clearButton.type = "button";
  clearButton.textContent = "ClearAll";

  form.appendChild(input);
  form.appendChild(addButton);
  form.appendChild(clearButton);
  root.appendChild(form);

  const list = document.createElement("ul");
  root.appendChild(list);

  function addItem() {
    const item = input.value.trim();
    if (!item) return;

    shoppingList.push(item);
    input.value = "";

    const listItem = document.createElement("li");
    listItem.textContent = item;
    list.appendChild(listItem);
  }

  function clearAll() {
    shoppingList = [];
    list.innerHTML = "";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    addItem();
  });

  clearButton.addEventListener("click", clearAll);
}
