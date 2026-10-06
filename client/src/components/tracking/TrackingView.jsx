import React, { useState, useEffect } from 'react';
import RouteProgress from './RouteProgress';
import { formatTime } from '../../utils/formatters';

export default function TrackingView({ booking }) {
  const [progress, setProgress] = useState(0);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);

  const schedule = booking?.schedule || {};
  const route = schedule.route || {};
  const source = route.source?.name || route.source || 'Origin';
  const destination = route.destination?.name || route.destination || 'Destination';
  const stops = [
    { name: booking?.boardingPoint?.name || source, time: booking?.boardingPoint?.timing || formatTime(schedule.departureTime) },
    { name: `${source} route checkpoint`, time: 'En route' },
    { name: `${destination} approach`, time: 'En route' },
    { name: booking?.droppingPoint?.name || destination, time: booking?.droppingPoint?.timing || formatTime(schedule.arrivalTime) }
  ];

  useEffect(() => {
    // Simulate movement for demo
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        const newProgress = p + 1;
        setCurrentStopIndex(Math.floor((newProgress / 100) * (stops.length - 1)));
        return newProgress;
      });
    }, 1000); // Fast forward for demo

    return () => clearInterval(interval);
  }, [stops.length]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Tracking Map / Stats */}
      <div className="flex-1 space-y-6">
        <div className="bg-[#171717] rounded-2xl p-8 text-white h-[400px] flex flex-col relative overflow-hidden border border-[#313030]">
          <div className="flex justify-between items-center mb-6 z-10 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#313030] rounded-full text-xs font-bold tracking-widest uppercase">
              <div className="w-2 h-2 rounded-full bg-[#315C4B] animate-pulse"></div>
              Live Telemetry
            </div>
            <div className="text-sm font-mono text-[#A3A3A3]">
              <span className="material-symbols-outlined text-[14px] mr-1 align-middle">speed</span>
              {progress < 100 ? '68 km/h' : '0 km/h'}
            </div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center pt-16">
            <svg viewBox="0 0 400 300" className="w-full h-full stroke-[#404040] fill-none">
              <path d="M 50 200 C 150 200, 200 100, 350 100" strokeWidth="4" strokeLinecap="round"/>
              <path d="M 50 200 C 150 200, 200 100, 350 100" stroke="#315C4B" strokeWidth="4" strokeLinecap="round" strokeDasharray="300" strokeDashoffset={300 - (progress / 100) * 300} className="transition-all duration-1000"/>
              
              {/* Waypoints */}
              <circle cx="50" cy="200" r="6" fill="#171717" stroke="#404040" strokeWidth="3"/>
              <text x="50" y="220" fill="#A3A3A3" fontSize="12" textAnchor="middle" stroke="none">{stops[0].name}</text>
              
              <circle cx="350" cy="100" r="6" fill="#171717" stroke="#404040" strokeWidth="3"/>
              <text x="350" y="85" fill="#A3A3A3" fontSize="12" textAnchor="middle" stroke="none">{stops[3].name}</text>
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-[#E6E6E1] rounded-xl p-4">
            <p className="text-xs text-[#6B6B67] mb-1">Status</p>
            <p className="font-bold text-green-600">{progress >= 100 ? 'Arrived' : 'On Time'}</p>
          </div>
          <div className="bg-white border border-[#E6E6E1] rounded-xl p-4">
            <p className="text-xs text-[#6B6B67] mb-1">ETA</p>
            <p className="font-bold text-[#171717]">{stops[3].time}</p>
          </div>
          <div className="bg-white border border-[#E6E6E1] rounded-xl p-4">
            <p className="text-xs text-[#6B6B67] mb-1">Current location</p>
            <p className="font-bold text-[#171717] truncate">{currentStopIndex === 0 ? source : currentStopIndex >= 3 ? destination : `${source}–${destination} corridor`}</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="w-full lg:w-80 bg-white border border-[#E6E6E1] rounded-2xl p-6">
        <h3 className="font-bold text-[#171717] mb-6">Journey Progress</h3>
        <RouteProgress stops={stops} currentStopIndex={currentStopIndex} progress={progress} />
      </div>
    </div>
  );
}
