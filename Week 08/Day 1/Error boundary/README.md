# Week 8 - Day 1 - Error Boundary

## What You will learn

- Error Boundary

---

## Mini Project

Replace the error in the App with an Error Boundary.

This mini project demonstrates how React handles:

- a rendering error
- an event handler error

When the user clicks **Replace string with object**, the string is replaced with a JavaScript object. This causes a rendering error because React cannot render plain objects as children.

Instead of crashing the whole page, the `ErrorBoundary` catches the error and shows a fallback UI.

---

## Instructions

1. Create a new `ErrorBoundary.js` file inside the `src` folder.
2. Build the component using:
   - `static getDerivedStateFromError()`
   - `componentDidCatch()`
3. In render, check `hasError`.
4. If `hasError` is true, render a fallback UI with details about the error and a reload button.
5. Wrap the crashing element in `ErrorBoundary`.
6. Test the app by clicking **Replace string with object**.
7. Confirm that only the broken paragraph is replaced by the fallback UI while the rest of the page still works.

---

## Example logic

```jsx
static getDerivedStateFromError(error) {
  return { hasError: true, error };
}

componentDidCatch(error, errorInfo) {
  console.error(error);
  console.error(errorInfo.componentStack);
}
```

```jsx
<details style={{ whiteSpace: 'pre-wrap' }}>
  {this.state.error && this.state.error.toString()}
  <br />
  {this.state.errorInfo && this.state.errorInfo.componentStack}
</details>
```

---

## Important idea

This challenge teaches that an Error Boundary stops a component tree from crashing completely. It allows the rest of the app to stay alive while only the problematic section is replaced by an error message.

This is the information to keep in Week 8 Day 1 Error Boundary.
