const form = document.getElementById("libform");
const storyElement = document.getElementById("story");

const storyTemplates = [
  "Rapunzel, the {adjective} princess, lived in a towering {place} and let her long {noun} flow in the wind while she dreamed of {verb}.",
  "At {place}, Rapunzel met {person}, a brave explorer who helped her escape the tower and {verb} through the kingdom.",
  "Rapunzel's {adjective} {noun} glimmered in the sunlight as she sang and waited for {person} to {verb} her way to freedom.",
  "In the enchanted {place}, Rapunzel discovered that a {adjective} dream could become real when she finally learned to {verb}."
];

let lastValues = {};

function getValues() {
  const values = {
    noun: document.getElementById("noun").value.trim(),
    adjective: document.getElementById("adjective").value.trim(),
    person: document.getElementById("person").value.trim(),
    verb: document.getElementById("verb").value.trim(),
    place: document.getElementById("place").value.trim(),
  };

  return values;
}

function buildStory(values) {
  return `Rapunzel, the ${values.adjective} princess, lived in a tall tower in ${values.place}. She kept her long ${values.noun} shining in the wind while waiting for ${values.person} to help her ${values.verb} toward freedom.`;
}

function shuffleStory(values) {
  const randomIndex = Math.floor(Math.random() * storyTemplates.length);
  const template = storyTemplates[randomIndex];

  return template
    .replace("{noun}", values.noun)
    .replace("{adjective}", values.adjective)
    .replace("{person}", values.person)
    .replace("{verb}", values.verb)
    .replace("{place}", values.place);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const values = getValues();
  const hasEmptyValue = Object.values(values).some((value) => value === "");

  if (hasEmptyValue) {
    alert("Please fill in all fields!");
    return;
  }

  lastValues = values;
  storyElement.textContent = buildStory(values);
});

document.getElementById("shuffle-button").addEventListener("click", () => {
  const values = Object.keys(lastValues).length ? lastValues : getValues();
  const hasEmptyValue = Object.values(values).some((value) => value === "");

  if (hasEmptyValue) {
    alert("Please fill in all fields before shuffling!");
    return;
  }

  storyElement.textContent = shuffleStory(values);
});
