import {
  getUser,
  login,
  logout,
  oauthLogin,
  handleAuthCallback
} from "https://esm.sh/@netlify/identity@2.0.0";

/* =========================================================
   GLAM WEBSITE CONTROL CENTER
   AUTHENTICATION
========================================================= */

const ADMIN_APP_ID = "glamAdminApp";
const LOGIN_SCREEN_ID = "glamAdminLoginScreen";

let currentAdminUser = null;


/* =========================================================
   BUILD LOGIN SCREEN
========================================================= */

function buildLoginScreen() {
  if (document.getElementById(LOGIN_SCREEN_ID)) {
    return;
  }

  const screen = document.createElement("div");

  screen.id = LOGIN_SCREEN_ID;

  screen.innerHTML = `
    <div class="glam-login-shell">

      <div class="glam-login-card">

        <div class="glam-login-brand">
          <span class="glam-login-kicker">
            GLAM HUSTLE HUB
          </span>

          <h1>
            Website Control Center
          </h1>

          <p>
            Private administrator access
          </p>
        </div>


        <form
          id="glamEmailLoginForm"
          class="glam-login-form"
        >

          <label>
            <span>Email</span>

            <input
              id="glamLoginEmail"
              type="email"
              autocomplete="email"
              required
              placeholder="Your admin email"
            />
          </label>


          <label>
            <span>Password</span>

            <input
              id="glamLoginPassword"
              type="password"
              autocomplete="current-password"
              required
              placeholder="Your password"
            />
          </label>


          <button
            class="glam-login-primary"
            type="submit"
          >
            Log In
          </button>

        </form>


        <div class="glam-login-divider">
          <span>OR</span>
        </div>


        <button
          id="glamGoogleLoginButton"
          class="glam-google-login"
          type="button"
        >
          Continue with Google
        </button>


        <p
          id="glamLoginMessage"
          class="glam-login-message"
          aria-live="polite"
        ></p>

      </div>

    </div>
  `;

  document.body.appendChild(screen);


  document
    .getElementById("glamEmailLoginForm")
    .addEventListener(
      "submit",
      handleEmailLogin
    );


  document
    .getElementById("glamGoogleLoginButton")
    .addEventListener(
      "click",
      handleGoogleLogin
    );
}


/* =========================================================
   SHOW / HIDE ADMIN
========================================================= */

function showLogin() {
  const screen =
    document.getElementById(
      LOGIN_SCREEN_ID
    );

  if (screen) {
    screen.hidden = false;
  }

  document.documentElement
    .classList
    .add("glam-admin-locked");
}


function showAdmin(user) {
  currentAdminUser = user;

  const screen =
    document.getElementById(
      LOGIN_SCREEN_ID
    );

  if (screen) {
    screen.hidden = true;
  }

  document.documentElement
    .classList
    .remove("glam-admin-locked");

  updateAdminUserDisplay(user);
}


/* =========================================================
   EMAIL + PASSWORD LOGIN
========================================================= */

async function handleEmailLogin(event) {
  event.preventDefault();

  const email =
    document
      .getElementById(
        "glamLoginEmail"
      )
      .value
      .trim();

  const password =
    document
      .getElementById(
        "glamLoginPassword"
      )
      .value;

  const message =
    document.getElementById(
      "glamLoginMessage"
    );

  message.textContent =
    "Signing you in...";

  try {
    const user =
      await login(
        email,
        password
      );

    message.textContent = "";

    showAdmin(user);

  } catch (error) {
    console.error(error);

    message.textContent =
      "Login failed. Check your email and password.";
  }
}


/* =========================================================
   GOOGLE LOGIN
========================================================= */

function handleGoogleLogin() {
  const message =
    document.getElementById(
      "glamLoginMessage"
    );

  message.textContent =
    "Opening Google login...";

  oauthLogin("google");
}


/* =========================================================
   LOGOUT
========================================================= */

async function handleAdminLogout() {
  try {
    await logout();

    currentAdminUser = null;

    showLogin();

  } catch (error) {
    console.error(
      "Logout failed:",
      error
    );
  }
}


/* =========================================================
   ADMIN USER DISPLAY
========================================================= */

function updateAdminUserDisplay(user) {
  const existing =
    document.getElementById(
      "glamAdminAccount"
    );

  if (existing) {
    existing.remove();
  }


  const sidebar =
    document.querySelector(
      ".sidebar"
    ) ||
    document.querySelector(
      "aside"
    );

  if (!sidebar) return;


  const account =
    document.createElement("div");

  account.id =
    "glamAdminAccount";

  account.className =
    "glam-admin-account";

  account.innerHTML = `
    <div class="glam-admin-account-copy">

      <span>
        Signed in as
      </span>

      <strong>
        ${escapeAuthHTML(
          user?.email ||
          "Administrator"
        )}
      </strong>

    </div>


    <button
      id="glamAdminLogoutButton"
      type="button"
    >
      Log Out
    </button>
  `;

  sidebar.appendChild(account);


  document
    .getElementById(
      "glamAdminLogoutButton"
    )
    .addEventListener(
      "click",
      handleAdminLogout
    );
}


/* =========================================================
   HELPERS
========================================================= */

function escapeAuthHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* =========================================================
   INITIALIZE AUTHENTICATION
========================================================= */

async function initializeAdminAuth() {
  buildLoginScreen();

  showLogin();

  try {

    /*
      Processes:
      - Google OAuth returns
      - invite links
      - confirmation links
      - password recovery callbacks
    */
    await handleAuthCallback();

  } catch (error) {
    console.warn(
      "No Identity callback to process.",
      error
    );
  }


  try {

    const user =
      await getUser();

    if (user) {
      showAdmin(user);
      return;
    }

  } catch (error) {
    console.error(
      "Could not check login status:",
      error
    );
  }


  showLogin();
}


initializeAdminAuth();


/* Make logout available if needed elsewhere */
window.glamAdminLogout =
  handleAdminLogout;