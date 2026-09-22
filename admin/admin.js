/* =========================================================
   GLAM WEBSITE CONTROL CENTER
   Admin shell + Theme Studio
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const navItems = document.querySelectorAll(".nav-item");
  const screens = document.querySelectorAll(".admin-screen");
  const quickCards = document.querySelectorAll("[data-open-screen]");
  const screenTitle = document.getElementById("screenTitle");

  const openSidebarButton = document.getElementById("openSidebar");
  const closeSidebarButton = document.getElementById("closeSidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  const previewWebsiteButton = document.getElementById("previewWebsite");
  const publishWebsiteButton = document.getElementById("publishWebsite");
  const publishMainButton = document.getElementById("publishMainButton");

  const adminToast = document.getElementById("adminToast");

  /* =======================================================
     BASIC ADMIN NAVIGATION
  ======================================================== */

  function openScreen(screenName) {
    const targetScreen = document.getElementById(
      `screen-${screenName}`
    );

    if (!targetScreen) return;

    screens.forEach((screen) => {
      screen.classList.remove("active");
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
    });

    targetScreen.classList.add("active");

    const matchingNavItem = document.querySelector(
      `.nav-item[data-screen="${screenName}"]`
    );

    if (matchingNavItem) {
      matchingNavItem.classList.add("active");
    }

    if (screenTitle) {
      screenTitle.textContent =
        targetScreen.dataset.title || "Website Control Center";
    }

    closeMobileSidebar();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      openScreen(item.dataset.screen);
    });
  });

  quickCards.forEach((card) => {
    card.addEventListener("click", () => {
      openScreen(card.dataset.openScreen);
    });
  });

  /* =======================================================
     MOBILE SIDEBAR
  ======================================================== */

  function openMobileSidebar() {
    body.classList.add("mobile-menu-open");
  }

  function closeMobileSidebar() {
    body.classList.remove("mobile-menu-open");
  }

  openSidebarButton?.addEventListener(
    "click",
    openMobileSidebar
  );

  closeSidebarButton?.addEventListener(
    "click",
    closeMobileSidebar
  );

  sidebarOverlay?.addEventListener(
    "click",
    closeMobileSidebar
  );

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileSidebar();
    }
  });

  /* =======================================================
     DESKTOP SIDEBAR COLLAPSE
  ======================================================== */

  const adminBrand = document.querySelector(".admin-brand");

  if (adminBrand) {
    adminBrand.addEventListener("dblclick", () => {
      if (window.innerWidth <= 900) return;

      body.classList.toggle("sidebar-collapsed");

      localStorage.setItem(
        "glamAdminSidebarCollapsed",
        body.classList.contains("sidebar-collapsed")
          ? "true"
          : "false"
      );
    });
  }

  if (
    localStorage.getItem("glamAdminSidebarCollapsed") === "true" &&
    window.innerWidth > 900
  ) {
    body.classList.add("sidebar-collapsed");
  }

  /* =======================================================
     ADMIN LIGHT / DARK MODE
  ======================================================== */

  if (
    localStorage.getItem("glamAdminThemeMode") === "dark"
  ) {
    body.classList.add("dark-mode");
  }

  document.addEventListener("keydown", (event) => {
    if (
      event.shiftKey &&
      event.key.toLowerCase() === "d"
    ) {
      body.classList.toggle("dark-mode");

      localStorage.setItem(
        "glamAdminThemeMode",
        body.classList.contains("dark-mode")
          ? "dark"
          : "light"
      );

      showToast(
        body.classList.contains("dark-mode")
          ? "Dark mode enabled."
          : "Light mode enabled."
      );
    }
  });

  /* =======================================================
     TOAST
  ======================================================== */

  let toastTimer;

  function showToast(message) {
    if (!adminToast) return;

    clearTimeout(toastTimer);

    adminToast.textContent = message;
    adminToast.classList.add("show");

    toastTimer = setTimeout(() => {
      adminToast.classList.remove("show");
    }, 2600);
  }

  /* =======================================================
     PREVIEW / PUBLISH PLACEHOLDERS
  ======================================================== */

  previewWebsiteButton?.addEventListener("click", () => {
    window.open("/", "_blank");
  });

  function handlePublishPlaceholder() {
    showToast(
      "Publishing is not connected yet. Your live website has not changed."
    );
  }

  publishWebsiteButton?.addEventListener(
    "click",
    handlePublishPlaceholder
  );

  publishMainButton?.addEventListener(
    "click",
    handlePublishPlaceholder
  );

  /* =======================================================
     THEME STUDIO DATA
  ======================================================== */

  const THEME_STORAGE_KEY = "glamWebsiteThemes";
  const ACTIVE_THEME_KEY = "glamWebsiteActiveTheme";

  const defaultTheme = {
    id: "caribbean-sapphire",
    name: "Caribbean Sapphire",

    colors: {
      primary: "#168FEA",
      secondary: "#103B63",
      accent: "#FFFFFF",
      background: "#F7FBFF",

      heading: "#171A1E",
      bodyText: "#33404D",

      buttonBackground: "#168FEA",
      buttonText: "#FFFFFF",

      cardBackground: "#FFFFFF",
      cardText: "#171A1E",
      cardBorder: "#DCE8F2",

      navigationBackground: "#103B63",
      navigationText: "#FFFFFF",

      footerBackground: "#103B63",
      footerText: "#FFFFFF"
    },

    fonts: {
      heading:
        "Montserrat, Arial, sans-serif",

      body:
        "Montserrat, Arial, sans-serif",

      display:
        "Arial Rounded MT Bold, Arial, sans-serif",

      customHeading: "",
      customBody: "",
      customDisplay: ""
    },

    sections: {
      mansion: {
        override: false,
        background: "#103B63",
        text: "#FFFFFF",
        accent: "#168FEA"
      },

      quickAccess: {
        override: false,
        background: "#FFFFFF",
        text: "#171A1E",
        accent: "#168FEA"
      },

      featuredProducts: {
        override: false,
        background: "#F7FBFF",
        text: "#171A1E",
        accent: "#168FEA"
      },

      about: {
        override: false,
        background: "#FFFFFF",
        text: "#171A1E",
        accent: "#168FEA"
      },

      reviews: {
        override: false,
        background: "#F7FBFF",
        text: "#171A1E",
        accent: "#168FEA"
      },

      footer: {
        override: false,
        background: "#103B63",
        text: "#FFFFFF",
        accent: "#168FEA"
      }
    }
  };

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function loadThemes() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(THEME_STORAGE_KEY)
      );

      if (
        Array.isArray(saved) &&
        saved.length > 0
      ) {
        return saved;
      }
    } catch (error) {
      console.warn(
        "Could not load saved themes.",
        error
      );
    }

    const firstTheme = deepClone(defaultTheme);

    localStorage.setItem(
      THEME_STORAGE_KEY,
      JSON.stringify([firstTheme])
    );

    localStorage.setItem(
      ACTIVE_THEME_KEY,
      firstTheme.id
    );

    return [firstTheme];
  }

  let themes = loadThemes();

  let activeThemeId =
    localStorage.getItem(ACTIVE_THEME_KEY) ||
    themes[0].id;

  let editingThemeId = activeThemeId;

  function saveThemes() {
    localStorage.setItem(
      THEME_STORAGE_KEY,
      JSON.stringify(themes)
    );
  }

  function getTheme(themeId) {
    return themes.find(
      (theme) => theme.id === themeId
    );
  }

  function getEditingTheme() {
    return getTheme(editingThemeId);
  }

  function slugify(value) {
    return (
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") ||
      `theme-${Date.now()}`
    );
  }

  /* =======================================================
     BUILD THEME STUDIO UI
  ======================================================== */

  const themeScreen = document.getElementById(
    "screen-themes"
  );

  if (themeScreen) {
    themeScreen.innerHTML = `
      <div class="screen-heading">
        <div>
          <span class="section-kicker">
            SAVED WEBSITE THEMES
          </span>

          <h2>Theme Studio</h2>

          <p>
            Build complete website themes, customize global
            styles and override individual sections when needed.
          </p>
        </div>

        <button
          class="primary-button"
          id="createThemeButton"
          type="button"
        >
          + New Theme
        </button>
      </div>


      <div
        class="theme-manager-grid"
        id="savedThemeGrid"
      ></div>


      <div class="theme-editor-layout">

        <div class="theme-editor-column">

          <div class="panel">
            <div class="panel-heading">
              <div>
                <span class="section-kicker">
                  THEME MANAGEMENT
                </span>

                <h3 id="editingThemeName">
                  Caribbean Sapphire
                </h3>
              </div>
            </div>

            <div class="theme-action-row">

              <button
                class="secondary-button"
                id="setActiveThemeButton"
                type="button"
              >
                Set Active
              </button>

              <button
                class="secondary-button"
                id="renameThemeButton"
                type="button"
              >
                Rename
              </button>

              <button
                class="secondary-button"
                id="duplicateThemeButton"
                type="button"
              >
                Duplicate
              </button>

              <button
                class="danger-button"
                id="deleteThemeButton"
                type="button"
              >
                Delete
              </button>

            </div>
          </div>


          <div class="panel">
            <div class="panel-heading">
              <div>
                <span class="section-kicker">
                  GLOBAL COLORS
                </span>

                <h3>Website colors</h3>
              </div>
            </div>

            <div
              class="theme-control-grid"
              id="globalColorControls"
            ></div>
          </div>


          <div class="panel">
            <div class="panel-heading">
              <div>
                <span class="section-kicker">
                  TYPOGRAPHY
                </span>

                <h3>Fonts & text styling</h3>
              </div>
            </div>

            <div class="font-control-grid">

              <label class="theme-field">
                <span>Heading Font</span>

                <select
                  id="headingFontSelect"
                  data-font-key="heading"
                >
                  <option value="Montserrat, Arial, sans-serif">
                    Montserrat
                  </option>

                  <option value="Arial, sans-serif">
                    Arial
                  </option>

                  <option value="Georgia, serif">
                    Georgia
                  </option>

                  <option value="'Trebuchet MS', sans-serif">
                    Trebuchet
                  </option>

                  <option value="'Arial Black', Arial, sans-serif">
                    Arial Black
                  </option>

                  <option value="'Arial Rounded MT Bold', Arial, sans-serif">
                    Rounded / Bubble
                  </option>

                  <option value="'Comic Sans MS', cursive">
                    Playful / Comic
                  </option>

                  <option value="Impact, sans-serif">
                    Impact
                  </option>
                </select>
              </label>


              <label class="theme-field">
                <span>Body Font</span>

                <select
                  id="bodyFontSelect"
                  data-font-key="body"
                >
                  <option value="Montserrat, Arial, sans-serif">
                    Montserrat
                  </option>

                  <option value="Arial, sans-serif">
                    Arial
                  </option>

                  <option value="Georgia, serif">
                    Georgia
                  </option>

                  <option value="'Trebuchet MS', sans-serif">
                    Trebuchet
                  </option>

                  <option value="'Verdana', sans-serif">
                    Verdana
                  </option>
                </select>
              </label>


              <label class="theme-field">
                <span>Display / Fun Font</span>

                <select
                  id="displayFontSelect"
                  data-font-key="display"
                >
                  <option value="'Arial Rounded MT Bold', Arial, sans-serif">
                    Rounded Bubble
                  </option>

                  <option value="'Comic Sans MS', cursive">
                    Playful Comic
                  </option>

                  <option value="'Arial Black', Arial, sans-serif">
                    Bold Chunky
                  </option>

                  <option value="Impact, sans-serif">
                    Impact
                  </option>

                  <option value="Georgia, serif">
                    Editorial
                  </option>
                </select>
              </label>

            </div>


            <div class="font-control-grid custom-font-grid">

              <label class="theme-field">
                <span>Custom Heading Font Name</span>

                <input
                  id="customHeadingFont"
                  type="text"
                  placeholder="Example: Poppins"
                />
              </label>


              <label class="theme-field">
                <span>Custom Body Font Name</span>

                <input
                  id="customBodyFont"
                  type="text"
                  placeholder="Example: Lato"
                />
              </label>


              <label class="theme-field">
                <span>Custom Display Font Name</span>

                <input
                  id="customDisplayFont"
                  type="text"
                  placeholder="Example: Fredoka"
                />
              </label>

            </div>

            <p class="theme-helper-text">
              Custom font names are saved here now. Later,
              the Media/Font system will handle actually
              loading custom web fonts.
            </p>

          </div>


          <div class="panel">
            <div class="panel-heading">
              <div>
                <span class="section-kicker">
                  SECTION OVERRIDES
                </span>

                <h3>
                  Customize individual sections
                </h3>
              </div>
            </div>

            <div
              class="section-override-list"
              id="sectionOverrideList"
            ></div>
          </div>

        </div>


        <div class="theme-preview-column">

          <div class="panel sticky-theme-preview">

            <div class="panel-heading">
              <div>
                <span class="section-kicker">
                  LIVE SAMPLE
                </span>

                <h3>Theme preview</h3>
              </div>
            </div>


            <div
              class="website-theme-preview"
              id="websiteThemePreview"
            >

              <div
                class="theme-preview-nav"
                id="themePreviewNav"
              >
                <strong>GLAM HUSTLE HUB</strong>

                <span>
                  Home &nbsp; Shop &nbsp; Glam Vault
                </span>
              </div>


              <div
                class="theme-preview-hero"
                id="themePreviewHero"
              >
                <span class="theme-preview-eyebrow">
                  GLAM HUSTLE HUB
                </span>

                <h2>
                  Your Website.<br>
                  Your Rules.
                </h2>

                <p>
                  This sample updates as you change the
                  active theme settings.
                </p>

                <button type="button">
                  EXPLORE THE HUB
                </button>
              </div>


              <div class="theme-preview-products">

                <article>
                  <div class="sample-product-image">
                    GLAM
                  </div>

                  <h4>Featured Product</h4>

                  <p>$27.00</p>

                  <button type="button">
                    VIEW PRODUCT
                  </button>
                </article>


                <article>
                  <div class="sample-product-image">
                    CREATE
                  </div>

                  <h4>Creator Bundle</h4>

                  <p>$47.00</p>

                  <button type="button">
                    SHOP NOW
                  </button>
                </article>

              </div>


              <div
                class="theme-preview-footer"
                id="themePreviewFooter"
              >
                Glam Hustle Hub
              </div>

            </div>

          </div>

        </div>

      </div>
    `;
  }

  /* =======================================================
     COLOR CONTROL DEFINITIONS
  ======================================================== */

  const globalColorDefinitions = [
    ["primary", "Primary Color"],
    ["secondary", "Secondary Color"],
    ["accent", "Accent / Highlight"],
    ["background", "Site Background"],
    ["heading", "Heading Text"],
    ["bodyText", "Body Text"],
    ["buttonBackground", "Button Background"],
    ["buttonText", "Button Text"],
    ["cardBackground", "Card Background"],
    ["cardText", "Card Text"],
    ["cardBorder", "Card Border"],
    ["navigationBackground", "Navigation Background"],
    ["navigationText", "Navigation Text"],
    ["footerBackground", "Footer Background"],
    ["footerText", "Footer Text"]
  ];

  const sectionDefinitions = [
    ["mansion", "Mansion Hero"],
    ["quickAccess", "Quick Access"],
    ["featuredProducts", "Featured Products"],
    ["about", "About"],
    ["reviews", "Reviews"],
    ["footer", "Footer"]
  ];

  function buildColorControls() {
    const container = document.getElementById(
      "globalColorControls"
    );

    if (!container) return;

    container.innerHTML = "";

    globalColorDefinitions.forEach(
      ([key, label]) => {
        const field = document.createElement("div");

        field.className = "color-control";

        field.innerHTML = `
          <span class="color-control-label">
            ${label}
          </span>

          <div class="color-input-row">

            <input
              type="color"
              data-color-picker="${key}"
            />

            <input
              type="text"
              maxlength="7"
              data-color-hex="${key}"
              spellcheck="false"
            />

          </div>
        `;

        container.appendChild(field);
      }
    );
  }

  function buildSectionOverrides() {
    const container = document.getElementById(
      "sectionOverrideList"
    );

    if (!container) return;

    container.innerHTML = "";

    sectionDefinitions.forEach(
      ([sectionKey, label]) => {
        const block = document.createElement("article");

        block.className = "section-override-card";

        block.innerHTML = `
          <div class="section-override-heading">

            <div>
              <strong>${label}</strong>

              <small>
                Override global theme colors
              </small>
            </div>

            <label class="toggle-switch">
              <input
                type="checkbox"
                data-section-toggle="${sectionKey}"
              />

              <span></span>
            </label>

          </div>


          <div
            class="section-override-controls"
            data-section-controls="${sectionKey}"
          >

            ${createSectionColorField(
              sectionKey,
              "background",
              "Background"
            )}

            ${createSectionColorField(
              sectionKey,
              "text",
              "Text"
            )}

            ${createSectionColorField(
              sectionKey,
              "accent",
              "Accent"
            )}

          </div>
        `;

        container.appendChild(block);
      }
    );
  }

  function createSectionColorField(
    sectionKey,
    colorKey,
    label
  ) {
    return `
      <div class="mini-color-control">

        <span>${label}</span>

        <div>

          <input
            type="color"
            data-section-color-picker="${sectionKey}:${colorKey}"
          />

          <input
            type="text"
            maxlength="7"
            data-section-color-hex="${sectionKey}:${colorKey}"
          />

        </div>

      </div>
    `;
  }

  buildColorControls();
  buildSectionOverrides();

  /* =======================================================
     THEME CARD RENDERING
  ======================================================== */

  function renderThemeCards() {
    const grid = document.getElementById(
      "savedThemeGrid"
    );

    if (!grid) return;

    grid.innerHTML = "";

    themes.forEach((theme) => {
      const card = document.createElement("button");

      card.type = "button";

      card.className = "saved-theme-card";

      if (theme.id === editingThemeId) {
        card.classList.add("editing");
      }

      if (theme.id === activeThemeId) {
        card.classList.add("active-theme");
      }

      card.innerHTML = `
        <div
          class="saved-theme-preview"
          style="
            background:
              linear-gradient(
                135deg,
                ${theme.colors.primary},
                ${theme.colors.secondary}
              );
          "
        >
          <span
            style="
              background:${theme.colors.cardBackground};
            "
          ></span>

          <span
            style="
              background:${theme.colors.accent};
            "
          ></span>
        </div>

        <strong>
          ${escapeHTML(theme.name)}
        </strong>

        <small>
          ${
            theme.id === activeThemeId
              ? "Active Theme"
              : "Saved Theme"
          }
        </small>
      `;

      card.addEventListener("click", () => {
        editingThemeId = theme.id;
        renderThemeStudio();
      });

      grid.appendChild(card);
    });
  }

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  /* =======================================================
     LOAD CURRENT THEME INTO CONTROLS
  ======================================================== */

  function renderThemeStudio() {
    const theme = getEditingTheme();

    if (!theme) return;

    const heading = document.getElementById(
      "editingThemeName"
    );

    if (heading) {
      heading.textContent = theme.name;
    }

    globalColorDefinitions.forEach(
      ([key]) => {
        const picker = document.querySelector(
          `[data-color-picker="${key}"]`
        );

        const hex = document.querySelector(
          `[data-color-hex="${key}"]`
        );

        if (picker) {
          picker.value = theme.colors[key];
        }

        if (hex) {
          hex.value = theme.colors[key];
        }
      }
    );

    const headingFontSelect =
      document.getElementById(
        "headingFontSelect"
      );

    const bodyFontSelect =
      document.getElementById(
        "bodyFontSelect"
      );

    const displayFontSelect =
      document.getElementById(
        "displayFontSelect"
      );

    if (headingFontSelect) {
      headingFontSelect.value =
        theme.fonts.heading;
    }

    if (bodyFontSelect) {
      bodyFontSelect.value =
        theme.fonts.body;
    }

    if (displayFontSelect) {
      displayFontSelect.value =
        theme.fonts.display;
    }

    const customHeading =
      document.getElementById(
        "customHeadingFont"
      );

    const customBody =
      document.getElementById(
        "customBodyFont"
      );

    const customDisplay =
      document.getElementById(
        "customDisplayFont"
      );

    if (customHeading) {
      customHeading.value =
        theme.fonts.customHeading || "";
    }

    if (customBody) {
      customBody.value =
        theme.fonts.customBody || "";
    }

    if (customDisplay) {
      customDisplay.value =
        theme.fonts.customDisplay || "";
    }

    sectionDefinitions.forEach(
      ([sectionKey]) => {
        const section =
          theme.sections[sectionKey];

        if (!section) return;

        const toggle = document.querySelector(
          `[data-section-toggle="${sectionKey}"]`
        );

        const controls = document.querySelector(
          `[data-section-controls="${sectionKey}"]`
        );

        if (toggle) {
          toggle.checked = section.override;
        }

        if (controls) {
          controls.classList.toggle(
            "enabled",
            section.override
          );
        }

        ["background", "text", "accent"].forEach(
          (colorKey) => {
            const picker =
              document.querySelector(
                `[data-section-color-picker="${sectionKey}:${colorKey}"]`
              );

            const hex =
              document.querySelector(
                `[data-section-color-hex="${sectionKey}:${colorKey}"]`
              );

            if (picker) {
              picker.value =
                section[colorKey];
            }

            if (hex) {
              hex.value =
                section[colorKey];
            }
          }
        );
      }
    );

    renderThemeCards();
    updateThemePreview();
  }

  /* =======================================================
     HEX VALIDATION
  ======================================================== */

  function normalizeHex(value) {
    let color = value.trim();

    if (!color.startsWith("#")) {
      color = `#${color}`;
    }

    if (
      /^#[0-9A-Fa-f]{6}$/.test(color)
    ) {
      return color.toUpperCase();
    }

    return null;
  }

  /* =======================================================
     GLOBAL COLOR EVENTS
  ======================================================== */

  document.querySelectorAll(
    "[data-color-picker]"
  ).forEach((picker) => {
    picker.addEventListener("input", () => {
      const key =
        picker.dataset.colorPicker;

      const theme = getEditingTheme();

      theme.colors[key] =
        picker.value.toUpperCase();

      const hex = document.querySelector(
        `[data-color-hex="${key}"]`
      );

      if (hex) {
        hex.value = theme.colors[key];
      }

      saveThemes();
      updateThemePreview();
      renderThemeCards();
    });
  });

  document.querySelectorAll(
    "[data-color-hex]"
  ).forEach((input) => {
    input.addEventListener("change", () => {
      const key =
        input.dataset.colorHex;

      const valid =
        normalizeHex(input.value);

      const theme = getEditingTheme();

      if (!valid) {
        input.value = theme.colors[key];

        showToast(
          "Use a six-digit hex color such as #168FEA."
        );

        return;
      }

      theme.colors[key] = valid;
      input.value = valid;

      const picker = document.querySelector(
        `[data-color-picker="${key}"]`
      );

      if (picker) {
        picker.value = valid;
      }

      saveThemes();
      updateThemePreview();
      renderThemeCards();
    });
  });

  /* =======================================================
     FONT EVENTS
  ======================================================== */

  document.querySelectorAll(
    "[data-font-key]"
  ).forEach((select) => {
    select.addEventListener("change", () => {
      const theme = getEditingTheme();

      theme.fonts[
        select.dataset.fontKey
      ] = select.value;

      saveThemes();
      updateThemePreview();
    });
  });

  const customFontMap = {
    customHeadingFont: "customHeading",
    customBodyFont: "customBody",
    customDisplayFont: "customDisplay"
  };

  Object.entries(customFontMap).forEach(
    ([elementId, key]) => {
      const input =
        document.getElementById(elementId);

      input?.addEventListener(
        "input",
        () => {
          const theme =
            getEditingTheme();

          theme.fonts[key] =
            input.value.trim();

          saveThemes();
          updateThemePreview();
        }
      );
    }
  );

  /* =======================================================
     SECTION OVERRIDE EVENTS
  ======================================================== */

  document.querySelectorAll(
    "[data-section-toggle]"
  ).forEach((toggle) => {
    toggle.addEventListener("change", () => {
      const sectionKey =
        toggle.dataset.sectionToggle;

      const theme = getEditingTheme();

      theme.sections[
        sectionKey
      ].override = toggle.checked;

      const controls = document.querySelector(
        `[data-section-controls="${sectionKey}"]`
      );

      controls?.classList.toggle(
        "enabled",
        toggle.checked
      );

      saveThemes();
      updateThemePreview();
    });
  });

  document.querySelectorAll(
    "[data-section-color-picker]"
  ).forEach((picker) => {
    picker.addEventListener("input", () => {
      const [
        sectionKey,
        colorKey
      ] =
        picker.dataset.sectionColorPicker.split(
          ":"
        );

      const theme = getEditingTheme();

      theme.sections[sectionKey][colorKey] =
        picker.value.toUpperCase();

      const hex = document.querySelector(
        `[data-section-color-hex="${sectionKey}:${colorKey}"]`
      );

      if (hex) {
        hex.value =
          theme.sections[sectionKey][colorKey];
      }

      saveThemes();
      updateThemePreview();
    });
  });

  document.querySelectorAll(
    "[data-section-color-hex]"
  ).forEach((input) => {
    input.addEventListener("change", () => {
      const [
        sectionKey,
        colorKey
      ] =
        input.dataset.sectionColorHex.split(
          ":"
        );

      const valid =
        normalizeHex(input.value);

      const theme = getEditingTheme();

      if (!valid) {
        input.value =
          theme.sections[
            sectionKey
          ][colorKey];

        showToast(
          "Use a six-digit hex color such as #168FEA."
        );

        return;
      }

      theme.sections[
        sectionKey
      ][colorKey] = valid;

      input.value = valid;

      const picker = document.querySelector(
        `[data-section-color-picker="${sectionKey}:${colorKey}"]`
      );

      if (picker) {
        picker.value = valid;
      }

      saveThemes();
      updateThemePreview();
    });
  });

  /* =======================================================
     THEME MANAGEMENT
  ======================================================== */

  document.getElementById(
    "createThemeButton"
  )?.addEventListener("click", () => {
    const name = prompt(
      "What do you want to call this theme?"
    );

    if (!name?.trim()) return;

    const theme = deepClone(defaultTheme);

    theme.id =
      `${slugify(name)}-${Date.now()}`;

    theme.name = name.trim();

    themes.push(theme);

    editingThemeId = theme.id;

    saveThemes();
    renderThemeStudio();

    showToast(
      `Theme "${theme.name}" created.`
    );
  });

  document.getElementById(
    "duplicateThemeButton"
  )?.addEventListener("click", () => {
    const source =
      getEditingTheme();

    if (!source) return;

    const duplicate =
      deepClone(source);

    duplicate.id =
      `${source.id}-copy-${Date.now()}`;

    duplicate.name =
      `${source.name} Copy`;

    themes.push(duplicate);

    editingThemeId =
      duplicate.id;

    saveThemes();
    renderThemeStudio();

    showToast(
      "Theme duplicated."
    );
  });

  document.getElementById(
    "renameThemeButton"
  )?.addEventListener("click", () => {
    const theme =
      getEditingTheme();

    if (!theme) return;

    const newName = prompt(
      "Rename this theme:",
      theme.name
    );

    if (!newName?.trim()) return;

    theme.name =
      newName.trim();

    saveThemes();
    renderThemeStudio();

    showToast(
      "Theme renamed."
    );
  });

  document.getElementById(
    "setActiveThemeButton"
  )?.addEventListener("click", () => {
    const theme =
      getEditingTheme();

    if (!theme) return;

    activeThemeId =
      theme.id;

    localStorage.setItem(
      ACTIVE_THEME_KEY,
      activeThemeId
    );

    renderThemeStudio();

    showToast(
      `"${theme.name}" is now the active theme.`
    );
  });

  document.getElementById(
    "deleteThemeButton"
  )?.addEventListener("click", () => {
    if (themes.length <= 1) {
      showToast(
        "You must keep at least one theme."
      );

      return;
    }

    const theme =
      getEditingTheme();

    if (!theme) return;

    const confirmed = confirm(
      `Delete "${theme.name}"?`
    );

    if (!confirmed) return;

    themes = themes.filter(
      (item) =>
        item.id !== theme.id
    );

    if (
      activeThemeId === theme.id
    ) {
      activeThemeId =
        themes[0].id;

      localStorage.setItem(
        ACTIVE_THEME_KEY,
        activeThemeId
      );
    }

    editingThemeId =
      activeThemeId;

    saveThemes();
    renderThemeStudio();

    showToast(
      "Theme deleted."
    );
  });

  /* =======================================================
     LIVE THEME PREVIEW
  ======================================================== */

  function getResolvedFont(
    customFont,
    selectedFont
  ) {
    if (customFont?.trim()) {
      return `"${customFont.trim()}", ${selectedFont}`;
    }

    return selectedFont;
  }

  function updateThemePreview() {
    const theme =
      getEditingTheme();

    if (!theme) return;

    const preview =
      document.getElementById(
        "websiteThemePreview"
      );

    if (!preview) return;

    preview.style.setProperty(
      "--preview-primary",
      theme.colors.primary
    );

    preview.style.setProperty(
      "--preview-secondary",
      theme.colors.secondary
    );

    preview.style.setProperty(
      "--preview-accent",
      theme.colors.accent
    );

    preview.style.setProperty(
      "--preview-background",
      theme.colors.background
    );

    preview.style.setProperty(
      "--preview-heading",
      theme.colors.heading
    );

    preview.style.setProperty(
      "--preview-body",
      theme.colors.bodyText
    );

    preview.style.setProperty(
      "--preview-button",
      theme.colors.buttonBackground
    );

    preview.style.setProperty(
      "--preview-button-text",
      theme.colors.buttonText
    );

    preview.style.setProperty(
      "--preview-card",
      theme.colors.cardBackground
    );

    preview.style.setProperty(
      "--preview-card-text",
      theme.colors.cardText
    );

    preview.style.setProperty(
      "--preview-card-border",
      theme.colors.cardBorder
    );

    preview.style.setProperty(
      "--preview-nav",
      theme.colors.navigationBackground
    );

    preview.style.setProperty(
      "--preview-nav-text",
      theme.colors.navigationText
    );

    preview.style.setProperty(
      "--preview-footer",
      theme.colors.footerBackground
    );

    preview.style.setProperty(
      "--preview-footer-text",
      theme.colors.footerText
    );

    preview.style.setProperty(
      "--preview-heading-font",
      getResolvedFont(
        theme.fonts.customHeading,
        theme.fonts.heading
      )
    );

    preview.style.setProperty(
      "--preview-body-font",
      getResolvedFont(
        theme.fonts.customBody,
        theme.fonts.body
      )
    );

    preview.style.setProperty(
      "--preview-display-font",
      getResolvedFont(
        theme.fonts.customDisplay,
        theme.fonts.display
      )
    );

    const mansion =
      theme.sections.mansion;

    const hero =
      document.getElementById(
        "themePreviewHero"
      );

    if (hero) {
      hero.style.background =
        mansion.override
          ? mansion.background
          : theme.colors.secondary;

      hero.style.color =
        mansion.override
          ? mansion.text
          : theme.colors.accent;

      hero.style.setProperty(
        "--section-accent",
        mansion.override
          ? mansion.accent
          : theme.colors.primary
      );
    }

    const footerSection =
      theme.sections.footer;

    const footer =
      document.getElementById(
        "themePreviewFooter"
      );

    if (footer) {
      footer.style.background =
        footerSection.override
          ? footerSection.background
          : theme.colors.footerBackground;

      footer.style.color =
        footerSection.override
          ? footerSection.text
          : theme.colors.footerText;
    }
  }

  renderThemeStudio();

  /* =======================================================
     OTHER PLACEHOLDER BUTTONS
  ======================================================== */

  document.querySelectorAll(
    ".screen-heading .primary-button"
  ).forEach((button) => {
    if (
      button.id === "createThemeButton" ||
      button.id === "publishWebsite" ||
      button.id === "publishMainButton"
    ) {
      return;
    }

    button.addEventListener("click", () => {
      showToast(
        "This control will be connected in its editor."
      );
    });
  });

  /* =======================================================
     RESPONSIVE CLEANUP
  ======================================================== */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMobileSidebar();
    }

    if (
      window.innerWidth <= 900 &&
      body.classList.contains(
        "sidebar-collapsed"
      )
    ) {
      body.classList.remove(
        "sidebar-collapsed"
      );
    }

    if (
      window.innerWidth > 900 &&
      localStorage.getItem(
        "glamAdminSidebarCollapsed"
      ) === "true"
    ) {
      body.classList.add(
        "sidebar-collapsed"
      );
    }
  });

  console.log(
    "GLAM Website Control Center loaded."
  );
});

/* =========================================================
   GLAM WEBSITE CONTROL CENTER
   MANSION STUDIO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const mansionScreen =
    document.getElementById("screen-mansion");

  if (!mansionScreen) return;


  /* =======================================================
     STORAGE
  ======================================================== */

  const MANSION_STORAGE_KEY =
    "glamWebsiteMansionScenes";

  const ACTIVE_MANSION_KEY =
    "glamWebsiteActiveMansionScene";


  const defaultMansionScene = {
    id: "main-mansion",
    name: "Main GLAM Mansion",

    image:
      "../images/sapphire-mansion-city.png",

    background: "#103B63",

    rooms: [
      {
        id: "freebies",
        name: "Freebie Lounge",
        link: "https://pin.it/7EFoolKlz",
        visible: true,
        x: 16,
        y: 61,
        width: 150,
        height: 58,
        textColor: "#FFFFFF",
        backgroundColor: "#168FEA",
        hoverStyle: "glow",
        animation: "none"
      },

      {
        id: "best-sellers",
        name: "Best-Seller Gallery",
        link: "#best",
        visible: true,
        x: 35,
        y: 44,
        width: 170,
        height: 58,
        textColor: "#FFFFFF",
        backgroundColor: "#103B63",
        hoverStyle: "lift",
        animation: "none"
      },

      {
        id: "shop",
        name: "The Grand Shop",
        link:
          "https://payhip.com/GlowUpbyGlam/collection/all",
        visible: true,
        x: 52,
        y: 55,
        width: 160,
        height: 58,
        textColor: "#FFFFFF",
        backgroundColor: "#168FEA",
        hoverStyle: "glow",
        animation: "none"
      },

      {
        id: "support",
        name: "1:1 Support Suite",
        link: "../one-on-one.html",
        visible: true,
        x: 72,
        y: 66,
        width: 170,
        height: 58,
        textColor: "#FFFFFF",
        backgroundColor: "#103B63",
        hoverStyle: "lift",
        animation: "none"
      },

      {
        id: "generators",
        name: "Generator Lab",
        link:
          "https://payhip.com/GlowUpbyGlam/collection/luxury-prompt-generators",
        visible: true,
        x: 26,
        y: 29,
        width: 155,
        height: 58,
        textColor: "#FFFFFF",
        backgroundColor: "#168FEA",
        hoverStyle: "glow",
        animation: "none"
      },

      {
        id: "vault",
        name: "Glam Vault Lounge",
        link: "https://payhip.com/b/54LoK",
        visible: true,
        x: 65,
        y: 31,
        width: 165,
        height: 58,
        textColor: "#FFFFFF",
        backgroundColor: "#103B63",
        hoverStyle: "glow",
        animation: "none"
      },

      {
        id: "community",
        name: "Community Lounge",
        link:
          "https://www.facebook.com/share/g/1Sv3VVCSaR/",
        visible: true,
        x: 82,
        y: 42,
        width: 165,
        height: 58,
        textColor: "#FFFFFF",
        backgroundColor: "#168FEA",
        hoverStyle: "lift",
        animation: "none"
      },

      {
        id: "bundles",
        name: "Bundle Vault",
        link:
          "https://payhip.com/GlowUpbyGlam/collection/bundles",
        visible: true,
        x: 45,
        y: 74,
        width: 150,
        height: 58,
        textColor: "#FFFFFF",
        backgroundColor: "#103B63",
        hoverStyle: "glow",
        animation: "none"
      },

      {
        id: "pngs",
        name: "$2 PNG Gallery",
        link: "https://pin.it/NGr63tHjX/",
        visible: true,
        x: 21,
        y: 78,
        width: 150,
        height: 58,
        textColor: "#FFFFFF",
        backgroundColor: "#168FEA",
        hoverStyle: "lift",
        animation: "none"
      },

      {
        id: "reviews",
        name: "Review Salon",
        link: "#reviews",
        visible: true,
        x: 77,
        y: 80,
        width: 145,
        height: 58,
        textColor: "#FFFFFF",
        backgroundColor: "#103B63",
        hoverStyle: "glow",
        animation: "none"
      }
    ]
  };


  /* =======================================================
     HELPERS
  ======================================================== */

  function clone(value) {
    return JSON.parse(
      JSON.stringify(value)
    );
  }


  function saveScenes() {
    localStorage.setItem(
      MANSION_STORAGE_KEY,
      JSON.stringify(mansionScenes)
    );
  }


  function loadScenes() {
    try {
      const saved =
        JSON.parse(
          localStorage.getItem(
            MANSION_STORAGE_KEY
          )
        );

      if (
        Array.isArray(saved) &&
        saved.length
      ) {
        return saved;
      }
    } catch (error) {
      console.warn(
        "Could not load mansion scenes.",
        error
      );
    }

    const startingScene =
      clone(defaultMansionScene);

    localStorage.setItem(
      MANSION_STORAGE_KEY,
      JSON.stringify([startingScene])
    );

    localStorage.setItem(
      ACTIVE_MANSION_KEY,
      startingScene.id
    );

    return [startingScene];
  }


  function makeId(value) {
    return (
      String(value)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") +
      "-" +
      Date.now()
    );
  }


  function escapeMansionHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }


  function clamp(value, min, max) {
    return Math.min(
      Math.max(value, min),
      max
    );
  }


  function notifyMansion(message) {
    const toast =
      document.getElementById(
        "adminToast"
      );

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(
      window.glamMansionToastTimer
    );

    window.glamMansionToastTimer =
      setTimeout(() => {
        toast.classList.remove("show");
      }, 2500);
  }


  let mansionScenes = loadScenes();

  let activeMansionSceneId =
    localStorage.getItem(
      ACTIVE_MANSION_KEY
    ) ||
    mansionScenes[0].id;

  let editingMansionSceneId =
    activeMansionSceneId;

  let selectedRoomId = null;


  function getScene() {
    return mansionScenes.find(
      (scene) =>
        scene.id ===
        editingMansionSceneId
    );
  }


  function getSelectedRoom() {
    const scene = getScene();

    if (!scene) return null;

    return scene.rooms.find(
      (room) =>
        room.id === selectedRoomId
    );
  }


  /* =======================================================
     BUILD MANSION STUDIO
  ======================================================== */

  mansionScreen.innerHTML = `
    <div class="screen-heading">
      <div>
        <span class="section-kicker">
          INTERACTIVE HOMEPAGE
        </span>

        <h2>Mansion Studio</h2>

        <p>
          Design your mansion scenes and drag each room
          exactly where you want it.
        </p>
      </div>

      <button
        class="primary-button"
        id="newMansionSceneButton"
        type="button"
      >
        + New Mansion
      </button>
    </div>


    <div
      class="mansion-scene-grid"
      id="mansionSceneGrid"
    ></div>


    <div class="mansion-studio-layout">

      <div class="mansion-control-column">

        <div class="panel">

          <div class="panel-heading">
            <div>
              <span class="section-kicker">
                MANSION DESIGN
              </span>

              <h3 id="mansionSceneTitle">
                Main GLAM Mansion
              </h3>
            </div>
          </div>


          <div class="mansion-action-row">

            <button
              class="secondary-button"
              id="setActiveMansionButton"
              type="button"
            >
              Set Active
            </button>

            <button
              class="secondary-button"
              id="renameMansionButton"
              type="button"
            >
              Rename
            </button>

            <button
              class="secondary-button"
              id="duplicateMansionButton"
              type="button"
            >
              Duplicate
            </button>

            <button
              class="danger-button"
              id="deleteMansionButton"
              type="button"
            >
              Delete
            </button>

          </div>

        </div>


        <div class="panel">

          <div class="panel-heading">
            <div>
              <span class="section-kicker">
                MANSION IMAGE
              </span>

              <h3>
                Background
              </h3>
            </div>
          </div>


          <label class="theme-field">
            <span>
              Image URL or File Path
            </span>

            <input
              id="mansionImageUrl"
              type="text"
              placeholder="../images/mansion.png"
            />
          </label>


          <label
            class="mansion-upload-button"
          >
            <input
              id="mansionImageUpload"
              type="file"
              accept="image/*"
            />

            <span>
              Upload Mansion Image
            </span>
          </label>


          <p class="theme-helper-text">
            Uploaded images are stored in this browser
            during this build stage. The Media Library
            will handle permanent uploads later.
          </p>

        </div>


        <div class="panel">

          <div class="panel-heading mansion-room-heading">

            <div>
              <span class="section-kicker">
                ROOMS
              </span>

              <h3>
                Mansion rooms
              </h3>
            </div>

            <button
              class="secondary-button"
              id="addMansionRoomButton"
              type="button"
            >
              + Add Room
            </button>

          </div>


          <div
            class="mansion-room-list"
            id="mansionRoomList"
          ></div>

        </div>


        <div
          class="panel"
          id="roomEditorPanel"
        >

          <div class="panel-heading">
            <div>
              <span class="section-kicker">
                ROOM SETTINGS
              </span>

              <h3 id="roomEditorTitle">
                Select a room
              </h3>
            </div>
          </div>


          <div
            id="roomEditorEmpty"
            class="mansion-editor-empty"
          >
            Select a room from the list or click
            a hotspot on the mansion.
          </div>


          <div
            id="roomEditorControls"
            class="mansion-room-editor"
            hidden
          >

            <label class="theme-field">
              <span>Room Name</span>

              <input
                id="roomNameInput"
                type="text"
              />
            </label>


            <label class="theme-field">
              <span>Destination Link</span>

              <input
                id="roomLinkInput"
                type="text"
                placeholder="https://... or /page"
              />
            </label>


            <div class="mansion-toggle-row">

              <span>
                Show This Room
              </span>

              <label class="toggle-switch">
                <input
                  id="roomVisibleInput"
                  type="checkbox"
                />

                <span></span>
              </label>

            </div>


            <div class="mansion-position-grid">

              <label class="theme-field">
                <span>X Position %</span>

                <input
                  id="roomXInput"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </label>


              <label class="theme-field">
                <span>Y Position %</span>

                <input
                  id="roomYInput"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </label>

            </div>


            <div class="mansion-position-grid">

              <label class="theme-field">
                <span>Width</span>

                <input
                  id="roomWidthInput"
                  type="number"
                  min="70"
                  max="350"
                  step="1"
                />
              </label>


              <label class="theme-field">
                <span>Height</span>

                <input
                  id="roomHeightInput"
                  type="number"
                  min="38"
                  max="180"
                  step="1"
                />
              </label>

            </div>


            <div class="mansion-position-grid">

              <div class="color-control">

                <span class="color-control-label">
                  Text Color
                </span>

                <div class="color-input-row">

                  <input
                    id="roomTextColorPicker"
                    type="color"
                  />

                  <input
                    id="roomTextColorHex"
                    type="text"
                    maxlength="7"
                  />

                </div>

              </div>


              <div class="color-control">

                <span class="color-control-label">
                  Background Color
                </span>

                <div class="color-input-row">

                  <input
                    id="roomBackgroundColorPicker"
                    type="color"
                  />

                  <input
                    id="roomBackgroundColorHex"
                    type="text"
                    maxlength="7"
                  />

                </div>

              </div>

            </div>


            <label class="theme-field">
              <span>Hover Style</span>

              <select id="roomHoverInput">

                <option value="none">
                  None
                </option>

                <option value="glow">
                  Glow
                </option>

                <option value="lift">
                  Lift
                </option>

                <option value="outline">
                  Bright Outline
                </option>

                <option value="zoom">
                  Gentle Zoom
                </option>

              </select>
            </label>


            <label class="theme-field">
              <span>Animation</span>

              <select id="roomAnimationInput">

                <option value="none">
                  None
                </option>

                <option value="float">
                  Float
                </option>

                <option value="pulse">
                  Pulse
                </option>

                <option value="shimmer">
                  Shimmer
                </option>

                <option value="soft-glow">
                  Soft Glow
                </option>

              </select>
            </label>


            <button
              class="danger-button mansion-delete-room"
              id="deleteMansionRoomButton"
              type="button"
            >
              Delete Room
            </button>

          </div>

        </div>

      </div>


      <div class="mansion-preview-column">

        <div class="panel mansion-preview-panel">

          <div class="panel-heading">

            <div>
              <span class="section-kicker">
                LIVE MANSION EDITOR
              </span>

              <h3>
                Drag your rooms
              </h3>
            </div>

            <span class="mansion-drag-note">
              Drag hotspots to reposition
            </span>

          </div>


          <div
            class="mansion-editor-stage"
            id="mansionEditorStage"
          >

            <img
              id="mansionEditorImage"
              src="../images/sapphire-mansion-city.png"
              alt="GLAM Hustle Hub mansion"
            />

            <div
              id="mansionHotspotLayer"
              class="mansion-hotspot-layer"
            ></div>

          </div>


          <div class="mansion-preview-help">
            Click a room to edit it. Drag it directly
            across the mansion to change its position.
          </div>

        </div>

      </div>

    </div>
  `;


  /* =======================================================
     REFERENCES
  ======================================================== */

  const sceneGrid =
    document.getElementById(
      "mansionSceneGrid"
    );

  const roomList =
    document.getElementById(
      "mansionRoomList"
    );

  const stage =
    document.getElementById(
      "mansionEditorStage"
    );

  const mansionImage =
    document.getElementById(
      "mansionEditorImage"
    );

  const hotspotLayer =
    document.getElementById(
      "mansionHotspotLayer"
    );

  const sceneTitle =
    document.getElementById(
      "mansionSceneTitle"
    );

  const imageUrlInput =
    document.getElementById(
      "mansionImageUrl"
    );

  const imageUploadInput =
    document.getElementById(
      "mansionImageUpload"
    );

  const roomEditorEmpty =
    document.getElementById(
      "roomEditorEmpty"
    );

  const roomEditorControls =
    document.getElementById(
      "roomEditorControls"
    );

  const roomEditorTitle =
    document.getElementById(
      "roomEditorTitle"
    );

  const roomNameInput =
    document.getElementById(
      "roomNameInput"
    );

  const roomLinkInput =
    document.getElementById(
      "roomLinkInput"
    );

  const roomVisibleInput =
    document.getElementById(
      "roomVisibleInput"
    );

  const roomXInput =
    document.getElementById(
      "roomXInput"
    );

  const roomYInput =
    document.getElementById(
      "roomYInput"
    );

  const roomWidthInput =
    document.getElementById(
      "roomWidthInput"
    );

  const roomHeightInput =
    document.getElementById(
      "roomHeightInput"
    );

  const textPicker =
    document.getElementById(
      "roomTextColorPicker"
    );

  const textHex =
    document.getElementById(
      "roomTextColorHex"
    );

  const backgroundPicker =
    document.getElementById(
      "roomBackgroundColorPicker"
    );

  const backgroundHex =
    document.getElementById(
      "roomBackgroundColorHex"
    );

  const hoverInput =
    document.getElementById(
      "roomHoverInput"
    );

  const animationInput =
    document.getElementById(
      "roomAnimationInput"
    );


  /* =======================================================
     SCENE CARDS
  ======================================================== */

  function renderMansionScenes() {
    sceneGrid.innerHTML = "";

    mansionScenes.forEach((scene) => {

      const card =
        document.createElement(
          "button"
        );

      card.type = "button";

      card.className =
        "mansion-scene-card";

      if (
        scene.id ===
        editingMansionSceneId
      ) {
        card.classList.add(
          "editing"
        );
      }

      if (
        scene.id ===
        activeMansionSceneId
      ) {
        card.classList.add(
          "active-scene"
        );
      }

      card.innerHTML = `
        <div class="mansion-scene-thumb">
          <img
            src="${escapeMansionHTML(scene.image)}"
            alt=""
          />
        </div>

        <strong>
          ${escapeMansionHTML(scene.name)}
        </strong>

        <small>
          ${
            scene.id ===
            activeMansionSceneId
              ? "Active Mansion"
              : "Saved Mansion"
          }
        </small>
      `;

      card.addEventListener(
        "click",
        () => {
          editingMansionSceneId =
            scene.id;

          selectedRoomId =
            scene.rooms[0]?.id || null;

          renderMansionStudio();
        }
      );

      sceneGrid.appendChild(card);
    });
  }


  /* =======================================================
     ROOM LIST
  ======================================================== */

  function renderRoomList() {
    const scene = getScene();

    roomList.innerHTML = "";

    if (!scene.rooms.length) {
      roomList.innerHTML = `
        <div class="mansion-editor-empty">
          No rooms yet. Click Add Room.
        </div>
      `;

      return;
    }

    scene.rooms.forEach(
      (room, index) => {

        const item =
          document.createElement(
            "button"
          );

        item.type = "button";

        item.className =
          "mansion-room-item";

        if (
          room.id === selectedRoomId
        ) {
          item.classList.add(
            "selected"
          );
        }

        item.innerHTML = `
          <span class="mansion-room-number">
            ${index + 1}
          </span>

          <span class="mansion-room-name">
            ${escapeMansionHTML(room.name)}
          </span>

          <span
            class="mansion-room-status ${
              room.visible
                ? "visible-room"
                : ""
            }"
          >
            ${
              room.visible
                ? "ON"
                : "OFF"
            }
          </span>
        `;

        item.addEventListener(
          "click",
          () => {
            selectedRoomId =
              room.id;

            renderRoomList();
            renderHotspots();
            loadRoomEditor();
          }
        );

        roomList.appendChild(item);
      }
    );
  }


  /* =======================================================
     HOTSPOTS
  ======================================================== */

  function renderHotspots() {
    const scene = getScene();

    hotspotLayer.innerHTML = "";

    scene.rooms.forEach((room) => {

      if (!room.visible) return;

      const hotspot =
        document.createElement(
          "button"
        );

      hotspot.type = "button";

      hotspot.className =
        "mansion-editor-hotspot";

      hotspot.dataset.roomId =
        room.id;

      hotspot.dataset.hover =
        room.hoverStyle;

      hotspot.dataset.animation =
        room.animation;

      if (
        room.id === selectedRoomId
      ) {
        hotspot.classList.add(
          "selected"
        );
      }

      hotspot.textContent =
        room.name;

      hotspot.style.left =
        `${room.x}%`;

      hotspot.style.top =
        `${room.y}%`;

      hotspot.style.width =
        `${room.width}px`;

      hotspot.style.height =
        `${room.height}px`;

      hotspot.style.color =
        room.textColor;

      hotspot.style.background =
        room.backgroundColor;


      hotspot.addEventListener(
        "click",
        (event) => {
          event.stopPropagation();

          selectedRoomId =
            room.id;

          renderRoomList();
          renderHotspots();
          loadRoomEditor();
        }
      );


      makeHotspotDraggable(
        hotspot,
        room
      );

      hotspotLayer.appendChild(
        hotspot
      );
    });
  }


  function makeHotspotDraggable(
    hotspot,
    room
  ) {
    let dragging = false;

    let startPointerX = 0;
    let startPointerY = 0;

    let startRoomX = 0;
    let startRoomY = 0;


    hotspot.addEventListener(
      "pointerdown",
      (event) => {

        if (
          event.pointerType ===
            "mouse" &&
          event.button !== 0
        ) {
          return;
        }

        dragging = true;

        selectedRoomId =
          room.id;

        startPointerX =
          event.clientX;

        startPointerY =
          event.clientY;

        startRoomX = room.x;
        startRoomY = room.y;

        hotspot.setPointerCapture(
          event.pointerId
        );

        hotspot.classList.add(
          "dragging"
        );

        loadRoomEditor();
        renderRoomList();
      }
    );


    hotspot.addEventListener(
      "pointermove",
      (event) => {

        if (!dragging) return;

        const bounds =
          stage.getBoundingClientRect();

        if (
          !bounds.width ||
          !bounds.height
        ) {
          return;
        }

        const deltaXPercent =
          ((event.clientX -
            startPointerX) /
            bounds.width) *
          100;

        const deltaYPercent =
          ((event.clientY -
            startPointerY) /
            bounds.height) *
          100;

        room.x = Number(
          clamp(
            startRoomX +
              deltaXPercent,
            0,
            100
          ).toFixed(1)
        );

        room.y = Number(
          clamp(
            startRoomY +
              deltaYPercent,
            0,
            100
          ).toFixed(1)
        );

        hotspot.style.left =
          `${room.x}%`;

        hotspot.style.top =
          `${room.y}%`;

        roomXInput.value =
          room.x;

        roomYInput.value =
          room.y;
      }
    );


    function endDrag(event) {
      if (!dragging) return;

      dragging = false;

      hotspot.classList.remove(
        "dragging"
      );

      try {
        hotspot.releasePointerCapture(
          event.pointerId
        );
      } catch (error) {
        // Safe fallback.
      }

      saveScenes();
    }


    hotspot.addEventListener(
      "pointerup",
      endDrag
    );

    hotspot.addEventListener(
      "pointercancel",
      endDrag
    );
  }


  /* =======================================================
     ROOM EDITOR
  ======================================================== */

  function loadRoomEditor() {
    const room =
      getSelectedRoom();

    if (!room) {
      roomEditorControls.hidden =
        true;

      roomEditorEmpty.hidden =
        false;

      roomEditorTitle.textContent =
        "Select a room";

      return;
    }

    roomEditorControls.hidden =
      false;

    roomEditorEmpty.hidden =
      true;

    roomEditorTitle.textContent =
      room.name;

    roomNameInput.value =
      room.name;

    roomLinkInput.value =
      room.link || "";

    roomVisibleInput.checked =
      room.visible;

    roomXInput.value =
      room.x;

    roomYInput.value =
      room.y;

    roomWidthInput.value =
      room.width;

    roomHeightInput.value =
      room.height;

    textPicker.value =
      room.textColor;

    textHex.value =
      room.textColor;

    backgroundPicker.value =
      room.backgroundColor;

    backgroundHex.value =
      room.backgroundColor;

    hoverInput.value =
      room.hoverStyle;

    animationInput.value =
      room.animation;
  }


  function updateSelectedRoom(
    property,
    value
  ) {
    const room =
      getSelectedRoom();

    if (!room) return;

    room[property] = value;

    saveScenes();
    renderRoomList();
    renderHotspots();

    roomEditorTitle.textContent =
      room.name;
  }


  roomNameInput.addEventListener(
    "input",
    () => {
      updateSelectedRoom(
        "name",
        roomNameInput.value ||
          "Untitled Room"
      );
    }
  );


  roomLinkInput.addEventListener(
    "input",
    () => {
      updateSelectedRoom(
        "link",
        roomLinkInput.value
      );
    }
  );


  roomVisibleInput.addEventListener(
    "change",
    () => {
      updateSelectedRoom(
        "visible",
        roomVisibleInput.checked
      );
    }
  );


  roomXInput.addEventListener(
    "input",
    () => {
      updateSelectedRoom(
        "x",
        clamp(
          Number(roomXInput.value),
          0,
          100
        )
      );
    }
  );


  roomYInput.addEventListener(
    "input",
    () => {
      updateSelectedRoom(
        "y",
        clamp(
          Number(roomYInput.value),
          0,
          100
        )
      );
    }
  );


  roomWidthInput.addEventListener(
    "input",
    () => {
      updateSelectedRoom(
        "width",
        clamp(
          Number(
            roomWidthInput.value
          ),
          70,
          350
        )
      );
    }
  );


  roomHeightInput.addEventListener(
    "input",
    () => {
      updateSelectedRoom(
        "height",
        clamp(
          Number(
            roomHeightInput.value
          ),
          38,
          180
        )
      );
    }
  );


  function validHex(value) {
    const normalized =
      value.trim().startsWith("#")
        ? value.trim()
        : `#${value.trim()}`;

    if (
      /^#[0-9A-Fa-f]{6}$/.test(
        normalized
      )
    ) {
      return normalized.toUpperCase();
    }

    return null;
  }


  textPicker.addEventListener(
    "input",
    () => {
      textHex.value =
        textPicker.value.toUpperCase();

      updateSelectedRoom(
        "textColor",
        textHex.value
      );
    }
  );


  textHex.addEventListener(
    "change",
    () => {
      const color =
        validHex(textHex.value);

      if (!color) {
        loadRoomEditor();
        notifyMansion(
          "Use a six-digit hex color."
        );
        return;
      }

      textHex.value = color;
      textPicker.value = color;

      updateSelectedRoom(
        "textColor",
        color
      );
    }
  );


  backgroundPicker.addEventListener(
    "input",
    () => {
      backgroundHex.value =
        backgroundPicker.value.toUpperCase();

      updateSelectedRoom(
        "backgroundColor",
        backgroundHex.value
      );
    }
  );


  backgroundHex.addEventListener(
    "change",
    () => {
      const color =
        validHex(
          backgroundHex.value
        );

      if (!color) {
        loadRoomEditor();

        notifyMansion(
          "Use a six-digit hex color."
        );

        return;
      }

      backgroundHex.value = color;
      backgroundPicker.value = color;

      updateSelectedRoom(
        "backgroundColor",
        color
      );
    }
  );


  hoverInput.addEventListener(
    "change",
    () => {
      updateSelectedRoom(
        "hoverStyle",
        hoverInput.value
      );
    }
  );


  animationInput.addEventListener(
    "change",
    () => {
      updateSelectedRoom(
        "animation",
        animationInput.value
      );
    }
  );


  /* =======================================================
     IMAGE
  ======================================================== */

  imageUrlInput.addEventListener(
    "change",
    () => {
      const scene = getScene();

      if (!scene) return;

      const value =
        imageUrlInput.value.trim();

      if (!value) return;

      scene.image = value;

      saveScenes();
      renderMansionStudio();
    }
  );


  imageUploadInput.addEventListener(
    "change",
    () => {
      const file =
        imageUploadInput.files?.[0];

      if (!file) return;

      if (
        !file.type.startsWith(
          "image/"
        )
      ) {
        notifyMansion(
          "Please choose an image file."
        );

        return;
      }

      const reader =
        new FileReader();

      reader.onload = () => {
        const scene = getScene();

        if (!scene) return;

        scene.image =
          reader.result;

        saveScenes();
        renderMansionStudio();

        notifyMansion(
          "Mansion image loaded."
        );
      };

      reader.readAsDataURL(file);
    }
  );


  /* =======================================================
     ADD / DELETE ROOMS
  ======================================================== */

  document.getElementById(
    "addMansionRoomButton"
  ).addEventListener(
    "click",
    () => {
      const scene = getScene();

      const newRoom = {
        id:
          "room-" + Date.now(),

        name:
          "New Room",

        link:
          "#",

        visible:
          true,

        x:
          50,

        y:
          50,

        width:
          150,

        height:
          58,

        textColor:
          "#FFFFFF",

        backgroundColor:
          "#168FEA",

        hoverStyle:
          "glow",

        animation:
          "none"
      };

      scene.rooms.push(
        newRoom
      );

      selectedRoomId =
        newRoom.id;

      saveScenes();
      renderMansionStudio();

      notifyMansion(
        "New room added."
      );
    }
  );


  document.getElementById(
    "deleteMansionRoomButton"
  ).addEventListener(
    "click",
    () => {
      const scene = getScene();

      const room =
        getSelectedRoom();

      if (!scene || !room) return;

      if (
        !confirm(
          `Delete "${room.name}"?`
        )
      ) {
        return;
      }

      scene.rooms =
        scene.rooms.filter(
          (item) =>
            item.id !== room.id
        );

      selectedRoomId =
        scene.rooms[0]?.id ||
        null;

      saveScenes();
      renderMansionStudio();

      notifyMansion(
        "Room deleted."
      );
    }
  );


  /* =======================================================
     MANSION SCENE MANAGEMENT
  ======================================================== */

  document.getElementById(
    "newMansionSceneButton"
  ).addEventListener(
    "click",
    () => {
      const name =
        prompt(
          "What do you want to call this mansion?"
        );

      if (!name?.trim()) return;

      const newScene =
        clone(defaultMansionScene);

      newScene.id =
        makeId(name);

      newScene.name =
        name.trim();

      mansionScenes.push(
        newScene
      );

      editingMansionSceneId =
        newScene.id;

      selectedRoomId =
        newScene.rooms[0]?.id ||
        null;

      saveScenes();
      renderMansionStudio();

      notifyMansion(
        "New mansion created."
      );
    }
  );


  document.getElementById(
    "duplicateMansionButton"
  ).addEventListener(
    "click",
    () => {
      const source = getScene();

      if (!source) return;

      const copy =
        clone(source);

      copy.id =
        `${source.id}-copy-${Date.now()}`;

      copy.name =
        `${source.name} Copy`;

      mansionScenes.push(copy);

      editingMansionSceneId =
        copy.id;

      selectedRoomId =
        copy.rooms[0]?.id || null;

      saveScenes();
      renderMansionStudio();

      notifyMansion(
        "Mansion duplicated."
      );
    }
  );


  document.getElementById(
    "renameMansionButton"
  ).addEventListener(
    "click",
    () => {
      const scene = getScene();

      if (!scene) return;

      const name =
        prompt(
          "Rename this mansion:",
          scene.name
        );

      if (!name?.trim()) return;

      scene.name =
        name.trim();

      saveScenes();
      renderMansionStudio();

      notifyMansion(
        "Mansion renamed."
      );
    }
  );


  document.getElementById(
    "setActiveMansionButton"
  ).addEventListener(
    "click",
    () => {
      const scene = getScene();

      if (!scene) return;

      activeMansionSceneId =
        scene.id;

      localStorage.setItem(
        ACTIVE_MANSION_KEY,
        activeMansionSceneId
      );

      renderMansionStudio();

      notifyMansion(
        `"${scene.name}" is now active.`
      );
    }
  );


  document.getElementById(
    "deleteMansionButton"
  ).addEventListener(
    "click",
    () => {
      if (
        mansionScenes.length <= 1
      ) {
        notifyMansion(
          "You must keep at least one mansion."
        );

        return;
      }

      const scene = getScene();

      if (!scene) return;

      if (
        !confirm(
          `Delete "${scene.name}"?`
        )
      ) {
        return;
      }

      mansionScenes =
        mansionScenes.filter(
          (item) =>
            item.id !== scene.id
        );

      if (
        activeMansionSceneId ===
        scene.id
      ) {
        activeMansionSceneId =
          mansionScenes[0].id;

        localStorage.setItem(
          ACTIVE_MANSION_KEY,
          activeMansionSceneId
        );
      }

      editingMansionSceneId =
        activeMansionSceneId;

      selectedRoomId =
        getScene()?.rooms[0]?.id ||
        null;

      saveScenes();
      renderMansionStudio();

      notifyMansion(
        "Mansion deleted."
      );
    }
  );


  /* =======================================================
     FULL RENDER
  ======================================================== */

  function renderMansionStudio() {
    const scene = getScene();

    if (!scene) return;

    sceneTitle.textContent =
      scene.name;

    imageUrlInput.value =
      scene.image;

    mansionImage.src =
      scene.image;

    if (
      !selectedRoomId &&
      scene.rooms.length
    ) {
      selectedRoomId =
        scene.rooms[0].id;
    }

    renderMansionScenes();
    renderRoomList();
    renderHotspots();
    loadRoomEditor();
  }


  renderMansionStudio();

});

/* =========================================================
   GLAM WEBSITE CONTROL CENTER
   SHOP MANAGER
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const shopScreen =
    document.getElementById("screen-shop");

  if (!shopScreen) return;


  /* =======================================================
     STORAGE
  ======================================================== */

  const PRODUCT_STORAGE_KEY =
    "glamWebsiteProducts";

  const CATEGORY_STORAGE_KEY =
    "glamWebsiteCategories";


  const defaultCategories = [
    {
      id: "best-sellers",
      name: "Best Sellers",
      visible: true
    },
    {
      id: "prompt-generators",
      name: "Prompt Generators",
      visible: true
    },
    {
      id: "generator-bundles",
      name: "Generator Bundles",
      visible: true
    },
    {
      id: "pngs",
      name: "PNGs",
      visible: true
    },
    {
      id: "new-releases",
      name: "New Releases",
      visible: true
    },
    {
      id: "retiring-soon",
      name: "Retiring Soon",
      visible: true
    }
  ];


  const defaultProducts = [];


  /* =======================================================
     HELPERS
  ======================================================== */

  function cloneShopData(value) {
    return JSON.parse(
      JSON.stringify(value)
    );
  }


  function loadShopData(key, fallback) {
    try {
      const saved =
        JSON.parse(
          localStorage.getItem(key)
        );

      if (Array.isArray(saved)) {
        return saved;
      }
    } catch (error) {
      console.warn(
        "Could not load shop data.",
        error
      );
    }

    const starting =
      cloneShopData(fallback);

    localStorage.setItem(
      key,
      JSON.stringify(starting)
    );

    return starting;
  }


  function saveProducts() {
    localStorage.setItem(
      PRODUCT_STORAGE_KEY,
      JSON.stringify(products)
    );
  }


  function saveCategories() {
    localStorage.setItem(
      CATEGORY_STORAGE_KEY,
      JSON.stringify(categories)
    );
  }


  function makeShopId(value) {
    const clean =
      String(value || "item")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return `${clean || "item"}-${Date.now()}`;
  }


  function escapeShopHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }


  function shopToast(message) {
    const toast =
      document.getElementById(
        "adminToast"
      );

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(
      window.glamShopToastTimer
    );

    window.glamShopToastTimer =
      setTimeout(() => {
        toast.classList.remove("show");
      }, 2500);
  }


  function formatPrice(value) {
    const number =
      Number(value);

    if (
      !Number.isFinite(number) ||
      number < 0
    ) {
      return "$0.00";
    }

    return new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: "USD"
      }
    ).format(number);
  }


  let products =
    loadShopData(
      PRODUCT_STORAGE_KEY,
      defaultProducts
    );

  let categories =
    loadShopData(
      CATEGORY_STORAGE_KEY,
      defaultCategories
    );

  let selectedProductId =
    products[0]?.id || null;

  let selectedCategoryId =
    null;

  let searchTerm = "";
  let filterCategory = "all";


  function getSelectedProduct() {
    return products.find(
      (product) =>
        product.id === selectedProductId
    );
  }


  function getCategoryName(categoryId) {
    return (
      categories.find(
        (category) =>
          category.id === categoryId
      )?.name ||
      "Uncategorized"
    );
  }


  /* =======================================================
     BUILD SHOP MANAGER UI
  ======================================================== */

  shopScreen.innerHTML = `
    <div class="screen-heading">

      <div>
        <span class="section-kicker">
          SHOP
        </span>

        <h2>
          Shop Manager
        </h2>

        <p>
          Add, organize and manage your products and
          categories without touching website code.
        </p>
      </div>


      <button
        class="primary-button"
        id="shopAddProductButton"
        type="button"
      >
        + Add Product
      </button>

    </div>


    <div class="shop-manager-layout">

      <div class="shop-manager-left">


        <!-- CATEGORY MANAGER -->

        <div class="panel">

          <div class="panel-heading">

            <div>
              <span class="section-kicker">
                CATEGORIES
              </span>

              <h3>
                Shop categories
              </h3>
            </div>

            <button
              class="secondary-button"
              id="shopAddCategoryButton"
              type="button"
            >
              + Add
            </button>

          </div>


          <div
            class="shop-category-list"
            id="shopCategoryList"
          ></div>

        </div>


        <!-- PRODUCT LIST -->

        <div class="panel">

          <div class="panel-heading">

            <div>
              <span class="section-kicker">
                PRODUCTS
              </span>

              <h3>
                Product library
              </h3>
            </div>

          </div>


          <div class="shop-manager-toolbar">

            <input
              id="shopSearchInput"
              type="search"
              placeholder="Search products..."
            />

            <select
              id="shopCategoryFilter"
            >
              <option value="all">
                All Categories
              </option>
            </select>

          </div>


          <p class="shop-drag-helper">
            Drag products to change their order.
          </p>


          <div
            class="shop-product-list"
            id="shopProductList"
          ></div>

        </div>

      </div>


      <div class="shop-manager-right">

        <!-- PRODUCT EDITOR -->

        <div class="panel shop-editor-panel">

          <div class="panel-heading">

            <div>
              <span class="section-kicker">
                PRODUCT EDITOR
              </span>

              <h3
                id="shopProductEditorTitle"
              >
                Select a product
              </h3>
            </div>

          </div>


          <div
            id="shopProductEditorEmpty"
            class="shop-empty-editor"
          >
            Select a product or click
            <strong>Add Product</strong>.
          </div>


          <div
            id="shopProductEditor"
            class="shop-product-editor"
            hidden
          >

            <!-- IMAGE -->

            <div class="shop-image-editor">

              <div
                class="shop-image-preview"
                id="shopEditorImagePreview"
              >
                No Image
              </div>


              <label class="mansion-upload-button">
                <input
                  id="shopProductImageUpload"
                  type="file"
                  accept="image/*"
                />

                <span>
                  Upload Product Image
                </span>
              </label>

            </div>


            <label class="theme-field">

              <span>
                Image URL or Path
              </span>

              <input
                id="shopProductImageUrl"
                type="text"
                placeholder="images/product.png"
              />

            </label>


            <!-- TITLE -->

            <label class="theme-field">

              <span>
                Product Title
              </span>

              <input
                id="shopProductTitle"
                type="text"
              />

            </label>


            <!-- PRICE -->

            <div class="shop-two-column">

              <label class="theme-field">

                <span>
                  Price
                </span>

                <input
                  id="shopProductPrice"
                  type="number"
                  min="0"
                  step="0.01"
                />

              </label>


              <label class="theme-field">

                <span>
                  Old Price
                </span>

                <input
                  id="shopProductOldPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Optional"
                />

              </label>

            </div>


            <!-- BADGE -->

            <label class="theme-field">

              <span>
                Badge
              </span>

              <input
                id="shopProductBadge"
                type="text"
                placeholder="BEST SELLER"
              />

            </label>


            <!-- LINK -->

            <label class="theme-field">

              <span>
                Product Link
              </span>

              <input
                id="shopProductLink"
                type="text"
                placeholder="https://..."
              />

            </label>


            <!-- CATEGORY -->

            <label class="theme-field">

              <span>
                Category
              </span>

              <select
                id="shopProductCategory"
              ></select>

            </label>


            <!-- TOGGLES -->

            <div class="shop-toggle-grid">

              <div class="shop-toggle-box">

                <div>
                  <strong>
                    Visible
                  </strong>

                  <small>
                    Show this product
                  </small>
                </div>

                <label class="toggle-switch">

                  <input
                    id="shopProductVisible"
                    type="checkbox"
                  />

                  <span></span>

                </label>

              </div>


              <div class="shop-toggle-box">

                <div>
                  <strong>
                    Featured
                  </strong>

                  <small>
                    Feature on homepage
                  </small>
                </div>

                <label class="toggle-switch">

                  <input
                    id="shopProductFeatured"
                    type="checkbox"
                  />

                  <span></span>

                </label>

              </div>

            </div>


            <!-- ACTIONS -->

            <div class="shop-product-actions">

              <button
                class="secondary-button"
                id="shopDuplicateProductButton"
                type="button"
              >
                Duplicate
              </button>

              <button
                class="danger-button"
                id="shopDeleteProductButton"
                type="button"
              >
                Delete Product
              </button>

            </div>

          </div>

        </div>


        <!-- CARD PREVIEW -->

        <div class="panel">

          <div class="panel-heading">

            <div>
              <span class="section-kicker">
                CURRENT CARD STYLE
              </span>

              <h3>
                Product preview
              </h3>
            </div>

          </div>


          <div
            class="shop-card-preview-wrap"
            id="shopCardPreviewWrap"
          >

            <div class="shop-preview-empty">
              Select a product to preview it.
            </div>

          </div>

        </div>

      </div>

    </div>
  `;


  /* =======================================================
     DOM REFERENCES
  ======================================================== */

  const categoryList =
    document.getElementById(
      "shopCategoryList"
    );

  const productList =
    document.getElementById(
      "shopProductList"
    );

  const searchInput =
    document.getElementById(
      "shopSearchInput"
    );

  const filterSelect =
    document.getElementById(
      "shopCategoryFilter"
    );

  const editorTitle =
    document.getElementById(
      "shopProductEditorTitle"
    );

  const editorEmpty =
    document.getElementById(
      "shopProductEditorEmpty"
    );

  const productEditor =
    document.getElementById(
      "shopProductEditor"
    );

  const imagePreview =
    document.getElementById(
      "shopEditorImagePreview"
    );

  const imageUpload =
    document.getElementById(
      "shopProductImageUpload"
    );

  const imageUrl =
    document.getElementById(
      "shopProductImageUrl"
    );

  const titleInput =
    document.getElementById(
      "shopProductTitle"
    );

  const priceInput =
    document.getElementById(
      "shopProductPrice"
    );

  const oldPriceInput =
    document.getElementById(
      "shopProductOldPrice"
    );

  const badgeInput =
    document.getElementById(
      "shopProductBadge"
    );

  const linkInput =
    document.getElementById(
      "shopProductLink"
    );

  const categoryInput =
    document.getElementById(
      "shopProductCategory"
    );

  const visibleInput =
    document.getElementById(
      "shopProductVisible"
    );

  const featuredInput =
    document.getElementById(
      "shopProductFeatured"
    );

  const cardPreview =
    document.getElementById(
      "shopCardPreviewWrap"
    );


  /* =======================================================
     CATEGORY RENDERING
  ======================================================== */

  function renderCategoryManager() {
    categoryList.innerHTML = "";

    if (!categories.length) {
      categoryList.innerHTML = `
        <div class="shop-empty-editor">
          No categories yet.
        </div>
      `;
    }


    categories.forEach(
      (category) => {

        const item =
          document.createElement(
            "div"
          );

        item.className =
          "shop-category-item";

        item.draggable = true;

        item.dataset.categoryId =
          category.id;

        item.innerHTML = `
          <span
            class="shop-drag-handle"
            aria-hidden="true"
          >
            ⋮⋮
          </span>

          <div class="shop-category-copy">

            <strong>
              ${escapeShopHTML(category.name)}
            </strong>

            <small>
              ${
                category.visible
                  ? "Visible"
                  : "Hidden"
              }
            </small>

          </div>


          <button
            class="shop-category-visibility"
            type="button"
            title="Show or hide category"
          >
            ${
              category.visible
                ? "ON"
                : "OFF"
            }
          </button>


          <button
            class="shop-mini-button"
            type="button"
            data-category-action="rename"
          >
            Edit
          </button>


          <button
            class="shop-mini-button danger-mini"
            type="button"
            data-category-action="delete"
          >
            ×
          </button>
        `;


        item.querySelector(
          ".shop-category-visibility"
        ).addEventListener(
          "click",
          () => {

            category.visible =
              !category.visible;

            saveCategories();
            renderShop();
          }
        );


        item.querySelector(
          '[data-category-action="rename"]'
        ).addEventListener(
          "click",
          () => {

            const name =
              prompt(
                "Rename this category:",
                category.name
              );

            if (!name?.trim()) return;

            category.name =
              name.trim();

            saveCategories();
            renderShop();

            shopToast(
              "Category renamed."
            );
          }
        );


        item.querySelector(
          '[data-category-action="delete"]'
        ).addEventListener(
          "click",
          () => {

            const hasProducts =
              products.some(
                (product) =>
                  product.categoryId ===
                  category.id
              );

            const message =
              hasProducts
                ? `Delete "${category.name}"? Products in this category will become Uncategorized.`
                : `Delete "${category.name}"?`;

            if (!confirm(message)) {
              return;
            }

            products.forEach(
              (product) => {

                if (
                  product.categoryId ===
                  category.id
                ) {
                  product.categoryId = "";
                }

              }
            );

            categories =
              categories.filter(
                (item) =>
                  item.id !==
                  category.id
              );

            saveCategories();
            saveProducts();
            renderShop();

            shopToast(
              "Category deleted."
            );
          }
        );


        addCategoryDragEvents(item);

        categoryList.appendChild(
          item
        );
      }
    );
  }


  /* =======================================================
     CATEGORY DRAG REORDER
  ======================================================== */

  let draggedCategoryId = null;


  function addCategoryDragEvents(item) {

    item.addEventListener(
      "dragstart",
      () => {

        draggedCategoryId =
          item.dataset.categoryId;

        item.classList.add(
          "dragging"
        );
      }
    );


    item.addEventListener(
      "dragend",
      () => {

        item.classList.remove(
          "dragging"
        );

        draggedCategoryId = null;
      }
    );


    item.addEventListener(
      "dragover",
      (event) => {

        event.preventDefault();

        item.classList.add(
          "drag-over"
        );
      }
    );


    item.addEventListener(
      "dragleave",
      () => {

        item.classList.remove(
          "drag-over"
        );
      }
    );


    item.addEventListener(
      "drop",
      (event) => {

        event.preventDefault();

        item.classList.remove(
          "drag-over"
        );

        const targetId =
          item.dataset.categoryId;

        if (
          !draggedCategoryId ||
          draggedCategoryId === targetId
        ) {
          return;
        }

        const fromIndex =
          categories.findIndex(
            (category) =>
              category.id ===
              draggedCategoryId
          );

        const toIndex =
          categories.findIndex(
            (category) =>
              category.id ===
              targetId
          );

        if (
          fromIndex < 0 ||
          toIndex < 0
        ) {
          return;
        }

        const [moved] =
          categories.splice(
            fromIndex,
            1
          );

        categories.splice(
          toIndex,
          0,
          moved
        );

        saveCategories();
        renderShop();

        shopToast(
          "Category order updated."
        );
      }
    );
  }


  /* =======================================================
     CATEGORY SELECTS
  ======================================================== */

  function renderCategorySelects() {

    const currentFilter =
      filterCategory;

    filterSelect.innerHTML = `
      <option value="all">
        All Categories
      </option>

      <option value="">
        Uncategorized
      </option>
    `;


    categoryInput.innerHTML = `
      <option value="">
        Uncategorized
      </option>
    `;


    categories.forEach(
      (category) => {

        const filterOption =
          document.createElement(
            "option"
          );

        filterOption.value =
          category.id;

        filterOption.textContent =
          category.name;

        filterSelect.appendChild(
          filterOption
        );


        const editorOption =
          document.createElement(
            "option"
          );

        editorOption.value =
          category.id;

        editorOption.textContent =
          category.name;

        categoryInput.appendChild(
          editorOption
        );
      }
    );


    filterSelect.value =
      currentFilter;
  }


  /* =======================================================
     PRODUCT LIST
  ======================================================== */

  function getFilteredProducts() {

    return products.filter(
      (product) => {

        const matchesSearch =
          product.title
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        const matchesCategory =
          filterCategory === "all" ||
          product.categoryId ===
            filterCategory;

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );
  }


  function renderProductList() {

    productList.innerHTML = "";

    const filtered =
      getFilteredProducts();


    if (!filtered.length) {
      productList.innerHTML = `
        <div class="shop-empty-products">

          <strong>
            ${
              products.length
                ? "No matching products."
                : "No products yet."
            }
          </strong>

          <span>
            ${
              products.length
                ? "Try a different search or category."
                : "Click Add Product to create your first item."
            }
          </span>

        </div>
      `;

      return;
    }


    filtered.forEach(
      (product) => {

        const item =
          document.createElement(
            "button"
          );

        item.type = "button";

        item.draggable = true;

        item.className =
          "shop-product-row";

        item.dataset.productId =
          product.id;

        if (
          product.id ===
          selectedProductId
        ) {
          item.classList.add(
            "selected"
          );
        }


        const imageMarkup =
          product.image
            ? `
              <img
                src="${escapeShopHTML(product.image)}"
                alt=""
              />
            `
            : `
              <span>
                GLAM
              </span>
            `;


        item.innerHTML = `
          <span
            class="shop-drag-handle"
            aria-hidden="true"
          >
            ⋮⋮
          </span>

          <span class="shop-product-thumb">
            ${imageMarkup}
          </span>

          <span class="shop-product-row-copy">

            <strong>
              ${escapeShopHTML(product.title)}
            </strong>

            <small>
              ${escapeShopHTML(
                getCategoryName(
                  product.categoryId
                )
              )}
              •
              ${formatPrice(product.price)}
            </small>

          </span>

          <span class="shop-product-flags">

            ${
              product.featured
                ? '<em>FEATURED</em>'
                : ""
            }

            <b class="${
              product.visible
                ? "product-on"
                : ""
            }">
              ${
                product.visible
                  ? "ON"
                  : "OFF"
              }
            </b>

          </span>
        `;


        item.addEventListener(
          "click",
          () => {

            selectedProductId =
              product.id;

            renderProductList();
            loadProductEditor();
            renderProductPreview();
          }
        );


        addProductDragEvents(
          item
        );

        productList.appendChild(
          item
        );
      }
    );
  }


  /* =======================================================
     PRODUCT DRAG REORDER
  ======================================================== */

  let draggedProductId = null;


  function addProductDragEvents(item) {

    item.addEventListener(
      "dragstart",
      () => {

        draggedProductId =
          item.dataset.productId;

        item.classList.add(
          "dragging"
        );
      }
    );


    item.addEventListener(
      "dragend",
      () => {

        item.classList.remove(
          "dragging"
        );

        draggedProductId = null;
      }
    );


    item.addEventListener(
      "dragover",
      (event) => {

        event.preventDefault();

        item.classList.add(
          "drag-over"
        );
      }
    );


    item.addEventListener(
      "dragleave",
      () => {

        item.classList.remove(
          "drag-over"
        );
      }
    );


    item.addEventListener(
      "drop",
      (event) => {

        event.preventDefault();

        item.classList.remove(
          "drag-over"
        );

        const targetId =
          item.dataset.productId;

        if (
          !draggedProductId ||
          draggedProductId === targetId
        ) {
          return;
        }

        const fromIndex =
          products.findIndex(
            (product) =>
              product.id ===
              draggedProductId
          );

        const toIndex =
          products.findIndex(
            (product) =>
              product.id ===
              targetId
          );

        if (
          fromIndex < 0 ||
          toIndex < 0
        ) {
          return;
        }

        const [moved] =
          products.splice(
            fromIndex,
            1
          );

        products.splice(
          toIndex,
          0,
          moved
        );

        saveProducts();
        renderProductList();

        shopToast(
          "Product order updated."
        );
      }
    );
  }


  /* =======================================================
     PRODUCT EDITOR
  ======================================================== */

  function loadProductEditor() {

    const product =
      getSelectedProduct();


    if (!product) {

      editorEmpty.hidden =
        false;

      productEditor.hidden =
        true;

      editorTitle.textContent =
        "Select a product";

      return;
    }


    editorEmpty.hidden =
      true;

    productEditor.hidden =
      false;

    editorTitle.textContent =
      product.title;


    titleInput.value =
      product.title;

    imageUrl.value =
      product.image || "";

    priceInput.value =
      product.price ?? 0;

    oldPriceInput.value =
      product.oldPrice ?? "";

    badgeInput.value =
      product.badge || "";

    linkInput.value =
      product.link || "";

    categoryInput.value =
      product.categoryId || "";

    visibleInput.checked =
      product.visible;

    featuredInput.checked =
      product.featured;


    renderEditorImage();
  }


  function renderEditorImage() {

    const product =
      getSelectedProduct();

    if (!product) return;


    if (product.image) {

      imagePreview.innerHTML = `
        <img
          src="${escapeShopHTML(product.image)}"
          alt=""
        />
      `;

    } else {

      imagePreview.innerHTML = `
        <span>
          No Image
        </span>
      `;
    }
  }


  function updateProduct(
    property,
    value
  ) {

    const product =
      getSelectedProduct();

    if (!product) return;

    product[property] = value;

    saveProducts();

    editorTitle.textContent =
      product.title;

    renderProductList();
    renderProductPreview();
  }


  titleInput.addEventListener(
    "input",
    () => {

      updateProduct(
        "title",
        titleInput.value ||
          "Untitled Product"
      );
    }
  );


  priceInput.addEventListener(
    "input",
    () => {

      updateProduct(
        "price",
        Math.max(
          0,
          Number(
            priceInput.value || 0
          )
        )
      );
    }
  );


  oldPriceInput.addEventListener(
    "input",
    () => {

      const value =
        oldPriceInput.value.trim();

      updateProduct(
        "oldPrice",
        value === ""
          ? ""
          : Math.max(
              0,
              Number(value)
            )
      );
    }
  );


  badgeInput.addEventListener(
    "input",
    () => {

      updateProduct(
        "badge",
        badgeInput.value
      );
    }
  );


  linkInput.addEventListener(
    "input",
    () => {

      updateProduct(
        "link",
        linkInput.value
      );
    }
  );


  categoryInput.addEventListener(
    "change",
    () => {

      updateProduct(
        "categoryId",
        categoryInput.value
      );
    }
  );


  visibleInput.addEventListener(
    "change",
    () => {

      updateProduct(
        "visible",
        visibleInput.checked
      );
    }
  );


  featuredInput.addEventListener(
    "change",
    () => {

      updateProduct(
        "featured",
        featuredInput.checked
      );
    }
  );


  imageUrl.addEventListener(
    "change",
    () => {

      updateProduct(
        "image",
        imageUrl.value.trim()
      );

      renderEditorImage();
    }
  );


  imageUpload.addEventListener(
    "change",
    () => {

      const file =
        imageUpload.files?.[0];

      if (!file) return;


      if (
        !file.type.startsWith(
          "image/"
        )
      ) {

        shopToast(
          "Please choose an image file."
        );

        return;
      }


      const reader =
        new FileReader();


      reader.onload = () => {

        updateProduct(
          "image",
          reader.result
        );

        imageUrl.value =
          reader.result;

        renderEditorImage();

        shopToast(
          "Product image loaded."
        );
      };


      reader.readAsDataURL(file);
    }
  );


  /* =======================================================
     PRODUCT CARD PREVIEW
  ======================================================== */

  function renderProductPreview() {

    const product =
      getSelectedProduct();


    if (!product) {

      cardPreview.innerHTML = `
        <div class="shop-preview-empty">
          Select a product to preview it.
        </div>
      `;

      return;
    }


    cardPreview.innerHTML = `
      <article class="shop-current-card-preview">

        <div class="shop-current-card-image">

          ${
            product.image
              ? `
                <img
                  src="${escapeShopHTML(product.image)}"
                  alt=""
                />
              `
              : `
                <div class="shop-card-image-fallback">
                  GLAM
                </div>
              `
          }


          ${
            product.badge
              ? `
                <span class="shop-card-badge">
                  ${escapeShopHTML(product.badge)}
                </span>
              `
              : ""
          }

        </div>


        <div class="shop-current-card-content">

          <span class="shop-card-category">
            ${escapeShopHTML(
              getCategoryName(
                product.categoryId
              )
            )}
          </span>


          <h3>
            ${escapeShopHTML(product.title)}
          </h3>


          <div class="shop-card-price">

            <strong>
              ${formatPrice(product.price)}
            </strong>

            ${
              product.oldPrice !== "" &&
              Number(product.oldPrice) >
                Number(product.price)
                ? `
                  <del>
                    ${formatPrice(product.oldPrice)}
                  </del>
                `
                : ""
            }

          </div>


          <button type="button">
            VIEW PRODUCT
          </button>

        </div>

      </article>
    `;
  }


  /* =======================================================
     ADD PRODUCT
  ======================================================== */

  document.getElementById(
    "shopAddProductButton"
  ).addEventListener(
    "click",
    () => {

      const product = {

        id:
          makeShopId(
            "new-product"
          ),

        title:
          "New Product",

        image:
          "",

        price:
          0,

        oldPrice:
          "",

        badge:
          "",

        link:
          "#",

        categoryId:
          categories[0]?.id || "",

        visible:
          true,

        featured:
          false
      };


      products.push(product);

      selectedProductId =
        product.id;

      saveProducts();

      renderShop();

      shopToast(
        "New product added."
      );
    }
  );


  /* =======================================================
     DUPLICATE PRODUCT
  ======================================================== */

  document.getElementById(
    "shopDuplicateProductButton"
  ).addEventListener(
    "click",
    () => {

      const source =
        getSelectedProduct();

      if (!source) return;


      const copy =
        cloneShopData(source);

      copy.id =
        makeShopId(
          `${source.title}-copy`
        );

      copy.title =
        `${source.title} Copy`;


      const sourceIndex =
        products.findIndex(
          (product) =>
            product.id ===
            source.id
        );


      products.splice(
        sourceIndex + 1,
        0,
        copy
      );


      selectedProductId =
        copy.id;

      saveProducts();

      renderShop();

      shopToast(
        "Product duplicated."
      );
    }
  );


  /* =======================================================
     DELETE PRODUCT
  ======================================================== */

  document.getElementById(
    "shopDeleteProductButton"
  ).addEventListener(
    "click",
    () => {

      const product =
        getSelectedProduct();

      if (!product) return;


      if (
        !confirm(
          `Delete "${product.title}"?`
        )
      ) {
        return;
      }


      const index =
        products.findIndex(
          (item) =>
            item.id ===
            product.id
        );


      products =
        products.filter(
          (item) =>
            item.id !==
            product.id
        );


      selectedProductId =
        products[index]?.id ||
        products[index - 1]?.id ||
        null;


      saveProducts();

      renderShop();

      shopToast(
        "Product deleted."
      );
    }
  );


  /* =======================================================
     ADD CATEGORY
  ======================================================== */

  document.getElementById(
    "shopAddCategoryButton"
  ).addEventListener(
    "click",
    () => {

      const name =
        prompt(
          "What do you want to call this category?"
        );

      if (!name?.trim()) return;


      const category = {

        id:
          makeShopId(name),

        name:
          name.trim(),

        visible:
          true
      };


      categories.push(category);

      saveCategories();

      renderShop();

      shopToast(
        "Category added."
      );
    }
  );


  /* =======================================================
     SEARCH / FILTER
  ======================================================== */

  searchInput.addEventListener(
    "input",
    () => {

      searchTerm =
        searchInput.value.trim();

      renderProductList();
    }
  );


  filterSelect.addEventListener(
    "change",
    () => {

      filterCategory =
        filterSelect.value;

      renderProductList();
    }
  );


  /* =======================================================
     FULL RENDER
  ======================================================== */

  function renderShop() {

    renderCategorySelects();
    renderCategoryManager();
    renderProductList();
    loadProductEditor();
    renderProductPreview();
  }


  renderShop();

});

/* =========================================================
   GLAM WEBSITE CONTROL CENTER
   CARD DESIGNER
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const cardScreen =
    document.getElementById("screen-cards");

  if (!cardScreen) return;


  /* =======================================================
     STORAGE
  ======================================================== */

  const CARD_STYLE_KEY =
    "glamWebsiteCardStyles";

  const PRODUCT_KEY =
    "glamWebsiteProducts";


  const defaultCardStyle = {
    id: "standard-glam",
    name: "Standard GLAM",

    imageRatio: "1 / 1",
    imageFit: "cover",

    cardBackground: "#FFFFFF",
    cardText: "#171A1E",
    cardBorder: "#DCE8F2",

    borderWidth: 1,
    radius: 20,

    shadow: "soft",
    glowColor: "#168FEA",

    titleFont:
      "Montserrat, Arial, sans-serif",

    titleColor: "#171A1E",
    titleSize: 20,

    priceColor: "#171A1E",
    priceSize: 18,

    badgeBackground: "#FFFFFF",
    badgeText: "#103B63",
    badgeRadius: 99,

    buttonBackground: "#168FEA",
    buttonText: "#FFFFFF",
    buttonRadius: 12,

    spacing: 18,

    hoverEffect: "lift",
    animation: "none",

    referenceImage: "",
    useReferenceAsArtwork: false
  };


  function cardClone(value) {
    return JSON.parse(
      JSON.stringify(value)
    );
  }


  function loadCardStyles() {

    try {

      const saved =
        JSON.parse(
          localStorage.getItem(
            CARD_STYLE_KEY
          )
        );

      if (
        Array.isArray(saved) &&
        saved.length
      ) {
        return saved;
      }

    } catch (error) {

      console.warn(
        "Could not load card styles.",
        error
      );

    }


    const starting =
      [cardClone(defaultCardStyle)];

    localStorage.setItem(
      CARD_STYLE_KEY,
      JSON.stringify(starting)
    );

    return starting;
  }


  function loadCardProducts() {

    try {

      const saved =
        JSON.parse(
          localStorage.getItem(
            PRODUCT_KEY
          )
        );

      return Array.isArray(saved)
        ? saved
        : [];

    } catch (error) {

      return [];

    }
  }


  function saveCardStyles() {

    localStorage.setItem(
      CARD_STYLE_KEY,
      JSON.stringify(cardStyles)
    );

  }


  function saveCardProducts() {

    localStorage.setItem(
      PRODUCT_KEY,
      JSON.stringify(cardProducts)
    );

  }


  function cardId(name) {

    return (
      String(name || "style")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") +
      "-" +
      Date.now()
    );

  }


  function cardToast(message) {

    const toast =
      document.getElementById(
        "adminToast"
      );

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(
      window.glamCardToastTimer
    );

    window.glamCardToastTimer =
      setTimeout(() => {

        toast.classList.remove(
          "show"
        );

      }, 2500);

  }


  function escapeCardHTML(value) {

    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  }


  let cardStyles =
    loadCardStyles();

  let cardProducts =
    loadCardProducts();

  let editingStyleId =
    cardStyles[0]?.id || null;

  let selectedCardProductId =
    cardProducts[0]?.id || null;


  function getEditingStyle() {

    return cardStyles.find(
      (style) =>
        style.id === editingStyleId
    );

  }


  function getCardProduct() {

    return cardProducts.find(
      (product) =>
        product.id ===
        selectedCardProductId
    );

  }


  /* =======================================================
     BUILD SCREEN
  ======================================================== */

  cardScreen.innerHTML = `
    <div class="screen-heading">

      <div>

        <span class="section-kicker">
          PRODUCT CARD STUDIO
        </span>

        <h2>
          Card Designer
        </h2>

        <p>
          Build reusable card styles and customize
          individual products whenever you want.
        </p>

      </div>


      <button
        class="primary-button"
        id="newCardStyleButton"
        type="button"
      >
        + New Card Style
      </button>

    </div>


    <div
      class="card-style-library"
      id="cardStyleLibrary"
    ></div>


    <div class="card-designer-layout">


      <div class="card-designer-controls">


        <!-- STYLE MANAGEMENT -->

        <div class="panel">

          <div class="panel-heading">

            <div>

              <span class="section-kicker">
                CARD STYLE
              </span>

              <h3 id="cardStyleTitle">
                Standard GLAM
              </h3>

            </div>

          </div>


          <div class="card-action-row">

            <button
              class="secondary-button"
              id="renameCardStyleButton"
              type="button"
            >
              Rename
            </button>

            <button
              class="secondary-button"
              id="duplicateCardStyleButton"
              type="button"
            >
              Duplicate
            </button>

            <button
              class="danger-button"
              id="deleteCardStyleButton"
              type="button"
            >
              Delete
            </button>

          </div>

        </div>


        <!-- PRODUCT ASSIGNMENT -->

        <div class="panel">

          <div class="panel-heading">

            <div>

              <span class="section-kicker">
                PRODUCT
              </span>

              <h3>
                Assign card design
              </h3>

            </div>

          </div>


          <label class="theme-field">

            <span>
              Product
            </span>

            <select
              id="cardProductSelect"
            ></select>

          </label>


          <label class="theme-field">

            <span>
              Card Style
            </span>

            <select
              id="productCardStyleSelect"
            ></select>

          </label>


          <div class="card-toggle-box">

            <div>

              <strong>
                Custom Card
              </strong>

              <small>
                Override the saved style for this product
              </small>

            </div>


            <label class="toggle-switch">

              <input
                id="productCustomCardToggle"
                type="checkbox"
              />

              <span></span>

            </label>

          </div>


          <button
            class="secondary-button"
            id="resetProductCardButton"
            type="button"
          >
            Reset Product to Saved Style
          </button>

        </div>


        <!-- IMAGE -->

        <div class="panel">

          <div class="panel-heading">

            <div>

              <span class="section-kicker">
                IMAGE
              </span>

              <h3>
                Image layout
              </h3>

            </div>

          </div>


          <div class="card-control-grid">

            <label class="theme-field">

              <span>
                Image Ratio
              </span>

              <select
                data-card-control="imageRatio"
              >

                <option value="1 / 1">
                  Square
                </option>

                <option value="4 / 5">
                  Portrait 4:5
                </option>

                <option value="3 / 4">
                  Portrait 3:4
                </option>

                <option value="16 / 9">
                  Wide 16:9
                </option>

              </select>

            </label>


            <label class="theme-field">

              <span>
                Image Fit
              </span>

              <select
                data-card-control="imageFit"
              >

                <option value="cover">
                  Fill / Crop
                </option>

                <option value="contain">
                  Show Full Image
                </option>

              </select>

            </label>

          </div>

        </div>


        <!-- CARD BODY -->

        <div class="panel">

          <div class="panel-heading">

            <div>

              <span class="section-kicker">
                CARD BODY
              </span>

              <h3>
                Shape & surface
              </h3>

            </div>

          </div>


          <div
            class="card-color-grid"
            id="cardSurfaceColors"
          ></div>


          <div class="card-control-grid">

            <label class="theme-field">

              <span>
                Border Width
              </span>

              <input
                data-card-number="borderWidth"
                type="number"
                min="0"
                max="12"
                step="1"
              />

            </label>


            <label class="theme-field">

              <span>
                Corner Radius
              </span>

              <input
                data-card-number="radius"
                type="number"
                min="0"
                max="60"
                step="1"
              />

            </label>


            <label class="theme-field">

              <span>
                Card Spacing
              </span>

              <input
                data-card-number="spacing"
                type="number"
                min="6"
                max="60"
                step="1"
              />

            </label>


            <label class="theme-field">

              <span>
                Shadow
              </span>

              <select
                data-card-control="shadow"
              >

                <option value="none">
                  None
                </option>

                <option value="soft">
                  Soft
                </option>

                <option value="deep">
                  Deep
                </option>

                <option value="glow">
                  Glow
                </option>

              </select>

            </label>

          </div>

        </div>


        <!-- TYPOGRAPHY -->

        <div class="panel">

          <div class="panel-heading">

            <div>

              <span class="section-kicker">
                TYPOGRAPHY
              </span>

              <h3>
                Product text
              </h3>

            </div>

          </div>


          <label class="theme-field">

            <span>
              Title Font
            </span>

            <select
              data-card-control="titleFont"
            >

              <option value="Montserrat, Arial, sans-serif">
                Montserrat
              </option>

              <option value="'Arial Black', Arial, sans-serif">
                Chunky Bold
              </option>

              <option value="'Arial Rounded MT Bold', Arial, sans-serif">
                Bubble / Rounded
              </option>

              <option value="'Comic Sans MS', cursive">
                Playful
              </option>

              <option value="Georgia, serif">
                Editorial
              </option>

              <option value="Impact, sans-serif">
                Impact
              </option>

            </select>

          </label>


          <div class="card-control-grid">

            <label class="theme-field">

              <span>
                Title Size
              </span>

              <input
                data-card-number="titleSize"
                type="number"
                min="12"
                max="52"
              />

            </label>


            <label class="theme-field">

              <span>
                Price Size
              </span>

              <input
                data-card-number="priceSize"
                type="number"
                min="10"
                max="40"
              />

            </label>

          </div>


          <div
            class="card-color-grid"
            id="cardTextColors"
          ></div>

        </div>


        <!-- BADGE -->

        <div class="panel">

          <div class="panel-heading">

            <div>

              <span class="section-kicker">
                BADGE
              </span>

              <h3>
                Badge styling
              </h3>

            </div>

          </div>


          <div
            class="card-color-grid"
            id="cardBadgeColors"
          ></div>


          <label class="theme-field">

            <span>
              Badge Radius
            </span>

            <input
              data-card-number="badgeRadius"
              type="number"
              min="0"
              max="99"
            />

          </label>

        </div>


        <!-- BUTTON -->

        <div class="panel">

          <div class="panel-heading">

            <div>

              <span class="section-kicker">
                BUTTON
              </span>

              <h3>
                CTA styling
              </h3>

            </div>

          </div>


          <div
            class="card-color-grid"
            id="cardButtonColors"
          ></div>


          <label class="theme-field">

            <span>
              Button Radius
            </span>

            <input
              data-card-number="buttonRadius"
              type="number"
              min="0"
              max="99"
            />

          </label>

        </div>


        <!-- EFFECTS -->

        <div class="panel">

          <div class="panel-heading">

            <div>

              <span class="section-kicker">
                EFFECTS
              </span>

              <h3>
                Hover & animation
              </h3>

            </div>

          </div>


          <div class="card-control-grid">

            <label class="theme-field">

              <span>
                Hover Effect
              </span>

              <select
                data-card-control="hoverEffect"
              >

                <option value="none">
                  None
                </option>

                <option value="lift">
                  Lift
                </option>

                <option value="zoom">
                  Zoom
                </option>

                <option value="glow">
                  Glow
                </option>

                <option value="tilt">
                  Gentle Tilt
                </option>

              </select>

            </label>


            <label class="theme-field">

              <span>
                Animation
              </span>

              <select
                data-card-control="animation"
              >

                <option value="none">
                  None
                </option>

                <option value="float">
                  Float
                </option>

                <option value="pulse">
                  Pulse
                </option>

                <option value="soft-glow">
                  Soft Glow
                </option>

              </select>

            </label>

          </div>

        </div>


        <!-- REFERENCE IMAGE -->

        <div class="panel">

          <div class="panel-heading">

            <div>

              <span class="section-kicker">
                DESIGN REFERENCE
              </span>

              <h3>
                Reference artwork
              </h3>

            </div>

          </div>


          <div
            class="card-reference-preview"
            id="cardReferencePreview"
          >
            No Reference Image
          </div>


          <label class="mansion-upload-button">

            <input
              id="cardReferenceUpload"
              type="file"
              accept="image/*"
            />

            <span>
              Upload Reference Image
            </span>

          </label>


          <label class="theme-field">

            <span>
              Reference Image URL
            </span>

            <input
              id="cardReferenceUrl"
              type="text"
              placeholder="https://... or image path"
            />

          </label>


          <div class="card-toggle-box">

            <div>

              <strong>
                Use as Card Artwork
              </strong>

              <small>
                Use the uploaded reference directly
                behind the product card
              </small>

            </div>


            <label class="toggle-switch">

              <input
                id="useReferenceArtworkToggle"
                type="checkbox"
              />

              <span></span>

            </label>

          </div>

        </div>

      </div>


      <!-- LIVE PREVIEW -->

      <div class="card-designer-preview">

        <div class="panel card-preview-sticky">

          <div class="panel-heading">

            <div>

              <span class="section-kicker">
                LIVE PREVIEW
              </span>

              <h3>
                Product card
              </h3>

            </div>

          </div>


          <div
            class="card-designer-stage"
            id="cardDesignerStage"
          ></div>

        </div>

      </div>

    </div>
  `;


  /* =======================================================
     COLORS
  ======================================================== */

  const colorGroups = {

    cardSurfaceColors: [
      ["cardBackground", "Card Background"],
      ["cardText", "Card Text"],
      ["cardBorder", "Border"],
      ["glowColor", "Glow Color"]
    ],

    cardTextColors: [
      ["titleColor", "Title Color"],
      ["priceColor", "Price Color"]
    ],

    cardBadgeColors: [
      ["badgeBackground", "Badge Background"],
      ["badgeText", "Badge Text"]
    ],

    cardButtonColors: [
      ["buttonBackground", "Button Background"],
      ["buttonText", "Button Text"]
    ]

  };


  Object.entries(
    colorGroups
  ).forEach(
    ([containerId, controls]) => {

      const container =
        document.getElementById(
          containerId
        );

      controls.forEach(
        ([key, label]) => {

          const field =
            document.createElement(
              "div"
            );

          field.className =
            "color-control";

          field.innerHTML = `
            <span class="color-control-label">
              ${label}
            </span>

            <div class="color-input-row">

              <input
                type="color"
                data-card-color-picker="${key}"
              />

              <input
                type="text"
                maxlength="7"
                data-card-color-hex="${key}"
              />

            </div>
          `;

          container.appendChild(
            field
          );

        }
      );

    }
  );


  /* =======================================================
     PRODUCT CARD STATE
  ======================================================== */

  function ensureProductCardData(
    product
  ) {

    if (!product) return;

    if (!product.cardStyleId) {

      product.cardStyleId =
        cardStyles[0]?.id || "";

    }

    if (
      typeof product.customCard !==
      "boolean"
    ) {

      product.customCard = false;

    }

    if (!product.cardOverrides) {

      product.cardOverrides = {};

    }

  }


  cardProducts.forEach(
    ensureProductCardData
  );

  saveCardProducts();


  function getBaseProductStyle() {

    const product =
      getCardProduct();

    if (!product) {

      return getEditingStyle();

    }

    ensureProductCardData(
      product
    );

    return (
      cardStyles.find(
        (style) =>
          style.id ===
          product.cardStyleId
      ) ||
      cardStyles[0]
    );

  }


  function getResolvedCardStyle() {

    const product =
      getCardProduct();

    const base =
      getBaseProductStyle();

    if (!base) {

      return cardClone(
        defaultCardStyle
      );

    }


    if (
      !product ||
      !product.customCard
    ) {

      return cardClone(base);

    }


    return {
      ...cardClone(base),
      ...cardClone(
        product.cardOverrides ||
        {}
      )
    };

  }


  function getEditableCardTarget() {

    const product =
      getCardProduct();

    if (
      product &&
      product.customCard
    ) {

      return product.cardOverrides;

    }

    return getEditingStyle();

  }


  /* =======================================================
     STYLE LIBRARY
  ======================================================== */

  function renderCardLibrary() {

    const library =
      document.getElementById(
        "cardStyleLibrary"
      );

    library.innerHTML = "";


    cardStyles.forEach(
      (style) => {

        const button =
          document.createElement(
            "button"
          );

        button.type = "button";

        button.className =
          "card-style-library-item";

        if (
          style.id ===
          editingStyleId
        ) {

          button.classList.add(
            "selected"
          );

        }


        button.innerHTML = `
          <div
            class="card-style-swatch"
            style="
              background:${style.cardBackground};
              border-color:${style.cardBorder};
              border-radius:${style.radius}px;
            "
          >

            <span
              style="
                background:${style.buttonBackground};
              "
            ></span>

          </div>

          <strong>
            ${escapeCardHTML(style.name)}
          </strong>

          <small>
            Saved Style
          </small>
        `;


        button.addEventListener(
          "click",
          () => {

            editingStyleId =
              style.id;

            renderCardDesigner();

          }
        );


        library.appendChild(
          button
        );

      }
    );

  }


  /* =======================================================
     PRODUCT SELECTS
  ======================================================== */

  function renderCardProductSelect() {

    const productSelect =
      document.getElementById(
        "cardProductSelect"
      );

    productSelect.innerHTML = "";


    if (!cardProducts.length) {

      productSelect.innerHTML = `
        <option value="">
          No products yet
        </option>
      `;

      return;
    }


    cardProducts.forEach(
      (product) => {

        const option =
          document.createElement(
            "option"
          );

        option.value =
          product.id;

        option.textContent =
          product.title;

        productSelect.appendChild(
          option
        );

      }
    );


    if (
      selectedCardProductId
    ) {

      productSelect.value =
        selectedCardProductId;

    }

  }


  function renderStyleSelect() {

    const select =
      document.getElementById(
        "productCardStyleSelect"
      );

    select.innerHTML = "";


    cardStyles.forEach(
      (style) => {

        const option =
          document.createElement(
            "option"
          );

        option.value =
          style.id;

        option.textContent =
          style.name;

        select.appendChild(
          option
        );

      }
    );


    const product =
      getCardProduct();

    if (product) {

      ensureProductCardData(
        product
      );

      select.value =
        product.cardStyleId;

    }

  }


  /* =======================================================
     LOAD CONTROLS
  ======================================================== */

  function renderCardControls() {

    const resolved =
      getResolvedCardStyle();

    const product =
      getCardProduct();

    const title =
      document.getElementById(
        "cardStyleTitle"
      );

    const editing =
      getEditingStyle();

    title.textContent =
      editing?.name ||
      "Card Style";


    document.querySelectorAll(
      "[data-card-control]"
    ).forEach(
      (control) => {

        const key =
          control.dataset.cardControl;

        control.value =
          resolved[key];

      }
    );


    document.querySelectorAll(
      "[data-card-number]"
    ).forEach(
      (control) => {

        const key =
          control.dataset.cardNumber;

        control.value =
          resolved[key];

      }
    );


    document.querySelectorAll(
      "[data-card-color-picker]"
    ).forEach(
      (picker) => {

        const key =
          picker.dataset.cardColorPicker;

        picker.value =
          resolved[key];

        const hex =
          document.querySelector(
            `[data-card-color-hex="${key}"]`
          );

        if (hex) {

          hex.value =
            resolved[key];

        }

      }
    );


    const customToggle =
      document.getElementById(
        "productCustomCardToggle"
      );

    customToggle.checked =
      Boolean(
        product?.customCard
      );


    renderReferencePreview(
      resolved.referenceImage
    );


    document.getElementById(
      "cardReferenceUrl"
    ).value =
      resolved.referenceImage || "";


    document.getElementById(
      "useReferenceArtworkToggle"
    ).checked =
      Boolean(
        resolved.useReferenceAsArtwork
      );

  }


  /* =======================================================
     UPDATE VALUE
  ======================================================== */

  function updateCardValue(
    key,
    value
  ) {

    const product =
      getCardProduct();


    if (
      product &&
      product.customCard
    ) {

      ensureProductCardData(
        product
      );

      product.cardOverrides[key] =
        value;

      saveCardProducts();

    } else {

      const style =
        getEditingStyle();

      if (!style) return;

      style[key] = value;

      saveCardStyles();

    }


    renderCardPreview();
    renderCardLibrary();

  }


  /* =======================================================
     CONTROL EVENTS
  ======================================================== */

  document.querySelectorAll(
    "[data-card-control]"
  ).forEach(
    (control) => {

      control.addEventListener(
        "change",
        () => {

          updateCardValue(
            control.dataset.cardControl,
            control.value
          );

        }
      );

    }
  );


  document.querySelectorAll(
    "[data-card-number]"
  ).forEach(
    (control) => {

      control.addEventListener(
        "input",
        () => {

          updateCardValue(
            control.dataset.cardNumber,
            Number(control.value)
          );

        }
      );

    }
  );


  document.querySelectorAll(
    "[data-card-color-picker]"
  ).forEach(
    (picker) => {

      picker.addEventListener(
        "input",
        () => {

          const key =
            picker.dataset.cardColorPicker;

          const color =
            picker.value.toUpperCase();

          const hex =
            document.querySelector(
              `[data-card-color-hex="${key}"]`
            );

          if (hex) {

            hex.value = color;

          }

          updateCardValue(
            key,
            color
          );

        }
      );

    }
  );


  document.querySelectorAll(
    "[data-card-color-hex]"
  ).forEach(
    (input) => {

      input.addEventListener(
        "change",
        () => {

          let value =
            input.value.trim();

          if (
            !value.startsWith("#")
          ) {

            value =
              "#" + value;

          }


          if (
            !/^#[0-9A-Fa-f]{6}$/.test(
              value
            )
          ) {

            cardToast(
              "Use a six-digit hex color."
            );

            renderCardControls();

            return;
          }


          value =
            value.toUpperCase();

          const key =
            input.dataset.cardColorHex;

          const picker =
            document.querySelector(
              `[data-card-color-picker="${key}"]`
            );

          if (picker) {

            picker.value =
              value;

          }


          updateCardValue(
            key,
            value
          );

        }
      );

    }
  );


  /* =======================================================
     PRODUCT ASSIGNMENT
  ======================================================== */

  document.getElementById(
    "cardProductSelect"
  ).addEventListener(
    "change",
    (event) => {

      selectedCardProductId =
        event.target.value;

      const product =
        getCardProduct();

      if (product) {

        ensureProductCardData(
          product
        );

        editingStyleId =
          product.cardStyleId ||
          cardStyles[0]?.id;

      }

      renderCardDesigner();

    }
  );


  document.getElementById(
    "productCardStyleSelect"
  ).addEventListener(
    "change",
    (event) => {

      const product =
        getCardProduct();

      if (!product) return;

      product.cardStyleId =
        event.target.value;

      editingStyleId =
        event.target.value;

      saveCardProducts();

      renderCardDesigner();

      cardToast(
        "Card style assigned."
      );

    }
  );


  document.getElementById(
    "productCustomCardToggle"
  ).addEventListener(
    "change",
    (event) => {

      const product =
        getCardProduct();

      if (!product) {

        event.target.checked =
          false;

        cardToast(
          "Create a product first."
        );

        return;
      }


      ensureProductCardData(
        product
      );


      if (
        event.target.checked &&
        !Object.keys(
          product.cardOverrides
        ).length
      ) {

        product.cardOverrides =
          cardClone(
            getBaseProductStyle()
          );

      }


      product.customCard =
        event.target.checked;

      saveCardProducts();

      renderCardDesigner();

      cardToast(
        product.customCard
          ? "Custom card enabled."
          : "Saved style restored."
      );

    }
  );


  document.getElementById(
    "resetProductCardButton"
  ).addEventListener(
    "click",
    () => {

      const product =
        getCardProduct();

      if (!product) return;


      product.customCard =
        false;

      product.cardOverrides =
        {};

      saveCardProducts();

      renderCardDesigner();

      cardToast(
        "Product reset to saved style."
      );

    }
  );


  /* =======================================================
     STYLE MANAGEMENT
  ======================================================== */

  document.getElementById(
    "newCardStyleButton"
  ).addEventListener(
    "click",
    () => {

      const name =
        prompt(
          "What do you want to call this card style?"
        );

      if (!name?.trim()) return;


      const style =
        cardClone(
          defaultCardStyle
        );

      style.id =
        cardId(name);

      style.name =
        name.trim();

      cardStyles.push(
        style
      );

      editingStyleId =
        style.id;

      saveCardStyles();

      renderCardDesigner();

      cardToast(
        "Card style created."
      );

    }
  );


  document.getElementById(
    "renameCardStyleButton"
  ).addEventListener(
    "click",
    () => {

      const style =
        getEditingStyle();

      if (!style) return;


      const name =
        prompt(
          "Rename this card style:",
          style.name
        );

      if (!name?.trim()) return;

      style.name =
        name.trim();

      saveCardStyles();

      renderCardDesigner();

    }
  );


  document.getElementById(
    "duplicateCardStyleButton"
  ).addEventListener(
    "click",
    () => {

      const style =
        getEditingStyle();

      if (!style) return;


      const copy =
        cardClone(style);

      copy.id =
        cardId(
          style.name + "-copy"
        );

      copy.name =
        style.name + " Copy";

      cardStyles.push(
        copy
      );

      editingStyleId =
        copy.id;

      saveCardStyles();

      renderCardDesigner();

      cardToast(
        "Card style duplicated."
      );

    }
  );


  document.getElementById(
    "deleteCardStyleButton"
  ).addEventListener(
    "click",
    () => {

      if (
        cardStyles.length <= 1
      ) {

        cardToast(
          "You must keep at least one card style."
        );

        return;
      }


      const style =
        getEditingStyle();

      if (!style) return;


      if (
        !confirm(
          `Delete "${style.name}"?`
        )
      ) {

        return;

      }


      cardStyles =
        cardStyles.filter(
          (item) =>
            item.id !== style.id
        );


      cardProducts.forEach(
        (product) => {

          if (
            product.cardStyleId ===
            style.id
          ) {

            product.cardStyleId =
              cardStyles[0].id;

          }

        }
      );


      editingStyleId =
        cardStyles[0].id;

      saveCardStyles();
      saveCardProducts();

      renderCardDesigner();

      cardToast(
        "Card style deleted."
      );

    }
  );


  /* =======================================================
     REFERENCE ARTWORK
  ======================================================== */

  function renderReferencePreview(
    source
  ) {

    const preview =
      document.getElementById(
        "cardReferencePreview"
      );

    if (!source) {

      preview.innerHTML =
        "No Reference Image";

      return;

    }


    preview.innerHTML = `
      <img
        src="${escapeCardHTML(source)}"
        alt="Card design reference"
      />
    `;

  }


  document.getElementById(
    "cardReferenceUpload"
  ).addEventListener(
    "change",
    (event) => {

      const file =
        event.target.files?.[0];

      if (!file) return;


      if (
        !file.type.startsWith(
          "image/"
        )
      ) {

        cardToast(
          "Choose an image file."
        );

        return;
      }


      const reader =
        new FileReader();


      reader.onload = () => {

        updateCardValue(
          "referenceImage",
          reader.result
        );

        document.getElementById(
          "cardReferenceUrl"
        ).value =
          reader.result;

        renderReferencePreview(
          reader.result
        );

        cardToast(
          "Reference image added."
        );

      };


      reader.readAsDataURL(file);

    }
  );


  document.getElementById(
    "cardReferenceUrl"
  ).addEventListener(
    "change",
    (event) => {

      const value =
        event.target.value.trim();

      updateCardValue(
        "referenceImage",
        value
      );

      renderReferencePreview(
        value
      );

    }
  );


  document.getElementById(
    "useReferenceArtworkToggle"
  ).addEventListener(
    "change",
    (event) => {

      updateCardValue(
        "useReferenceAsArtwork",
        event.target.checked
      );

    }
  );


  /* =======================================================
     LIVE PREVIEW
  ======================================================== */

  function shadowValue(
    style
  ) {

    if (
      style.shadow === "none"
    ) {
      return "none";
    }

    if (
      style.shadow === "deep"
    ) {
      return "0 24px 50px rgba(0,0,0,.25)";
    }

    if (
      style.shadow === "glow"
    ) {
      return `0 0 35px ${style.glowColor}66`;
    }

    return "0 16px 38px rgba(16,59,99,.15)";

  }


  function renderCardPreview() {

    const stage =
      document.getElementById(
        "cardDesignerStage"
      );

    const style =
      getResolvedCardStyle();

    const product =
      getCardProduct();


    const title =
      product?.title ||
      "Your Product Title";

    const image =
      product?.image || "";

    const badge =
      product?.badge ||
      "FEATURED";

    const price =
      Number(
        product?.price || 27
      ).toFixed(2);


    const artwork =
      style.useReferenceAsArtwork &&
      style.referenceImage;


    stage.innerHTML = `
      <article
        class="
          designed-product-card
          card-hover-${style.hoverEffect}
          card-animation-${style.animation}
        "
        style="
          background:${style.cardBackground};
          color:${style.cardText};
          border:${style.borderWidth}px solid ${style.cardBorder};
          border-radius:${style.radius}px;
          box-shadow:${shadowValue(style)};
        "
      >

        ${
          artwork
            ? `
              <div
                class="designed-card-artwork"
                style="
                  background-image:url('${escapeCardHTML(
                    style.referenceImage
                  )}');
                  aspect-ratio:${style.imageRatio};
                "
              ></div>
            `
            : `
              <div
                class="designed-card-image"
                style="
                  aspect-ratio:${style.imageRatio};
                  background:${style.cardBackground};
                "
              >

                ${
                  image
                    ? `
                      <img
                        src="${escapeCardHTML(image)}"
                        alt=""
                        style="
                          object-fit:${style.imageFit};
                        "
                      />
                    `
                    : `
                      <div class="designed-card-fallback">
                        GLAM
                      </div>
                    `
                }

                ${
                  badge
                    ? `
                      <span
                        class="designed-card-badge"
                        style="
                          background:${style.badgeBackground};
                          color:${style.badgeText};
                          border-radius:${style.badgeRadius}px;
                        "
                      >
                        ${escapeCardHTML(badge)}
                      </span>
                    `
                    : ""
                }

              </div>
            `
        }


        <div
          class="designed-card-body"
          style="
            padding:${style.spacing}px;
          "
        >

          <h3
            style="
              color:${style.titleColor};
              font-family:${style.titleFont};
              font-size:${style.titleSize}px;
            "
          >
            ${escapeCardHTML(title)}
          </h3>


          <strong
            class="designed-card-price"
            style="
              color:${style.priceColor};
              font-size:${style.priceSize}px;
            "
          >
            $${price}
          </strong>


          <button
            type="button"
            style="
              background:${style.buttonBackground};
              color:${style.buttonText};
              border-radius:${style.buttonRadius}px;
            "
          >
            VIEW PRODUCT
          </button>

        </div>

      </article>
    `;

  }


  /* =======================================================
     FULL RENDER
  ======================================================== */

  function renderCardDesigner() {

    cardProducts =
      loadCardProducts();

    cardProducts.forEach(
      ensureProductCardData
    );


    if (
      !selectedCardProductId &&
      cardProducts.length
    ) {

      selectedCardProductId =
        cardProducts[0].id;

    }


    const product =
      getCardProduct();

    if (
      product?.cardStyleId
    ) {

      editingStyleId =
        product.cardStyleId;

    }


    renderCardLibrary();
    renderCardProductSelect();
    renderStyleSelect();
    renderCardControls();
    renderCardPreview();

  }


  renderCardDesigner();

});

/* =========================================================
   GLAM WEBSITE CONTROL CENTER
   SECTION MANAGER / PAGE BUILDER
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const sectionScreen =
    document.getElementById("screen-sections");

  if (!sectionScreen) return;


  /* =======================================================
     STORAGE
  ======================================================== */

  const SECTION_STORAGE_KEY =
    "glamWebsiteSections";


  const defaultSections = [
    {
      id: "mansion-hero",
      type: "mansion",
      name: "Mansion Hero",
      visible: true,
      heading: "Choose Your Room",
      text: "Explore the Glam Hustle Hub through the mansion.",
      buttonText: "",
      buttonLink: "",
      backgroundColor: "#103B63",
      textColor: "#FFFFFF",
      backgroundImage: "",
      spacing: 24,
      animation: "none"
    },

    {
      id: "quick-access",
      type: "quick-access",
      name: "Quick Access",
      visible: true,
      heading: "Quick Access",
      text: "",
      buttonText: "",
      buttonLink: "",
      backgroundColor: "#FFFFFF",
      textColor: "#171A1E",
      backgroundImage: "",
      spacing: 22,
      animation: "none"
    },

    {
      id: "featured-products",
      type: "products",
      name: "Featured Products",
      visible: true,
      heading: "Featured This Week",
      text: "A few favorites from the Hub.",
      buttonText: "SHOP ALL",
      buttonLink: "#",
      backgroundColor: "#F7FBFF",
      textColor: "#171A1E",
      backgroundImage: "",
      spacing: 26,
      animation: "fade-up"
    },

    {
      id: "about",
      type: "about",
      name: "About",
      visible: true,
      heading: "What Is Glam Hustle Hub?",
      text:
        "Creative tools, support, and resources designed to help beginners turn ideas into something real.",
      buttonText: "LEARN MORE",
      buttonLink: "#",
      backgroundColor: "#FFFFFF",
      textColor: "#171A1E",
      backgroundImage: "",
      spacing: 26,
      animation: "fade-up"
    },

    {
      id: "reviews",
      type: "reviews",
      name: "Reviews",
      visible: true,
      heading: "Real Women. Real Results.",
      text: "",
      buttonText: "",
      buttonLink: "",
      backgroundColor: "#F7FBFF",
      textColor: "#171A1E",
      backgroundImage: "",
      spacing: 24,
      animation: "fade-up"
    },

    {
      id: "footer",
      type: "footer",
      name: "Footer",
      visible: true,
      heading: "",
      text: "",
      buttonText: "",
      buttonLink: "",
      backgroundColor: "#103B63",
      textColor: "#FFFFFF",
      backgroundImage: "",
      spacing: 24,
      animation: "none"
    }
  ];


  function cloneSectionData(value) {
    return JSON.parse(
      JSON.stringify(value)
    );
  }


  function loadSections() {

    try {

      const saved =
        JSON.parse(
          localStorage.getItem(
            SECTION_STORAGE_KEY
          )
        );

      if (
        Array.isArray(saved) &&
        saved.length
      ) {
        return saved;
      }

    } catch (error) {

      console.warn(
        "Could not load website sections.",
        error
      );

    }


    const starting =
      cloneSectionData(
        defaultSections
      );

    localStorage.setItem(
      SECTION_STORAGE_KEY,
      JSON.stringify(starting)
    );

    return starting;
  }


  function saveSections() {

    localStorage.setItem(
      SECTION_STORAGE_KEY,
      JSON.stringify(sections)
    );

  }


  function sectionId(value) {

    return (
      String(value || "section")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") +
      "-" +
      Date.now()
    );

  }


  function escapeSectionHTML(value) {

    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  }


  function sectionToast(message) {

    const toast =
      document.getElementById(
        "adminToast"
      );

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(
      window.glamSectionToastTimer
    );

    window.glamSectionToastTimer =
      setTimeout(() => {

        toast.classList.remove(
          "show"
        );

      }, 2500);

  }


  let sections = loadSections();

  let selectedSectionId =
    sections[0]?.id || null;


  function getSelectedSection() {

    return sections.find(
      (section) =>
        section.id ===
        selectedSectionId
    );

  }


  /* =======================================================
     BUILD SCREEN
  ======================================================== */

  sectionScreen.innerHTML = `
    <div class="screen-heading">

      <div>

        <span class="section-kicker">
          PAGE BUILDER
        </span>

        <h2>
          Section Manager
        </h2>

        <p>
          Reorder, hide, redesign and add homepage sections
          without editing HTML.
        </p>

      </div>


      <button
        class="primary-button"
        id="addWebsiteSectionButton"
        type="button"
      >
        + Add Section
      </button>

    </div>


    <div class="section-manager-layout">


      <!-- SECTION LIST -->

      <div class="section-manager-left">

        <div class="panel">

          <div class="panel-heading">

            <div>

              <span class="section-kicker">
                HOMEPAGE ORDER
              </span>

              <h3>
                Drag sections to reorder
              </h3>

            </div>

          </div>


          <div
            class="section-list"
            id="websiteSectionList"
          ></div>

        </div>

      </div>


      <!-- SECTION EDITOR -->

      <div class="section-manager-right">

        <div class="panel">

          <div class="panel-heading">

            <div>

              <span class="section-kicker">
                SECTION EDITOR
              </span>

              <h3
                id="sectionEditorTitle"
              >
                Select a section
              </h3>

            </div>

          </div>


          <div
            id="sectionEditorEmpty"
            class="section-editor-empty"
          >
            Select a section from the list.
          </div>


          <div
            id="sectionEditorControls"
            class="section-editor-controls"
            hidden
          >


            <label class="theme-field">

              <span>
                Section Name
              </span>

              <input
                id="sectionNameInput"
                type="text"
              />

            </label>


            <label class="theme-field">

              <span>
                Section Type
              </span>

              <select
                id="sectionTypeInput"
              >

                <option value="mansion">
                  Mansion Hero
                </option>

                <option value="quick-access">
                  Quick Access
                </option>

                <option value="products">
                  Featured Products
                </option>

                <option value="about">
                  About
                </option>

                <option value="reviews">
                  Reviews
                </option>

                <option value="announcement">
                  Announcement
                </option>

                <option value="promo">
                  Promo Banner
                </option>

                <option value="video">
                  Video
                </option>

                <option value="gallery">
                  Image Gallery
                </option>

                <option value="countdown">
                  Countdown
                </option>

                <option value="cta">
                  Custom CTA
                </option>

                <option value="footer">
                  Footer
                </option>

                <option value="custom">
                  Custom Section
                </option>

              </select>

            </label>


            <div class="section-toggle-box">

              <div>

                <strong>
                  Show Section
                </strong>

                <small>
                  Display this section on the homepage
                </small>

              </div>


              <label class="toggle-switch">

                <input
                  id="sectionVisibleInput"
                  type="checkbox"
                />

                <span></span>

              </label>

            </div>


            <label class="theme-field">

              <span>
                Heading
              </span>

              <input
                id="sectionHeadingInput"
                type="text"
              />

            </label>


            <label class="theme-field">

              <span>
                Text
              </span>

              <textarea
                id="sectionTextInput"
                rows="5"
              ></textarea>

            </label>


            <div class="section-two-column">

              <label class="theme-field">

                <span>
                  Button Label
                </span>

                <input
                  id="sectionButtonTextInput"
                  type="text"
                />

              </label>


              <label class="theme-field">

                <span>
                  Button Link
                </span>

                <input
                  id="sectionButtonLinkInput"
                  type="text"
                  placeholder="https://... or /page"
                />

              </label>

            </div>


            <!-- COLORS -->

            <div class="section-two-column">

              <div class="color-control">

                <span class="color-control-label">
                  Background Color
                </span>

                <div class="color-input-row">

                  <input
                    id="sectionBackgroundPicker"
                    type="color"
                  />

                  <input
                    id="sectionBackgroundHex"
                    type="text"
                    maxlength="7"
                  />

                </div>

              </div>


              <div class="color-control">

                <span class="color-control-label">
                  Text Color
                </span>

                <div class="color-input-row">

                  <input
                    id="sectionTextPicker"
                    type="color"
                  />

                  <input
                    id="sectionTextHex"
                    type="text"
                    maxlength="7"
                  />

                </div>

              </div>

            </div>


            <!-- BACKGROUND IMAGE -->

            <div class="section-image-preview"
                 id="sectionImagePreview">
              No Background Image
            </div>


            <label class="mansion-upload-button">

              <input
                id="sectionBackgroundUpload"
                type="file"
                accept="image/*"
              />

              <span>
                Upload Background Image
              </span>

            </label>


            <label class="theme-field">

              <span>
                Background Image URL or Path
              </span>

              <input
                id="sectionBackgroundUrl"
                type="text"
                placeholder="images/background.png"
              />

            </label>


            <!-- SPACING + ANIMATION -->

            <div class="section-two-column">

              <label class="theme-field">

                <span>
                  Section Spacing
                </span>

                <input
                  id="sectionSpacingInput"
                  type="number"
                  min="0"
                  max="140"
                  step="1"
                />

              </label>


              <label class="theme-field">

                <span>
                  Animation
                </span>

                <select
                  id="sectionAnimationInput"
                >

                  <option value="none">
                    None
                  </option>

                  <option value="fade-up">
                    Fade Up
                  </option>

                  <option value="fade-in">
                    Fade In
                  </option>

                  <option value="slide-left">
                    Slide Left
                  </option>

                  <option value="slide-right">
                    Slide Right
                  </option>

                  <option value="pop">
                    Pop
                  </option>

                  <option value="float">
                    Float
                  </option>

                  <option value="soft-glow">
                    Soft Glow
                  </option>

                </select>

              </label>

            </div>


            <!-- ACTIONS -->

            <div class="section-editor-actions">

              <button
                class="secondary-button"
                id="duplicateWebsiteSectionButton"
                type="button"
              >
                Duplicate Section
              </button>

              <button
                class="danger-button"
                id="deleteWebsiteSectionButton"
                type="button"
              >
                Delete Section
              </button>

            </div>

          </div>

        </div>


        <!-- MINI PREVIEW -->

        <div class="panel">

          <div class="panel-heading">

            <div>

              <span class="section-kicker">
                SECTION PREVIEW
              </span>

              <h3>
                Current section
              </h3>

            </div>

          </div>


          <div
            class="section-live-preview"
            id="sectionLivePreview"
          >
            Select a section to preview it.
          </div>

        </div>

      </div>

    </div>
  `;


  /* =======================================================
     DOM
  ======================================================== */

  const sectionList =
    document.getElementById(
      "websiteSectionList"
    );

  const editorTitle =
    document.getElementById(
      "sectionEditorTitle"
    );

  const editorEmpty =
    document.getElementById(
      "sectionEditorEmpty"
    );

  const editorControls =
    document.getElementById(
      "sectionEditorControls"
    );

  const sectionNameInput =
    document.getElementById(
      "sectionNameInput"
    );

  const sectionTypeInput =
    document.getElementById(
      "sectionTypeInput"
    );

  const sectionVisibleInput =
    document.getElementById(
      "sectionVisibleInput"
    );

  const sectionHeadingInput =
    document.getElementById(
      "sectionHeadingInput"
    );

  const sectionTextInput =
    document.getElementById(
      "sectionTextInput"
    );

  const sectionButtonTextInput =
    document.getElementById(
      "sectionButtonTextInput"
    );

  const sectionButtonLinkInput =
    document.getElementById(
      "sectionButtonLinkInput"
    );

  const sectionBackgroundPicker =
    document.getElementById(
      "sectionBackgroundPicker"
    );

  const sectionBackgroundHex =
    document.getElementById(
      "sectionBackgroundHex"
    );

  const sectionTextPicker =
    document.getElementById(
      "sectionTextPicker"
    );

  const sectionTextHex =
    document.getElementById(
      "sectionTextHex"
    );

  const sectionBackgroundUpload =
    document.getElementById(
      "sectionBackgroundUpload"
    );

  const sectionBackgroundUrl =
    document.getElementById(
      "sectionBackgroundUrl"
    );

  const sectionSpacingInput =
    document.getElementById(
      "sectionSpacingInput"
    );

  const sectionAnimationInput =
    document.getElementById(
      "sectionAnimationInput"
    );

  const sectionImagePreview =
    document.getElementById(
      "sectionImagePreview"
    );

  const sectionLivePreview =
    document.getElementById(
      "sectionLivePreview"
    );


  /* =======================================================
     LIST
  ======================================================== */

  let draggedSectionId = null;


  function renderSectionList() {

    sectionList.innerHTML = "";


    sections.forEach(
      (section, index) => {

        const item =
          document.createElement(
            "button"
          );

        item.type = "button";
        item.draggable = true;

        item.dataset.sectionId =
          section.id;

        item.className =
          "section-list-item";

        if (
          section.id ===
          selectedSectionId
        ) {
          item.classList.add(
            "selected"
          );
        }


        item.innerHTML = `
          <span class="shop-drag-handle">
            ⋮⋮
          </span>

          <span class="section-order-number">
            ${index + 1}
          </span>

          <span class="section-list-copy">

            <strong>
              ${escapeSectionHTML(section.name)}
            </strong>

            <small>
              ${escapeSectionHTML(section.type)}
            </small>

          </span>

          <span
            class="section-visibility-badge ${
              section.visible
                ? "section-on"
                : ""
            }"
          >
            ${
              section.visible
                ? "ON"
                : "OFF"
            }
          </span>
        `;


        item.addEventListener(
          "click",
          () => {

            selectedSectionId =
              section.id;

            renderSectionManager();

          }
        );


        item.addEventListener(
          "dragstart",
          () => {

            draggedSectionId =
              section.id;

            item.classList.add(
              "dragging"
            );

          }
        );


        item.addEventListener(
          "dragend",
          () => {

            draggedSectionId =
              null;

            item.classList.remove(
              "dragging"
            );

          }
        );


        item.addEventListener(
          "dragover",
          (event) => {

            event.preventDefault();

            item.classList.add(
              "drag-over"
            );

          }
        );


        item.addEventListener(
          "dragleave",
          () => {

            item.classList.remove(
              "drag-over"
            );

          }
        );


        item.addEventListener(
          "drop",
          (event) => {

            event.preventDefault();

            item.classList.remove(
              "drag-over"
            );


            if (
              !draggedSectionId ||
              draggedSectionId ===
                section.id
            ) {
              return;
            }


            const fromIndex =
              sections.findIndex(
                (entry) =>
                  entry.id ===
                  draggedSectionId
              );

            const toIndex =
              sections.findIndex(
                (entry) =>
                  entry.id ===
                  section.id
              );


            const [moved] =
              sections.splice(
                fromIndex,
                1
              );

            sections.splice(
              toIndex,
              0,
              moved
            );


            saveSections();

            renderSectionManager();

            sectionToast(
              "Section order updated."
            );

          }
        );


        sectionList.appendChild(
          item
        );

      }
    );

  }


  /* =======================================================
     LOAD EDITOR
  ======================================================== */

  function loadSectionEditor() {

    const section =
      getSelectedSection();


    if (!section) {

      editorEmpty.hidden =
        false;

      editorControls.hidden =
        true;

      editorTitle.textContent =
        "Select a section";

      sectionLivePreview.innerHTML =
        "Select a section to preview it.";

      return;
    }


    editorEmpty.hidden =
      true;

    editorControls.hidden =
      false;

    editorTitle.textContent =
      section.name;


    sectionNameInput.value =
      section.name;

    sectionTypeInput.value =
      section.type;

    sectionVisibleInput.checked =
      section.visible;

    sectionHeadingInput.value =
      section.heading || "";

    sectionTextInput.value =
      section.text || "";

    sectionButtonTextInput.value =
      section.buttonText || "";

    sectionButtonLinkInput.value =
      section.buttonLink || "";

    sectionBackgroundPicker.value =
      section.backgroundColor;

    sectionBackgroundHex.value =
      section.backgroundColor;

    sectionTextPicker.value =
      section.textColor;

    sectionTextHex.value =
      section.textColor;

    sectionBackgroundUrl.value =
      section.backgroundImage || "";

    sectionSpacingInput.value =
      section.spacing;

    sectionAnimationInput.value =
      section.animation;


    renderSectionImage();
    renderSectionPreview();

  }


  function updateSection(
    property,
    value
  ) {

    const section =
      getSelectedSection();

    if (!section) return;

    section[property] =
      value;

    saveSections();

    renderSectionList();
    renderSectionPreview();

    editorTitle.textContent =
      section.name;

  }


  /* =======================================================
     INPUT EVENTS
  ======================================================== */

  sectionNameInput.addEventListener(
    "input",
    () => {

      updateSection(
        "name",
        sectionNameInput.value ||
          "Untitled Section"
      );

    }
  );


  sectionTypeInput.addEventListener(
    "change",
    () => {

      updateSection(
        "type",
        sectionTypeInput.value
      );

    }
  );


  sectionVisibleInput.addEventListener(
    "change",
    () => {

      updateSection(
        "visible",
        sectionVisibleInput.checked
      );

    }
  );


  sectionHeadingInput.addEventListener(
    "input",
    () => {

      updateSection(
        "heading",
        sectionHeadingInput.value
      );

    }
  );


  sectionTextInput.addEventListener(
    "input",
    () => {

      updateSection(
        "text",
        sectionTextInput.value
      );

    }
  );


  sectionButtonTextInput.addEventListener(
    "input",
    () => {

      updateSection(
        "buttonText",
        sectionButtonTextInput.value
      );

    }
  );


  sectionButtonLinkInput.addEventListener(
    "input",
    () => {

      updateSection(
        "buttonLink",
        sectionButtonLinkInput.value
      );

    }
  );


  sectionSpacingInput.addEventListener(
    "input",
    () => {

      updateSection(
        "spacing",
        Math.max(
          0,
          Math.min(
            140,
            Number(
              sectionSpacingInput.value ||
              0
            )
          )
        )
      );

    }
  );


  sectionAnimationInput.addEventListener(
    "change",
    () => {

      updateSection(
        "animation",
        sectionAnimationInput.value
      );

    }
  );


  /* =======================================================
     COLOR HANDLING
  ======================================================== */

  function normalizeSectionHex(value) {

    let color =
      value.trim();

    if (
      !color.startsWith("#")
    ) {
      color = "#" + color;
    }

    if (
      /^#[0-9A-Fa-f]{6}$/.test(
        color
      )
    ) {
      return color.toUpperCase();
    }

    return null;

  }


  sectionBackgroundPicker.addEventListener(
    "input",
    () => {

      const value =
        sectionBackgroundPicker.value
          .toUpperCase();

      sectionBackgroundHex.value =
        value;

      updateSection(
        "backgroundColor",
        value
      );

    }
  );


  sectionBackgroundHex.addEventListener(
    "change",
    () => {

      const value =
        normalizeSectionHex(
          sectionBackgroundHex.value
        );

      if (!value) {

        loadSectionEditor();

        sectionToast(
          "Use a six-digit hex color."
        );

        return;
      }

      sectionBackgroundPicker.value =
        value;

      updateSection(
        "backgroundColor",
        value
      );

    }
  );


  sectionTextPicker.addEventListener(
    "input",
    () => {

      const value =
        sectionTextPicker.value
          .toUpperCase();

      sectionTextHex.value =
        value;

      updateSection(
        "textColor",
        value
      );

    }
  );


  sectionTextHex.addEventListener(
    "change",
    () => {

      const value =
        normalizeSectionHex(
          sectionTextHex.value
        );

      if (!value) {

        loadSectionEditor();

        sectionToast(
          "Use a six-digit hex color."
        );

        return;
      }

      sectionTextPicker.value =
        value;

      updateSection(
        "textColor",
        value
      );

    }
  );


  /* =======================================================
     BACKGROUND IMAGE
  ======================================================== */

  function renderSectionImage() {

    const section =
      getSelectedSection();

    if (
      !section ||
      !section.backgroundImage
    ) {

      sectionImagePreview.innerHTML =
        "No Background Image";

      return;
    }


    sectionImagePreview.innerHTML = `
      <img
        src="${escapeSectionHTML(
          section.backgroundImage
        )}"
        alt=""
      />
    `;

  }


  sectionBackgroundUrl.addEventListener(
    "change",
    () => {

      updateSection(
        "backgroundImage",
        sectionBackgroundUrl.value.trim()
      );

      renderSectionImage();

    }
  );


  sectionBackgroundUpload.addEventListener(
    "change",
    () => {

      const file =
        sectionBackgroundUpload
          .files?.[0];

      if (!file) return;


      if (
        !file.type.startsWith(
          "image/"
        )
      ) {

        sectionToast(
          "Choose an image file."
        );

        return;
      }


      const reader =
        new FileReader();


      reader.onload = () => {

        updateSection(
          "backgroundImage",
          reader.result
        );

        sectionBackgroundUrl.value =
          reader.result;

        renderSectionImage();

        sectionToast(
          "Section image loaded."
        );

      };


      reader.readAsDataURL(file);

    }
  );


  /* =======================================================
     LIVE PREVIEW
  ======================================================== */

  function renderSectionPreview() {

    const section =
      getSelectedSection();

    if (!section) return;


    sectionLivePreview.innerHTML = `
      <div
        class="
          section-preview-inner
          section-preview-animation-${section.animation}
        "
        style="
          background-color:${section.backgroundColor};
          color:${section.textColor};
          padding:${section.spacing}px;
          ${
            section.backgroundImage
              ? `
                background-image:
                  linear-gradient(
                    rgba(0,0,0,.18),
                    rgba(0,0,0,.18)
                  ),
                  url('${escapeSectionHTML(
                    section.backgroundImage
                  )}');
                background-size:cover;
                background-position:center;
              `
              : ""
          }
        "
      >

        <span class="section-preview-type">
          ${escapeSectionHTML(section.type)}
        </span>

        ${
          section.heading
            ? `
              <h2>
                ${escapeSectionHTML(section.heading)}
              </h2>
            `
            : ""
        }

        ${
          section.text
            ? `
              <p>
                ${escapeSectionHTML(section.text)}
              </p>
            `
            : ""
        }

        ${
          section.buttonText
            ? `
              <button type="button">
                ${escapeSectionHTML(
                  section.buttonText
                )}
              </button>
            `
            : ""
        }

      </div>
    `;

  }


  /* =======================================================
     ADD SECTION
  ======================================================== */

  document.getElementById(
    "addWebsiteSectionButton"
  ).addEventListener(
    "click",
    () => {

      const name =
        prompt(
          "What do you want to call this section?"
        );

      if (!name?.trim()) return;


      const section = {

        id:
          sectionId(name),

        type:
          "custom",

        name:
          name.trim(),

        visible:
          true,

        heading:
          name.trim(),

        text:
          "",

        buttonText:
          "",

        buttonLink:
          "",

        backgroundColor:
          "#FFFFFF",

        textColor:
          "#171A1E",

        backgroundImage:
          "",

        spacing:
          24,

        animation:
          "none"

      };


      sections.push(
        section
      );

      selectedSectionId =
        section.id;

      saveSections();

      renderSectionManager();

      sectionToast(
        "Section added."
      );

    }
  );


  /* =======================================================
     DUPLICATE
  ======================================================== */

  document.getElementById(
    "duplicateWebsiteSectionButton"
  ).addEventListener(
    "click",
    () => {

      const source =
        getSelectedSection();

      if (!source) return;


      const copy =
        cloneSectionData(
          source
        );

      copy.id =
        sectionId(
          source.name + "-copy"
        );

      copy.name =
        source.name + " Copy";


      const index =
        sections.findIndex(
          (section) =>
            section.id ===
            source.id
        );


      sections.splice(
        index + 1,
        0,
        copy
      );


      selectedSectionId =
        copy.id;

      saveSections();

      renderSectionManager();

      sectionToast(
        "Section duplicated."
      );

    }
  );


  /* =======================================================
     DELETE
  ======================================================== */

  document.getElementById(
    "deleteWebsiteSectionButton"
  ).addEventListener(
    "click",
    () => {

      const section =
        getSelectedSection();

      if (!section) return;


      if (
        !confirm(
          `Delete "${section.name}"?`
        )
      ) {
        return;
      }


      const index =
        sections.findIndex(
          (item) =>
            item.id ===
            section.id
        );


      sections =
        sections.filter(
          (item) =>
            item.id !==
            section.id
        );


      selectedSectionId =
        sections[index]?.id ||
        sections[index - 1]?.id ||
        null;


      saveSections();

      renderSectionManager();

      sectionToast(
        "Section deleted."
      );

    }
  );


  /* =======================================================
     FULL RENDER
  ======================================================== */

  function renderSectionManager() {

    renderSectionList();
    loadSectionEditor();

  }


  renderSectionManager();

});

/* =========================================================
   GLAM WEBSITE CONTROL CENTER
   MEDIA LIBRARY
   IndexedDB browser storage
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const mediaScreen =
    document.getElementById("screen-media");

  if (!mediaScreen) return;


  /* =======================================================
     DATABASE
  ======================================================== */

  const DB_NAME =
    "GlamWebsiteControlCenter";

  const DB_VERSION = 1;

  const STORE_NAME =
    "mediaLibrary";


  const MEDIA_CATEGORIES = [
    "Products",
    "Mansion",
    "Branding",
    "Backgrounds",
    "Seasonal",
    "Other"
  ];


  let mediaDatabase = null;

  let mediaItems = [];

  let mediaSearchTerm = "";

  let mediaCategoryFilter =
    "All";

  let selectedMediaId = null;

  let currentMediaView =
    "grid";


  /* =======================================================
     HELPERS
  ======================================================== */

  function mediaToast(message) {

    const toast =
      document.getElementById(
        "adminToast"
      );

    if (!toast) return;

    toast.textContent =
      message;

    toast.classList.add(
      "show"
    );

    clearTimeout(
      window.glamMediaToastTimer
    );

    window.glamMediaToastTimer =
      setTimeout(() => {

        toast.classList.remove(
          "show"
        );

      }, 2500);

  }


  function escapeMediaHTML(value) {

    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  }


  function makeMediaId() {

    return (
      "media-" +
      Date.now() +
      "-" +
      Math.random()
        .toString(36)
        .slice(2, 9)
    );

  }


  function formatFileSize(bytes) {

    if (
      !Number.isFinite(bytes) ||
      bytes <= 0
    ) {
      return "—";
    }

    const units = [
      "B",
      "KB",
      "MB",
      "GB"
    ];

    let value = bytes;
    let index = 0;

    while (
      value >= 1024 &&
      index < units.length - 1
    ) {

      value /= 1024;
      index++;

    }

    return (
      value.toFixed(
        index === 0 ? 0 : 1
      ) +
      " " +
      units[index]
    );

  }


  function formatMediaDate(timestamp) {

    if (!timestamp) {
      return "—";
    }

    const date =
      new Date(timestamp);

    return date.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric"
      }
    );

  }


  function getMediaKind(item) {

    if (
      item.type?.startsWith(
        "video/"
      )
    ) {
      return "video";
    }

    if (
      item.type?.startsWith(
        "image/"
      )
    ) {
      return "image";
    }

    if (
      item.sourceType === "url"
    ) {

      const lower =
        String(item.url || "")
          .toLowerCase();

      if (
        /\.(mp4|webm|mov|m4v)(\?|$)/i
          .test(lower)
      ) {
        return "video";
      }

    }

    return "image";

  }


  function revokePreviewUrls() {

    document
      .querySelectorAll(
        "[data-media-object-url]"
      )
      .forEach((element) => {

        const url =
          element.dataset
            .mediaObjectUrl;

        if (url) {

          try {

            URL.revokeObjectURL(
              url
            );

          } catch (error) {
            // Safe cleanup.
          }

        }

      });

  }


  function createMediaSource(
    item
  ) {

    if (
      item.sourceType === "url"
    ) {

      return {
        src: item.url,
        objectUrl: false
      };

    }


    if (item.blob) {

      const objectUrl =
        URL.createObjectURL(
          item.blob
        );

      return {
        src: objectUrl,
        objectUrl: true
      };

    }


    return {
      src: "",
      objectUrl: false
    };

  }


  /* =======================================================
     INDEXED DB
  ======================================================== */

  function openMediaDatabase() {

    return new Promise(
      (resolve, reject) => {

        const request =
          indexedDB.open(
            DB_NAME,
            DB_VERSION
          );


        request.onupgradeneeded =
          (event) => {

            const database =
              event.target.result;


            if (
              !database
                .objectStoreNames
                .contains(
                  STORE_NAME
                )
            ) {

              const store =
                database
                  .createObjectStore(
                    STORE_NAME,
                    {
                      keyPath: "id"
                    }
                  );


              store.createIndex(
                "category",
                "category",
                {
                  unique: false
                }
              );


              store.createIndex(
                "createdAt",
                "createdAt",
                {
                  unique: false
                }
              );

            }

          };


        request.onsuccess =
          () => {

            mediaDatabase =
              request.result;

            resolve(
              mediaDatabase
            );

          };


        request.onerror =
          () => {

            reject(
              request.error
            );

          };

      }
    );

  }


  function getAllMedia() {

    return new Promise(
      (resolve, reject) => {

        if (!mediaDatabase) {

          resolve([]);
          return;

        }


        const transaction =
          mediaDatabase
            .transaction(
              STORE_NAME,
              "readonly"
            );


        const store =
          transaction
            .objectStore(
              STORE_NAME
            );


        const request =
          store.getAll();


        request.onsuccess =
          () => {

            resolve(
              request.result || []
            );

          };


        request.onerror =
          () => {

            reject(
              request.error
            );

          };

      }
    );

  }


  function saveMediaItem(
    item
  ) {

    return new Promise(
      (resolve, reject) => {

        const transaction =
          mediaDatabase
            .transaction(
              STORE_NAME,
              "readwrite"
            );


        const store =
          transaction
            .objectStore(
              STORE_NAME
            );


        const request =
          store.put(item);


        request.onsuccess =
          () => resolve(item);


        request.onerror =
          () =>
            reject(
              request.error
            );

      }
    );

  }


  function deleteMediaItem(
    id
  ) {

    return new Promise(
      (resolve, reject) => {

        const transaction =
          mediaDatabase
            .transaction(
              STORE_NAME,
              "readwrite"
            );


        const store =
          transaction
            .objectStore(
              STORE_NAME
            );


        const request =
          store.delete(id);


        request.onsuccess =
          () => resolve();


        request.onerror =
          () =>
            reject(
              request.error
            );

      }
    );

  }


  /* =======================================================
     BUILD MEDIA SCREEN
  ======================================================== */

  mediaScreen.innerHTML = `
    <div class="screen-heading">

      <div>

        <span class="section-kicker">
          WEBSITE ASSETS
        </span>

        <h2>
          Media Library
        </h2>

        <p>
          Upload once, organize it, and reuse your
          images and videos across the website.
        </p>

      </div>


      <div class="media-heading-actions">

        <label
          class="primary-button media-upload-main"
        >

          <input
            id="mediaMainUpload"
            type="file"
            accept="image/*,video/*"
            multiple
          />

          Upload Media

        </label>


        <button
          class="secondary-button"
          id="mediaAddUrlButton"
          type="button"
        >
          + Add URL
        </button>

      </div>

    </div>


    <!-- CATEGORY CARDS -->

    <div
      class="media-category-grid"
      id="mediaCategoryGrid"
    ></div>


    <!-- MAIN LIBRARY -->

    <div class="media-library-layout">


      <div class="media-library-main">

        <div class="panel">

          <div class="media-toolbar">

            <input
              id="mediaSearchInput"
              type="search"
              placeholder="Search media..."
            />


            <select
              id="mediaCategoryFilter"
            >

              <option value="All">
                All Media
              </option>

              ${MEDIA_CATEGORIES
                .map(
                  (category) =>
                    `
                      <option value="${category}">
                        ${category}
                      </option>
                    `
                )
                .join("")}

            </select>


            <div class="media-view-switch">

              <button
                id="mediaGridViewButton"
                class="active"
                type="button"
                title="Grid view"
              >
                ▦
              </button>


              <button
                id="mediaListViewButton"
                type="button"
                title="List view"
              >
                ☷
              </button>

            </div>

          </div>


          <div
            class="media-storage-summary"
            id="mediaStorageSummary"
          ></div>


          <div
            class="media-library-grid"
            id="mediaLibraryGrid"
          ></div>

        </div>

      </div>


      <!-- DETAILS -->

      <aside class="media-library-details">

        <div class="panel media-details-panel">

          <div class="panel-heading">

            <div>

              <span class="section-kicker">
                MEDIA DETAILS
              </span>

              <h3 id="mediaDetailsTitle">
                Select an item
              </h3>

            </div>

          </div>


          <div
            class="media-details-empty"
            id="mediaDetailsEmpty"
          >
            Select an image or video from your library.
          </div>


          <div
            class="media-details-content"
            id="mediaDetailsContent"
            hidden
          >


            <div
              class="media-details-preview"
              id="mediaDetailsPreview"
            ></div>


            <label class="theme-field">

              <span>
                Name
              </span>

              <input
                id="mediaNameInput"
                type="text"
              />

            </label>


            <label class="theme-field">

              <span>
                Category
              </span>

              <select
                id="mediaCategoryInput"
              >

                ${MEDIA_CATEGORIES
                  .map(
                    (category) =>
                      `
                        <option value="${category}">
                          ${category}
                        </option>
                      `
                  )
                  .join("")}

              </select>

            </label>


            <div class="media-favorite-row">

              <div>

                <strong>
                  Favorite
                </strong>

                <small>
                  Keep this asset easy to find
                </small>

              </div>


              <label class="toggle-switch">

                <input
                  id="mediaFavoriteInput"
                  type="checkbox"
                />

                <span></span>

              </label>

            </div>


            <div
              class="media-info-grid"
              id="mediaInfoGrid"
            ></div>


            <div class="media-id-box">

              <span>
                Media ID
              </span>

              <code id="mediaIdValue">
                —
              </code>

            </div>


            <div class="media-details-actions">

              <button
                class="secondary-button"
                id="mediaCopyIdButton"
                type="button"
              >
                Copy Media ID
              </button>


              <button
                class="danger-button"
                id="mediaDeleteButton"
                type="button"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      </aside>

    </div>


    <!-- ADD URL MODAL -->

    <div
      class="media-modal-backdrop"
      id="mediaUrlModal"
      hidden
    >

      <div
        class="media-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mediaUrlModalTitle"
      >

        <div class="media-modal-heading">

          <div>

            <span class="section-kicker">
              ADD FROM URL
            </span>

            <h3 id="mediaUrlModalTitle">
              Add media
            </h3>

          </div>


          <button
            id="closeMediaUrlModal"
            class="media-modal-close"
            type="button"
            aria-label="Close"
          >
            ×
          </button>

        </div>


        <label class="theme-field">

          <span>
            Name
          </span>

          <input
            id="mediaUrlName"
            type="text"
            placeholder="Website image"
          />

        </label>


        <label class="theme-field">

          <span>
            Image or Video URL
          </span>

          <input
            id="mediaUrlValue"
            type="url"
            placeholder="https://..."
          />

        </label>


        <label class="theme-field">

          <span>
            Category
          </span>

          <select
            id="mediaUrlCategory"
          >

            ${MEDIA_CATEGORIES
              .map(
                (category) =>
                  `
                    <option value="${category}">
                      ${category}
                    </option>
                  `
              )
              .join("")}

          </select>

        </label>


        <button
          class="primary-button"
          id="saveMediaUrlButton"
          type="button"
        >
          Add to Library
        </button>

      </div>

    </div>
  `;


  /* =======================================================
     DOM
  ======================================================== */

  const mediaGrid =
    document.getElementById(
      "mediaLibraryGrid"
    );

  const categoryGrid =
    document.getElementById(
      "mediaCategoryGrid"
    );

  const searchInput =
    document.getElementById(
      "mediaSearchInput"
    );

  const categoryFilter =
    document.getElementById(
      "mediaCategoryFilter"
    );

  const storageSummary =
    document.getElementById(
      "mediaStorageSummary"
    );

  const detailsTitle =
    document.getElementById(
      "mediaDetailsTitle"
    );

  const detailsEmpty =
    document.getElementById(
      "mediaDetailsEmpty"
    );

  const detailsContent =
    document.getElementById(
      "mediaDetailsContent"
    );

  const detailsPreview =
    document.getElementById(
      "mediaDetailsPreview"
    );

  const nameInput =
    document.getElementById(
      "mediaNameInput"
    );

  const categoryInput =
    document.getElementById(
      "mediaCategoryInput"
    );

  const favoriteInput =
    document.getElementById(
      "mediaFavoriteInput"
    );

  const infoGrid =
    document.getElementById(
      "mediaInfoGrid"
    );

  const mediaIdValue =
    document.getElementById(
      "mediaIdValue"
    );

  const urlModal =
    document.getElementById(
      "mediaUrlModal"
    );


  /* =======================================================
     LOAD
  ======================================================== */

  async function refreshMediaData() {

    revokePreviewUrls();

    mediaItems =
      await getAllMedia();


    mediaItems.sort(
      (a, b) => {

        if (
          Boolean(b.favorite) !==
          Boolean(a.favorite)
        ) {

          return (
            Number(b.favorite) -
            Number(a.favorite)
          );

        }

        return (
          Number(b.createdAt || 0) -
          Number(a.createdAt || 0)
        );

      }
    );


    renderMediaLibrary();

  }


  /* =======================================================
     CATEGORY CARDS
  ======================================================== */

  function renderMediaCategories() {

    categoryGrid.innerHTML = "";


    const allCard =
      createCategoryCard(
        "All",
        "All Media",
        mediaItems.length
      );


    categoryGrid.appendChild(
      allCard
    );


    MEDIA_CATEGORIES.forEach(
      (category) => {

        const count =
          mediaItems.filter(
            (item) =>
              item.category ===
              category
          ).length;


        categoryGrid.appendChild(
          createCategoryCard(
            category,
            category,
            count
          )
        );

      }
    );

  }


  function createCategoryCard(
    value,
    label,
    count
  ) {

    const button =
      document.createElement(
        "button"
      );

    button.type = "button";

    button.className =
      "media-category-card";

    if (
      mediaCategoryFilter ===
      value
    ) {

      button.classList.add(
        "active"
      );

    }


    button.innerHTML = `
      <strong>
        ${escapeMediaHTML(label)}
      </strong>

      <span>
        ${count}
        ${
          count === 1
            ? "item"
            : "items"
        }
      </span>
    `;


    button.addEventListener(
      "click",
      () => {

        mediaCategoryFilter =
          value;

        categoryFilter.value =
          value;

        renderMediaLibrary();

      }
    );


    return button;
  }


  /* =======================================================
     FILTERING
  ======================================================== */

  function getFilteredMedia() {

    return mediaItems.filter(
      (item) => {

        const name =
          String(
            item.name || ""
          ).toLowerCase();


        const searchMatch =
          name.includes(
            mediaSearchTerm
              .toLowerCase()
          );


        const categoryMatch =
          mediaCategoryFilter ===
            "All" ||
          item.category ===
            mediaCategoryFilter;


        return (
          searchMatch &&
          categoryMatch
        );

      }
    );

  }


  /* =======================================================
     MEDIA GRID
  ======================================================== */

  function renderMediaGrid() {

    mediaGrid.innerHTML = "";

    mediaGrid.classList.toggle(
      "media-list-view",
      currentMediaView ===
        "list"
    );


    const filtered =
      getFilteredMedia();


    if (!filtered.length) {

      mediaGrid.innerHTML = `
        <div class="media-empty-state">

          <strong>
            ${
              mediaItems.length
                ? "No matching media."
                : "Your Media Library is empty."
            }
          </strong>

          <span>
            ${
              mediaItems.length
                ? "Try another search or category."
                : "Upload an image or video to get started."
            }
          </span>

        </div>
      `;

      return;
    }


    filtered.forEach(
      (item) => {

        const card =
          document.createElement(
            "button"
          );

        card.type = "button";

        card.className =
          "media-library-item";


        if (
          item.id ===
          selectedMediaId
        ) {

          card.classList.add(
            "selected"
          );

        }


        const source =
          createMediaSource(item);

        const kind =
          getMediaKind(item);


        let previewMarkup = "";


        if (
          source.src &&
          kind === "video"
        ) {

          previewMarkup = `
            <video
              src="${escapeMediaHTML(
                source.src
              )}"
              muted
              preload="metadata"
              ${
                source.objectUrl
                  ? `data-media-object-url="${escapeMediaHTML(
                      source.src
                    )}"`
                  : ""
              }
            ></video>

            <span class="media-type-badge">
              VIDEO
            </span>
          `;

        } else if (source.src) {

          previewMarkup = `
            <img
              src="${escapeMediaHTML(
                source.src
              )}"
              alt=""
              ${
                source.objectUrl
                  ? `data-media-object-url="${escapeMediaHTML(
                      source.src
                    )}"`
                  : ""
              }
            />
          `;

        } else {

          previewMarkup = `
            <div class="media-preview-fallback">
              MEDIA
            </div>
          `;

        }


        card.innerHTML = `
          <div class="media-library-preview">

            ${previewMarkup}

            ${
              item.favorite
                ? `
                  <span class="media-favorite-badge">
                    ★
                  </span>
                `
                : ""
            }

          </div>


          <div class="media-library-copy">

            <strong>
              ${escapeMediaHTML(item.name)}
            </strong>

            <span>
              ${escapeMediaHTML(
                item.category ||
                "Other"
              )}
            </span>

          </div>
        `;


        card.addEventListener(
          "click",
          () => {

            selectedMediaId =
              item.id;

            renderMediaGrid();
            renderMediaDetails();

          }
        );


        mediaGrid.appendChild(
          card
        );

      }
    );

  }


  /* =======================================================
     DETAILS
  ======================================================== */

  function getSelectedMedia() {

    return mediaItems.find(
      (item) =>
        item.id ===
        selectedMediaId
    );

  }


  function renderMediaDetails() {

    const item =
      getSelectedMedia();


    if (!item) {

      detailsTitle.textContent =
        "Select an item";

      detailsEmpty.hidden =
        false;

      detailsContent.hidden =
        true;

      return;
    }


    detailsEmpty.hidden =
      true;

    detailsContent.hidden =
      false;

    detailsTitle.textContent =
      item.name;


    nameInput.value =
      item.name || "";

    categoryInput.value =
      item.category || "Other";

    favoriteInput.checked =
      Boolean(item.favorite);

    mediaIdValue.textContent =
      item.id;


    const source =
      createMediaSource(item);

    const kind =
      getMediaKind(item);


    if (
      source.src &&
      kind === "video"
    ) {

      detailsPreview.innerHTML = `
        <video
          src="${escapeMediaHTML(
            source.src
          )}"
          controls
          playsinline
          ${
            source.objectUrl
              ? `data-media-object-url="${escapeMediaHTML(
                  source.src
                )}"`
              : ""
          }
        ></video>
      `;

    } else if (source.src) {

      detailsPreview.innerHTML = `
        <img
          src="${escapeMediaHTML(
            source.src
          )}"
          alt="${escapeMediaHTML(
            item.name
          )}"
          ${
            source.objectUrl
              ? `data-media-object-url="${escapeMediaHTML(
                  source.src
                )}"`
              : ""
          }
        />
      `;

    } else {

      detailsPreview.innerHTML = `
        <div class="media-preview-fallback">
          No Preview
        </div>
      `;

    }


    infoGrid.innerHTML = `
      <div>
        <span>Type</span>
        <strong>
          ${
            kind === "video"
              ? "Video"
              : "Image"
          }
        </strong>
      </div>

      <div>
        <span>Size</span>
        <strong>
          ${formatFileSize(
            item.size
          )}
        </strong>
      </div>

      <div>
        <span>Added</span>
        <strong>
          ${formatMediaDate(
            item.createdAt
          )}
        </strong>
      </div>

      <div>
        <span>Source</span>
        <strong>
          ${
            item.sourceType ===
            "url"
              ? "URL"
              : "Upload"
          }
        </strong>
      </div>
    `;

  }


  /* =======================================================
     STORAGE SUMMARY
  ======================================================== */

  function renderStorageSummary() {

    const totalBytes =
      mediaItems.reduce(
        (sum, item) =>
          sum +
          Number(item.size || 0),
        0
      );


    const images =
      mediaItems.filter(
        (item) =>
          getMediaKind(item) ===
          "image"
      ).length;


    const videos =
      mediaItems.filter(
        (item) =>
          getMediaKind(item) ===
          "video"
      ).length;


    storageSummary.innerHTML = `
      <span>
        <strong>
          ${mediaItems.length}
        </strong>
        total
      </span>

      <span>
        <strong>
          ${images}
        </strong>
        images
      </span>

      <span>
        <strong>
          ${videos}
        </strong>
        videos
      </span>

      <span>
        <strong>
          ${formatFileSize(
            totalBytes
          )}
        </strong>
        stored locally
      </span>
    `;

  }


  /* =======================================================
     FULL RENDER
  ======================================================== */

  function renderMediaLibrary() {

    renderMediaCategories();
    renderMediaGrid();
    renderMediaDetails();
    renderStorageSummary();

  }


  /* =======================================================
     FILE UPLOAD
  ======================================================== */

  async function handleMediaFiles(
    files
  ) {

    const validFiles =
      Array.from(files || [])
        .filter(
          (file) =>
            file.type.startsWith(
              "image/"
            ) ||
            file.type.startsWith(
              "video/"
            )
        );


    if (!validFiles.length) {

      mediaToast(
        "Choose an image or video file."
      );

      return;
    }


    for (
      const file of validFiles
    ) {

      const item = {

        id:
          makeMediaId(),

        name:
          file.name
            .replace(
              /\.[^/.]+$/,
              ""
            ),

        category:
          mediaCategoryFilter !==
            "All"
            ? mediaCategoryFilter
            : "Other",

        sourceType:
          "upload",

        type:
          file.type,

        size:
          file.size,

        blob:
          file,

        url:
          "",

        favorite:
          false,

        createdAt:
          Date.now(),

        updatedAt:
          Date.now()

      };


      await saveMediaItem(
        item
      );

    }


    await refreshMediaData();


    mediaToast(
      validFiles.length === 1
        ? "Media uploaded."
        : `${validFiles.length} files uploaded.`
    );

  }


  document.getElementById(
    "mediaMainUpload"
  ).addEventListener(
    "change",
    async (event) => {

      await handleMediaFiles(
        event.target.files
      );

      event.target.value = "";

    }
  );


  /* =======================================================
     SEARCH / CATEGORY
  ======================================================== */

  searchInput.addEventListener(
    "input",
    () => {

      mediaSearchTerm =
        searchInput.value.trim();

      renderMediaGrid();

    }
  );


  categoryFilter.addEventListener(
    "change",
    () => {

      mediaCategoryFilter =
        categoryFilter.value;

      renderMediaLibrary();

    }
  );


  /* =======================================================
     GRID / LIST
  ======================================================== */

  const gridButton =
    document.getElementById(
      "mediaGridViewButton"
    );

  const listButton =
    document.getElementById(
      "mediaListViewButton"
    );


  gridButton.addEventListener(
    "click",
    () => {

      currentMediaView =
        "grid";

      gridButton.classList.add(
        "active"
      );

      listButton.classList.remove(
        "active"
      );

      renderMediaGrid();

    }
  );


  listButton.addEventListener(
    "click",
    () => {

      currentMediaView =
        "list";

      listButton.classList.add(
        "active"
      );

      gridButton.classList.remove(
        "active"
      );

      renderMediaGrid();

    }
  );


  /* =======================================================
     EDIT MEDIA
  ======================================================== */

  nameInput.addEventListener(
    "change",
    async () => {

      const item =
        getSelectedMedia();

      if (!item) return;


      item.name =
        nameInput.value.trim() ||
        "Untitled Media";

      item.updatedAt =
        Date.now();


      await saveMediaItem(item);

      await refreshMediaData();

      selectedMediaId =
        item.id;

      renderMediaDetails();

      mediaToast(
        "Media renamed."
      );

    }
  );


  categoryInput.addEventListener(
    "change",
    async () => {

      const item =
        getSelectedMedia();

      if (!item) return;


      item.category =
        categoryInput.value;

      item.updatedAt =
        Date.now();


      await saveMediaItem(item);

      await refreshMediaData();

      selectedMediaId =
        item.id;

      renderMediaDetails();

      mediaToast(
        "Media moved."
      );

    }
  );


  favoriteInput.addEventListener(
    "change",
    async () => {

      const item =
        getSelectedMedia();

      if (!item) return;


      item.favorite =
        favoriteInput.checked;

      item.updatedAt =
        Date.now();


      await saveMediaItem(item);

      await refreshMediaData();

      selectedMediaId =
        item.id;

      renderMediaDetails();

    }
  );


  /* =======================================================
     DELETE
  ======================================================== */

  document.getElementById(
    "mediaDeleteButton"
  ).addEventListener(
    "click",
    async () => {

      const item =
        getSelectedMedia();

      if (!item) return;


      if (
        !confirm(
          `Delete "${item.name}" from the Media Library?`
        )
      ) {
        return;
      }


      await deleteMediaItem(
        item.id
      );

      selectedMediaId = null;

      await refreshMediaData();

      mediaToast(
        "Media deleted."
      );

    }
  );


  /* =======================================================
     COPY MEDIA ID
  ======================================================== */

  document.getElementById(
    "mediaCopyIdButton"
  ).addEventListener(
    "click",
    async () => {

      const item =
        getSelectedMedia();

      if (!item) return;


      try {

        await navigator.clipboard
          .writeText(
            item.id
          );

        mediaToast(
          "Media ID copied."
        );

      } catch (error) {

        window.prompt(
          "Copy this Media ID:",
          item.id
        );

      }

    }
  );


  /* =======================================================
     URL MODAL
  ======================================================== */

  function openUrlModal() {

    urlModal.hidden = false;

    document.getElementById(
      "mediaUrlName"
    ).focus();

  }


  function closeUrlModal() {

    urlModal.hidden = true;

  }


  document.getElementById(
    "mediaAddUrlButton"
  ).addEventListener(
    "click",
    openUrlModal
  );


  document.getElementById(
    "closeMediaUrlModal"
  ).addEventListener(
    "click",
    closeUrlModal
  );


  urlModal.addEventListener(
    "click",
    (event) => {

      if (
        event.target === urlModal
      ) {

        closeUrlModal();

      }

    }
  );


  document.getElementById(
    "saveMediaUrlButton"
  ).addEventListener(
    "click",
    async () => {

      const name =
        document.getElementById(
          "mediaUrlName"
        ).value.trim();

      const url =
        document.getElementById(
          "mediaUrlValue"
        ).value.trim();

      const category =
        document.getElementById(
          "mediaUrlCategory"
        ).value;


      if (!url) {

        mediaToast(
          "Paste an image or video URL."
        );

        return;
      }


      try {

        new URL(url);

      } catch (error) {

        mediaToast(
          "That URL does not look valid."
        );

        return;
      }


      const item = {

        id:
          makeMediaId(),

        name:
          name ||
          "Website Media",

        category,

        sourceType:
          "url",

        type:
          "",

        size:
          0,

        blob:
          null,

        url,

        favorite:
          false,

        createdAt:
          Date.now(),

        updatedAt:
          Date.now()

      };


      await saveMediaItem(
        item
      );


      selectedMediaId =
        item.id;


      document.getElementById(
        "mediaUrlName"
      ).value = "";

      document.getElementById(
        "mediaUrlValue"
      ).value = "";


      closeUrlModal();

      await refreshMediaData();

      mediaToast(
        "Media added."
      );

    }
  );


  /* =======================================================
     START DATABASE
  ======================================================== */

  async function initializeMediaLibrary() {

    try {

      await openMediaDatabase();

      await refreshMediaData();

    } catch (error) {

      console.error(
        "Media Library could not start.",
        error
      );


      mediaGrid.innerHTML = `
        <div class="media-empty-state">

          <strong>
            Media Library could not open.
          </strong>

          <span>
            This browser may have blocked local storage.
          </span>

        </div>
      `;

    }

  }


  initializeMediaLibrary();

});