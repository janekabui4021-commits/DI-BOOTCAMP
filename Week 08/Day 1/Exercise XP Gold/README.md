# Week 8 - Day 1 - Exercise XP Gold

## What we will learn

- Error Boundary

---

## Exercise 1 : Creating a React Modal Component with Error Handling

### Objective

In this exercise, you will create a React app that renders a button. When the button is clicked, it displays a modal with an error message.

You will create a `Modal` class component and an `ErrorBoundary` class component.

### Instructions

1. Create a new JavaScript file called `Modal.js`.
2. Define a `Modal` class component that renders a modal with the following styles:
   - transparent dark overlay
   - centered vertically and horizontally
   - modal body with white background and border radius
3. Implement a button inside the modal to close it.
4. Create a new JavaScript file called `ErrorBoundary.js`.
5. Create an `ErrorBoundary` class component. Set an initial state property named `hasError` to `false`.
6. Implement a method named `occurError` inside the `ErrorBoundary` component. This should set `hasError` to `true`.
7. Import the above components to `App.js`.
8. Hold the details of the error in a property in the state object named `errorInfo`, defaulted to `null`.
9. Use `componentDidCatch()` to record the error info.

This is the information that belongs in Week 8 Day 1 Exercise XP Gold.
