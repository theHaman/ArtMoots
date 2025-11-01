// posts-database.js

function getPosts() {
  return JSON.parse(localStorage.getItem("posts") || "[]");
}

function savePosts(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function addPost(username, title, content) {
  const posts = getPosts();
  posts.push({ username, title, content, date: new Date().toISOString() });
  savePosts(posts);
}

function getUserPosts(username) {
  const posts = getPosts();
  return posts.filter(p => p.username === username);
}
