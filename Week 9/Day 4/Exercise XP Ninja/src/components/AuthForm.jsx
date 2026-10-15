import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authThunks.js';
import { logout } from '../features/auth/authSlice.js';

function AuthForm() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(loginUser());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <section className="panel auth-panel">
      <h2>Authentication</h2>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please log in to continue shopping.</p>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </section>
  );
}

export default AuthForm;
