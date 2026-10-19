import type { ReactNode } from 'react';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  getKey: (item: T) => string | number;
}

function List<T>({ items, renderItem, getKey }: ListProps<T>) {
  if (items.length === 0) {
    return <p className="empty-list">No items yet. Add the first one above.</p>;
  }

  return (
    <ul className="generic-list">
      {items.map((item) => (
        <li className="book-item" key={getKey(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

export default List;
