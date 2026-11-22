# Trail Pal ⛰️

**Your pocket-sized partner in uphill crime.**

Trail Pal is a lightweight, mobile-first collection of training and outdoor calculators. It is built with plain HTML, CSS and JavaScript, so it runs directly in the browser with no framework, package manager, build step or application backend.

Trail Pal is also a **Progressive Web App (PWA)**. Once it has been opened successfully while online, its app shell is cached so the calculators can continue working offline. It can also be installed on supported phones and desktop browsers.

## Available tools

### Treadmill elevation calculator

Estimate elevation gain from treadmill distance and incline.

- Select an incline from 1% to 12%.
- Enter a distance in kilometres. Decimal values are supported.
- The result updates automatically as the inputs change.

**Calculation:**

```text
Elevation gain (m) = Distance (km) × 1,000 × (Incline (%) ÷ 100)
```

For example, 10 km at a 5% incline gives an estimated elevation gain of 500 m.

> The incline value is treated as a percentage grade: an incline level of 5 means 5%, not 5 degrees. This is an estimate based on a constant incline and does not account for changes in the treadmill's gradient during a session.

### Stair stepper elevation calculator

Estimate elevation gain from the number of floors completed.

- Enter a whole number of floors (zero or more).
- The result updates automatically as the value changes.

**Calculation:**

```text
Elevation gain (m) = Number of floors × 3.25
```

The calculator assumes each floor represents 3.25 metres of vertical gain.

## Getting started

No installation or build process is needed for development.

1. Download or clone this project.
2. Keep the application files together in the same directory.
3. Run the directory through a local web server, such as VS Code Live Server, or use another basic static web server.
4. Open the local server URL in a modern browser.

> Opening `index.html` directly as a `file://` URL is fine for trying the calculators, but browsers do not enable service workers in that context. Use `localhost` to test PWA installation and offline behaviour.

## Installing Trail Pal

Trail Pal must be served over **HTTPS** for PWA installation and service workers to work, with `localhost` being the exception for local development. GitHub Pages provides HTTPS automatically.

- **Android / desktop Chrome and Edge:** open the deployed website and use the browser's Install app option (the wording and location vary by browser).
- **iPhone / iPad:** open the website in Safari, tap Share, then choose **Add to Home Screen**. iOS manages web app installation through this share-sheet option.

After installation, Trail Pal opens in its own app-style window rather than a regular browser tab. The cached calculators also work without an internet connection after the first successful visit and service-worker installation.

## Project structure

```text
trail-pal/
├── index.html                  # Page structure, navigation and calculator inputs/results
├── styles.css                  # Mobile-first layout, styling and responsive rules
├── app.js                      # Tab navigation, input validation and calculations
├── pwa.js                      # Registers the service worker
├── sw.js                       # Caches the app shell and provides offline fallback
├── manifest.webmanifest        # PWA name, icons, colours and launch settings
├── favicon.ico                 # Multi-resolution browser tab icon
├── favicon.png                 # High-resolution favicon source
├── icons/
│   ├── icon-192.png            # PWA install icon (192 × 192)
│   ├── icon-512.png            # PWA install icon (512 × 512)
│   └── apple-touch-icon.png    # iOS home-screen icon (180 × 180)
└── README.md                   # Project documentation
```

## How it works

- **HTML** defines the two calculator panels and their input and result elements.
- **CSS** provides the visual styling and responsive layout, with a mobile-first approach.
- **JavaScript** listens for input changes, validates the values, performs the calculations and updates the displayed results.
- **Web app manifest** tells the browser the app's name, launch URL, display mode, colours and available icons.
- **Service worker** caches the app shell during installation. It tries the network first for requests so changes can be picked up, then falls back to the cache when offline.

All calculations happen locally in the browser. Trail Pal does not send entered values to a server or store them between visits.

## Updating the offline cache

The service worker cache is named near the top of `sw.js`:

```javascript
const CACHE_NAME = 'trail-pal-v1';
```

When you make a change that requires a new pre-cached app shell or want to force old cached resources to be discarded, increment the version (for example, `trail-pal-v2`). The activation handler removes older Trail Pal caches automatically. The service worker also checks the network first, so updated files are normally picked up on a connected visit.

## Accessibility and usability

- The tool selector uses tab semantics and supports keyboard navigation with the left and right arrow keys, Home and End.
- Inputs have associated labels and mobile-friendly input modes.
- Results are announced through live regions so assistive technologies can detect updates.
- Validation messages are displayed when values are missing or invalid.
- The interface respects the user's reduced-motion preference.

## Adding another tool

A new calculator can be added as another panel in `index.html`, with a matching tab that points to it through `aria-controls`. Add its inputs, result area and validation message to the panel, then implement its calculation and input event listeners in `app.js`. Reuse the existing styling classes where possible to keep the interface consistent.

Keep each calculator's calculation logic in its own function so the tools remain independent and easy to maintain. If you add new files or icons that must be available offline immediately, add their relative paths to the `APP_SHELL` list in `sw.js`.

## Deployment

Trail Pal is a static website and can be hosted by any static web hosting provider, such as GitHub Pages, Cloudflare Pages or Netlify. Deploy the project files together, preserving their directory structure. The relative asset paths and `./` manifest and service-worker URLs allow it to work from a project subdirectory, such as `https://username.github.io/trail-pal/`.

## Disclaimer

The figures are estimates intended for personal training reference. Actual vertical gain can vary depending on treadmill calibration, incline behaviour and the stair stepper's definition of a floor.
