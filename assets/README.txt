# Naku & Partner — Wedding Invitation Website

A single-page digital wedding invitation (dark brown & cream white theme) with an
on-page RSVP form (name, attending, bringing a guest, questions). Replies are sent
to your Google Form, so guests never leave the page.

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

Also:
- Countdown date lives in `js/script.js` → `CONFIG.weddingDateTime`.
- Colors live at the top of `css/style.css` → the `:root { --cream / --brown / --gold ... }` variables, if you want to adjust the palette.

## 2. The RSVP form (on-page, replies go to Google Form)

Guests fill in the form on the page. When they press **Send RSVP**, the answers are
posted to your existing Google Form and show up in its **Responses** tab (or linked Sheet).

**One-time setup** (open `js/script.js` → `CONFIG.googleForm`):

1. Open your form in Google Forms → **Send** → link icon → copy the full link
   (`https://docs.google.com/forms/d/e/<FORM_ID>/viewform`, not the short `forms.gle` one).
   Replace `viewform` with `formResponse` and paste it as `actionUrl`.
2. In Google Forms click the **⋮ menu → Get pre-filled link**, type any answer in every
   question, press **Get link**, and copy it. It contains `entry.1234567890=...` for each
   question. Paste each `entry.…` ID into `entries` (name, attending, guest, questions).
3. The radio answers on the page must match your form's options exactly:
   Attending = `Yes` / `Sadly no`; Guest = `Yes` / `No`. If your form words them
   differently, change the `value="..."` attributes in `index.html`.

Until these are filled in, the form shows a message asking guests to contact Matron Machona.

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
assets/            — rings.jpg, flowers.jpg
```
