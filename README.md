# Naku & Partner — Wedding Invitation Website

A single-page digital wedding invitation (dark brown & cream white theme) with an
"RSVP Now" button that links straight to a Google Form for collecting guest
responses (name, attending, bringing a guest, dietary restrictions/questions).

## Preview it

Just double-click `index.html` to open it in your browser. No install, no server needed.

## 1. Personalize the content

Open `index.html` and edit the sections marked with comments:

| Marker | What to change |
|---|---|
| `[EDIT: NAMES]` | Couple's names (hero section + footer) |
| `[EDIT: DATE]` | Wedding date/time text shown in the hero |
| `[EDIT: VENUE]` | Ceremony/reception location + address + map link |
| `[EDIT: SCHEDULE]` | Order-of-events list (ceremony, cocktail hour, etc.) |
| `[EDIT: PHOTO]` | Drop a photo into `assets/couple-photo.jpg` |

Also:
- Countdown date lives in `js/script.js` → `CONFIG.weddingDateTime`.
- Colors live at the top of `css/style.css` → the `:root { --cream / --brown / --gold ... }` variables, if you want to adjust the palette.

## 2. The RSVP form

The "RSVP Now" button in the RSVP section (`index.html`) links directly to the
published Google Form:

```
https://forms.gle/BH1CEgCYJwUYVeoB7
```

The form currently asks:
1. **Full Name** — Short answer
2. **Will you honor us with your presence on this special day?** — Yes / Sadly no
3. **Will you be bringing a guest?** — Yes / No
4. **Any questions?** — long answer (also used for dietary restrictions/allergies)

To change the questions, edit the form directly at
[docs.google.com/forms](https://docs.google.com/forms) — no site changes needed
for that. If you ever republish the form under a new link, just swap the URL in
the `href` of the `.btn--solid` link inside the `#rsvp` section of `index.html`.

Responses land in the form's **Responses** tab (or its linked Google Sheet).

## 3. Share it with guests

Any static host works since there's no backend:

- **GitHub Pages**: push this folder to a repo, enable Pages in repo settings.
- **Netlify / Vercel**: drag-and-drop this folder in their dashboard, or connect a repo.

Once deployed, share the resulting URL as your invitation link.

## File structure

```
index.html        — page content/structure
css/style.css      — theme (colors, fonts, layout)
js/script.js       — CONFIG (wedding date), countdown timer
assets/            — put couple-photo.jpg here
```
