import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addCategory, selectCategory } from '../redux/actions.js';

function CategoryList({ categories, selectedCategoryId, addCategory, selectCategory }) {
  const [isAdding, setIsAdding] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = categoryName.trim();
    if (!name) return;

    const alreadyExists = categories.some(
      (category) => category.name.toLowerCase() === name.toLowerCase(),
    );
    if (alreadyExists) return;

    addCategory(name);
    setCategoryName('');
    setIsAdding(false);
  };

  return (
    <section className="categories-section" aria-label="Todo categories">
      <div className="section-heading">
        <div>
          <h2>Your categories</h2>
          <p>Pick a list to focus on</p>
        </div>
        <button
          className="add-category-button"
          type="button"
          onClick={() => setIsAdding((current) => !current)}
        >
          <span aria-hidden="true">+</span> New category
        </button>
      </div>

      {isAdding && (
        <form className="category-form" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="category-name">Category name</label>
          <input
            id="category-name"
            type="text"
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
            placeholder="e.g. Home projects"
            maxLength={32}
            autoComplete="off"
            required
          />
          <button className="create-category-button" type="submit">Create</button>
          <button
            className="cancel-category-button"
            type="button"
            onClick={() => {
              setIsAdding(false);
              setCategoryName('');
            }}
          >
            Cancel
          </button>
          {categoryName.trim() && categories.some(
            (category) => category.name.toLowerCase() === categoryName.trim().toLowerCase(),
          ) && <span className="form-error" role="alert">That category already exists.</span>}
        </form>
      )}

      <div className="category-grid">
        {categories.map((category) => {
          const isSelected = category.id === selectedCategoryId;
          const completedCount = category.todos.filter((todo) => todo.completed).length;
          return (
            <button
              className={`category-card${isSelected ? ' is-selected' : ''}`}
              type="button"
              key={category.id}
              onClick={() => selectCategory(category.id)}
              aria-pressed={isSelected}
            >
              <span className={`category-icon icon-${category.id}`} aria-hidden="true">
                {category.icon}
              </span>
              <span className="category-info">
                <span className="category-name">{category.name}</span>
                <span className="category-progress">
                  {completedCount}/{category.todos.length} done
                </span>
              </span>
              <span className="category-arrow" aria-hidden="true">›</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  selectedCategoryId: state.selectedCategoryId,
});

export default connect(mapStateToProps, { addCategory, selectCategory })(CategoryList);
