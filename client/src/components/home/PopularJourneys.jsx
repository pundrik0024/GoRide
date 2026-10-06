import React, { useState, useEffect } from 'react';
import { getPopularRoutes } from '../../services/busService';
import { useNavigate } from 'react-router-dom';
import Skeleton from '../ui/Skeleton';
import { localDateInputValue } from '../../utils/formatters';

const FALLBACK_ROUTES = [
  { _id: '1', source: { name: 'Jaipur' }, destination: { name: 'Delhi' }, estimatedDuration: '5h 30m', distance: 280, isPopular: true },
  { _id: '2', source: { name: 'Delhi' }, destination: { name: 'Jaipur' }, estimatedDuration: '5h 45m', distance: 280, isPopular: true },
  { _id: '3', source: { name: 'Jaipur' }, destination: { name: 'Agra' }, estimatedDuration: '4h 15m', distance: 240, isPopular: true },
  { _id: '4', source: { name: 'Delhi' }, destination: { name: 'Chandigarh' }, estimatedDuration: '4h 30m', distance: 250, isPopular: true },
];

export default function PopularJourneys() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await getPopularRoutes();
        const data = res.data || res || [];
        setRoutes(data.length > 0 ? data.slice(0, 4) : FALLBACK_ROUTES);
      } catch (err) {
        setRoutes(FALLBACK_ROUTES);
      } finally {
        setLoading(false);
      }
    };
    fetchRoutes();
  }, []);

  const handleSelect = (route) => {
    const from = route.source?.name || route.source;
    const to = route.destination?.name || route.destination;
    navigate(`/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${localDateInputValue()}&passengers=1`);
  };

  return (
    <section className="w-full py-16 px-gutter border-t border-[#E6E6E1] bg-[#F7F7F5]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#315C4B] font-semibold">SCHEDULED SERVICES</span>
            <h2 className="font-headline-lg text-headline-lg text-[#171717] mt-1 font-bold">Popular journeys</h2>
            <p className="font-body-md text-body-md text-[#6B6B67] mt-1">Explore some of our most travelled routes with guaranteed comfort.</p>
          </div>
          <button
            onClick={() => navigate('/search')}
            className="inline-flex items-center gap-1 font-label-md text-label-md text-[#315C4B] hover:underline font-semibold"
          >
            View all connections <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#E6E6E1] p-5">
                <Skeleton height="h-4" width="w-16" className="mb-4" />
                <Skeleton height="h-6" width="w-full" className="mb-2" />
                <Skeleton height="h-4" width="w-2/3" className="mb-6" />
                <Skeleton height="h-8" width="w-full" />
              </div>
            ))
          ) : (
            routes.map((route) => {
              const sourceName = route.source?.name || route.source;
              const destName = route.destination?.name || route.destination;
              return (
                <div
                  key={route._id}
                  className="group bg-white rounded-xl border border-[#E6E6E1] hover:border-[#171717] transition-colors p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[#6B6B67] font-body-sm text-body-sm mb-3">
                      <span className="inline-flex items-center gap-1 bg-[#F7F7F5] px-2.5 py-1 rounded text-[#171717] font-medium border border-[#E6E6E1]">Direct</span>
                      <span>Daily buses</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-[#171717] font-bold group-hover:text-[#315C4B] transition-colors">
                      {sourceName} → {destName}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-[#6B6B67] font-body-sm text-body-sm">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span>{route.estimatedDuration}</span>
                      <span>•</span>
                      <span>{route.distance} km</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#E6E6E1] flex items-center justify-between">
                    <div>
                      <span className="font-body-sm text-body-sm text-[#6B6B67] block">From</span>
                      <span className="font-headline-sm text-headline-sm font-bold text-[#171717]">₹499</span>
                    </div>
                    <button
                      onClick={() => handleSelect(route)}
                      className="h-9 px-3.5 rounded-lg border border-[#E6E6E1] group-hover:bg-[#315C4B] group-hover:text-white group-hover:border-[#315C4B] text-[#171717] font-label-md text-label-md font-medium transition-all inline-flex items-center justify-center"
                    >
                      Select
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
