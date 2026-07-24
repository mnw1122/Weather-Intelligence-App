/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { SearchBar } from './components/SearchBar';
import { CurrentWeatherDisplay } from './components/CurrentWeatherDisplay';
import { ForecastChart } from './components/ForecastChart';
import { PlanningRecommendation } from './components/PlanningRecommendation';
import { DynamicBackground, getWeatherTheme, themeConfig } from './components/DynamicBackground';
import { Location, WeatherData } from './types';
import { fetchWeatherData, geocodeCity } from './utils';
import { CloudSun } from 'lucide-react';

export default function App() {
  const [location, setLocation] = useState<Location | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const locationData = await geocodeCity(city);
      if (!locationData) {
        setError('City not found');
        setLocation(null);
        setWeather(null);
        return;
      }

      setLocation(locationData);
      
      const weatherData = await fetchWeatherData(
        locationData.latitude,
        locationData.longitude
      );
      setWeather(weatherData);
    } catch (err) {
      console.error(err);
      setError('City not found');
      setLocation(null);
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  const themeKey = useMemo(() => getWeatherTheme(weather?.current?.weather_code, weather?.current?.is_day), [weather]);
  const activeTheme = themeConfig[themeKey] || themeConfig.default;
  const isDark = activeTheme.isDark;

  return (
    <div className={`min-h-screen ${activeTheme.bg} font-sans p-4 md:p-8 relative overflow-hidden flex flex-col transition-colors duration-1000`}>
      <DynamicBackground weatherCode={weather?.current?.weather_code} isDay={weather?.current?.is_day} />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10 w-full flex-grow">
        
        {/* Header */}
        <header className="flex flex-col items-center justify-center text-center space-y-5 pt-10 pb-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white/80 backdrop-blur-md p-5 rounded-[2rem] text-blue-600 shadow-sm border border-white/60"
          >
            <CloudSun className="w-12 h-12" />
          </motion.div>
          <motion.h1 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className={`text-4xl md:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-800'} transition-colors duration-1000`}
          >
            Weather Intelligence
          </motion.h1>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className={`font-medium max-w-md text-lg ${isDark ? 'text-slate-300' : 'text-slate-500'} transition-colors duration-1000`}
          >
            Enter a city name to get current weather conditions, 7-day forecast, and intelligent planning recommendations.
          </motion.p>
        </header>

        {/* Search */}
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center w-full"
        >
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50/90 backdrop-blur-sm text-red-600 p-4 rounded-2xl text-center font-medium max-w-md mx-auto border border-red-100 shadow-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && !error && !weather && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-center py-16 ${isDark ? 'text-slate-300' : 'text-slate-400'} transition-colors duration-1000`}
          >
            <p className="text-lg">Search for a city to view the forecast.</p>
          </motion.div>
        )}

        {/* Weather Content */}
        {location && weather && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <CurrentWeatherDisplay weather={weather.current} location={location} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2">
                <ForecastChart daily={weather.daily} />
              </div>
              <div className="lg:col-span-1 h-full">
                <PlanningRecommendation
                  weatherCode={weather.current.weather_code}
                  temperature={weather.current.temperature_2m}
                  city={location.name}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
