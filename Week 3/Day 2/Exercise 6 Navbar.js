const navBar = document.getElementById("navBar");
if (navBar) {
  navBar.setAttribute("id", "socialNetworkNavigation");
}

const list = document.querySelector("ul");
if (list) {
  const newItem = document.createElement("li");
  const newText = document.createTextNode("Logout");
  newItem.appendChild(newText);
  list.appendChild(newItem);
}

const firstItem = list ? list.firstElementChild : null;
const lastItem = list ? list.lastElementChild : null;

if (firstItem) {
  console.log(firstItem.textContent);
}

if (lastItem) {
  console.log(lastItem.textContent);
}
