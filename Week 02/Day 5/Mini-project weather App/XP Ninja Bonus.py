from datetime import datetime
import os

import matplotlib.pyplot as plt
from pyowm import OWM
import pytz

API_KEY = os.getenv("OPENWEATHER_API_KEY")
CITY_NAME = "Paris,FR"

if not API_KEY:
    raise RuntimeError(
        "Set the OPENWEATHER_API_KEY environment variable before running this script."
    )


class mgr:
    """Concrete wrapper around pyowm's weather manager with useful methods."""

    def __init__(self, api_key):
        self._owm = OWM(api_key)
        self._weather_manager = self._owm.weather_manager()

    def weather_at_place(self, city_name, *, units=None):
        """Return current weather for a city using pyowm's manager."""
        if units is None:
            return self._weather_manager.weather_at_place(city_name)
        return self._weather_manager.weather_at_place(city_name, units=units)

    def forecast_at_place(self, city_name, interval, *, units=None):
        """Return a forecast object for a city and time interval."""
        if units is None:
            return self._weather_manager.forecast_at_place(city_name, interval)
        return self._weather_manager.forecast_at_place(city_name, interval, units=units)

    def one_call(self, lat, lon, *, units=None):
        """Return a one-call weather object for coordinates."""
        if units is None:
            return self._weather_manager.one_call(lat, lon)
        return self._weather_manager.one_call(lat, lon, units=units)


def get_forecast_data(city):
    """Fetches 3-day forecast data (24 entries at 3-hour intervals)."""
    manager = mgr(API_KEY)

    # Retrieve forecast using forecast_at_place
    forecast = manager.forecast_at_place(city, "3h").forecast

    timestamps = []
    temperatures = []
    humidities = []

    # 3 days = 24 entries (8 per day)
    for weather in forecast.weathers[:24]:
        dt = datetime.fromtimestamp(
            weather.reference_time(), tz=pytz.timezone("UTC")
        )
        # Format time for the X-axis label
        timestamps.append(dt.strftime("%d %b\n%H:%M"))
        temperatures.append(weather.temperature("celsius")["temp"])
        humidities.append(weather.humidity)

    return timestamps, temperatures, humidities


def init_plot(ax, city_name):
    """Updates the values for ylabel and title."""
    ax.set_ylabel("Temperature (°C)", fontsize=11, fontweight="bold")
    ax.set_title(
        f"3-Day Weather Forecast & Humidity for {city_name}",
        fontsize=14,
        fontweight="bold",
        pad=15,
    )
    ax.grid(axis="y", linestyle="--", alpha=0.5)


def plot_temperatures(ax, times, temps):
    """Determines the bar chart details and applies styling."""
    bars = ax.bar(
        times,
        temps,
        color="#3498db",
        edgecolor="#2980b9",
        linewidth=1.2,
        width=0.6,
    )
    ax.set_xticklabels(times, rotation=45, ha="right", fontsize=8)
    return bars


def write_humidity_on_bar_chart(ax, bars, humidities):
    """Displays the % humidity on top of each bar in the chart."""
    for bar, humidity in zip(bars, humidities):
        height = bar.get_height()
        y_pos = height + 0.5 if height >= 0 else height - 1.5

        ax.text(
            bar.get_x() + bar.get_width() / 2.0,
            y_pos,
            f"{humidity}%",
            ha="center",
            va="bottom" if height >= 0 else "top",
            fontsize=7,
            fontweight="bold",
            color="#2c3e50",
        )


def main():
    times, temps, humidities = get_forecast_data(CITY_NAME)

    # Initialize plot figure and axis
    fig, ax = plt.subplots(figsize=(12, 6))

    # Apply required function calls
    init_plot(ax, CITY_NAME)
    bars = plot_temperatures(ax, times, temps)
    write_humidity_on_bar_chart(ax, bars, humidities)

    # Adjust layout and display GUI window
    plt.tight_layout()
    plt.show()


if __name__ == "__main__":
    main()