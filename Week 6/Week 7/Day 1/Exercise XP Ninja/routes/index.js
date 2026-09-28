const express = require('express');

const router = express.Router();
const emojis = ['😀', '🎉', '🌟', '🎈', '👋'];

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function renderPage(content) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Emoji Greeting</title>
  <style>
    :root { color-scheme: light; font-family: "Trebuchet MS", sans-serif; }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px; color: #173b38; background: linear-gradient(135deg, #e5f4ec, #f7f0dc 55%, #f7d9c7); }
    main { width: min(100%, 440px); padding: 36px; border: 1px solid #ffffffb8; border-radius: 18px; background: #fffdf8; box-shadow: 0 20px 60px #24443c20; }
    h1 { margin: 0 0 8px; font-size: 30px; }
    p { line-height: 1.5; }
    label { display: block; margin: 20px 0 8px; font-weight: 700; }
    input, select { width: 100%; min-height: 48px; padding: 10px 12px; border: 1px solid #bac9c2; border-radius: 8px; background: #fff; color: inherit; font: inherit; }
    button, a.button { display: inline-block; margin-top: 24px; padding: 12px 18px; border: 0; border-radius: 8px; background: #176b5c; color: white; font: inherit; font-weight: 700; text-decoration: none; cursor: pointer; }
    button:hover, a.button:hover { background: #105548; }
    .error { padding: 10px 12px; border-left: 4px solid #bf543e; background: #fff0eb; color: #773321; }
    .greeting { margin: 20px 0 8px; font-size: 26px; }
    .wave { font-size: 56px; }
    @media (max-width: 480px) { main { padding: 26px 22px; } }
  </style>
</head>
<body>
  <main>${content}</main>
</body>
</html>`;
}

function renderForm(name = '', error = '') {
  const options = emojis.map((emoji) => `<option value="${emoji}">${emoji}</option>`).join('');
  const errorMessage = error ? `<p class="error">${escapeHtml(error)}</p>` : '';

  return renderPage(`<h1>Send a little joy</h1>
    <p>Choose an emoji and make someone smile.</p>
    ${errorMessage}
    <form action="/greet" method="post">
      <label for="name">Your name</label>
      <input id="name" name="name" type="text" value="${escapeHtml(name)}" maxlength="60" required>
      <label for="emoji">Choose an emoji</label>
      <select id="emoji" name="emoji">${options}</select>
      <button type="submit">Make my greeting</button>
    </form>`);
}

router.get('/', (req, res) => {
  res.type('html').send(renderForm());
});

router.post('/greet', (req, res) => {
  const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
  const emoji = typeof req.body.emoji === 'string' ? req.body.emoji : '';

  if (!name) {
    return res.status(400).type('html').send(renderForm('', 'Please enter your name.'));
  }
  if (name.length > 60) {
    return res.status(400).type('html').send(renderForm('', 'Your name must be 60 characters or fewer.'));
  }
  if (!emojis.includes(emoji)) {
    return res.status(400).type('html').send(renderForm(name, 'Please choose an emoji from the list.'));
  }

  res.type('html').send(renderPage(`<div class="wave" aria-hidden="true">${emoji}</div>
    <h1 class="greeting">Hello, ${escapeHtml(name)}!</h1>
    <p>Hope your day is a little brighter.</p>
    <a class="button" href="/">Make another greeting</a>`));
});

module.exports = router;