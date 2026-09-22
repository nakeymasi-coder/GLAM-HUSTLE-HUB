window.GLAM_SITE_CONFIG = {

  // =====================================================
  // GLAM HUSTLE HUB — WEBSITE CONTROL CENTER
  //
  // TRUE  = SHOW IT
  // FALSE = HIDE IT
  //
  // Change website wording, links, and visibility here.
  // =====================================================


  // =====================================================
  // WEBSITE INFO
  // =====================================================

  site: {
    title: "Glam Hustle Hub",
    copyright: "© 2026 Glam Hustle Hub. All rights reserved."
  },


  // =====================================================
  // SHOW / HIDE WEBSITE AREAS
  // =====================================================

  visibility: {
    shop: true,
    bestSellers: true,

    // Workshops are hidden for now.
    // Change to true whenever you are ready to bring them back.
    workshops: false,

    promptGenerators: true,
    generatorBundles: true,
    pngs: true,
    freebies: true,
    reviews: true,
    oneOnOne: true,
    facebookCommunity: true,
    skoolCommunity: true,
    about: true,
    communitySection: true,
    helpSupport: true
  },


  // =====================================================
  // TOP NAVIGATION
  // =====================================================

  navigation: {
    showHome: true,
    showShop: true,

    // Hidden for now
    showWorkshops: false,

    showSkool: true,
    showOneOnOne: true,
    showAbout: true
  },


  // =====================================================
  // WEBSITE LINKS
  // =====================================================

  links: {
    shop: "https://payhip.com/GlowUpbyGlam/collection/all",

    workshops: "workshops.html",

    promptGenerators:
      "https://payhip.com/GlowUpbyGlam/collection/luxury-prompt-generators",

    generatorBundles:
      "https://payhip.com/GlowUpbyGlam/collection/bundles",

    pngs:
      "https://pin.it/NGr63tHjX/",

    freebies:
      "https://pin.it/7EFoolKlz",

    oneOnOne:
      "one-on-one.html",

    facebookCommunity:
      "https://www.facebook.com/share/g/1Sv3VVCSaR/",

    skoolCommunity:
      "https://payhip.com/b/54LoK",

    reviews:
      "https://testimonial.to/glam-hustle-hub/all",

    leaveReview:
      "https://testimonial.to/glam-hustle-hub/",

    pinterest:
      "https://pinterest.com/PromptLikeGlam/",

    tiktok:
      "https://tiktok.com/@promptlikeglam",

    lemon8:
      "https://v.lemon8-app.com/al/OgmyhphcMY",

    youtube:
      "https://youtube.com/@promptlikeglam",

    facebook:
      "https://facebook.com/GlamAIForBeginners/",

    contactEmail:
      "glamorousgrammyglowup@gmail.com",

    // We will connect the real Ask Glam Help Desk here later.
    helpSupport: "#"
  },


  // =====================================================
  // HERO SECTION
  // =====================================================

  hero: {
    eyebrow:
      "FOR WOMEN READY TO CREATE, SELL & SHINE",

    headlineHTML:
      'WE TURN<br>BIG IDEAS INTO<br><em>BOLD</em><br>EXPERIENCES.',

    description:
      "Creative tools, live workshops, and real support—built to help women 40+ stop overthinking and start creating.",

    buttonText:
      "EXPLORE THE HUB"
  },


  // =====================================================
  // HERO STATS
  // =====================================================

  heroStats: {
    enabled: true,

    items: [
      {
        number: "100+",
        label: "creative tools"
      },
      {
        number: "40+",
        label: "community focus"
      },
      {
        number: "1:1",
        label: "real support"
      }
    ]
  },


  // =====================================================
  // MOVING MARQUEE
  // Workshops + Templates removed from public wording.
  // =====================================================

  marquee: {
    enabled: true,

    text:
      "PROMPT GENERATORS ✦ ONE-ON-ONE SUPPORT ✦ CREATOR RESOURCES ✦ GENERATOR BUNDLES ✦ FREEBIES ✦ PROMPT GENERATORS ✦ ONE-ON-ONE SUPPORT ✦"
  },


  // =====================================================
  // BEST SELLERS
  // =====================================================

  bestSellers: {
    enabled: true,
    heading: "BEST SELLERS IN MOTION"
  },


  // =====================================================
  // ABOUT SECTION
  // =====================================================

  about: {
    enabled: true,

    eyebrow:
      "ABOUT GLAM HUSTLE HUB",

    headlineHTML:
      'TECHNOLOGY DOESN’T GET TO <em>BOSS US AROUND.</em>',

    description:
      "Glam Hustle Hub helps beginners—especially women 40 and older—use technology to create products, build businesses, and bring their ideas to life. Clear guidance. Beautiful tools. Real support.",

    buttonText:
      "DISCOVER THE HUB",

    image:
      "images/about-image.png"
  },


  // =====================================================
  // REVIEWS
  // =====================================================

  reviews: {
    enabled: true,

    eyebrow:
      "CREATOR REVIEWS",

    headlineHTML:
      'REAL WOMEN.<br><em>REAL RESULTS.</em>'
  },


  // =====================================================
  // GLAM VAULT / SKOOL SECTION
  //
  // THIS IS WHERE YOU FIX THE SKOOL WORDING.
  // =====================================================

  community: {
    enabled: true,

    eyebrow:
      "YOU DON'T HAVE TO BUILD ALONE",

    headlineHTML:
      'STEP INSIDE <em>THE GLAM VAULT.</em>',

    description:
      "The Glam Vault is my private Skool community for creators who want resources, support, tutorials, business conversations, and a place to keep learning, creating, and moving forward.",

    buttonText:
      "ENTER THE GLAM VAULT →",

    logo:
      "images/skool-logo.png"
  },


  // =====================================================
  // HELP & SUPPORT
  // =====================================================

  support: {
    enabled: true,

    menuLabel:
      "Help & Support",

    // Ask Glam Help Desk will go here.
    url: "#"
  }

};