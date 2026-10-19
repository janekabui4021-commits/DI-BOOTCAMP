import type { RecipeItem } from '../model/RecipeItem';

export class RecipeTemplate {
  constructor(private readonly container: HTMLElement) {}

  render(recipes: readonly RecipeItem[]): void {
    const fragment = document.createDocumentFragment();

    if (recipes.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'empty-state';

      const icon = document.createElement('span');
      icon.className = 'empty-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '✳';

      const heading = document.createElement('h3');
      heading.textContent = 'Your recipe book is ready';

      const description = document.createElement('p');
      description.textContent = 'Add a recipe above and it will be saved here for next time.';

      emptyState.append(icon, heading, description);
      fragment.append(emptyState);
    } else {
      for (const recipe of recipes) {
        fragment.append(this.createRecipeCard(recipe));
      }
    }

    this.container.replaceChildren(fragment);
  }

  private createRecipeCard(recipe: RecipeItem): HTMLElement {
    const card = document.createElement('article');
    card.className = 'recipe-card';
    card.dataset.recipeId = recipe.id;

    const cardTop = document.createElement('div');
    cardTop.className = 'recipe-card-top';

    const emblem = document.createElement('span');
    emblem.className = 'recipe-emblem';
    emblem.setAttribute('aria-hidden', 'true');
    emblem.textContent = '✳';

    const actions = document.createElement('div');
    actions.className = 'recipe-actions';

    const favoriteButton = document.createElement('button');
    favoriteButton.className = `icon-button favorite-button${recipe.isFavorite ? ' is-favorite' : ''}`;
    favoriteButton.type = 'button';
    favoriteButton.dataset.action = 'favorite';
    favoriteButton.setAttribute(
      'aria-label',
      recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites',
    );
    favoriteButton.setAttribute('aria-pressed', String(recipe.isFavorite));
    favoriteButton.textContent = recipe.isFavorite ? '♥' : '♡';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'icon-button delete-button';
    deleteButton.type = 'button';
    deleteButton.dataset.action = 'delete';
    deleteButton.setAttribute('aria-label', `Delete ${recipe.title}`);
    deleteButton.textContent = '×';

    actions.append(favoriteButton, deleteButton);
    cardTop.append(emblem, actions);

    const title = document.createElement('h3');
    title.className = 'recipe-title';
    title.textContent = recipe.title;

    const ingredientSummary = document.createElement('p');
    ingredientSummary.className = 'ingredient-summary';
    ingredientSummary.textContent = `${recipe.ingredients.length} ${
      recipe.ingredients.length === 1 ? 'ingredient' : 'ingredients'
    }`;

    const details = document.createElement('details');
    details.className = 'recipe-details';

    const summary = document.createElement('summary');
    summary.textContent = 'View recipe';

    const ingredientHeading = document.createElement('h4');
    ingredientHeading.textContent = 'Ingredients';

    const ingredientList = document.createElement('ul');
    ingredientList.className = 'ingredient-list';
    for (const ingredient of recipe.ingredients) {
      const item = document.createElement('li');
      item.textContent = ingredient;
      ingredientList.append(item);
    }

    const instructionHeading = document.createElement('h4');
    instructionHeading.textContent = 'Instructions';

    const instructions = document.createElement('p');
    instructions.className = 'recipe-instructions';
    instructions.textContent = recipe.instructions;

    details.append(summary, ingredientHeading, ingredientList, instructionHeading, instructions);
    card.append(cardTop, title, ingredientSummary, details);
    return card;
  }
}
