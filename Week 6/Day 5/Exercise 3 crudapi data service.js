const axios = require('axios');

async function fetchPosts() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching data from JSONPlaceholder:', error.message);
    throw error;
  }
}

module.exports = { fetchPosts };




const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.json());

// Endpoint to fetch and return posts from JSONPlaceholder
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await fetchPosts();
    console.log('Data successfully retrieved and sent as a response.');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});