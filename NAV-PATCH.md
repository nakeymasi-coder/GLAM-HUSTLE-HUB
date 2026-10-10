# NAV-PATCH — apply at launch (when playground + clearance go live on main)

Goal: link `playground.html` (Games & Apps) and `clearance.html` (Clearance)
in the navigation menu — topNav + mobile drawer.

## 1. index.html

### topNav — insert after the Best Sellers link:
```html
<a href="./playground.html">Games &amp; Apps</a>
<a href="./clearance.html">Clearance</a>
```

### #drawer — insert after the Best Sellers link:
```html
<a href="./playground.html">🎮 Games &amp; Apps</a>
<a href="./clearance.html">🏷️ Clearance</a>
```

## 2. Every other *.html page (best-sellers, about, one-on-one, reviews, workshops, referral-hub, glam-vault)

Same two links, same spots (after Best Sellers in both topNav and drawer),
so the pages are reachable from everywhere. Note some pages have a slimmer
topNav — add the links there too.

## 3. Remove the NAV-PATCH comments

Delete the `<!-- NAV-PATCH (launch): ... -->` comments in playground.html
and clearance.html once the links are wired.

## 4. Push + verify

- Commit on main, push to origin.
- If Netlify doesn't auto-deploy, Glam hits **Trigger Deploy** in her Netlify dashboard.
- Verify on glamhustlehub.com: nav links visible on desktop + mobile drawer,
  both pages load, no dark sections, CTA footer on both pages.
- Never say "live" until the host actually shows it.
