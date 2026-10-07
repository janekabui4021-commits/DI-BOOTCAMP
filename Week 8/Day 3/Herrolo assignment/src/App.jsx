import { useCallback, useEffect, useRef, useState } from 'react';

const FAVORITES_KEY = 'skycast-favorite-cities';

const weatherDescriptions = {
  0: ['Clear sky', '☀️'],
  1: ['Mainly clear', '🌤️'],
  2: ['Partly cloudy', '⛅'],
  3: ['Overcast', '☁️'],
  45: ['Foggy', '🌫️'],
  48: ['Rime fog', '🌫️'],
  51: ['Light drizzle', '🌦️'],
  53: ['Drizzle', '🌦️'],
  55: ['Heavy drizzle', '🌧️'],
  56: ['Freezing drizzle', '🌧️'],
  57: ['Heavy freezing drizzle', '🌧️'],
  61: ['Light rain', '🌦️'],
  63: ['Rain', '🌧️'],
  65: ['Heavy rain', '🌧️'],
  66: ['Freezing rain', '🌧️'],
  67: ['Heavy freezing rain', '🌧️'],
  71: ['Light snow', '🌨️'],
  73: ['Snow', '🌨️'],
  75: ['Heavy snow', '❄️'],
  77: ['Snow grains', '❄️'],
  80: ['Rain showers', '🌦️'],
  81: ['Heavy showers', '🌧️'],
  82: ['Violent showers', '⛈️'],
  85: ['Snow showers', '🌨️'],
  86: ['Heavy snow showers', '❄️'],
  95: ['Thunderstorm', '⛈️'],
  96: ['Thunderstorm with hail', '⛈️'],
  99: ['Heavy thunderstorm', '⛈️'],
};

function getWeatherDescription(code) {
  return weatherDescriptions[code] ?? ['Weather unavailable', '🌡️'];
}

function getFavoriteKey(location) {
  return `${location.latitude.toFixed(3)},${location.longitude.toFixed(3)}`;
}

function readFavorites() {
  try {
    const stored = window.localStorage.getItem(FAVORITES_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (place) =>
        place &&
        typeof place.name === 'string' &&
        typeof place.latitude === 'number' &&
        typeof place.longitude === 'number',
    );
  } catch {
    return [];
  }
}

async function fetchForecast(location, signal) {
  const params = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
    forecast_days: '5',
  });
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { signal });
  if (!response.ok) {
    throw new Error('Weather data could not be loaded. Please try again.');
  }
  return response.json();
}

async function findCity(query, signal) {
  const params = new URLSearchParams({
    name: query,
    count: '1',
    language: 'en',
    format: 'json',
  });
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`, {
    signal,
  });
  if (!response.ok) {
    throw new Error('City search is unavailable right now. Please try again.');
  }

  const result = await response.json();
  if (!result.results?.length) {
    throw new Error(`We couldn't find “${query}”. Check the spelling and try again.`);
  }

  const place = result.results[0];
  return {
    id: getFavoriteKey(place),
    name: place.name,
    admin1: place.admin1,
    country: place.country,
    latitude: place.latitude,
    longitude: place.longitude,
    timezone: place.timezone,
  };
}

function formatDay(date) {
  return new Intl.DateTimeFormat('en', { weekday: 'short' }).format(
    new Date(`${date}T12:00:00`),
  );
}

export default function App() {
  const [page, setPage] = useState('weather');
  const [query, setQuery] = useState('');
  const [city, setCity] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [favorites, setFavorites] = useState(readFavorites);
  const [favoriteForecasts, setFavoriteForecasts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [storageError, setStorageError] = useState('');
  const requestRef = useRef(null);

  const searchCity = useCallback(async (cityName) => {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;

    setLoading(true);
    setError('');
    try {
      const place = await findCity(cityName.trim(), controller.signal);
      const data = await fetchForecast(place, controller.signal);
      setCity(place);
      setForecast(data);
      setQuery(place.name);
      setPage('weather');
    } catch (searchError) {
      if (searchError.name !== 'AbortError') setError(searchError.message);
    } finally {
      if (requestRef.current === controller) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    searchCity('Tel Aviv');
    return () => requestRef.current?.abort();
  }, [searchCity]);

  useEffect(() => {
    if (page !== 'favorites' || favorites.length === 0) {
      setFavoriteForecasts({});
      return undefined;
    }

    const controller = new AbortController();
    Promise.allSettled(
      favorites.map(async (place) => [place.id ?? getFavoriteKey(place), await fetchForecast(place, controller.signal)]),
    ).then((results) => {
      const nextForecasts = {};
      results.forEach((result, index) => {
        const key = favorites[index].id ?? getFavoriteKey(favorites[index]);
        nextForecasts[key] =
          result.status === 'fulfilled'
            ? { data: result.value[1] }
            : { error: 'Weather data could not be loaded.' };
      });
      if (!controller.signal.aborted) setFavoriteForecasts(nextForecasts);
    });

    return () => controller.abort();
  }, [favorites, page]);

  function toggleFavorite(place) {
    const key = place.id ?? getFavoriteKey(place);
    const isSaved = favorites.some((favorite) => (favorite.id ?? getFavoriteKey(favorite)) === key);
    const nextFavorites = isSaved
      ? favorites.filter((favorite) => (favorite.id ?? getFavoriteKey(favorite)) !== key)
      : [...favorites, { ...place, id: key }];

    setFavorites(nextFavorites);
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
      setStorageError('');
    } catch {
      setStorageError('Favorites could not be saved on this device. Please check your browser storage settings.');
    }
  }

  const isCurrentCityFavorite =
    city && favorites.some((favorite) => (favorite.id ?? getFavoriteKey(favorite)) === city.id);

  return (
    <main className="app-shell">
      <div className="app-container">
        <header className="topbar">
          <a className="brand" href="#" onClick={() => setPage('weather')} aria-label="Skycast home">
            <span className="brand-mark">✳</span>
            <span>skycast</span>
          </a>
          <nav className="navigation" aria-label="Main navigation">
            <button
              className={`nav-link ${page === 'weather' ? 'active' : ''}`}
              onClick={() => setPage('weather')}
            >
              Weather
            </button>
            <button
              className={`nav-link ${page === 'favorites' ? 'active' : ''}`}
              onClick={() => setPage('favorites')}
            >
              Favorites <span className="favorite-count">{favorites.length}</span>
            </button>
          </nav>
          <div className="local-label"><span /> Live weather</div>
        </header>

        <section className="search-section">
          <div>
            <p className="eyebrow">{page === 'weather' ? 'YOUR DAILY FORECAST' : 'YOUR SAVED PLACES'}</p>
            <h1>{page === 'weather' ? 'Find your forecast' : 'Favorite cities'}</h1>
            <p className="subtitle">
              {page === 'weather'
                ? 'A little sunshine, wherever you are.'
                : 'The places you want to keep an eye on.'}
            </p>
          </div>
          {page === 'weather' && (
            <form
              className="search-form"
              onSubmit={(event) => {
                event.preventDefault();
                if (query.trim()) searchCity(query);
              }}
            >
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input
                aria-label="Search for a city"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search a city..."
                value={query}
              />
              <button className="search-button" disabled={loading || !query.trim()} type="submit">
                {loading ? <span className="spinner" aria-label="Searching" /> : 'Search'}
              </button>
            </form>
          )}
        </section>

        {error && page === 'weather' && (
          <div className="notice error-notice" role="alert">
            <span>{error}</span>
            <button onClick={() => setError('')} aria-label="Dismiss error">×</button>
          </div>
        )}
        {storageError && (
          <div className="notice storage-notice" role="status">
            <span>{storageError}</span>
            <button onClick={() => setStorageError('')} aria-label="Dismiss message">×</button>
          </div>
        )}

        {page === 'weather' && (
          <section aria-live="polite">
            {loading && !forecast ? (
              <div className="loading-card"><span className="spinner dark-spinner" /> Loading the forecast...</div>
            ) : forecast && city ? (
              <>
                <article className="weather-card">
                  <div className="weather-card-glow" />
                  <div className="weather-main">
                    <div className="location-line">
                      <span className="location-pin">⌖</span>
                      <span>{city.name}{city.admin1 ? `, ${city.admin1}` : ''}{city.country ? `, ${city.country}` : ''}</span>
                    </div>
                    <p className="weather-condition">{getWeatherDescription(forecast.current.weather_code)[0]}</p>
                    <div className="temperature">{Math.round(forecast.current.temperature_2m)}<span>°</span></div>
                    <p className="feels-like">Feels like {Math.round(forecast.current.apparent_temperature)}°</p>
                  </div>
                  <div className="weather-art" aria-hidden="true">
                    <span>{getWeatherDescription(forecast.current.weather_code)[1]}</span>
                  </div>
                  <button
                    className={`save-button ${isCurrentCityFavorite ? 'saved' : ''}`}
                    onClick={() => toggleFavorite(city)}
                    aria-pressed={Boolean(isCurrentCityFavorite)}
                  >
                    <span aria-hidden="true">{isCurrentCityFavorite ? '♥' : '♡'}</span>
                    {isCurrentCityFavorite ? 'Saved to favorites' : 'Add to favorites'}
                  </button>
                  <div className="weather-details">
                    <div className="detail-item">
                      <span className="detail-icon">💧</span>
                      <span className="detail-label">Humidity</span>
                      <strong>{forecast.current.relative_humidity_2m}%</strong>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">↗</span>
                      <span className="detail-label">Wind</span>
                      <strong>{Math.round(forecast.current.wind_speed_10m)} km/h</strong>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">☂</span>
                      <span className="detail-label">Precipitation</span>
                      <strong>{forecast.current.precipitation} mm</strong>
                    </div>
                  </div>
                </article>

                <section className="forecast-section">
                  <div className="section-heading">
                    <div>
                      <p className="eyebrow">COMING UP</p>
                      <h2>5-day forecast</h2>
                    </div>
                    <span className="unit-label">°C</span>
                  </div>
                  <div className="forecast-grid">
                    {forecast.daily.time.map((date, index) => {
                      const [description, icon] = getWeatherDescription(forecast.daily.weather_code[index]);
                      return (
                        <article className={`forecast-day ${index === 0 ? 'today' : ''}`} key={date}>
                          <span className="day-name">{index === 0 ? 'Today' : formatDay(date)}</span>
                          <span className="forecast-icon" role="img" aria-label={description}>{icon}</span>
                          <span className="day-condition">{description}</span>
                          <div className="day-temperatures">
                            <strong>{Math.round(forecast.daily.temperature_2m_max[index])}°</strong>
                            <span>{Math.round(forecast.daily.temperature_2m_min[index])}°</span>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              </>
            ) : (
              <div className="empty-card">Search for a city to see its weather.</div>
            )}
          </section>
        )}

        {page === 'favorites' && (
          <section className="favorites-section">
            {favorites.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">♡</span>
                <h2>No favorites yet</h2>
                <p>Search for a city and save it to see it here.</p>
                <button className="primary-button" onClick={() => setPage('weather')}>Explore weather</button>
              </div>
            ) : (
              <div className="favorites-grid">
                {favorites.map((place) => {
                  const key = place.id ?? getFavoriteKey(place);
                  const result = favoriteForecasts[key];
                  const current = result?.data?.current;
                  const [description, icon] = current
                    ? getWeatherDescription(current.weather_code)
                    : ['Loading forecast', '⛅'];
                  return (
                    <article className="favorite-card" key={key}>
                      <div className="favorite-card-top">
                        <span className="favorite-weather-icon" aria-hidden="true">{icon}</span>
                        <button
                          className="remove-favorite"
                          onClick={() => toggleFavorite(place)}
                          aria-label={`Remove ${place.name} from favorites`}
                        >×</button>
                      </div>
                      <h2>{place.name}</h2>
                      <p className="favorite-region">{[place.admin1, place.country].filter(Boolean).join(', ')}</p>
                      {result?.error ? (
                        <p className="favorite-error">{result.error}</p>
                      ) : current ? (
                        <>
                          <div className="favorite-temp">{Math.round(current.temperature_2m)}°</div>
                          <p className="favorite-condition">{description}</p>
                        </>
                      ) : (
                        <div className="favorite-placeholder"><span className="spinner dark-spinner" /></div>
                      )}
                      <button
                        className="view-city-button"
                        onClick={() => searchCity(place.name)}
                      >View forecast <span aria-hidden="true">→</span></button>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        )}

        <footer className="footer">
          <span>Made for the moments between the forecast.</span>
          <span>Weather data by <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a></span>
        </footer>
      </div>
    </main>
  );
}
