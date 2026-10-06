export const getReviews = (users, routes) => {
  const reviews = [];
  const comments = [
    'Great experience, very punctual.',
    'Comfortable seats and good AC.',
    'Bus was a bit late but otherwise good.',
    'Clean bus, courteous staff.',
    'Excellent trip, highly recommend!'
  ];

  for (let i = 0; i < 20; i++) {
    reviews.push({
      user: users[i % users.length]._id,
      route: routes[i % routes.length]._id,
      rating: Math.floor(Math.random() * 2) + 4, // 4 or 5
      comment: comments[i % comments.length]
    });
  }

  return reviews;
};
