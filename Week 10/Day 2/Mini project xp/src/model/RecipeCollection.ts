import { RecipeItem } from './RecipeItem';

const STORAGE_KEY = 'week-10-day-2-recipe-book';

export class RecipeCollection {
  private recipes: RecipeItem[];
  loadError: string | null = null;

  constructor() {
    this.recipes = this.loadRecipes();
  }

  get all(): readonly RecipeItem[] {
    return this.recipes;
  }

  add(recipe: RecipeItem): void {
    this.replaceRecipes([...this.recipes, recipe]);
  }

  remove(id: string): void {
    this.replaceRecipes(this.recipes.filter((recipe) => recipe.id !== id));
  }

  toggleFavorite(id: string): void {
    this.replaceRecipes(
      this.recipes.map((recipe) =>
        recipe.id === id
          ? new RecipeItem(
              recipe.id,
              recipe.title,
              recipe.ingredients,
              recipe.instructions,
              !recipe.isFavorite,
            )
          : recipe,
      ),
    );
  }

  clear(): void {
    this.replaceRecipes([]);
  }

  private loadRecipes(): RecipeItem[] {
    try {
      const storedRecipes = localStorage.getItem(STORAGE_KEY);
      if (!storedRecipes) {
        return [];
      }

      const parsed: unknown = JSON.parse(storedRecipes);
      if (!Array.isArray(parsed)) {
        throw new Error('Saved recipe collection must be a list.');
      }

      return parsed.map((recipe: unknown) => RecipeItem.from(recipe));
    } catch (error: unknown) {
      if (error instanceof SyntaxError) {
        this.loadError = 'Saved recipes could not be read because the stored data is malformed.';
      } else if (error instanceof Error && error.message.startsWith('Saved recipe')) {
        this.loadError = error.message;
      } else {
        this.loadError = 'Saved recipes could not be loaded from this browser.';
      }
      return [];
    }
  }

  private replaceRecipes(nextRecipes: RecipeItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextRecipes));
    } catch {
      throw new Error('Recipes could not be saved. Check browser storage settings and available space.');
    }
    this.recipes = nextRecipes;
  }
}
