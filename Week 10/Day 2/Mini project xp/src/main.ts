import { RecipeCollection } from './model/RecipeCollection';
import { RecipeItem } from './model/RecipeItem';
import { RecipeTemplate } from './templates/RecipeTemplate';
import './style.css';

const form = document.querySelector<HTMLFormElement>('#recipeEntryForm');
const titleInput = document.querySelector<HTMLInputElement>('#recipeTitle');
const ingredientsInput = document.querySelector<HTMLTextAreaElement>('#ingredients');
const instructionsInput = document.querySelector<HTMLTextAreaElement>('#instructions');
const recipeContainer = document.querySelector<HTMLDivElement>('#recipeContainer');
const clearButton = document.querySelector<HTMLButtonElement>('#clearRecipesButton');
const formMessage = document.querySelector<HTMLParagraphElement>('#formMessage');
const storageMessage = document.querySelector<HTMLParagraphElement>('#storageMessage');

if (
  !form ||
  !titleInput ||
  !ingredientsInput ||
  !instructionsInput ||
  !recipeContainer ||
  !clearButton ||
  !formMessage ||
  !storageMessage
) {
  throw new Error('The recipe app could not start because required page elements are missing.');
}

const recipeForm = form;
const recipeTitle = titleInput;
const ingredientsField = ingredientsInput;
const instructionsField = instructionsInput;
const recipeList = recipeContainer;
const clearRecipesButton = clearButton;
const message = formMessage;
const persistentMessage = storageMessage;
const template = new RecipeTemplate(recipeList);

let collection: RecipeCollection;

function showPersistentError(error: unknown): void {
  persistentMessage.textContent =
    error instanceof Error ? error.message : 'Something went wrong while saving your recipes.';
  persistentMessage.hidden = false;
}

function renderRecipes(): void {
  template.render(collection.all);
}

collection = new RecipeCollection();
if (collection.loadError) {
  showPersistentError(new Error(collection.loadError));
}
renderRecipes();

recipeForm.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault();

  const title = recipeTitle.value.trim();
  const ingredients = ingredientsField.value
    .split(/\r?\n/)
    .map((ingredient) => ingredient.trim())
    .filter(Boolean);
  const instructions = instructionsField.value.trim();

  if (!title || ingredients.length === 0 || !instructions) {
    message.textContent = 'Please enter a title, at least one ingredient, and the instructions.';
    return;
  }

  try {
    collection.add(RecipeItem.create(title, ingredients, instructions));
    recipeForm.reset();
    message.textContent = 'Recipe saved to your collection.';
    persistentMessage.hidden = true;
    renderRecipes();
  } catch (error: unknown) {
    showPersistentError(error);
  }
});

recipeList.addEventListener('click', (event: MouseEvent) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const actionButton = target.closest<HTMLButtonElement>('button[data-action]');
  const card = target.closest<HTMLElement>('[data-recipe-id]');
  const recipeId = card?.dataset.recipeId;
  const action = actionButton?.dataset.action;

  if (!recipeId || (action !== 'favorite' && action !== 'delete')) {
    return;
  }

  try {
    if (action === 'favorite') {
      collection.toggleFavorite(recipeId);
    } else {
      collection.remove(recipeId);
    }
    persistentMessage.hidden = true;
    renderRecipes();
  } catch (error: unknown) {
    showPersistentError(error);
  }
});

clearRecipesButton.addEventListener('click', () => {
  if (collection.all.length === 0) {
    return;
  }

  if (!window.confirm('Clear every recipe from your collection? This cannot be undone.')) {
    return;
  }

  try {
    collection.clear();
    persistentMessage.hidden = true;
    renderRecipes();
  } catch (error: unknown) {
    showPersistentError(error);
  }
});
