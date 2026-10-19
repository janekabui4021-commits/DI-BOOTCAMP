import React, { Component } from 'react';

class Example3 extends Component {
  render() {
    const { Experiences } = this.props.data;

    return (
      <section className="json-example">
        <h2>Experiences</h2>
        {Experiences.map(({ companyName, logo, url, roles }) => (
          <div key={companyName} className="experience">
            <img className="company-logo" src={logo} alt={`${companyName} logo`} />
            <div>
              <h3><a href={url} target="_blank" rel="noreferrer">{companyName}</a></h3>
              {roles.map(({ title, description, startDate, endDate, location }) => (
                <div key={`${companyName}-${title}`} className="experience-role">
                  <h4>{title}</h4>
                  <p>{description}</p>
                  <p>{startDate} - {endDate} · {location}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    );
  }
}

export default Example3;
