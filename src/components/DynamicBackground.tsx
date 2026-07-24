import React from 'react';
import { motion } from 'motion/react';
import { Cloud, Snowflake, Droplet } from 'lucide-react';

interface DynamicBackgroundProps {
  weatherCode?: number;
  isDay?: number;
}

export function getWeatherTheme(code?: number, isDay?: number) {
  if (code === undefined || isDay === undefined) return 'default';
  
  if (code === 0) return isDay ? 'clear_day' : 'clear_night';
  if (code >= 1 && code <= 3) return isDay ? 'cloudy_day' : 'cloudy_night';
  if (code >= 45 && code <= 48) return isDay ? 'fog_day' : 'fog_night';
  if (code >= 51 && code <= 67) return isDay ? 'rain_day' : 'rain_night';
  if (code >= 71 && code <= 77) return isDay ? 'snow_day' : 'snow_night';
  if (code >= 80 && code <= 82) return isDay ? 'rain_day' : 'rain_night';
  if (code >= 85 && code <= 86) return isDay ? 'snow_day' : 'snow_night';
  if (code >= 95 && code <= 99) return isDay ? 'thunder_day' : 'thunder_night';
  
  return isDay ? 'clear_day' : 'clear_night';
}

export const themeConfig: Record<string, { bg: string; isDark: boolean }> = {
  default: { bg: 'bg-[#F8FAFC]', isDark: false },
  clear_day: { bg: 'bg-sky-200', isDark: false },
  clear_night: { bg: 'bg-slate-900', isDark: true },
  cloudy_day: { bg: 'bg-slate-300', isDark: false },
  cloudy_night: { bg: 'bg-slate-800', isDark: true },
  fog_day: { bg: 'bg-gray-300', isDark: false },
  fog_night: { bg: 'bg-gray-800', isDark: true },
  rain_day: { bg: 'bg-blue-300', isDark: false },
  rain_night: { bg: 'bg-slate-800', isDark: true },
  snow_day: { bg: 'bg-blue-100', isDark: false },
  snow_night: { bg: 'bg-slate-900', isDark: true },
  thunder_day: { bg: 'bg-slate-500', isDark: false },
  thunder_night: { bg: 'bg-indigo-950', isDark: true },
};

export function DynamicBackground({ weatherCode, isDay }: DynamicBackgroundProps) {
  const theme = getWeatherTheme(weatherCode, isDay);

  // Generate random positions for elements once
  const elements = React.useMemo(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 1.5,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 5,
    })), 
  []);

  const renderElements = () => {
    switch (theme) {
      case 'clear_day':
        return (
          <>
            <div className="absolute top-10 right-10 w-48 h-48 bg-yellow-300/40 rounded-full blur-[50px] animate-pulse" />
            <div className="absolute top-20 right-20 w-24 h-24 bg-yellow-200/60 rounded-full blur-[20px]" />
            {elements.slice(0, 3).map((el) => (
              <motion.div
                key={el.id}
                className="absolute opacity-20"
                style={{ left: `${el.x}%`, top: `${el.y}%` }}
                animate={{ x: [0, 50, 0] }}
                transition={{ duration: el.duration, repeat: Infinity, ease: "linear" }}
              >
                <Cloud className="w-24 h-24 text-white" />
              </motion.div>
            ))}
          </>
        );
      case 'clear_night':
        return elements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute rounded-full bg-white"
            style={{ 
              left: `${el.x}%`, 
              top: `${el.y}%`, 
              width: `${el.scale * 3}px`, 
              height: `${el.scale * 3}px`,
              opacity: 0.8 
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: el.duration / 5, repeat: Infinity, delay: el.delay }}
          />
        ));
      case 'cloudy_day':
      case 'cloudy_night':
      case 'fog_day':
      case 'fog_night':
        return elements.slice(0, 8).map((el) => (
          <motion.div
            key={el.id}
            className="absolute opacity-30"
            style={{ left: `${el.x}%`, top: `${el.y}%` }}
            animate={{ x: [0, 100, 0] }}
            transition={{ duration: el.duration, repeat: Infinity, ease: "linear" }}
          >
            <Cloud className={`w-32 h-32 ${theme.includes('day') ? 'text-white' : 'text-slate-500'}`} />
          </motion.div>
        ));
      case 'rain_day':
      case 'rain_night':
      case 'thunder_day':
      case 'thunder_night':
        return elements.map((el) => (
          <motion.div
            key={el.id}
            className={`absolute w-1 h-8 rounded-full ${theme.includes('day') ? 'bg-blue-500/30' : 'bg-blue-300/30'}`}
            style={{ left: `${el.x}%`, top: `-10%` }}
            animate={{ y: ['0vh', '120vh'], x: ['0vw', '-10vw'] }}
            transition={{ duration: el.duration / 15, repeat: Infinity, ease: "linear", delay: el.delay }}
          />
        ));
      case 'snow_day':
      case 'snow_night':
        return elements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute"
            style={{ left: `${el.x}%`, top: `-10%` }}
            animate={{ y: ['0vh', '120vh'], x: ['-5vw', '5vw', '-5vw'] }}
            transition={{ 
              y: { duration: el.duration / 2, repeat: Infinity, ease: "linear" },
              x: { duration: el.duration / 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Snowflake className={`w-6 h-6 ${theme.includes('day') ? 'text-white/80' : 'text-slate-300/50'}`} />
          </motion.div>
        ));
      default:
        // Default generic blobs
        return (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/40 rounded-full blur-[100px] mix-blend-multiply animate-pulse" />
            <div className="absolute top-[20%] right-[-10%] w-[40%] h-[50%] bg-indigo-200/30 rounded-full blur-[120px] mix-blend-multiply" style={{ animationDelay: '2s', animationDuration: '7s' }} />
            <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] bg-sky-200/40 rounded-full blur-[100px] mix-blend-multiply" style={{ animationDelay: '4s', animationDuration: '8s' }} />
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {renderElements()}
      {theme.includes('thunder') && (
        <motion.div
          className="absolute inset-0 bg-white"
          animate={{ opacity: [0, 0, 0.8, 0, 0, 0.2, 0, 0] }}
          transition={{ duration: 7, repeat: Infinity, times: [0, 0.9, 0.92, 0.94, 0.96, 0.97, 0.99, 1] }}
        />
      )}
    </div>
  );
}
