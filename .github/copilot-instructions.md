# Repository guide

## Build, test, and lint

This repository is a static HTML/CSS/JavaScript site. It has no package manifest, build scripts, automated test runner, or configured linter. There is no single-test command; check a page by opening it in a browser and exercising its navigation and responsive behavior.

## Architecture

- `index.html` is the Polish-language landing page. Its anchored sections cover the company, services, collaboration process, team, and contact details.
- The five service pages (`maszty-i-takielunek.html`, `okucia-i-osprzet.html`, `custom-design.html`, `systemy-ciegowe.html`, and `zarzadzanie-projektami.html`) share a detail-page structure and link back to the landing page's contact and services anchors.
- Every page uses the root-level `styles.css` and deferred `script.js`. Keep shared layout, responsive rules, and interactions there rather than introducing page-specific dependencies.
- Local images and video live under `media/`; partner logos are in `media/partners/`. Some page imagery and the brand logo are loaded from `justrigging.pl`.
- `script.js` supports elements conditionally, so shared behavior can be used on both the landing page and detail pages. It controls the accessible mobile menu, scroll progress/header state, reveal-on-scroll elements, the collaboration process indicator, and the landing-page hero video rotation.

## Codebase conventions

- Keep page copy and document metadata in Polish (`lang="pl"`); pages are standalone HTML documents, not components or templates.
- Preserve the shared page shell: site header with `#mobile-menu`, main content, footer, `styles.css`, and `<script src="script.js" defer>`. Detail pages navigate to landing-page sections with links such as `index.html#kontakt`.
- Treat JavaScript-facing markup as a contract: use the existing `.menu-toggle`, `.mobile-menu`, `.scroll-progress`, `.site-header`, `.hero-video`, `[data-reveal]`, `[data-process]`, and `[data-process-step]` hooks. Keep the menu's `aria-expanded` and `aria-hidden` state synchronized with its visual state.
- Shared visual tokens are CSS custom properties declared in `:root`; responsive layouts use the existing 900px and 680px breakpoints, and motion-sensitive behavior must continue to respect `prefers-reduced-motion`.
- Keep media references relative to the repository root when using local assets; preserve descriptive `alt` text for informative images and empty alternatives for decorative media.
