# Trail Pal ⛰️

**Your pocket-sized partner in uphill crime.**

Trail Pal is a lightweight, mobile-first collection of training and outdoor calculators. It is built with plain HTML, CSS and JavaScript, so it runs entirely in the browser with no server, framework, package manager or build step required.

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

No installation or build process is needed.

1. Download or clone this project.
2. Keep `index.html`, `styles.css` and `app.js` in the same directory.
3. Open `index.html` in a modern web browser.

For local development, you can also serve the directory using an editor extension such as VS Code Live Server, or any basic static web server.

## Project structure

```text
trail-pal/
├── index.html   # Page structure, navigation and calculator inputs/results
├── styles.css   # Mobile-first layout, styling and responsive rules
├── app.js       # Tab navigation, input validation and calculations
├── favicon.ico  # Multi-resolution browser tab icon
├── favicon.png  # High-resolution icon source
└── README.md    # Project documentation
```

## How it works

- **HTML** defines the two calculator panels and their input and result elements.
- **CSS** provides the visual styling and responsive layout, with a mobile-first approach.
- **JavaScript** listens for input changes, validates the values, performs the calculations and updates the displayed results.

All calculations happen locally in the browser. Trail Pal does not send entered values to a server or store them between visits.

## Accessibility and usability

- The tool selector uses tab semantics and supports keyboard navigation with the left and right arrow keys, Home and End.
- Inputs have associated labels and mobile-friendly input modes.
- Results are announced through live regions so assistive technologies can detect updates.
- Validation messages are displayed when values are missing or invalid.
- The interface respects the user's reduced-motion preference.

## Adding another tool

A new calculator can be added as another panel in `index.html`, with a matching tab that points to it through `aria-controls`. Add its inputs, result area and validation message to the panel, then implement its calculation and input event listeners in `app.js`. Reuse the existing styling classes where possible to keep the interface consistent.

Keep each calculator's calculation logic in its own function so the tools remain independent and easy to maintain.

## Deployment

Trail Pal is a static website and can be hosted by any static web hosting provider, such as GitHub Pages, Cloudflare Pages or Netlify. Deploy the project files together, preserving their directory structure.

## Disclaimer

The figures are estimates intended for personal training reference. Actual vertical gain can vary depending on treadmill calibration, incline behaviour and the stair stepper's definition of a floor.
