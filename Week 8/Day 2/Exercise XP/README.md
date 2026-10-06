# Week 8 - Day 1 - Exercise XP

## What we will learn

- React Lifecycle
- Event Handlers
- Error Boundary

> NOTE: You will use the same React App for all the Exercises XP.

---

## Exercise 1: React Error Boundary Simulation

### Review

Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.
We will catch JavaScript errors anywhere in child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.

### Instructions

1. In the `App.js` file create a class component named `BuggyCounter`.
2. This component:
   - holds a `counter` property in the state. The counter starts at 0.
   - renders the counter value.
   - every click calls `handleClick()` and adds +1.
3. If the counter reaches 5, it throws an error: `I crashed!`.
4. In another JavaScript file, create the `ErrorBoundary` class component.
   - it holds an `error` property in the state set to `null`.
   - use `componentDidCatch` to catch the error.
   - render a message and stack details.

```jsx
<details style={{ whiteSpace: 'pre-wrap' }}>
  {this.state.error && this.state.error.toString()}
  <br />
  {this.state.errorInfo.componentStack}
</details>
```

### Simulation 1

Wrap two `BuggyCounter` components in the same `ErrorBoundary`.

### Simulation 2

Use two `BuggyCounter` components, each wrapped in its own `ErrorBoundary`.

### Simulation 3

Use one `BuggyCounter` without an `ErrorBoundary` so the app crashes.

---

## Exercise 2: Lifecycle

### Review

Each component in React has a lifecycle with three main phases:

- Mounting
- Updating
- Unmounting

This exercise focuses on the Updating phase.

React calls these built-in methods in order when a component updates:

1. `getDerivedStateFromProps()`
2. `shouldComponentUpdate()`
3. `render()`
4. `getSnapshotBeforeUpdate()`
5. `componentDidUpdate()`

### Part I: shouldComponentUpdate

Use `shouldComponentUpdate()` and return `true`.

### Part II: componentDidUpdate

- the component first renders with `favoriteColor` as `red`.
- after mount, a timer changes it to `yellow`.
- add `console.log("after update")` inside `componentDidUpdate()`.

### Part III: getSnapshotBeforeUpdate

Use `getSnapshotBeforeUpdate()` and log `"in getSnapshotBeforeUpdate"`.

---

## Exercise 3: Lifecycle #2

### Instructions

Using the previous exercise:

1. Add a `show` property set to `true` in the state.
2. Add a class component named `Child` in the same file.
3. The `Child` component renders a `Hello World!` message.
4. Use `componentWillUnmount()` to alert an unmounted message.
5. Render `Child` only when `show` is `true`.
6. Add a `Delete` button that changes `show` to `false`.

This is the information that belongs in Week 8 Day 1 Exercise XP.
