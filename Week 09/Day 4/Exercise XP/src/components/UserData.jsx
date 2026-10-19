import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../features/user/userThunk.js';

function UserData() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.user);
  const [userId, setUserId] = useState('1');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUser(1));
    }
  }, [dispatch, status]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const parsedId = Number(userId);
    if (!Number.isInteger(parsedId) || parsedId < 1 || parsedId > 10) return;
    dispatch(fetchUser(parsedId));
  }, [dispatch, userId]);

  const isLoading = status === 'loading';

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#profile" aria-label="People and Places home">
          <span className="brand-mark" aria-hidden="true">p.</span>
          <span>people & places</span>
        </a>
        <span className="topbar-note"><span aria-hidden="true" /> A LITTLE WINDOW INTO SOMEONE’S WORLD</span>
      </header>

      <div className="content" id="profile">
        <section className="intro">
          <p className="eyebrow">A FRIENDLY FACE IN THE CROWD</p>
          <h1>Meet someone <em>new.</em></h1>
          <p className="intro-copy">A small Redux Thunk demo. Choose a profile and let the data come to you.</p>
        </section>

        <section className="profile-panel" aria-labelledby="profile-heading">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">USER DIRECTORY</p>
              <h2 id="profile-heading">Find a profile</h2>
            </div>
            <span className="directory-icon" aria-hidden="true">⌕</span>
          </div>

          <form className="search-form" onSubmit={handleSubmit}>
            <label htmlFor="user-id">User ID</label>
            <div className="input-row">
              <input
                id="user-id"
                inputMode="numeric"
                max="10"
                min="1"
                type="number"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
              />
              <span className="id-hint">Pick a number from 1 to 10</span>
              <button disabled={isLoading || !userId} type="submit">
                {isLoading ? 'Finding...' : 'Find person'}
                {!isLoading && <span aria-hidden="true">↗</span>}
              </button>
            </div>
          </form>

          {isLoading ? (
            <div className="loading-state" role="status">
              <span className="spinner" aria-hidden="true" />
              <div>
                <strong>Finding your person...</strong>
                <p>Just a moment while we fetch their details.</p>
              </div>
            </div>
          ) : error ? (
            <div className="error-state" role="alert">
              <span className="error-icon" aria-hidden="true">!</span>
              <div>
                <strong>We couldn’t find that profile.</strong>
                <p>{error}</p>
                <button className="retry-button" type="button" onClick={handleSubmit}>
                  Try again <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          ) : data ? (
            <article className="user-card">
              <div className="user-banner">
                <span className="banner-sun" aria-hidden="true">✳</span>
                <span className="user-id-badge">PROFILE NO. {String(data.id).padStart(2, '0')}</span>
              </div>
              <div className="user-card-body">
                <div className="avatar" aria-hidden="true">{data.name.charAt(0)}</div>
                <div className="user-heading">
                  <p className="user-label">A PERSON YOU SHOULD KNOW</p>
                  <h3>{data.name}</h3>
                  <p className="username">@{data.username}</p>
                </div>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-icon" aria-hidden="true">✉</span>
                    <div><span className="detail-label">EMAIL</span><a href={`mailto:${data.email}`}>{data.email}</a></div>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon" aria-hidden="true">⌕</span>
                    <div><span className="detail-label">PHONE</span><a href={`tel:${data.phone}`}>{data.phone}</a></div>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon" aria-hidden="true">⌂</span>
                    <div>
                      <span className="detail-label">BASED IN</span>
                      <span>{data.address.city}, {data.address.street}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon" aria-hidden="true">◎</span>
                    <div><span className="detail-label">WORKS AT</span><span>{data.company.name}</span></div>
                  </div>
                  <div className="detail-item website-item">
                    <span className="detail-icon" aria-hidden="true">↗</span>
                    <div>
                      <span className="detail-label">ON THE WEB</span>
                      <a href={`https://${data.website}`} target="_blank" rel="noreferrer">{data.website}</a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ) : (
            <div className="loading-state">
              <span className="spinner" aria-hidden="true" />
              <div><strong>Getting things ready...</strong></div>
            </div>
          )}
        </section>

        <footer className="page-footer">
          <span>Curiosity looks good on you.</span>
          <span>POWERED BY A LITTLE ASYNC MAGIC</span>
        </footer>
      </div>
    </main>
  );
}

export default UserData;
