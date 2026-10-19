import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCategory,
  deleteCategory,
  editCategory,
} from '../features/categories/categoriesSlice.js';
import { moveTasksToUncategorized } from '../features/tasks/tasksSlice.js';
import { selectCategories, selectTasks } from '../features/selectors.js';

function CategorySelector({ selectedCategoryId, onSelect }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const tasks = useSelector(selectTasks);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingName, setEditingName] = useState('');

  const handleAddCategory = useCallback((event) => {
    event.preventDefault();
    const name = newCategoryName.trim();
    if (!name) return;

    dispatch(addCategory({
      id: crypto.randomUUID(),
      name,
      color: 'blue',
    }));
    setNewCategoryName('');
  }, [dispatch, newCategoryName]);

  const handleEditCategory = useCallback((event, categoryId) => {
    event.preventDefault();
    const name = editingName.trim();
    if (!name) return;

    dispatch(editCategory({ id: categoryId, name }));
    setEditingCategoryId(null);
    setEditingName('');
  }, [dispatch, editingName]);

  const handleDeleteCategory = useCallback((categoryId) => {
    dispatch(moveTasksToUncategorized(categoryId));
    dispatch(deleteCategory(categoryId));
    if (selectedCategoryId === categoryId) {
      onSelect('all');
    }
  }, [dispatch, onSelect, selectedCategoryId]);

  return (
    <aside className="sidebar" aria-label="Task categories">
      <a className="brand" href="#today" aria-label="Daymark home">
        <span className="brand-mark" aria-hidden="true">d</span>
        <span>daymark</span>
      </a>

      <div className="sidebar-section">
        <p className="sidebar-label">WORKSPACE</p>
        <button
          className={`nav-item ${selectedCategoryId === 'all' ? 'is-selected' : ''}`}
          type="button"
          onClick={() => onSelect('all')}
        >
          <span className="nav-icon all-icon" aria-hidden="true">◷</span>
          <span>All tasks</span>
          <span className="nav-count">{tasks.length}</span>
        </button>
      </div>

      <div className="sidebar-section category-section">
        <div className="section-heading">
          <p className="sidebar-label">CATEGORIES</p>
          <span className="category-total">{categories.length}</span>
        </div>
        <div className="category-list">
          {categories.map((category) => {
            const categoryTaskCount = tasks.filter((task) => task.categoryId === category.id).length;
            const isEditing = editingCategoryId === category.id;

            return (
              <div className="category-row" key={category.id}>
                {isEditing ? (
                  <form
                    className="category-edit-form"
                    onSubmit={(event) => handleEditCategory(event, category.id)}
                  >
                    <input
                      aria-label={`Rename ${category.name}`}
                      autoFocus
                      maxLength={32}
                      value={editingName}
                      onChange={(event) => setEditingName(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Escape') setEditingCategoryId(null);
                      }}
                    />
                    <button className="icon-button" type="submit" aria-label="Save category name">Save</button>
                  </form>
                ) : (
                  <>
                    <button
                      className={`nav-item category-nav-item ${selectedCategoryId === category.id ? 'is-selected' : ''}`}
                      type="button"
                      onClick={() => onSelect(category.id)}
                    >
                      <span className={`category-dot dot-${category.color}`} aria-hidden="true" />
                      <span className="category-name">{category.name}</span>
                      <span className="nav-count">{categoryTaskCount}</span>
                    </button>
                    <div className="category-actions">
                      <button
                        className="icon-button"
                        type="button"
                        aria-label={`Edit ${category.name}`}
                        onClick={() => {
                          setEditingCategoryId(category.id);
                          setEditingName(category.name);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="icon-button delete-category"
                        type="button"
                        aria-label={`Delete ${category.name}`}
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <form className="add-category-form" onSubmit={handleAddCategory}>
          <span aria-hidden="true">+</span>
          <input
            aria-label="New category name"
            maxLength={32}
            placeholder="Add a category"
            value={newCategoryName}
            onChange={(event) => setNewCategoryName(event.target.value)}
          />
          {newCategoryName.trim() && (
            <button className="icon-button" type="submit" aria-label="Create category">Add</button>
          )}
        </form>
      </div>

      <div className="sidebar-note">
        <span className="note-sparkle" aria-hidden="true">✳</span>
        <p>A little progress each day adds up to big results.</p>
      </div>
      <p className="sidebar-footer">MAKE SPACE FOR WHAT MATTERS</p>
    </aside>
  );
}

export default CategorySelector;
