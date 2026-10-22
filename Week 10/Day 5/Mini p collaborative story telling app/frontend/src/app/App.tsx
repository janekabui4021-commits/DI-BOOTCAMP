import { useEffect, useMemo, useState, type FormEvent } from 'react';
import type { AuthResponse, Contributor, Story } from '@fable/types';
import { apiRequest, ApiRequestError, authRequestContext, refreshSession, startSession } from './api';
import { LiveStoryTextArea } from './LiveStoryTextArea';
import { useAppDispatch, useAppSelector } from './hooks';
import { clearSession, finishSessionCheck, setSession } from '../features/auth/authSlice';
import {
  storiesFailed,
  storiesLoaded,
  storiesLoading,
  storyCommentAdded,
  storyCommentRemoved,
  storyCommentUpdated,
  storyContributorsUpdated,
  storyContentSynced,
  storyRemoved,
  storyUpserted,
} from '../features/stories/storiesSlice';

type AuthMode = 'signup' | 'login';
type Theme = 'light' | 'dark';

function initials(name: string): string {
  return name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

export default function App() {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    let active = true;
    void refreshSession().then((session) => {
      if (!active) return;
      if (session) dispatch(setSession(session));
      else dispatch(finishSessionCheck());
    });
    return () => { active = false; };
  }, [dispatch]);

  if (authStatus === 'checking') {
    return <main className="loading-screen"><span className="brand-mark">f</span><p>Opening your writing room…</p></main>;
  }
  if (authStatus === 'anonymous') {
    return <AuthPage onAuthenticated={(session) => dispatch(setSession(session))} />;
  }
  return <Workspace onSignOut={() => dispatch(clearSession())} />;
}

function AuthPage({ onAuthenticated }: { onAuthenticated: (session: AuthResponse) => void }) {
  const [mode, setMode] = useState<AuthMode>('signup');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const session = await startSession(mode === 'signup' ? 'register' : 'login', {
        ...(mode === 'signup' ? { username: username.trim() } : {}),
        email: email.trim(),
        password,
      });
      onAuthenticated(session);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to sign in right now.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-story-panel">
        <a className="auth-brand" href="#" aria-label="Fable home"><span className="brand-mark">f</span><span>fable<span className="brand-period">.</span></span></a>
        <div className="auth-story-copy">
          <p className="auth-kicker"><span /> A HOME FOR YOUR IMAGINATION</p>
          <h1>Every story starts <em>somewhere.</em></h1>
          <p>Find your people, trade ideas, and make something neither of you could have written alone.</p>
        </div>
        <div className="auth-artwork" aria-hidden="true">
          <div className="auth-art-orbit orbit-one" /><div className="auth-art-orbit orbit-two" />
          <div className="auth-art-sun" /><div className="auth-art-book book-back"><span /><span /><span /></div>
          <div className="auth-art-book book-front"><span /><span /><span /><span /></div>
          <span className="auth-art-star star-one">✳</span><span className="auth-art-star star-two">✦</span>
        </div>
        <div className="auth-quote"><span className="quote-mark">“</span><p>The best stories leave room for another voice.</p><span className="quote-credit">A NOTE FROM THE WRITING ROOM</span></div>
        <div className="auth-panel-footer"><span>Write a little. Wonder a lot.</span><span>01 — 03</span></div>
      </section>
      <section className="auth-form-panel">
        <div className="auth-mobile-brand"><span className="brand-mark">f</span><span>fable<span className="brand-period">.</span></span></div>
        <div className="auth-form-wrap">
          <div className="auth-heading">
            <p className="eyebrow">{mode === 'signup' ? 'YOUR NEXT CHAPTER' : 'WELCOME BACK'}</p>
            <h2>{mode === 'signup' ? 'Create your account' : 'Good to see you again.'}</h2>
            <p>{mode === 'signup' ? 'Join a writing circle and start a story together.' : 'Pick up where your stories left off.'}</p>
          </div>
          <div className="auth-mode-switch" role="tablist" aria-label="Account access">
            <button aria-selected={mode === 'signup'} className={mode === 'signup' ? 'selected' : ''} onClick={() => { setMode('signup'); setError(''); }} role="tab" type="button">Sign up</button>
            <button aria-selected={mode === 'login'} className={mode === 'login' ? 'selected' : ''} onClick={() => { setMode('login'); setError(''); }} role="tab" type="button">Log in</button>
          </div>
          <form className="auth-form" onSubmit={submit}>
            {mode === 'signup' && <label className="auth-field"><span>Your name</span><input autoComplete="name" maxLength={50} onChange={(event) => setUsername(event.target.value)} placeholder="How should we call you?" required value={username} /></label>}
            <label className="auth-field"><span>Email address</span><input autoComplete="email" onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required type="email" value={email} /></label>
            <label className="auth-field"><span>Password</span><span className="password-input-wrap"><input autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} minLength={8} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" required type={showPassword ? 'text' : 'password'} value={password} /><button aria-label={showPassword ? 'Hide password' : 'Show password'} className="password-visibility" onClick={() => setShowPassword(!showPassword)} type="button">{showPassword ? 'Hide' : 'Show'}</button></span></label>
            {error && <p className="auth-error" role="alert">{error}</p>}
            <button className="auth-submit" disabled={submitting} type="submit">{submitting ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Log in'} <span aria-hidden="true">↗</span></button>
          </form>
          <div className="auth-divider"><span /><span>SECURE ACCOUNT ACCESS</span><span /></div>
          <p className="auth-demo-note">Passwords are protected with bcrypt. Access tokens stay in memory; refresh tokens use a secure HTTP-only cookie.</p>
          <p className="auth-terms">By continuing, you agree to use Fable thoughtfully and treat fellow writers with care.</p>
        </div>
        <footer className="auth-footer"><span>© 2026 Fable Writing Co.</span><span>Made for stories still becoming.</span></footer>
      </section>
    </main>
  );
}

function Workspace({ onSignOut }: { onSignOut: () => void }) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.auth.user);
  const stories = useAppSelector((state) => state.stories.items);
  const storyStatus = useAppSelector((state) => state.stories.status);
  const storyError = useAppSelector((state) => state.stories.error);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'mine'>('all');
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return localStorage.getItem('fable-theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [liveConflict, setLiveConflict] = useState(false);
  const [toast, setToast] = useState('');
  const [busy, setBusy] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentText, setEditingCommentText] = useState('');

  const onSessionRefresh = (session: AuthResponse) => dispatch(setSession(session));
  const onSessionExpired = () => {
    dispatch(clearSession());
    dispatch(storiesLoaded([]));
  };
  const context = token
    ? authRequestContext(token, onSessionRefresh, onSessionExpired)
    : {};

  useEffect(() => {
    if (!token) return;
    dispatch(storiesLoading());
    void apiRequest<Story[]>('/stories', {}, authRequestContext(
      token,
      (session) => dispatch(setSession(session)),
      () => { dispatch(clearSession()); dispatch(storiesLoaded([])); },
    )).then((items) => {
      dispatch(storiesLoaded(items));
      setSelectedId((current) => current ?? items[0]?.id ?? null);
    }).catch((error: unknown) => {
      if (error instanceof ApiRequestError && error.status === 401) return;
      dispatch(storiesFailed(error instanceof Error ? error.message : 'Could not load your stories.'));
    });
  }, [dispatch, token]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('fable-theme', theme);
    } catch (error) {
      console.error('Could not save the theme preference.', error);
    }
  }, [theme]);

  const selectedStory = stories.find((story) => story.id === selectedId) ?? null;
  const visibleStories = useMemo(() => stories.filter((story) => {
    const mine = filter === 'all' || story.author.id === user?.id;
    const text = `${story.title} ${story.content} ${story.author.username}`.toLowerCase();
    return mine && text.includes(query.trim().toLowerCase());
  }), [filter, query, stories, user?.id]);
  const isAuthor = Boolean(selectedStory && user && selectedStory.author.id === user.id);
  const canEdit = Boolean(selectedStory && user && (selectedStory.author.id === user.id || selectedStory.contributors.some((person) => person.id === user.id)));

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2800);
  }

  async function saveStory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || liveConflict) return;
    const form = new FormData(event.currentTarget);
    const title = String(form.get('title') ?? '').trim();
    const content = String(form.get('content') ?? '').trim();
    if (!title || !content) return;
    setBusy(true);
    try {
      const story = await apiRequest<Story>(
        editingStory ? `/stories/${editingStory.id}` : '/stories',
        { method: editingStory ? 'PATCH' : 'POST', body: JSON.stringify({ title, content }) },
        context,
      );
      dispatch(storyUpserted(story));
      setSelectedId(story.id);
      setEditorOpen(false);
      setEditingStory(null);
      notify(editingStory ? 'Story saved.' : 'Your story has started.');
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Could not save the story.');
    } finally {
      setBusy(false);
    }
  }

  async function removeStory(story: Story) {
    if (!window.confirm(`Delete “${story.title}”? This cannot be undone.`)) return;
    try {
      await apiRequest<void>(`/stories/${story.id}`, { method: 'DELETE' }, context);
      dispatch(storyRemoved(story.id));
      setSelectedId(stories.find((item) => item.id !== story.id)?.id ?? null);
      notify('Story deleted.');
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Could not delete the story.');
    }
  }

  async function inviteContributor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedStory || !token) return;
    const form = new FormData(event.currentTarget);
    const userId = Number(form.get('userId'));
    if (!Number.isSafeInteger(userId) || userId < 1) {
      notify('Enter a valid account ID.');
      return;
    }
    try {
      await apiRequest<Contributor>('/contributors', {
        method: 'POST',
        body: JSON.stringify({ story_id: selectedStory.id, user_id: userId }),
      }, context);
      const contributors = await apiRequest<Contributor[]>(
        `/contributors/${selectedStory.id}`,
        {},
        context,
      );
      dispatch(storyContributorsUpdated({ storyId: selectedStory.id, contributors }));
      event.currentTarget.reset();
      notify('Contributor added to the story.');
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Could not add that contributor.');
    }
  }

  async function removeContributor(contributorId: number) {
    if (!selectedStory) return;
    try {
      await apiRequest<void>(`/contributors/${contributorId}`, { method: 'DELETE' }, context);
      const contributors = await apiRequest<Contributor[]>(`/contributors/${selectedStory.id}`, {}, context);
      dispatch(storyContributorsUpdated({ storyId: selectedStory.id, contributors }));
      notify('Contributor removed.');
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Could not remove that contributor.');
    }
  }

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedStory || !commentText.trim()) return;
    try {
      const comment = await apiRequest<Story['comments'][number]>(
        `/stories/${selectedStory.id}/comments`,
        { method: 'POST', body: JSON.stringify({ content: commentText.trim() }) },
        context,
      );
      dispatch(storyCommentAdded({ storyId: selectedStory.id, comment }));
      setCommentText('');
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Could not post your comment.');
    }
  }

  async function saveComment(commentId: number) {
    if (!selectedStory || !editingCommentText.trim()) return;
    try {
      const comment = await apiRequest<Story['comments'][number]>(
        `/comments/${commentId}`,
        { method: 'PATCH', body: JSON.stringify({ content: editingCommentText.trim() }) },
        context,
      );
      dispatch(storyCommentUpdated({ storyId: selectedStory.id, comment }));
      setEditingCommentId(null);
      setEditingCommentText('');
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Could not update that comment.');
    }
  }

  async function removeComment(commentId: number) {
    if (!selectedStory) return;
    try {
      await apiRequest<void>(`/comments/${commentId}`, { method: 'DELETE' }, context);
      dispatch(storyCommentRemoved({ storyId: selectedStory.id, commentId }));
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Could not delete that comment.');
    }
  }

  async function signOut() {
    try {
      await apiRequest<void>('/auth/logout', { method: 'POST' });
    } catch {
      notify('Signed out locally. The server could not confirm the session ended.');
    } finally {
      onSignOut();
    }
  }

  return (
    <main className="workspace-shell">
      <aside className="workspace-sidebar">
        <a className="workspace-brand" href="#" aria-label="Fable home"><span className="brand-mark">f</span><span>fable<span>.</span></span></a>
        <button className="create-story-button" onClick={() => { setEditingStory(null); setEditorOpen(true); }} type="button"><span>＋</span> New story</button>
        <p className="workspace-nav-label">YOUR WRITING ROOM</p>
        <button className={`workspace-nav-link ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')} type="button"><span>▤</span> All stories <b>{stories.length}</b></button>
        <button className={`workspace-nav-link ${filter === 'mine' ? 'active' : ''}`} onClick={() => setFilter('mine')} type="button"><span>✎</span> My stories</button>
        <div className="workspace-sidebar-bottom">
          <div className="sidebar-writing-note"><span>✳</span><strong>Good stories make room for another voice.</strong><small>Invite a contributor from any story.</small></div>
          <div className="workspace-user"><span className="user-avatar">{initials(user?.username ?? 'Writer')}</span><span><strong>{user?.username}</strong><small>ID: {user?.id} · {user?.email}</small></span><button aria-label="Sign out" onClick={() => void signOut()} type="button">↗</button></div>
        </div>
      </aside>
      <section className="workspace-main">
        <header className="workspace-topbar">
          <div className="workspace-breadcrumb"><span>Fable</span><span>/</span><strong>Stories</strong></div>
          <div className="workspace-top-actions">
            <label className="workspace-search"><span>⌕</span><input aria-label="Search stories" onChange={(event) => setQuery(event.target.value)} placeholder="Find a story..." value={query} /></label>
            <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} type="button" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? '☾' : '☼'}</button>
            <span className="top-user-avatar">{initials(user?.username ?? 'Writer')}</span>
          </div>
        </header>
        <div className="workspace-content">
          <section className="workspace-welcome"><div><p className="workspace-eyebrow">YOUR WRITING DESK</p><h1>Stories grow <em>here.</em></h1><p>Make something wonderful, one voice at a time.</p></div><div className="workspace-illustration" aria-hidden="true"><span>✳</span><i /></div></section>
          <div className="workspace-section-heading"><div><p className="workspace-eyebrow">THE COLLECTION</p><h2>{filter === 'mine' ? 'Stories you started' : 'Stories in your circle'}</h2></div><span>{visibleStories.length} {visibleStories.length === 1 ? 'story' : 'stories'}</span></div>
          {storyError && <p className="workspace-error" role="alert">{storyError}</p>}
          {storyStatus === 'loading' ? <div className="workspace-empty">Gathering your stories…</div> : (
            <div className="workspace-grid">
              <section className="story-collection" aria-label="Your stories">
                {visibleStories.map((story, index) => (
                  <button className={`story-card ${selectedId === story.id ? 'selected' : ''}`} key={story.id} onClick={() => setSelectedId(story.id)} type="button">
                    <span className={`story-card-art art-${index % 4}`}><i>{['✳', '◌', '☼', '⌁'][index % 4]}</i></span>
                    <span className="story-card-body"><span className="story-card-title">{story.title}</span><span className="story-card-excerpt">{story.content || 'This story is ready for its first sentence.'}</span><span className="story-card-footer"><span className="story-author-avatar">{initials(story.author.username)}</span><span>{story.author.username}</span><span>·</span><span>{formatDate(story.updatedAt)}</span></span></span>
                    <span className="story-card-arrow">↗</span>
                  </button>
                ))}
                {visibleStories.length === 0 && <div className="workspace-empty">{query ? 'No stories match that search.' : 'No stories yet. Start with a first sentence.'}</div>}
              </section>
              <section className="story-detail-panel">
                {selectedStory ? (
                  <>
                    <div className="detail-overline"><span>STORY IN FOCUS</span><span>{canEdit ? '✦ Contributor' : 'Read only'}</span></div>
                    <h2>{selectedStory.title}</h2>
                    <div className="detail-byline"><span className="story-author-avatar">{initials(selectedStory.author.username)}</span><span><strong>{selectedStory.author.username}</strong><small>Updated {formatDate(selectedStory.updatedAt)}</small></span></div>
                    <div className="detail-story-content">{selectedStory.content ? selectedStory.content.split(/\n{2,}/).map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p className="detail-empty">A blank page. Every good story starts somewhere.</p>}</div>
                    <div className="detail-actions">
                      {canEdit && <button className="detail-primary-action" onClick={() => { setEditingStory(selectedStory); setEditorOpen(true); }} type="button">Continue writing <span>↗</span></button>}
                      {isAuthor && <button className="detail-danger-action" onClick={() => void removeStory(selectedStory)} type="button">Delete story</button>}
                    </div>
                    <section className="story-comments">
                      <div className="contributors-heading"><div><p className="workspace-eyebrow">A FEW THOUGHTS</p><h3>Conversation <span>{selectedStory.comments.length}</span></h3></div></div>
                      {canEdit && <form className="story-comment-form" onSubmit={(event) => void submitComment(event)}><textarea aria-label="Write a comment" maxLength={2000} onChange={(event) => setCommentText(event.target.value)} placeholder="Share a thought with your writing circle..." required rows={2} value={commentText} /><button type="submit">Post comment <span>↑</span></button></form>}
                      <div className="story-comment-list">
                        {selectedStory.comments.map((comment) => (
                          <article className="story-comment" key={comment.id}>
                            <span className="story-author-avatar contributor-avatar">{initials(comment.author.username)}</span>
                            <div className="story-comment-copy">
                              <div className="story-comment-byline"><strong>{comment.author.username}</strong><time dateTime={comment.createdAt}>{formatDate(comment.createdAt)}</time></div>
                              {editingCommentId === comment.id ? <textarea aria-label="Edit comment" maxLength={2000} onChange={(event) => setEditingCommentText(event.target.value)} value={editingCommentText} /> : <p>{comment.content}</p>}
                              {editingCommentId === comment.id ? <div className="story-comment-actions"><button onClick={() => { setEditingCommentId(null); setEditingCommentText(''); }} type="button">Cancel</button><button onClick={() => void saveComment(comment.id)} type="button">Save</button></div> : (comment.author.id === user?.id || isAuthor) && <div className="story-comment-actions">{comment.author.id === user?.id && <button onClick={() => { setEditingCommentId(comment.id); setEditingCommentText(comment.content); }} type="button">Edit</button>}<button onClick={() => void removeComment(comment.id)} type="button">Delete</button></div>}
                            </div>
                          </article>
                        ))}
                        {selectedStory.comments.length === 0 && <p className="comments-empty">No thoughts yet. Start the conversation.</p>}
                      </div>
                    </section>
                    <div className="contributors-section">
                      <div className="contributors-heading"><div><p className="workspace-eyebrow">MADE TOGETHER</p><h3>Contributors <span>{selectedStory.contributors.length}</span></h3></div><div className="contributor-avatars">{selectedStory.contributors.slice(0, 4).map((person) => <span className="story-author-avatar" key={person.id} title={person.username}>{initials(person.username)}</span>)}</div></div>
                      <div className="contributor-list"><div className="contributor-row"><span className="story-author-avatar">{initials(selectedStory.author.username)}</span><span><strong>{selectedStory.author.username}</strong><small>Author</small></span></div>{selectedStory.contributors.map((person) => <div className="contributor-row" key={person.id}><span className="story-author-avatar contributor-avatar">{initials(person.username)}</span><span><strong>{person.username}</strong><small>Contributor</small></span>{isAuthor && <button aria-label={`Remove ${person.username}`} onClick={() => void removeContributor(person.contributorId)} type="button">×</button>}</div>)}</div>
                      {isAuthor && <form className="invite-form" onSubmit={(event) => void inviteContributor(event)}><label htmlFor="contributor-user-id">Invite by account ID</label><div><input id="contributor-user-id" inputMode="numeric" name="userId" placeholder="Enter a writer’s user ID" required type="number" /><button type="submit">Add writer</button></div><small>Ask your collaborator to share the numeric ID shown in their profile.</small></form>}
                    </div>
                  </>
                ) : <div className="workspace-empty detail-placeholder">Choose a story to read, or create a new one.</div>}
              </section>
            </div>
          )}
          <footer className="workspace-footer"><span>Keep writing. Keep listening.</span><span>Fable · Collaborative Storytelling</span></footer>
        </div>
      </section>
      {editorOpen && (
        <div className="editor-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setEditorOpen(false); }}>
          <section aria-labelledby="story-editor-heading" aria-modal="true" className="story-editor-dialog" role="dialog">
            <button aria-label="Close editor" className="editor-close" onClick={() => setEditorOpen(false)} type="button">×</button>
            <p className="workspace-eyebrow">{editingStory ? 'KEEP THE STORY MOVING' : 'A NEW BEGINNING'}</p>
            <h2 id="story-editor-heading">{editingStory ? 'Continue your story' : 'Start with a title.'}</h2>
            <form className="story-editor-form" onSubmit={(event) => void saveStory(event)}>
              <label>Story title<input defaultValue={editingStory?.title ?? ''} maxLength={255} name="title" placeholder="Give your story a name..." required /></label>
              <div className="story-editor-content-field"><label htmlFor="story-content">Your story</label><LiveStoryTextArea
                currentUserId={user?.id}
                initialContent={editingStory?.content ?? ''}
                inputId="story-content"
                onConflictChange={setLiveConflict}
                onSavedContent={(content, updatedAt) => {
                  if (editingStory) dispatch(storyContentSynced({ storyId: editingStory.id, content, updatedAt }));
                }}
                storyId={editingStory?.id ?? null}
                token={token}
              /></div>
              <div className="editor-form-footer"><span>{liveConflict ? 'Resolve the live edit conflict before saving.' : 'Your story is saved to your writing room.'}</span><button className="detail-primary-action" disabled={busy || liveConflict} type="submit">{busy ? 'Saving…' : liveConflict ? 'Resolve edits' : 'Save story'} <span>↗</span></button></div>
            </form>
          </section>
        </div>
      )}
      {toast && <div className="workspace-toast" role="status">{toast}</div>}
    </main>
  );
}
