import { useEffect, useState, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import DataFetcher from './components/DataFetcher';
import { loadMeals, setQuery } from './features/dataSlice';
import type { Meal } from './types/types';

function App() {
  const dispatch = useAppDispatch();
  const { meals, status, error, query } = useAppSelector((state) => state.data);
  const [searchText, setSearchText] = useState(query);

  useEffect(() => {
    const request = dispatch(loadMeals(query));
    return () => request.abort();
  }, [dispatch, query]);

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    if (!nextQuery) {
      return;
    }
    dispatch(setQuery(nextQuery));
  }

  function retry() {
    void dispatch(loadMeals(query));
  }

  function renderMeal(meal: Meal) {
    return (
      <article className="meal-card">
        <div className="meal-image-wrap">
          <img src={meal.strMealThumb} alt="" loading="lazy" />
          <span className="meal-tag">{meal.strCategory || 'Recipe'}</span>
        </div>
        <div className="meal-content">
          <p className="meal-area">{meal.strArea || 'From the recipe collection'}</p>
          <h2>{meal.strMeal}</h2>
        </div>
      </article>
    );
  }

  return (
    <main className="page-shell">
      <div className="content">
        <header className="page-header">
          <p className="eyebrow">WEEK 10 <span>/</span> DAY 2 <span>/</span> DAILY CHALLENGE</p>
          <h1>Recipes worth <span>discovering.</span></h1>
          <p className="intro">
            Search a recipe collection powered by a generic, type-safe Redux data flow.
          </p>
        </header>

        <section className="search-panel" aria-label="Find recipes">
          <form className="search-form" onSubmit={search}>
            <label className="visually-hidden" htmlFor="recipe-search">
              Search recipes
            </label>
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              id="recipe-search"
              type="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Try “pasta” or “salmon”…"
              maxLength={80}
            />
            <button className="search-button" type="submit" disabled={!searchText.trim()}>
              Search
            </button>
          </form>
          <p className="search-hint">
            Showing {status === 'loading' ? 'recipes' : `${meals.length} recipes`} for{' '}
            <strong>{query}</strong>
          </p>
        </section>

        <section className="results-section" aria-label="Recipe search results">
          <div className="results-heading">
            <div>
              <p className="section-kicker">THE COLLECTION</p>
              <h2>On the menu</h2>
            </div>
            <span className="source-label">THEMEALDB</span>
          </div>
          <DataFetcher<Meal>
            items={meals}
            status={status}
            error={error}
            getKey={(meal) => meal.idMeal}
            renderItem={renderMeal}
            emptyMessage={`No recipes found for “${query}”. Try another ingredient or dish.`}
            onRetry={retry}
          />
        </section>

        <aside className="learning-note">
          <span className="note-icon" aria-hidden="true">&lt;/&gt;</span>
          <p>
            <strong>Type-safe by design:</strong> Redux Toolkit manages request state;{' '}
            <code>DataFetcher&lt;T&gt;</code> handles generic loading, errors, empty results,
            and item rendering.
          </p>
        </aside>

        <p className="api-note">
          Demo data uses TheMealDB’s public API. Keep Spoonacular RapidAPI keys on a server;
          never expose private API credentials in a browser app.
        </p>
      </div>
    </main>
  );
}

export default App;
