import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import FilterSidebar from '../components/search/FilterSidebar';
import SortBar from '../components/search/SortBar';
import BusCard from '../components/search/BusCard';
import { searchSchedules } from '../services/busService';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');
  const passengers = searchParams.get('passengers') || 1;

  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [activeSort, setActiveSort] = useState('Recommended');

  useEffect(() => {
    const fetchSchedules = async () => {
      if (!from || !to) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await searchSchedules(from, to, date, passengers);
        setSchedules(res.data || res.schedules || res || []);
      } catch (err) {
        console.error('Search failed:', err);
        setError(err.response?.data?.message || 'Failed to search buses');
        setSchedules([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, [from, to, date, passengers]);

  // Apply filters
  const filteredSchedules = useMemo(() => {
    let result = [...schedules];

    if (filters.busType?.length) {
      result = result.filter(s => filters.busType.includes(s.bus?.busType));
    }
    if (filters.minPrice) {
      result = result.filter(s => s.fare >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(s => s.fare <= Number(filters.maxPrice));
    }
    if (filters.departureTime?.length) {
      result = result.filter(s => {
        const hour = parseInt(s.departureTime?.split(':')[0]);
        return filters.departureTime.some(range => {
          if (range === 'Before 6 AM') return hour < 6;
          if (range === '6 AM - 12 PM') return hour >= 6 && hour < 12;
          if (range === '12 PM - 6 PM') return hour >= 12 && hour < 18;
          if (range === 'After 6 PM') return hour >= 18;
          return true;
        });
      });
    }

    return result;
  }, [schedules, filters]);

  // Apply sorting
  const sortedSchedules = useMemo(() => {
    const result = [...filteredSchedules];
    switch (activeSort) {
      case 'Price: Low to High':
        return result.sort((a, b) => a.fare - b.fare);
      case 'Price: High to Low':
        return result.sort((a, b) => b.fare - a.fare);
      case 'Earliest Departure':
        return result.sort((a, b) => (a.departureTime || '').localeCompare(b.departureTime || ''));
      case 'Shortest Duration':
        return result.sort((a, b) => (a.route?.estimatedMinutes || 0) - (b.route?.estimatedMinutes || 0));
      default:
        return result;
    }
  }, [filteredSchedules, activeSort]);

  const handleSelect = (scheduleId) => {
    navigate(`/seats/${scheduleId}?passengers=${passengers}`);
  };

  if (!from || !to) {
    return <div className="min-h-[55vh] flex items-center justify-center px-gutter"><EmptyState icon="search" title="Search available buses" description="Choose your starting city, destination, and travel date to see demo schedules." actionLabel="Go to search" onAction={() => navigate('/')} /></div>;
  }

  return (
    <div className="bg-[#F7F7F5] min-h-screen pb-20">
      {/* Search Header */}
      <div className="bg-white border-b border-[#E6E6E1] py-6">
        <div className="max-w-[1200px] mx-auto px-gutter flex items-center justify-between">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-[#171717] flex items-center gap-3">
              {from} <span className="text-[#6B6B67]">→</span> {to}
            </h1>
            <p className="font-body-md text-body-md text-[#6B6B67] mt-1">
              {date && new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • {passengers} Passenger{passengers > 1 ? 's' : ''} • {sortedSchedules.length} bus{sortedSchedules.length !== 1 ? 'es' : ''} found
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-[#E6E6E1] rounded-lg font-label-md text-label-md font-medium hover:bg-[#F7F7F5] hover:border-[#171717] transition-colors"
          >
            Modify Search
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-gutter py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 hidden lg:block">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>

        <div className="lg:col-span-3">
          <SortBar activeSort={activeSort} onSortChange={setActiveSort} resultsCount={sortedSchedules.length} />

          <div className="space-y-4 mt-4">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="bg-white border border-[#E6E6E1] rounded-xl p-6 space-y-4">
                  <div className="flex justify-between">
                    <Skeleton height="h-5" width="w-1/3" />
                    <Skeleton height="h-5" width="w-20" />
                  </div>
                  <Skeleton height="h-4" width="w-full" />
                  <div className="flex justify-between items-end">
                    <Skeleton height="h-8" width="w-24" />
                    <Skeleton height="h-10" width="w-28" />
                  </div>
                </div>
              ))
            ) : error ? (
              <EmptyState
                icon="error"
                title="Search failed"
                description={error}
                actionLabel="Try Again"
                onAction={() => window.location.reload()}
              />
            ) : sortedSchedules.length > 0 ? (
              sortedSchedules.map(schedule => (
                <BusCard key={schedule._id} schedule={schedule} onSelect={handleSelect} />
              ))
            ) : (
              <EmptyState
                icon="directions_bus"
                title="No buses available for this date."
                description="We couldn't find a bus with enough available seats for this route and date. Try another travel date."
                actionLabel="Modify Search"
                onAction={() => navigate('/')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
