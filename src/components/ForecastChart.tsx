import React from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { DailyForecast, ForecastChartData } from '../types';
import { format, parseISO } from 'date-fns';

interface ForecastChartProps {
  daily: DailyForecast;
}

export function ForecastChart({ daily }: ForecastChartProps) {
  const data: ForecastChartData[] = daily.time.map((timeStr, index) => ({
    date: format(parseISO(timeStr), 'EEE'),
    fullDate: format(parseISO(timeStr), 'MMM d, yyyy'),
    maxTemp: Math.round(daily.temperature_2m_max[index]),
    minTemp: Math.round(daily.temperature_2m_min[index]),
    weatherCode: daily.weather_code[index],
  }));

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 h-full flex flex-col min-w-0">
      <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-blue-400 rounded-full inline-block shrink-0"></span>
        <span className="truncate">7-Day Forecast</span>
      </h3>
      <div className="h-[250px] md:h-[300px] w-full flex-grow min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMaxTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorMinTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 13, fontWeight: 600 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 13, fontWeight: 600 }}
              tickFormatter={(value) => `${value}°`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white/90 backdrop-blur-md border border-gray-100 text-slate-800 text-sm rounded-2xl px-5 py-4 shadow-xl">
                      <p className="font-bold text-slate-900 mb-2 border-b border-gray-100 pb-2">
                        {payload[0].payload.fullDate}
                      </p>
                      <div className="flex flex-col gap-1">
                        <p className="font-bold flex items-center justify-between gap-4">
                          <span className="text-slate-500 font-semibold">High</span>
                          <span className="text-red-500">{payload[0].value}°C</span>
                        </p>
                        <p className="font-bold flex items-center justify-between gap-4">
                          <span className="text-slate-500 font-semibold">Low</span>
                          <span className="text-blue-500">{payload[1].value}°C</span>
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="maxTemp"
              stroke="#ef4444"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorMaxTemp)"
              activeDot={{ r: 6, fill: '#ef4444', stroke: '#fff', strokeWidth: 3 }}
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="minTemp"
              stroke="#3b82f6"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorMinTemp)"
              activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 3 }}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
