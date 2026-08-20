import React, { useEffect, useState } from "react";
import {
    WiDayCloudy,
    WiDaySunny,
    WiCloudy,
    WiRain,
    WiThunderstorm,
    WiSnow,
    WiFog,
} from "react-icons/wi";
import "./index.css";

const WeatherInfo = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const latitude = 16.8152;
    const longitude = 80.02892;

    const fetchWeather = async () => {
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia%2FKolkata`
            );

            if (!response.ok) {
                throw new Error("Weather API error");
            }

            const data = await response.json();

            setWeather(data.current);
            setError(false);
        } catch (err) {
            console.error("Weather error:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
        const interval = setInterval(
            fetchWeather,
            10 * 60 * 1000
        );

        return () => clearInterval(interval);
    }, []);

    const getWeatherIcon = (code) => {
        if (code === 0) {
            return <WiDaySunny />;
        }
        if (code === 1 || code === 2) {
            return <WiDayCloudy />;
        }
        if (code === 3) {
            return <WiCloudy />;
        }
        if (code === 45 || code === 48) {
            return <WiFog />;
        }
        if (code >= 51 && code <= 82) {
            return <WiRain />;
        }
        if (code >= 71 && code <= 77) {
            return <WiSnow />;
        }
        if (code >= 95) {
            return <WiThunderstorm />;
        }
        return <WiDayCloudy />;
    };

    const getWeatherText = (code) => {
        if (code === 0) return "Clear";
        if (code === 1) return "Mainly Clear";
        if (code === 2) return "Partly Cloudy";
        if (code === 3) return "Cloudy";
        if (code === 45 || code === 48) return "Foggy";
        if (code >= 51 && code <= 82) return "Rainy";
        if (code >= 71 && code <= 77) return "Snowy";
        if (code >= 95) return "Thunderstorm";

        return "Partly Cloudy";
    };

    if (loading) {
        return (
            <div className="dondapadu-weather-card">
                <p>Loading weather...</p>
            </div>
        );
    }

    if (error || !weather) {
        return (
            <div className="dondapadu-weather-card">
                <h2>Weather in Dondapadu</h2>
                <p>Unable to load weather</p>
            </div>
        );
    }

    return (
        <div className="dondapadu-weather-card">
            <h2 className="dondapadu-weather-title">
                Weather in Dondapadu
            </h2>
            <div className="dondapadu-weather-main">
                <div className="dondapadu-weather-icon">
                    {getWeatherIcon(weather.weather_code)}
                </div>
                <div className="dondapadu-temperature-section">
                    <div className="dondapadu-temperature">
                        {Math.round(weather.temperature_2m)}
                        <span>°C</span>
                    </div>
                    <p>
                        {getWeatherText(weather.weather_code)}
                    </p>
                </div>
                <div className="dondapadu-weather-details">
                    <div className="dondapadu-weather-detail">
                        <span>Humidity</span>
                        <strong>
                            {weather.relative_humidity_2m}%
                        </strong>
                    </div>
                    <div className="dondapadu-weather-detail">
                        <span>Wind</span>
                        <strong>
                            {Math.round(weather.wind_speed_10m)} km/h
                        </strong>
                    </div>
                    <div className="dondapadu-weather-detail">
                        <span>Feels like</span>
                        <strong>
                            {Math.round(weather.apparent_temperature)}°C
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherInfo;