const formatTime = (minutes) => `${String(Math.floor(minutes / 60) % 24).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
const minutes = (time) => { const [hour, minute] = time.split(':').map(Number); return hour * 60 + minute; };

export const getSchedules = (routes, buses) => {
  const schedules = [];
  const departureTimes = [6 * 60, 14 * 60, 21 * 60];
  const today = new Date();
  const routeList = Array.isArray(routes) ? routes : Object.values(routes);
  const busList = Array.isArray(buses) ? buses : Object.values(buses);

  routeList.forEach((route, routeIndex) => {
    const duration = route.estimatedMinutes || 300;
    for (let day = 0; day < 31; day += 1) {
      const travelDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + day);
      departureTimes.forEach((departureMinutes, departureIndex) => {
        const bus = busList[(routeIndex + departureIndex) % busList.length];
        const baseFare = bus.busType === 'AC Sleeper' ? 999 : bus.busType === 'Non-AC Seater' ? 349 : bus.busType === 'Electric AC Seater' ? 699 : 549;
        schedules.push({
          bus: bus._id,
          route: route._id,
          travelDate,
          departureTime: formatTime(departureMinutes),
          arrivalTime: formatTime(departureMinutes + duration),
          fare: baseFare + departureIndex * 100,
          boardingPoints: route.boardingPoints.map(point => ({ ...point.toObject(), timing: formatTime(departureMinutes + minutes(point.timing) - minutes(route.boardingPoints[0].timing)) })),
          droppingPoints: route.droppingPoints.map(point => ({ ...point.toObject(), timing: formatTime(departureMinutes + duration + minutes(point.timing) - minutes(route.droppingPoints[0].timing)) })),
          availableSeats: bus.totalSeats,
          bookedSeats: [],
          status: 'scheduled'
        });
      });
    }
  });

  return schedules;
};
