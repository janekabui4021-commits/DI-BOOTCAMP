from datetime import datetime, timezone
import os

from pyowm import OWM

API_KEY = os.getenv("OPENWEATHER_API_KEY")

if not API_KEY:
    raise RuntimeError(
        "Set the OPENWEATHER_API_KEY environment variable before running this script."
    )

owm = OWM(API_KEY)
mgr = owm.weather_manager()


def format_timestamp(ts):
    """Converts a Unix timestamp to a readable datetime string."""
    if ts:
        return datetime.fromtimestamp(ts, tz=timezone.utc).strftime(
            "%Y-%m-%d %H:%M:%S UTC"
        )
    return "N/A"


def display_paris_weather():
    """Fetches and displays weather, wind, and sun times for Paris."""
    print("==========================================")
    print("        CURRENT WEATHER IN PARIS          ")
    print("==========================================")

    observation = mgr.weather_at_place("Paris,FR")
    weather = observation.weather

    # Retrieve wind info and sun times
    wind = weather.wind()
    sunrise = weather.sunrise_time()
    sunset = weather.sunset_time()
    temp = weather.temperature("celsius")

    print(f"Status:      {weather.detailed_status.capitalize()}")
    print(f"Temperature: {temp['temp']}°C (Feels like: {temp['feels_like']}°C)")
    print(f"Humidity:    {weather.humidity}%")
    print(f"Wind Speed:  {wind.get('speed', 0)} m/s")
    print(f"Wind Deg:    {wind.get('deg', 'N/A')}°")
    print(f"Sunrise:     {format_timestamp(sunrise)}")
    print(f"Sunset:      {format_timestamp(sunset)}")
    print("==========================================\n")


def display_user_city_weather():
    """Asks user for a location, resolves its City ID, and prints weather & pollution."""
    city_name = input(
        "Enter a city name (e.g., 'London,GB' or 'Tokyo,JP'): "
    ).strip()

    try:
        # Search for place to retrieve the city ID
        registry = owm.city_id_registry()
        locations = registry.locations_for(city_name)

        if not locations:
            print(f"Could not find any city matching '{city_name}'.")
            return

        location = locations[0]
        city_id = location.id

        print(
            f"\nLocation found: {location.name}, {location.country} (City ID: {city_id})"
        )

        # Retrieve weather using City ID
        observation = mgr.weather_at_id(city_id)
        weather = observation.weather
        wind = weather.wind()
        temp = weather.temperature("celsius")

        print("\n--- Current Weather Conditions ---")
        print(f"Status:      {weather.detailed_status.capitalize()}")
        print(f"Temperature: {temp['temp']}°C")
        print(f"Humidity:    {weather.humidity}%")
        print(f"Wind Speed:  {wind.get('speed', 0)} m/s")
        print(f"Sunrise:     {format_timestamp(weather.sunrise_time())}")
        print(f"Sunset:      {format_timestamp(weather.sunset_time())}")

        # Retrieve 5-day / 3-hour Forecast using forecast_at_id
        forecast_3h = mgr.forecast_at_id(city_id, "3h").forecast
        print("\n--- Next 3 Forecast Intervals (3-Hour Intervals) ---")
        for w in forecast_3h.weathers[:3]:
            dt_str = format_timestamp(w.reference_time())
            print(
                f"[{dt_str}] {w.detailed_status.capitalize()} | {w.temperature('celsius')['temp']}°C"
            )

        # Retrieve Air Pollution using coordinates
        air_mgr = owm.airpollution_manager()
        air_quality = air_mgr.air_quality_at(location.lat, location.lon)
        print("\n--- Air Pollution Status ---")
        print(
            f"Air Quality Index (AQI): {air_quality.aqi} (1 = Good, 5 = Very Poor)"
        )
        print("-------------------------------------------\n")

    except Exception as e:
        print(f"Error retrieving weather data: {e}")


if __name__ == "__main__":
    display_paris_weather()
    display_user_city_weather()