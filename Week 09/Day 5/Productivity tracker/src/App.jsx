import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategorySelector from './components/CategorySelector.jsx';
import TaskList from './components/TaskList.jsx';
import { selectCategories, selectCompletedTasks, selectTasks } from './features/selectors.js';
import { addTask } from './features/tasks/tasksSlice.js';

function App() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const tasks = useSelector(selectTasks);
  const completedTasks = useSelector(selectCompletedTasks);
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategoryId, setTaskCategoryId] = useState(categories[0]?.id || '');
  const [dueDate, setDueDate] = useState('');
  const activeTaskCategoryId = categories.some((category) => category.id === taskCategoryId)
    ? taskCategoryId
    : categories[0]?.id || '';

  const handleSelectCategory = useCallback((categoryId) => {
    setSelectedCategoryId(categoryId);
  }, []);

  const handleAddTask = useCallback((event) => {
    event.preventDefault();
    const title = taskTitle.trim();
    if (!title || !activeTaskCategoryId) return;

    dispatch(addTask({
      id: crypto.randomUUID(),
      title,
      categoryId: activeTaskCategoryId,
      completed: false,
      dueDate,
    }));
    setTaskTitle('');
    setDueDate('');
  }, [activeTaskCategoryId, dispatch, dueDate, taskTitle]);

  const progress = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;
  const today = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  return (
    <div className="app-shell">
      <CategorySelector
        onSelect={handleSelectCategory}
        selectedCategoryId={selectedCategoryId}
      />
      <main className="main-content" id="today">
        <header className="topbar">
          <span className="topbar-date">{today}</span>
          <span className="topbar-status"><span aria-hidden="true" /> YOUR DAY, YOUR PACE</span>
        </header>

        <div className="content-wrap">
          <section className="welcome">
            <p className="eyebrow">A FRESH PAGE</p>
            <h1>Make today <span>count.</span></h1>
            <p className="welcome-copy">Small steps, steady progress. What would you like to get done?</p>
          </section>

          <section className="progress-card" aria-label="Daily progress">
            <div className="progress-copy">
              <div className="progress-heading">
                <span className="progress-icon" aria-hidden="true">✳</span>
                <div>
                  <p className="progress-label">DAILY PROGRESS</p>
                  <p className="progress-caption">
                    <strong>{completedTasks}</strong> of {tasks.length} tasks complete
                  </p>
                </div>
              </div>
              <span className="progress-percent">{progress}<small>%</small></span>
            </div>
            <div
              aria-label={`${progress}% of tasks complete`}
              aria-valuemax="100"
              aria-valuemin="0"
              aria-valuenow={progress}
              className="progress-track"
              role="progressbar"
            >
              <span className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </section>

          <form className="new-task-form" onSubmit={handleAddTask}>
            <div className="new-task-title">
              <span className="add-task-icon" aria-hidden="true">+</span>
              <input
                aria-label="Task title"
                maxLength={120}
                placeholder="Add a task to your day..."
                value={taskTitle}
                onChange={(event) => setTaskTitle(event.target.value)}
              />
            </div>
            <div className="new-task-options">
              <label className="select-wrap">
                <span className="sr-only">Task category</span>
                <select
                  aria-label="Task category"
                  value={activeTaskCategoryId}
                  onChange={(event) => setTaskCategoryId(event.target.value)}
                >
                  {categories.length === 0 && <option value="">Add a category first</option>}
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </label>
              <label className="date-wrap">
                <span aria-hidden="true">◷</span>
                <span className="sr-only">Due date</span>
                <input
                  aria-label="Due date"
                  type="date"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                />
              </label>
              <button className="add-task-button" disabled={!taskTitle.trim() || !activeTaskCategoryId} type="submit">
                Add task <span aria-hidden="true">↗</span>
              </button>
            </div>
          </form>

          <TaskList categoryId={selectedCategoryId} />
          <footer className="page-footer">
            <span>One thing at a time.</span>
            <span>{tasks.length - completedTasks} left to go</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
