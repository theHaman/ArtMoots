/* =========================
   ACCOUNT MENU SYSTEM
========================= */

const currentUser =
  localStorage.getItem("currentUser");

/* ELEMENTS */

const userDisplay =
  document.getElementById("userDisplay");

const myAccountBtn =
  document.getElementById("myAccountBtn");

const logoutBtn =
  document.getElementById("logoutBtn");

const signInBtn =
  document.getElementById("signInBtn");

const signUpBtn =
  document.getElementById("signUpBtn");

/* NEW DROPDOWN ELEMENTS */

const accountButton =
  document.getElementById("accountButton");

const accountDropdown =
  document.getElementById("accountDropdown");

const loggedOutMenu =
  document.getElementById("loggedOutMenu");

const loggedInMenu =
  document.getElementById("loggedInMenu");

/* =========================
   USER STATE
========================= */

if(currentUser){

  /* USER DISPLAY */

  userDisplay.textContent =
    currentUser;

  /* SHOW LOGGED IN MENU */

  loggedOutMenu.style.display =
    "none";

  loggedInMenu.style.display =
    "flex";

  /* ACCOUNT PAGE */

  myAccountBtn.href =
    "account.html?mode=account";

}

else{

  /* SHOW LOGGED OUT MENU */

  loggedOutMenu.style.display =
    "flex";

  loggedInMenu.style.display =
    "none";

  /* RETURN URL */

  const returnURL =
    window.location.href;

  signInBtn.href =
    `account.html?mode=login&return=${encodeURIComponent(returnURL)}`;

  signUpBtn.href =
    `account.html?mode=signup&return=${encodeURIComponent(returnURL)}`;

}

/* =========================
   TOGGLE DROPDOWN
========================= */

accountButton.addEventListener("click", () => {

  if(accountDropdown.style.display === "flex"){

    accountDropdown.style.display =
      "none";

  }

  else{

    accountDropdown.style.display =
      "flex";

  }

});

/* =========================
   CLOSE DROPDOWN
========================= */

document.addEventListener("click", e => {

  if(
    !e.target.closest(".account-menu-container")
  ){

    accountDropdown.style.display =
      "none";

  }

});

/* =========================
   LOGOUT
========================= */

logoutBtn.addEventListener("click", () => {

  localStorage.removeItem("currentUser");

  location.reload();

});
