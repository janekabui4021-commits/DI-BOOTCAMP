import React from 'react';

function BootstrapCard({ title, imageUrl, buttonLabel, buttonUrl, description }) {
  return (
    <article className="card celebrity-card m-3">
      <img className="card-img-top celebrity-image" src={imageUrl} alt={title} />
      <div className="card-body d-flex flex-column">
        <h3 className="card-title h5">{title}</h3>
        <p className="card-text">{description}</p>
        <a className="btn btn-primary mt-auto align-self-start" href={buttonUrl} target="_blank" rel="noreferrer">
          {buttonLabel}
        </a>
      </div>
    </article>
  );
}

export default BootstrapCard;