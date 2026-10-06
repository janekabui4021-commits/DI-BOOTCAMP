import React, { Component } from 'react';

class Example1 extends Component {
  render() {
    const { SocialMedias } = this.props.data;

    return (
      <section className="json-example">
        <h2>Social Medias</h2>
        <ul className="social-media-list">
          {SocialMedias.map((url) => (
            <li key={url}>
              <a href={url} target="_blank" rel="noreferrer">{url}</a>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default Example1;
