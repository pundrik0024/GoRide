export const generateSeatLayout = (totalSeats) => {
  const seats = [];
  const rows = Math.ceil(totalSeats / 4);
  const columns = ['A', 'B', 'C', 'D'];

  let count = 0;
  for (let r = 1; r <= rows; r++) {
    for (let c of columns) {
      if (count >= totalSeats) break;
      const position = (c === 'A' || c === 'D') ? 'window' : 'aisle';
      seats.push({
        seatNumber: `${r}${c}`,
        row: r,
        column: c,
        position
      });
      count++;
    }
  }

  return seats;
};
