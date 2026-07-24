import React from 'react';
import { CurrentWeather as CurrentWeatherType, Location } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { getWeatherDetails } from '../utils';
import { Droplets, Wind, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface CurrentWeatherDisplayProps {
  weather: CurrentWeatherType;
  location: Location;
}

export function CurrentWeatherDisplay({ weather, location }: CurrentWeatherDisplayProps) {
  const { label } = getWeatherDetails(weather.weather_code);

  return (
    <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 flex flex-col md:flex-row items-center justify-between gap-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-transparent rounded-bl-[100px] -z-10 pointer-events-none" />
      
      <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 w-full md:w-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center md:justify-start gap-2 mb-2"
        >
          <MapPin className="w-5 h-5 text-blue-500" />
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {location.name}
          </h2>
        </motion.div>
        
        {location.country && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 font-medium ml-7"
          >
            {location.admin1 ? `${location.admin1}, ` : ''}{location.country}
          </motion.p>
        )}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex items-center gap-4 bg-white/50 py-3 px-5 rounded-2xl shadow-sm border border-white/80"
        >
          <WeatherIcon code={weather.weather_code} className="w-10 h-10 text-blue-500 drop-shadow-sm" />
          <span className="text-lg font-bold text-slate-700">{label}</span>
        </motion.div>
      </div>

      <div className="flex flex-col items-center md:items-end z-10 w-full md:w-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.2 
          }}
          className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-600 tracking-tighter drop-shadow-sm"
        >
          {Math.round(weather.temperature_2m)}°C
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center md:justify-end gap-4 mt-8"
        >
          <div className="flex items-center gap-3 text-slate-700 bg-white/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/60 shadow-sm transition-transform hover:scale-105">
            <div className="bg-blue-100 p-2 rounded-xl">
              <Droplets className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Humidity</span>
              <span className="font-bold text-lg leading-tight">{weather.relative_humidity_2m}%</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-700 bg-white/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/60 shadow-sm transition-transform hover:scale-105">
            <div className="bg-sky-100 p-2 rounded-xl">
              <Wind className="w-5 h-5 text-sky-500" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Wind</span>
              <span className="font-bold text-lg leading-tight">{weather.wind_speed_10m} km/h</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
