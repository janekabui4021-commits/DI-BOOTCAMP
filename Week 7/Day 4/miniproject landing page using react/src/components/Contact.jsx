import React, { useState } from 'react';

const contactDetails = [
  { icon: 'fa-location-dot', label: 'Company Name', href: 'https://maps.google.com/' },
  { icon: 'fa-phone', label: '+256 778 800 900', href: 'tel:+256778800900' },
  { icon: 'fa-envelope', label: 'company.gmail.com', href: 'mailto:company@gmail.com' },
];

function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact-heading-row">
          <p className="section-eyebrow">Start a conversation</p>
          <h2 id="contact-heading">Contact us</h2>
        </div>
        <div className="row g-4 contact-content">
          <div className="col-12 col-lg-5">
            <h3>Let’s make something useful.</h3>
            <p className="contact-intro">Contact us and we will get back to you within 24 hours.</p>
            <ul className="contact-details list-unstyled">
              {contactDetails.map((detail) => (
                <li key={detail.icon}>
                  <span className="contact-icon" aria-hidden="true">
                    <i className={`fa-solid ${detail.icon}`} />
                  </span>
                  <a href={detail.href}>{detail.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-12 col-lg-7">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-heading">
                <h3>Send us a message</h3>
                <span>We usually reply within one business day.</span>
              </div>
              <label className="form-label" htmlFor="contact-email">Email address</label>
              <input
                className="form-control"
                id="contact-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
              <label className="form-label" htmlFor="contact-message">How can we help?</label>
              <textarea
                className="form-control"
                id="contact-message"
                name="message"
                rows="4"
                placeholder="Tell us a little about your project..."
                required
              />
              <div className="form-bottom">
                <span className="form-status" role="status">{sent ? 'Thanks, your message is ready for our team.' : ''}</span>
                <button className="btn send-button" type="submit">
                  Send message <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;