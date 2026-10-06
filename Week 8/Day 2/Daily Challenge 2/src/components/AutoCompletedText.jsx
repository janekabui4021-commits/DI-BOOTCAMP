import React, { Component } from 'react';
import countries from '../data/countries';

class AutoCompletedText extends Component {
  state = {
    suggestions: [],
    text: '',
  };

  handleChange = (event) => {
    const text = event.target.value;
    const normalizedText = text.trim().toLowerCase();

    if (!normalizedText) {
      this.setState({ text, suggestions: [] });
      return;
    }

    const suggestions = countries
      .filter((country) => country.toLowerCase().startsWith(normalizedText))
      .slice(0, 8);

    this.setState({ text, suggestions });
  };

  handleSelect = (country) => {
    this.setState({ text: country, suggestions: [] });
  };

  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      this.setState({ suggestions: [] });
    }
  };

  render() {
    const { suggestions, text } = this.state;

    return (
      <section className="search-card">
        <p className="eyebrow">Week 8 · Day 2 · Daily Challenge #2</p>
        <h1>Country Search</h1>
        <p className="description">
          Start typing a country name and select a suggestion.
        </p>

        <label className="visually-hidden" htmlFor="country-search">
          Search countries
        </label>
        <input
          id="country-search"
          type="text"
          value={text}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Start typing a country..."
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={suggestions.length > 0}
          aria-controls="country-suggestions"
        />

        {suggestions.length > 0 && (
          <ul className="suggestions" id="country-suggestions" role="listbox">
            {suggestions.map((country) => (
              <li key={country} role="option" aria-selected="false">
                <button
                  type="button"
                  className="suggestion"
                  onClick={() => this.handleSelect(country)}
                >
                  {country}
                </button>
              </li>
            ))}
          </ul>
        )}

        {text && suggestions.length === 0 && countries.includes(text) && (
          <p className="selected-country" role="status">
            Selected country: <strong>{text}</strong>
          </p>
        )}
      </section>
    );
  }
}

export default AutoCompletedText;
