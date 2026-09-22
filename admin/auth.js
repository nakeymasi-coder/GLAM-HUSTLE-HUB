import {
  getUser,
  login,
  logout,
  oauthLogin,
  handleAuthCallback,
  requestPasswordRecovery,
  updateUser
} from "https://esm.sh/@netlify/identity@2.0.0";

/* =========================================================
   GLAM WEBSITE CONTROL CENTER
   AUTHENTICATION
========================================================= */

const LOGIN_SCREEN_ID =
  "glamAdminLoginScreen";

let currentAdminUser = null;


/* =========================================================
   LOGIN SCREEN
========================================================= */

function buildLoginScreen() {
  if (
    document.getElementById(
      LOGIN_SCREEN_ID
    )
  ) {
    return;
  }

  const screen =
    document.createElement("div");

  screen.id =
    LOGIN_SCREEN_ID;

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


        <!-- NORMAL LOGIN -->

        <div id="glamNormalLoginView">

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


          <button
            id="glamForgotPasswordButton"
            class="glam-forgot-password"
            type="button"
          >
            Forgot Password?
          </button>


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

        </div>


        <!-- FORGOT PASSWORD -->

        <div
          id="glamForgotPasswordView"
          hidden
        >

          <div class="glam-login-subheading">

            <h2>
              Reset Password
            </h2>

            <p>
              Enter your admin email and we’ll send you a reset link.
            </p>

          </div>


          <form
            id="glamForgotPasswordForm"
            class="glam-login-form"
          >

            <label>

              <span>Email</span>

              <input
                id="glamForgotEmail"
                type="email"
                required
                placeholder="Your admin email"
              />

            </label>


            <button
              class="glam-login-primary"
              type="submit"
            >
              Send Reset Email
            </button>

          </form>


          <button
            id="glamBackToLoginButton"
            class="glam-forgot-password"
            type="button"
          >
            Back to Login
          </button>

        </div>


        <!-- CREATE NEW PASSWORD -->

        <div
          id="glamRecoveryView"
          hidden
        >

          <div class="glam-login-subheading">

            <h2>
              Create New Password
            </h2>

            <p>
              Enter your new password below.
            </p>

          </div>


          <form
            id="glamRecoveryForm"
            class="glam-login-form"
          >

            <label>

              <span>New Password</span>

              <input
                id="glamNewPassword"
                type="password"
                autocomplete="new-password"
                required
                minlength="8"
                placeholder="Create a new password"
              />

            </label>


            <label>

              <span>Confirm Password</span>

              <input
                id="glamConfirmPassword"
                type="password"
                autocomplete="new-password"
                required
                minlength="8"
                placeholder="Enter it again"
              />

            </label>


            <button
              class="glam-login-primary"
              type="submit"
            >
              Save New Password
            </button>

          </form>

        </div>


        <p
          id="glamLoginMessage"
          class="glam-login-message"
          aria-live="polite"
        ></p>

      </div>

    </div>
  `;

  document.body.appendChild(
    screen
  );


  document
    .getElementById(
      "glamEmailLoginForm"
    )
    .addEventListener(
      "submit",
      handleEmailLogin
    );


  document
    .getElementById(
      "glamGoogleLoginButton"
    )
    .addEventListener(
      "click",
      handleGoogleLogin
    );


  document
    .getElementById(
      "glamForgotPasswordButton"
    )
    .addEventListener(
      "click",
      showForgotPassword
    );


  document
    .getElementById(
      "glamBackToLoginButton"
    )
    .addEventListener(
      "click",
      showNormalLogin
    );


  document
    .getElementById(
      "glamForgotPasswordForm"
    )
    .addEventListener(
      "submit",
      handleForgotPassword
    );


  document
    .getElementById(
      "glamRecoveryForm"
    )
    .addEventListener(
      "submit",
      handleNewPassword
    );
}


/* =========================================================
   VIEW HELPERS
========================================================= */

function setLoginMessage(
  message,
  isError = false
) {
  const element =
    document.getElementById(
      "glamLoginMessage"
    );

  if (!element) return;

  element.textContent =
    message || "";

  element.classList.toggle(
    "success",
    !isError && Boolean(message)
  );
}


function showNormalLogin() {
  document.getElementById(
    "glamNormalLoginView"
  ).hidden = false;

  document.getElementById(
    "glamForgotPasswordView"
  ).hidden = true;

  document.getElementById(
    "glamRecoveryView"
  ).hidden = true;

  setLoginMessage("");
}


function showForgotPassword() {
  document.getElementById(
    "glamNormalLoginView"
  ).hidden = true;

  document.getElementById(
    "glamForgotPasswordView"
  ).hidden = false;

  document.getElementById(
    "glamRecoveryView"
  ).hidden = true;

  setLoginMessage("");
}


function showRecoveryForm() {
  document.getElementById(
    "glamNormalLoginView"
  ).hidden = true;

  document.getElementById(
    "glamForgotPasswordView"
  ).hidden = true;

  document.getElementById(
    "glamRecoveryView"
  ).hidden = false;

  setLoginMessage(
    "Recovery link accepted. Create your new password."
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
    .add(
      "glam-admin-locked"
    );
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
    .remove(
      "glam-admin-locked"
    );

  updateAdminUserDisplay(
    user
  );
}


/* =========================================================
   EMAIL LOGIN
========================================================= */

async function handleEmailLogin(
  event
) {
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

  setLoginMessage(
    "Signing you in..."
  );

  try {

    const user =
      await login(
        email,
        password
      );

    setLoginMessage("");

    showAdmin(user);

  } catch (error) {

    console.error(error);

    setLoginMessage(
      "Login failed. Check your email and password.",
      true
    );

  }
}


/* =========================================================
   GOOGLE LOGIN
========================================================= */

function handleGoogleLogin() {
  setLoginMessage(
    "Opening Google login..."
  );

  oauthLogin("google");
}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

async function handleForgotPassword(
  event
) {
  event.preventDefault();

  const email =
    document
      .getElementById(
        "glamForgotEmail"
      )
      .value
      .trim();

  if (!email) return;

  setLoginMessage(
    "Sending reset email..."
  );

  try {

    await requestPasswordRecovery(
      email
    );

    setLoginMessage(
      "Reset email sent. Check your inbox."
    );

  } catch (error) {

    console.error(error);

    setLoginMessage(
      "Could not send the reset email.",
      true
    );

  }
}


/* =========================================================
   SAVE NEW PASSWORD
========================================================= */

async function handleNewPassword(
  event
) {
  event.preventDefault();

  const password =
    document.getElementById(
      "glamNewPassword"
    ).value;

  const confirmPassword =
    document.getElementById(
      "glamConfirmPassword"
    ).value;


  if (
    password.length < 8
  ) {

    setLoginMessage(
      "Password must be at least 8 characters.",
      true
    );

    return;
  }


  if (
    password !==
    confirmPassword
  ) {

    setLoginMessage(
      "The passwords do not match.",
      true
    );

    return;
  }


  setLoginMessage(
    "Saving your new password..."
  );


  try {

    const user =
      await updateUser({
        password
      });

    setLoginMessage(
      "Password updated."
    );

    document.getElementById(
      "glamNewPassword"
    ).value = "";

    document.getElementById(
      "glamConfirmPassword"
    ).value = "";

    showAdmin(user);

  } catch (error) {

    console.error(error);

    setLoginMessage(
      "Could not update the password. Request a new reset link and try again.",
      true
    );

  }
}


/* =========================================================
   LOGOUT
========================================================= */

async function handleAdminLogout() {
  try {

    await logout();

    currentAdminUser = null;

    showLogin();
    showNormalLogin();

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

function updateAdminUserDisplay(
  user
) {
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
    document.createElement(
      "div"
    );

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

  sidebar.appendChild(
    account
  );


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
   INITIALIZE
========================================================= */

async function initializeAdminAuth() {

  buildLoginScreen();

  showLogin();


  try {

    const callbackResult =
      await handleAuthCallback();


    if (
      callbackResult?.type ===
      "recovery"
    ) {

      showRecoveryForm();
      return;

    }


    if (
      callbackResult?.user
    ) {

      showAdmin(
        callbackResult.user
      );

      return;

    }

  } catch (error) {

    console.warn(
      "Identity callback could not be processed.",
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


  showNormalLogin();
  showLogin();
}


initializeAdminAuth();


window.glamAdminLogout =
  handleAdminLogout;