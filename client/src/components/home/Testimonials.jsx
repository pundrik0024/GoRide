import React, { useEffect, useState } from 'react';
import { getReviews } from '../../services/reviewService';

const fallbackReviews = [
    {
      name: "Arjun Mehta",
      location: "Travelled Delhi to Jaipur",
      quote: "The cleanest bus I've ever been on. The WiFi was consistently fast throughout the journey, and arriving right on schedule was a welcome change.",
      stars: 5
    },
    {
      name: "Priya Sharma",
      location: "Travelled Mumbai to Pune",
      quote: "Booking via the app took literally 30 seconds. The seat was incredibly comfortable, making the 3-hour commute feel like a breeze.",
      stars: 5
    },
    {
      name: "Rohan Patel",
      location: "Travelled Bangalore to Mysore",
      quote: "Finally, a reliable transit option. The live tracking link I shared with my family gave everyone peace of mind. Highly recommended.",
      stars: 4
    }
];

export default function Testimonials() {
  const [reviews, setReviews] = useState(fallbackReviews);
  useEffect(() => {
    getReviews().then(result => {
      if (result.data?.length) setReviews(result.data.slice(0, 3));
    }).catch(() => {});
  }, []);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-[#171717] mb-12 text-center">Traveller feedback</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, idx) => (
            <div key={review._id || idx} className="bg-white border border-[#E6E6E1] p-8 rounded-2xl">
            <div className="flex gap-1 mb-6 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[20px] fill-current">
                  {i < review.stars ? 'star' : 'star_border'}
                </span>
              ))}
            </div>
            <p className="text-[#171717] font-medium leading-relaxed mb-8">"{review.comment || review.quote}"</p>
            <div>
              <p className="font-bold text-sm text-[#171717]">{review.user?.name || review.name}</p>
              <p className="text-xs text-[#6B6B67]">{review.route ? `Travelled ${review.route.source?.name} to ${review.route.destination?.name}` : review.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
