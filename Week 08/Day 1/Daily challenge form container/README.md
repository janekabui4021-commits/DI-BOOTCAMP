# Week 8 - Day 1 - Daily Challenge

## What You will learn

- JSX
- Components
- React State
- Forms

---

## Instructions: React Form Container

In this challenge, you will process form data as the user enters or selects values.

1. In the `App.js` file, create a stateful component with props.
2. Create a function named `handleChange`:
   - it retrieves the `event.target` of the inputs.
   - it checks the status of the checkboxes using a ternary operator.
3. Render a `FormComponent` that displays the form and the values of the inputs.
4. On submit, pass the entered data in the URL.

The expected URL after submit should be:

```text
http://localhost:3000/?firstName=John&lastName=Doe&age=25&gender=male&destination=Japan&lactoseFree=on
```

This challenge tests the ability to manage form state and build a controlled form in React.
