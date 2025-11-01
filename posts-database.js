// Simple localStorage database
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
const ADMIN_USER = "Othman"; // Change this to your admin username

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'index.html';
});

if (!loggedInUser) {
  alert('Please sign in first!');
  window.location.href = 'account.html';
}

const postForm = document.getElementById('postForm');
const postsList = document.getElementById('postsList');

let posts = JSON.parse(localStorage.getItem('posts')) || [];
let likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};

function savePosts() {
  localStorage.setItem('posts', JSON.stringify(posts));
}

function renderPosts() {
  postsList.innerHTML = '';
  posts
    .slice()
    .reverse()
    .forEach((post, index) => {
      const postDiv = document.createElement('div');
      postDiv.className = 'post';
      postDiv.innerHTML = `
        <strong>@${post.user}</strong>
        <p>${post.description}</p>
        <img src="${post.image}" alt="Post image" />
        <div class="actions">
          <button onclick="likePost(${index})">
            ❤️ ${post.likes || 0}
          </button>
          ${
            post.user === loggedInUser.username || loggedInUser.username === ADMIN_USER
              ? `<button onclick="deletePost(${index})">🗑️ Delete</button>`
              : ''
          }
        </div>
      `;
      postsList.appendChild(postDiv);
    });
}

postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = document.getElementById('description').value;
  const imageInput = document.getElementById('imageInput').files[0];
  if (!imageInput) return alert('Please select an image.');

  const reader = new FileReader();
  reader.onload = function () {
    const newPost = {
      user: loggedInUser.username,
      description,
      image: reader.result,
      likes: 0
    };
    posts.push(newPost);
    savePosts();
    renderPosts();
    postForm.reset();
  };
  reader.readAsDataURL(imageInput);
});

function deletePost(index) {
  const post = posts[index];
  if (
    post.user === loggedInUser.username ||
    loggedInUser.username === ADMIN_USER
  ) {
    if (confirm('Delete this post?')) {
      posts.splice(index, 1);
      savePosts();
      renderPosts();
    }
  } else {
    alert('You can only delete your own posts.');
  }
}

function likePost(index) {
  const post = posts[index];
  const userLikes = likedPosts[loggedInUser.username] || [];

  if (userLikes.includes(index)) {
    alert('You already liked this post.');
    return;
  }

  post.likes = (post.likes || 0) + 1;
  userLikes.push(index);
  likedPosts[loggedInUser.username] = userLikes;

  localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  savePosts();
  renderPosts();
}

renderPosts();
