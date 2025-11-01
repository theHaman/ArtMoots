const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // serves your frontend files

const postsFile = path.join(__dirname, 'post.json');

// Get all posts
app.get('/posts', (req, res) => {
  fs.readFile(postsFile, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading posts');
    res.send(JSON.parse(data));
  });
});

// Add a new post
app.post('/posts', (req, res) => {
  const { username, content } = req.body;
  if (!username || !content) return res.status(400).send('Invalid post');

  fs.readFile(postsFile, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading posts');

    const posts = JSON.parse(data);
    const newPost = { id: Date.now(), username, content };
    posts.push(newPost);

    fs.writeFile(postsFile, JSON.stringify(posts, null, 2), (err) => {
      if (err) return res.status(500).send('Error saving post');
      res.send(newPost);
    });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
