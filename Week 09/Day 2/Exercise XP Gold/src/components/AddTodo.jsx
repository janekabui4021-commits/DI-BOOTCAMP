import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../redux/actions.js';

function AddTodo({ categoryId, categoryName, addTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanText = text.trim();
    if (!cleanText) return;

    addTodo(categoryId, cleanText);
    setText('');
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <span className="input-plus" aria-hidden="true">+</span>
      <label className="visually-hidden" htmlFor="new-todo">Add a todo</label>
      <input
        id="new-todo"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={`Add a task to ${categoryName}...`}
        maxLength={160}
        autoComplete="off"
        required
      />
      <button type="submit">Add task <span aria-hidden="true">↗</span></button>
    </form>
  );
}

const mapStateToProps = (state) => {
  const selectedCategory = state.categories.find(
    (category) => category.id === state.selectedCategoryId,
  );

  return {
    categoryId: selectedCategory.id,
    categoryName: selectedCategory.name,
  };
};

export default connect(mapStateToProps, { addTodo })(AddTodo);
