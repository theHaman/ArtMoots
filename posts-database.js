// posts-database.js
// Simple localStorage post store used by posts.html and moots.html

function getPosts() {
  return JSON.parse(localStorage.getItem("posts") || "[]");
}

function savePosts(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function addPost(username, description, imageData) {
  const posts = getPosts();
  posts.push({
    id: Date.now(),
    username,
    description,
    image: imageData || null,
    date: new Date().toISOString(),
    likes: [],
  });
  savePosts(posts);
}

function deletePostById(id) {
  const posts = getPosts().filter(p => p.id !== id);
  savePosts(posts);
}

function toggleLikeById(id, username) {
  const posts = getPosts();
  const idx = posts.findIndex(p => p.id === id);
  if (idx === -1) return;
  const likes = posts[idx].likes || [];
  if (likes.includes(username)) {
    // unlike
    posts[idx].likes = likes.filter(u => u !== username);
  } else {
    // like
    likes.push(username);
    posts[idx].likes = likes;
  }
  savePosts(posts);
}

function getUserPosts(username) {
  return getPosts().filter(p => p.username === username);
}
