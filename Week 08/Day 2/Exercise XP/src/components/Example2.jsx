import React, { Component } from 'react';

class Example2 extends Component {
  render() {
    const { Skills } = this.props.data;

    return (
      <section className="json-example">
        <h2>Skills</h2>
        {Skills.map(({ Area, SkillSet }) => (
          <div key={Area} className="skill-area">
            <h3>{Area}</h3>
            <ul className="skill-list">
              {SkillSet.map(({ Name, Hot }) => (
                <li key={Name}>
                  {Name}{Hot && <span className="hot-skill">HOT</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    );
  }
}

export default Example2;
