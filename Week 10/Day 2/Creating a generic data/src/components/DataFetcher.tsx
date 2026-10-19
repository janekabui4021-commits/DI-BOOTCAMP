import type { ReactNode } from 'react';
import type { RequestStatus } from '../types/types';

interface DataFetcherProps<T> {
  items: readonly T[];
  status: RequestStatus;
  error: string | null;
  renderItem: (item: T) => ReactNode;
  getKey: (item: T) => string | number;
  emptyMessage: string;
  onRetry: () => void;
}

function DataFetcher<T>({
  items,
  status,
  error,
  renderItem,
  getKey,
  emptyMessage,
  onRetry,
}: DataFetcherProps<T>) {
  if (status === 'loading' && items.length === 0) {
    return (
      <div className="message-panel" role="status">
        <span className="spinner" aria-hidden="true" />
        <span>Finding something delicious…</span>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="message-panel error-panel" role="alert">
        <span>{error ?? 'Something went wrong while fetching data.'}</span>
        <button className="retry-button" type="button" onClick={onRetry}>
          Try again
        </button>
      </div>
    );
  }

  if (status === 'succeeded' && items.length === 0) {
    return <div className="message-panel">{emptyMessage}</div>;
  }

  return (
    <>
      {status === 'loading' && (
        <p className="refresh-message" role="status">
          Updating results…
        </p>
      )}
      <ul className="data-grid">
        {items.map((item) => (
          <li className="data-grid-item" key={getKey(item)}>
            {renderItem(item)}
          </li>
        ))}
      </ul>
    </>
  );
}

export default DataFetcher;
