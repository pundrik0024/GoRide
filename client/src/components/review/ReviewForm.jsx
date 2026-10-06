import React, { useState } from 'react';

export default function ReviewForm({ onSubmit, bookingId, routeId }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return;
    setLoading(true);
    await onSubmit({ bookingId, routeId, rating, comment });
    setLoading(false);
    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#F7F7F5] border border-[#E6E6E1] rounded-xl p-6">
      <h4 className="font-bold text-[#171717] mb-4">Write a Review</h4>
      
      <div className="mb-4">
        <label className="block text-xs font-medium text-[#6B6B67] mb-2">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="text-yellow-500 focus:outline-none"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            >
              <span className="material-symbols-outlined text-[28px] fill-current">
                {star <= (hoverRating || rating) ? 'star' : 'star_border'}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium text-[#6B6B67] mb-1">Comment</label>
        <textarea
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-3 border border-[#E6E6E1] rounded-lg focus:outline-none focus:border-[#315C4B] bg-white resize-none"
          placeholder="Share your travel experience..."
          required
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading || rating === 0}
        className="px-6 py-2 bg-[#315C4B] text-white font-medium rounded-lg hover:bg-[#234F3E] transition-colors disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
