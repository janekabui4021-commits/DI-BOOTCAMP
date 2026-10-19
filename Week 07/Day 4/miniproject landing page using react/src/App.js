import React from 'react';
import Header from './components/Header.jsx';
import InfoCard from './components/InfoCard.jsx';
import Contact from './components/Contact.jsx';

const companySections = [
  {
    icon: 'fa-building',
    title: 'About the Company',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    icon: 'fa-earth-americas',
    title: 'Our Values',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    icon: 'fa-building-columns',
    title: 'Our Mission',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
];

function App() {
  return (
    <>
      <Header />
      <main>
        <section className="company-banner" id="home">
          <div className="container text-center">
            <p className="banner-kicker">Independent thinking. Useful work.</p>
            <h1>Company</h1>
            <p className="banner-subtitle">We specialise in something ...</p>
            <a className="btn banner-button" href="#about">Discover what we do</a>
          </div>
        </section>

        <section className="company-section container" id="about" aria-label="About our company">
          <div className="row g-4">
            {companySections.map((section, index) => (
              <div className="col-12 col-md-4" key={section.title}>
                <InfoCard {...section} index={index + 1} />
              </div>
            ))}
          </div>
        </section>

        <Contact />
      </main>
      <footer className="site-footer">
        <div className="container d-flex flex-column flex-sm-row justify-content-between gap-2">
          <span>Company</span>
          <span>Thoughtful work, built together.</span>
        </div>
      </footer>
    </>
  );
}

export default App;