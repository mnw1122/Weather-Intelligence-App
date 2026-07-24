import React from 'react';
import {
  Sun,
  CloudSun,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  Snowflake,
  CloudLightning,
  Cloud,
} from 'lucide-react';
import { getWeatherDetails } from '../utils';

interface WeatherIconProps {
  code: number;
  className?: string;
}

export function WeatherIcon({ code, className }: WeatherIconProps) {
  const { icon } = getWeatherDetails(code);

  switch (icon) {
    case 'sun':
      return <Sun className={className} />;
    case 'cloud-sun':
      return <CloudSun className={className} />;
    case 'cloud-fog':
      return <CloudFog className={className} />;
    case 'cloud-drizzle':
      return <CloudDrizzle className={className} />;
    case 'cloud-rain':
      return <CloudRain className={className} />;
    case 'snowflake':
      return <Snowflake className={className} />;
    case 'cloud-lightning':
      return <CloudLightning className={className} />;
    default:
      return <Cloud className={className} />;
  }
}
