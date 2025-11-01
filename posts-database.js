// posts-database.js

function getPosts() {
  return JSON.parse(localStorage.getItem("posts") || "[]");
}

function savePosts(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function addPost(username, title, content, image=null) {
  const posts = getPosts();
  posts.push({ id: Date.now(), username, title, content, image, date: new Date().toISOString(), likes: [] });
  savePosts(posts);
}

function deletePost(post) {
  const posts = getPosts().filter(p => p.id !== post.id);
  savePosts(posts);
}

function toggleLike(post, username) {
  const posts = getPosts();
  const index = posts.findIndex(p => p.id === post.id);
  if(index > -1){
    const likes = posts[index].likes || [];
    if(likes.includes(username)){
      posts[index].likes = likes.filter(u=>u!==username);
    } else {
      posts[index].likes.push(username);
    }
    savePosts(posts);
  }
}

function getUserPosts(username) {
  return getPosts().filter(p => p.username === username);
}
