import React from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';
import { getPlanningRecommendation } from '../utils';
import { motion } from 'motion/react';

interface PlanningRecommendationProps {
  weatherCode: number;
  temperature: number;
  city: string;
}

export function PlanningRecommendation({
  weatherCode,
  temperature,
  city,
}: PlanningRecommendationProps) {
  const recommendation = getPlanningRecommendation(weatherCode, temperature, city);

  return (
    <div className="bg-gradient-to-br from-indigo-50/80 to-blue-50/80 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full relative overflow-hidden flex flex-col justify-center w-full min-w-0">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/40 rounded-bl-[100px] -z-10 pointer-events-none" />
      
      <div className="flex flex-col items-start gap-5 relative z-10 w-full min-w-0">
        <motion.div 
          initial={{ rotate: -20, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
          className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/80 shrink-0"
        >
          <Lightbulb className="w-7 h-7 text-amber-500 drop-shadow-sm" />
        </motion.div>
        <div className="flex-1 min-w-0 w-full">
          <h3 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2 flex-wrap">
            <span className="truncate">Recommendation</span>
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          </h3>
          <p className="text-slate-600 font-semibold leading-relaxed text-base md:text-lg break-words w-full">
            {recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}
