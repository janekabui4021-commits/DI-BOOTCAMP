# Jane Kabui's Portfolio

A responsive personal portfolio website for Jane Kabui, a full-stack developer. The site presents her skills, services, design work, featured projects, and ways to get in touch.

## Features

- Responsive layout for desktop, tablet, and mobile screens
- About section with profile and professional links
- Frontend, backend, and workflow technology overview
- Services section covering web development, frontend interfaces, and backend foundations
- Web design showcase gallery
- Featured projects, including:
  - Tribute to Mzee Jomo Kenyatta
  - Jane's Bakery website
- Interactive contact form with an in-page success message
- Social media links and downloadable portfolio assets
- Smooth scrolling navigation and accessible skip link

## Built With

- HTML5
- CSS3
- JavaScript (ES6+)
- Google Fonts: DM Sans and Syne
- Responsive CSS Grid and Flexbox layouts

## Project Structure

```text
.
├── index.html   # Main portfolio page
├── styles.css   # Additional styles and responsive layout rules
├── script.js    # Navigation, form interaction, and current year logic
└── README.md    # Project documentation
```

## Run Locally

No build tools or dependencies are required.

1. Clone or download this repository.
2. Open `index.html` directly in a browser, or serve the folder with a local web server.

For example, with Python:

```bash
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## Notes

- Some images and fonts are loaded from external services, so an internet connection improves the local preview.
- The contact form currently displays a confirmation message only. Connect it to a backend or form service before using it for production inquiries.
- Update the social links, project URLs, profile image, and resume file to match the GitHub deployment environment.

## Deployment

This is a static site and can be deployed with GitHub Pages, Netlify, Vercel, or any static hosting provider. For GitHub Pages, publish the repository from the branch and folder containing `index.html`.

## License

This project is a personal portfolio. Add a license file if you plan to make the source available for reuse.
