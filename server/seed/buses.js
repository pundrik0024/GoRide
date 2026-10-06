export const buses = [
  // GoRide Electric
  ...Array.from({length: 8}).map((_, i) => ({
    busNumber: `GR-EV-00${i+1}`, operatorName: 'GoRide Electric', busType: 'Electric AC Seater',
    registrationNumber: `RJ14EV20${20+i}`, totalSeats: 40,
    amenities: ['WiFi', 'Charging Port', 'AC', 'Water Bottle', 'GPS Tracking', 'Reading Light']
  })),
  // UrbanMiles
  ...Array.from({length: 5}).map((_, i) => ({
    busNumber: `UM-AC-00${i+1}`, operatorName: 'UrbanMiles', busType: i%2===0 ? 'AC Sleeper' : 'AC Seater',
    registrationNumber: `DL01UM123${i}`, totalSeats: 36,
    amenities: ['AC', 'Charging Port', 'Blanket', 'Water Bottle']
  })),
  // GreenRoute
  ...Array.from({length: 5}).map((_, i) => ({
    busNumber: `GR-AC-00${i+1}`, operatorName: 'GreenRoute', busType: 'AC Seater',
    registrationNumber: `MH01GR456${i}`, totalSeats: 40,
    amenities: ['WiFi', 'AC', 'Charging Port', 'GPS Tracking']
  })),
  // CityLink
  ...Array.from({length: 4}).map((_, i) => ({
    busNumber: `CL-NA-00${i+1}`, operatorName: 'CityLink', busType: i===0 ? 'AC Seater' : 'Non-AC Seater',
    registrationNumber: `UP32CL789${i}`, totalSeats: 44,
    amenities: ['Water Bottle', ...(i===0 ? ['AC'] : [])]
  })),
  // RoadNest
  ...Array.from({length: 3}).map((_, i) => ({
    busNumber: `RN-SL-00${i+1}`, operatorName: 'RoadNest', busType: 'AC Sleeper',
    registrationNumber: `KA01RN012${i}`, totalSeats: 30,
    amenities: ['AC', 'Blanket', 'Pillow', 'Charging Port', 'Water Bottle', 'Reading Light']
  }))
].map((bus, index) => ({
  ...bus,
  amenities: [...new Set([...bus.amenities.filter(amenity => amenity !== 'GPS Tracking'), 'USB Charging', 'CCTV', ...(bus.busType.includes('AC') ? ['AC'] : []), 'Reading Light'])],
  rating: Number((4.3 + (index % 5) * 0.1).toFixed(1)),
  seatLayout: { columns: 4, rows: Math.ceil(bus.totalSeats / 4), layout: '2+2' }
}));
