import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
  };
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`Unable to load users (HTTP ${response.status}).`);
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (fetchError: unknown) {
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          return;
        }
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : 'An unexpected error occurred while loading users.',
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadUsers();

    return () => controller.abort();
  }, []);

  if (isLoading) {
    return (
      <p className="status-message" role="status">
        <span className="loading-dot" aria-hidden="true" />
        Loading users…
      </p>
    );
  }

  if (error) {
    return (
      <p className="error-message" role="alert">
        {error}
      </p>
    );
  }

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li className="api-user" key={user.id}>
          <span className="api-user-avatar" aria-hidden="true">
            {user.name.charAt(0)}
          </span>
          <div className="api-user-details">
            <h3>{user.name}</h3>
            <p>@{user.username} <span>·</span> {user.company.name}</p>
          </div>
          <a href={`mailto:${user.email}`} className="user-email">
            {user.email}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
