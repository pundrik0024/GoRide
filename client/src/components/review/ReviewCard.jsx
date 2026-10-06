import React from 'react';
import { formatDate } from '../../utils/formatters';

export default function ReviewCard({ review }) {
  return (
    <div className="bg-white border border-[#E6E6E1] rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F7F7F5] rounded-full flex items-center justify-center font-bold text-[#315C4B]">
            {review.user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <p className="font-bold text-sm text-[#171717]">{review.user?.name || 'Anonymous'}</p>
            <p className="text-xs text-[#6B6B67]">{formatDate(review.createdAt)}</p>
          </div>
        </div>
        <div className="flex gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="material-symbols-outlined text-[16px] fill-current">
              {i < review.rating ? 'star' : 'star_border'}
            </span>
          ))}
        </div>
      </div>
      <p className="text-[#171717] text-sm leading-relaxed">{review.comment}</p>
    </div>
  );
}
