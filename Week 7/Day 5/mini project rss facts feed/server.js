const path = require('node:path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Parser = require('rss-parser');

const app = express();
const parser = new Parser();
const feedUrl = 'https://thefactfile.org/feed/';
const publicDirectory = path.join(__dirname, 'public');
const port = Number(process.env.PORT) || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(publicDirectory, 'pages'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(publicDirectory));

async function getPosts() {
  const feed = await parser.parseURL(feedUrl);

  return {
    title: feed.title,
    posts: feed.items.map((item) => {
      const rawDate = item.isoDate || item.pubDate;
      const parsedDate = rawDate ? new Date(rawDate) : null;

      return {
        title: item.title || 'Untitled fact',
        link: item.link || 'https://thefactfile.org/',
        pubDate: parsedDate && !Number.isNaN(parsedDate.valueOf())
          ? parsedDate.toLocaleDateString()
          : 'Date unavailable',
        creator: item.creator || item.author || 'Unknown',
        categories: Array.isArray(item.categories)
          ? item.categories
          : item.category
            ? [item.category]
            : [],
        content: item.contentSnippet || item.summary || item.content || 'No summary available.',
      };
    }),
  };
}

function getSearchOptions(posts) {
  const titles = [...new Set(posts.map((post) => post.title))].sort((left, right) => left.localeCompare(right));
  const categories = [...new Set(posts.flatMap((post) => post.categories))]
    .sort((left, right) => left.localeCompare(right));

  return { titles, categories };
}

function renderFeedError(response, view, options = {}) {
  response.status(502).render(view, {
    posts: [],
    titles: [],
    categories: [],
    selectedTitle: '',
    selectedCategory: '',
    message: 'The facts feed is temporarily unavailable. Please try again shortly.',
    ...options,
  });
}

app.get('/', async (request, response) => {
  try {
    const feed = await getPosts();
    response.render('index', {
      posts: feed.posts,
      titles: [],
      categories: [],
      message: null,
      feedTitle: feed.title,
    });
  } catch (error) {
    console.error('Unable to load RSS feed:', error.message);
    renderFeedError(response, 'index');
  }
});

app.get('/search', async (request, response) => {
  try {
    const feed = await getPosts();
    const options = getSearchOptions(feed.posts);
    response.render('search', {
      posts: [],
      ...options,
      selectedTitle: '',
      selectedCategory: '',
      message: null,
    });
  } catch (error) {
    console.error('Unable to load RSS search options:', error.message);
    renderFeedError(response, 'search');
  }
});

app.post('/search/title', async (request, response) => {
  try {
    const feed = await getPosts();
    const options = getSearchOptions(feed.posts);
    const selectedTitle = String(request.body.title || '').trim();
    const posts = selectedTitle
      ? feed.posts.filter((post) => post.title === selectedTitle)
      : [];

    response.render('search', {
      ...options,
      posts,
      selectedTitle,
      selectedCategory: '',
      message: selectedTitle && posts.length === 0 ? 'No post matched that title.' : null,
    });
  } catch (error) {
    console.error('Unable to search RSS feed by title:', error.message);
    renderFeedError(response, 'search');
  }
});

app.post('/search/category', async (request, response) => {
  try {
    const feed = await getPosts();
    const options = getSearchOptions(feed.posts);
    const selectedCategory = String(request.body.category || '').trim();
    const posts = selectedCategory
      ? feed.posts.filter((post) => post.categories.includes(selectedCategory))
      : [];

    response.render('search', {
      ...options,
      posts,
      selectedTitle: '',
      selectedCategory,
      message: selectedCategory && posts.length === 0 ? 'No posts matched that category.' : null,
    });
  } catch (error) {
    console.error('Unable to search RSS feed by category:', error.message);
    renderFeedError(response, 'search');
  }
});

app.use((request, response) => {
  response.status(404).send('Page not found.');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`RSS Facts Feed listening at http://localhost:${port}`);
  });
}

module.exports = { app, getPosts, getSearchOptions };