# Thirumeni Traders – Static Site

A lightweight static website for Kerala e-rituals products and services.

## Project Structure

- index.html (root entry)
- styles/
  - main.css (all custom styles extracted from index.html)
- scripts/
  - main.js (all custom JS extracted from index.html)
- images/
  - Project images used across the site

External libraries are loaded via CDN:
- Tailwind CSS (CDN) for utility classes
- Lucide Icons (CDN) for icons

## Local Development

You can open index.html directly in a browser, or run any static server. Examples:

- Python 3
  - `python -m http.server 8080`
  - Open http://localhost:8080/

- Node (http-server)
  - `npx http-server -p 8080`
  - Open http://localhost:8080/

No build step required.

## Contributing

- Edit styles in `styles/main.css`.
- Edit scripts in `scripts/main.js`.
- Keep images in `images/` and reference them with relative paths.
- Use semantic HTML and ensure `alt` text for images.
- Run a local static server to test scroll interactions and lightbox behavior.

## Deployment

As a static site, this can be deployed to any static host (GitHub Pages, Netlify, Vercel, etc.). Ensure the root is served so `index.html` is at `/`.

## Notes

- IntersectionObserver is used for reveal-on-scroll and navbar scrollspy.
- A lightbox is implemented for the gallery.
- Mobile enhancements include a bottom quick-action bar and back-to-top button.
- Performance tweaks include `loading="lazy"` for non-critical images and a high-priority hero image.
