/* =========================================================
   GLAM HUSTLE HUB
   PUBLISHED WEBSITE RUNTIME
   Reads published Control Center settings only.
   Falls back safely to the existing static website.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const PUBLISHED_ENDPOINT =
    "/api/site-state?mode=published";


  async function loadPublishedState() {

    try {

      const response =
        await fetch(
          PUBLISHED_ENDPOINT,
          {
            method: "GET",
            cache: "no-store"
          }
        );


      if (!response.ok) {

        throw new Error(
          `Published state unavailable (${response.status})`
        );

      }


      const published =
        await response.json();


      if (
        !published ||
        !published.localStorageData
      ) {

        console.info(
          "GLAM: No published Control Center state yet. Using static site."
        );

        return;

      }


      applyPublishedState(
        published
      );


      console.info(
        "GLAM: Published website settings loaded."
      );

    } catch (error) {

      /*
        IMPORTANT:
        Do not destroy or hide the static site.

        If Netlify Functions / Blobs ever have
        a temporary problem, the existing
        website remains visible and usable.
      */

      console.warn(
        "GLAM: Published settings could not load. Static website fallback is active.",
        error
      );

    }

  }


  /* =======================================================
     PARSE STORED EDITOR DATA
  ======================================================== */

  function parseStoredValue(
    storageData,
    key,
    fallback
  ) {

    const raw =
      storageData?.[key];


    if (
      raw === undefined ||
      raw === null ||
      raw === ""
    ) {

      return fallback;

    }


    try {

      return JSON.parse(raw);

    } catch (error) {

      return raw;

    }

  }


  function applyPublishedState(
    published
  ) {

    const storageData =
      published.localStorageData;


    const themes =
      parseStoredValue(
        storageData,
        "glamWebsiteThemes",
        []
      );


    const activeThemeId =
      parseStoredValue(
        storageData,
        "glamWebsiteActiveTheme",
        ""
      );


    const sections =
      parseStoredValue(
        storageData,
        "glamWebsiteSections",
        []
      );


    const mansionScenes =
      parseStoredValue(
        storageData,
        "glamWebsiteMansionScenes",
        []
      );


    const activeMansionId =
      parseStoredValue(
        storageData,
        "glamWebsiteActiveMansionScene",
        ""
      );


    applyPublishedTheme(
      themes,
      activeThemeId
    );


    applyPublishedSections(
      sections
    );


    applyPublishedMansion(
      mansionScenes,
      activeMansionId
    );

  }


  /* =======================================================
     THEME
  ======================================================== */

  function applyPublishedTheme(
    themes,
    activeThemeId
  ) {

    if (
      !Array.isArray(themes) ||
      !themes.length
    ) {
      return;
    }


    const theme =
      themes.find(
        item =>
          item.id ===
          activeThemeId
      ) ||
      themes[0];


    if (!theme) {
      return;
    }


    const root =
      document.documentElement;


    setCSSVariable(
      root,
      "--glam-published-primary",
      theme.primary
    );

    setCSSVariable(
      root,
      "--glam-published-secondary",
      theme.secondary
    );

    setCSSVariable(
      root,
      "--glam-published-accent",
      theme.accent
    );

    setCSSVariable(
      root,
      "--glam-published-background",
      theme.background
    );

    setCSSVariable(
      root,
      "--glam-published-heading",
      theme.heading
    );

    setCSSVariable(
      root,
      "--glam-published-body",
      theme.bodyText
    );

    setCSSVariable(
      root,
      "--glam-published-button-bg",
      theme.buttonBackground
    );

    setCSSVariable(
      root,
      "--glam-published-button-text",
      theme.buttonText
    );

    setCSSVariable(
      root,
      "--glam-published-card-bg",
      theme.cardBackground
    );

    setCSSVariable(
      root,
      "--glam-published-card-text",
      theme.cardText
    );

    setCSSVariable(
      root,
      "--glam-published-card-border",
      theme.cardBorder
    );


    if (theme.heading) {

      document.body.style.color =
        theme.bodyText ||
        "";

    }


    if (theme.background) {

      document.body.style.backgroundColor =
        theme.background;

    }


    applyThemeFonts(
      theme
    );


    document.documentElement
      .classList
      .add(
        "glam-published-theme-active"
      );

  }


  function applyThemeFonts(
    theme
  ) {

    if (theme.body) {

      document.body.style.fontFamily =
        theme.body;

    }


    if (theme.heading) {

      document
        .querySelectorAll(
          "h1, h2, h3, h4, h5, h6"
        )
        .forEach(
          heading => {

            if (theme.heading) {

              heading.style.color =
                theme.heading;

            }

          }
        );

    }


    if (theme.headingFont) {

      document
        .querySelectorAll(
          "h1, h2, h3, h4, h5, h6"
        )
        .forEach(
          heading => {

            heading.style.fontFamily =
              theme.headingFont;

          }
        );

    }

  }


  function setCSSVariable(
    root,
    name,
    value
  ) {

    if (!value) {
      return;
    }


    root.style.setProperty(
      name,
      value
    );

  }


  /* =======================================================
     SECTIONS
  ======================================================== */

  function applyPublishedSections(
    sections
  ) {

    if (
      !Array.isArray(sections) ||
      !sections.length
    ) {
      return;
    }


    const detected =
      detectPublicSections();


    sections.forEach(
      section => {

        const element =
          detected[
            section.type
          ] ||
          detected[
            section.id
          ];


        if (!element) {
          return;
        }


        element.dataset.glamSectionId =
          section.id;


        if (
          section.visible ===
          false
        ) {

          element.style.display =
            "none";

          return;

        }


        element.style.removeProperty(
          "display"
        );


        if (
          section.backgroundColor
        ) {

          element.style.backgroundColor =
            section.backgroundColor;

        }


        if (
          section.textColor
        ) {

          element.style.color =
            section.textColor;

        }


        if (
          section.backgroundImage
        ) {

          element.style.backgroundImage =
            `url("${section.backgroundImage}")`;

          element.style.backgroundSize =
            "cover";

          element.style.backgroundPosition =
            "center";

        }


        if (
          Number.isFinite(
            Number(
              section.spacing
            )
          )
        ) {

          const spacing =
            Number(
              section.spacing
            );


          element.style.paddingTop =
            `${spacing}px`;

          element.style.paddingBottom =
            `${spacing}px`;

        }


        updateSectionContent(
          element,
          section
        );


        applySectionAnimation(
          element,
          section.animation
        );

      }
    );


    reorderPublicSections(
      sections,
      detected
    );

  }


  function detectPublicSections() {

    const allSections =
      Array.from(
        document.querySelectorAll(
          "main section, body > section"
        )
      );


    const map = {};


    allSections.forEach(
      section => {

        const text =
          section.textContent
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();


        if (
          !map.products &&
          (
            text.includes(
              "best sellers"
            ) ||
            text.includes(
              "featured"
            )
          )
        ) {

          map.products =
            section;

          map["featured-products"] =
            section;

        }


        if (
          !map.about &&
          text.includes(
            "about glam hustle hub"
          )
        ) {

          map.about =
            section;

        }


        if (
          !map.reviews &&
          (
            text.includes(
              "creator reviews"
            ) ||
            text.includes(
              "real women"
            )
          )
        ) {

          map.reviews =
            section;

        }


        if (
          !map["quick-access"] &&
          text.includes(
            "explore the hub"
          )
        ) {

          map["quick-access"] =
            section;

        }


        if (
          !map.mansion &&
          section.querySelector(
            '[class*="mansion"], [id*="mansion"]'
          )
        ) {

          map.mansion =
            section;

          map["mansion-hero"] =
            section;

        }

      }
    );


    const footer =
      document.querySelector(
        "footer"
      );


    if (footer) {

      map.footer =
        footer;

    }


    return map;

  }


  function updateSectionContent(
    element,
    section
  ) {

    if (section.heading) {

      const heading =
        element.querySelector(
          "h1, h2, h3"
        );


      if (heading) {

        heading.textContent =
          section.heading;

      }

    }


    if (section.text) {

      const paragraph =
        element.querySelector(
          "p"
        );


      if (paragraph) {

        paragraph.textContent =
          section.text;

      }

    }


    if (section.buttonText) {

      const button =
        element.querySelector(
          "a, button"
        );


      if (button) {

        button.textContent =
          section.buttonText;


        if (
          section.buttonLink &&
          button.tagName === "A"
        ) {

          button.href =
            section.buttonLink;

        }

      }

    }

  }


  function reorderPublicSections(
    sections,
    detected
  ) {

    const orderedElements =
      sections
        .filter(
          section =>
            section.visible !==
            false
        )
        .map(
          section =>
            detected[
              section.type
            ] ||
            detected[
              section.id
            ]
        )
        .filter(Boolean);


    if (
      orderedElements.length < 2
    ) {
      return;
    }


    const parent =
      orderedElements[0]
        .parentElement;


    if (!parent) {
      return;
    }


    const sameParent =
      orderedElements.every(
        element =>
          element.parentElement ===
          parent
      );


    if (!sameParent) {

      /*
        Existing site sections may live in
        different wrappers.

        In that case we preserve the static
        structure rather than risk breaking
        the page.
      */

      return;

    }


    orderedElements.forEach(
      element => {

        parent.appendChild(
          element
        );

      }
    );

  }


  function applySectionAnimation(
    element,
    animation
  ) {

    const animations = [
      "fade-up",
      "fade-in",
      "slide-left",
      "slide-right",
      "pop",
      "float",
      "soft-glow"
    ];


    animations.forEach(
      name => {

        element.classList.remove(
          `glam-live-${name}`
        );

      }
    );


    if (
      animation &&
      animation !== "none"
    ) {

      element.classList.add(
        `glam-live-${animation}`
      );

    }

  }


  /* =======================================================
     MANSION
  ======================================================== */

  function applyPublishedMansion(
    scenes,
    activeSceneId
  ) {

    if (
      !Array.isArray(scenes) ||
      !scenes.length
    ) {
      return;
    }


    const scene =
      scenes.find(
        item =>
          item.id ===
          activeSceneId
      ) ||
      scenes[0];


    if (!scene) {
      return;
    }


    const mansionImage =
      document.querySelector(
        'img[src*="mansion"], img[alt*="mansion" i], [class*="mansion"] img'
      );


    if (
      mansionImage &&
      scene.image
    ) {

      mansionImage.src =
        scene.image;

    }


    const mansionRoot =
      mansionImage?.closest(
        '[class*="mansion"], section'
      ) ||
      document.querySelector(
        '[class*="mansion"]'
      );


    if (!mansionRoot) {
      return;
    }


    if (
      !Array.isArray(
        scene.rooms
      )
    ) {
      return;
    }


    const existingHotspots =
      Array.from(
        mansionRoot.querySelectorAll(
          'a[class*="hotspot"], button[class*="hotspot"], [data-room]'
        )
      );


    scene.rooms.forEach(
      (
        room,
        index
      ) => {

        const hotspot =
          existingHotspots[
            index
          ];


        if (!hotspot) {
          return;
        }


        if (
          room.visible ===
          false
        ) {

          hotspot.style.display =
            "none";

          return;

        }


        hotspot.style.removeProperty(
          "display"
        );


        if (room.name) {

          hotspot.textContent =
            room.name;

        }


        if (
          room.link &&
          hotspot.tagName === "A"
        ) {

          hotspot.href =
            room.link;

        }


        if (
          room.x !== undefined
        ) {

          hotspot.style.left =
            `${room.x}%`;

        }


        if (
          room.y !== undefined
        ) {

          hotspot.style.top =
            `${room.y}%`;

        }


        if (
          room.width
        ) {

          hotspot.style.width =
            `${room.width}px`;

        }


        if (
          room.height
        ) {

          hotspot.style.height =
            `${room.height}px`;

        }


        if (
          room.textColor
        ) {

          hotspot.style.color =
            room.textColor;

        }


        if (
          room.backgroundColor
        ) {

          hotspot.style.background =
            room.backgroundColor;

        }


        hotspot.dataset.glamHover =
          room.hover || "none";

        hotspot.dataset.glamAnimation =
          room.animation || "none";

      }
    );

  }


  loadPublishedState();

});