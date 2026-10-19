export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string | null;
  strCategory: string | null;
}

export interface MealSearchResponse {
  meals: Meal[] | null;
}

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
