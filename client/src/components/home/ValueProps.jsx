import React from 'react';

export default function ValueProps() {
  const props = [
    {
      num: '01',
      title: 'Easy booking',
      desc: 'Reserve your seat in seconds with our streamlined checkout process and multiple secure payment options.'
    },
    {
      num: '02',
      title: 'Comfortable buses',
      desc: 'Travel in our modern fleet equipped with ergonomic seating, climate control, and onboard amenities.'
    },
    {
      num: '03',
      title: 'Live tracking',
      desc: 'Share your journey status with loved ones and track your bus location in real-time.'
    },
    {
      num: '04',
      title: 'Simple cancellations',
      desc: 'Plans change. Cancel your booking effortlessly through the app with transparent refund policies.'
    }
  ];

  return (
    <section className="bg-white border-y border-[#E6E6E1] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#171717] mb-12 md:text-center">Travel, without the hassle.</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {props.map((item, idx) => (
            <div key={idx} className="relative">
              <div className="text-sm font-bold text-[#315C4B] mb-4">{item.num}</div>
              <h3 className="text-xl font-bold text-[#171717] mb-3">{item.title}</h3>
              <p className="text-[#6B6B67] leading-relaxed text-sm">
                {item.desc}
              </p>
              {idx !== props.length - 1 && (
                <div className="hidden lg:block absolute top-2 right-0 w-[1px] h-full bg-[#E6E6E1] -mr-6"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
