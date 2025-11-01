const currentUser = localStorage.getItem("currentUser");
const userDisplay = document.getElementById("userDisplay");
const myAccountBtn = document.getElementById("myAccountBtn");
const logoutBtn = document.getElementById("logoutBtn");
const signInBtn = document.getElementById("signInBtn");
const signUpBtn = document.getElementById("signUpBtn");

if (currentUser) {
  userDisplay.textContent = currentUser;
  myAccountBtn.style.display = "inline-block";
  logoutBtn.style.display = "inline-block";
  signInBtn.style.display = "none";
  signUpBtn.style.display = "none";
  myAccountBtn.href = "account.html?mode=account";
} else {
  const returnURL = window.location.href;
  signInBtn.href = `account.html?mode=login&return=${encodeURIComponent(returnURL)}`;
  signUpBtn.href = `account.html?mode=signup&return=${encodeURIComponent(returnURL)}`;
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  location.reload();
});
