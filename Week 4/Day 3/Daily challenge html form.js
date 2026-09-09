const form = document.getElementById('user-form');
const outputDiv = document.getElementById('output');

form.addEventListener('submit', function (event) {
    // Prevent default form submission behavior (page refresh)
    event.preventDefault();

    // Retrieve values from the input fields
    const firstName = document.getElementById('name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();

    // Create an object with the input data
    const formData = {
        name: firstName,
        lastName: lastName
    };

    // Convert the object to a JSON string
    const jsonString = JSON.stringify(formData);

    // Append/display the JSON string on the DOM
    outputDiv.textContent = jsonString;
});