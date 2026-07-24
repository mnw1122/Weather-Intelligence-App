import { Location, WeatherData } from './types';

export async function geocodeCity(city: string): Promise<Location | null> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch location data');
  }
  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    return null;
  }
  return data.results[0];
}

export async function searchCities(query: string): Promise<Location[]> {
  if (!query) return [];
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    query
  )}&count=5`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch location data');
  }
  const data = await response.json();
  return data.results || [];
}

export async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  const data = await response.json();
  return data;
}

// Map WMO Weather codes to human readable strings and Lucide icon names
export function getWeatherDetails(code: number): { label: string; icon: string } {
  if (code === 0) return { label: 'Clear sky', icon: 'sun' };
  if (code === 1 || code === 2 || code === 3)
    return { label: 'Partly cloudy', icon: 'cloud-sun' };
  if (code === 45 || code === 48) return { label: 'Fog', icon: 'cloud-fog' };
  if (code >= 51 && code <= 55) return { label: 'Drizzle', icon: 'cloud-drizzle' };
  if (code >= 61 && code <= 67) return { label: 'Rain', icon: 'cloud-rain' };
  if (code >= 71 && code <= 77) return { label: 'Snow', icon: 'snowflake' };
  if (code >= 80 && code <= 82) return { label: 'Rain showers', icon: 'cloud-rain' };
  if (code >= 85 && code <= 86) return { label: 'Snow showers', icon: 'snowflake' };
  if (code >= 95 && code <= 99) return { label: 'Thunderstorm', icon: 'cloud-lightning' };
  return { label: 'Unknown', icon: 'cloud' };
}

export function getPlanningRecommendation(code: number, temp: number, city: string): string {
  const { label } = getWeatherDetails(code);
  let advice = '';
  
  if (code >= 71 && code <= 77) advice = "Dress warmly, wear boots, and drive carefully.";
  else if (code >= 61 && code <= 67) advice = "Don't forget your umbrella and a waterproof jacket.";
  else if (code >= 95 && code <= 99) advice = "Stay indoors if possible and avoid open fields.";
  else if (code === 0 && temp > 30) advice = "Stay hydrated, seek shade, and wear sunscreen.";
  else if (code === 0 && temp <= 30) advice = "Great conditions for outdoor activities!";
  else if (temp > 30) advice = "It's quite hot. Stay hydrated and try to stay cool.";
  else if (temp < 10) advice = "Wear layers to stay warm outside.";
  else if (code >= 1 && code <= 3) advice = "Good weather for a walk or running errands.";
  else advice = "A typical day ahead. Enjoy your time!";

  const tempRounded = Math.round(temp);
  return `Currently in ${city}, it's ${tempRounded}°C with ${label.toLowerCase()}. ${advice}`;
}
