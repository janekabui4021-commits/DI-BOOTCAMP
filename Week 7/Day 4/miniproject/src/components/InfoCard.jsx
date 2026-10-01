import React from 'react';

function InfoCard({ icon, title, description, index }) {
  return (
    <article className="info-card h-100">
      <div className="info-card-top">
        <span className="card-index">0{index}</span>
        <span className="icon-wrap" aria-hidden="true">
          <i className={`fa-solid ${icon}`} />
        </span>
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      <a className="card-link" href="#contact">
        Get in touch <i className="fa-solid fa-arrow-right" aria-hidden="true" />
      </a>
    </article>
  );
}

export default InfoCard;