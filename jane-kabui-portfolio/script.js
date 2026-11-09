const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const currentYear = document.querySelector('#current-year');

currentYear.textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
        const target = document.querySelector(link.getAttribute('href'));

        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    formStatus.textContent = 'Your message has been sent.';
    contactForm.reset();
});
