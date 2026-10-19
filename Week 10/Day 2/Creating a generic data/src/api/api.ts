import type { Meal, MealSearchResponse } from '../types/types';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function fetchMeals(query: string, signal: AbortSignal): Promise<Meal[]> {
  const response = await fetch(
    `${API_BASE_URL}/search.php?s=${encodeURIComponent(query.trim())}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`Recipe request failed (HTTP ${response.status}).`);
  }

  const result: MealSearchResponse = await response.json();
  return result.meals ?? [];
}
