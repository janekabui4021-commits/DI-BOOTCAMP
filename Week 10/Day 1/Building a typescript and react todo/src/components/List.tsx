import type { ReactNode } from 'react';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  getKey: (item: T) => string | number;
}

function List<T>({ items, renderItem, getKey }: ListProps<T>) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">✓</span>
        <p>You’re all caught up.</p>
        <span>Add a task above to get started.</span>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {items.map((item) => (
        <li className="todo-list-item" key={getKey(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

export default List;
