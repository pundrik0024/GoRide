import React from 'react';
import Hero from '../components/home/Hero';
import SearchForm from '../components/home/SearchForm';
import PopularJourneys from '../components/home/PopularJourneys';
import ValueProps from '../components/home/ValueProps';
import CabinExperience from '../components/home/CabinExperience';
import HowItWorks from '../components/home/HowItWorks';
import TrackingPreview from '../components/home/TrackingPreview';
import DigitalPass from '../components/home/DigitalPass';
import Testimonials from '../components/home/Testimonials';
import ClosingBanner from '../components/home/ClosingBanner';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <SearchForm />
      <PopularJourneys />
      <ValueProps />
      <CabinExperience />
      <HowItWorks />
      <TrackingPreview />
      <DigitalPass />
      <Testimonials />
      <ClosingBanner />
    </div>
  );
}
