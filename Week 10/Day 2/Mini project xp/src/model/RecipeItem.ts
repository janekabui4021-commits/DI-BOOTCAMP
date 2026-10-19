export interface RecipeData {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
}

export class RecipeItem implements RecipeData {
  constructor(
    public id: string,
    public title: string,
    public ingredients: string[],
    public instructions: string,
    public isFavorite = false,
  ) {}

  static create(title: string, ingredients: string[], instructions: string): RecipeItem {
    return new RecipeItem(
      crypto.randomUUID(),
      title.trim(),
      ingredients.map((ingredient) => ingredient.trim()).filter(Boolean),
      instructions.trim(),
    );
  }

  static from(data: unknown): RecipeItem {
    if (
      typeof data !== 'object' ||
      data === null ||
      !('id' in data) ||
      !('title' in data) ||
      !('ingredients' in data) ||
      !('instructions' in data) ||
      !('isFavorite' in data) ||
      typeof data.id !== 'string' ||
      typeof data.title !== 'string' ||
      !Array.isArray(data.ingredients) ||
      !data.ingredients.every((ingredient: unknown) => typeof ingredient === 'string') ||
      typeof data.instructions !== 'string' ||
      typeof data.isFavorite !== 'boolean'
    ) {
      throw new Error('Saved recipe data is invalid.');
    }

    return new RecipeItem(
      data.id,
      data.title,
      data.ingredients,
      data.instructions,
      data.isFavorite,
    );
  }
}
