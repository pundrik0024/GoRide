const stops = {
  Jaipur: [['Sindhi Camp Bus Stand', '05:45'], ['Narayan Singh Circle', '06:05'], ['Durgapura', '06:25'], ['Jaipur Railway Station', '06:40']],
  Delhi: [['Kashmere Gate ISBT', '11:30'], ['Akshardham', '11:55'], ['Anand Vihar ISBT', '12:15'], ['Dhaula Kuan', '12:35']],
  Gurugram: [['IFFCO Chowk', '07:00'], ['Rajiv Chowk', '07:15']], Noida: [['Botanical Garden Metro', '07:00'], ['Noida Sector 37', '07:15']],
  Agra: [['ISBT Agra', '10:30'], ['Bhagwan Talkies', '10:50'], ['Agra Cantt', '11:10']], Lucknow: [['Alambagh Bus Terminal', '14:00'], ['Charbagh', '14:20']],
  Kanpur: [['Jhakarkati Bus Stand', '13:00'], ['Rawatpur', '13:20']], Varanasi: [['Lahartara Bus Stand', '16:00'], ['Varanasi Cantt', '16:20']],
  Chandigarh: [['ISBT Sector 17', '10:15'], ['ISBT Sector 43', '10:35']], Amritsar: [['Amritsar Bus Stand', '12:00'], ['Golden Temple Road', '12:20']],
  Ludhiana: [['Ludhiana Bus Stand', '11:00'], ['Samrala Chowk', '11:20']], Jodhpur: [['Paota Bus Stand', '12:00'], ['Jodhpur Railway Station', '12:20']],
  Udaipur: [['Udaipur City Bus Stand', '13:00'], ['Pratap Nagar', '13:20']], Ajmer: [['Ajmer Bus Stand', '08:00'], ['Ghooghra', '08:20']],
  Kota: [['Nayapura Bus Stand', '09:00'], ['Kota Junction', '09:20']], Bikaner: [['Bikaner Bus Stand', '13:00'], ['Lalgarh Junction', '13:20']],
  Ahmedabad: [['Geeta Mandir Bus Stand', '08:00'], ['Paldi', '08:20'], ['Iskcon Cross Roads', '08:40']], Surat: [['Surat Central Bus Station', '12:00'], ['Kamrej', '12:20']],
  Vadodara: [['Central Bus Station', '10:00'], ['Amit Nagar Circle', '10:20']], Mumbai: [['Borivali', '06:00'], ['Dadar', '06:30'], ['Vashi', '07:00']],
  Pune: [['Swargate', '09:00'], ['Shivajinagar', '09:20'], ['Hinjewadi', '09:45']], Nashik: [['CBS Nashik', '11:00'], ['Dwarka Circle', '11:20']],
  Indore: [['Sarwate Bus Stand', '07:00'], ['Vijay Nagar', '07:20']], Bhopal: [['ISBT Bhopal', '10:00'], ['Habibganj Station', '10:20']],
  Gwalior: [['Gwalior Bus Stand', '12:00'], ['Thatipur', '12:20']], Bengaluru: [['Majestic Bus Station', '20:00'], ['Electronic City', '20:30'], ['Hebbal', '20:50']],
  Chennai: [['Koyambedu Bus Terminus', '06:00'], ['Tambaram', '06:30']], Hyderabad: [['MGBS', '18:00'], ['Miyapur', '18:30'], ['LB Nagar', '18:50']],
  Kolkata: [['Esplanade Bus Terminus', '17:00'], ['Babughat', '17:20']], Patna: [['Gandhi Maidan', '08:00'], ['ISBT Patliputra', '08:20']],
  Dehradun: [['ISBT Dehradun', '09:00'], ['Prince Chowk', '09:20']], Haridwar: [['Haridwar Bus Stand', '07:00'], ['Jwalapur', '07:20']],
  Shimla: [['ISBT Tutikandi', '10:00'], ['Old Bus Stand', '10:20']], Manali: [['Manali Bus Stand', '16:00'], ['Mall Road', '16:15']],
  Goa: [['Panjim Kadamba Bus Stand', '07:00'], ['Mapusa Bus Stand', '07:30']]
};

const routeRows = [
  ['Jaipur', 'Delhi', 280, 330, true], ['Delhi', 'Jaipur', 280, 345, true],
  ['Jaipur', 'Agra', 240, 255, true], ['Agra', 'Jaipur', 240, 270, true],
  ['Jaipur', 'Chandigarh', 500, 540, true], ['Delhi', 'Chandigarh', 250, 270, true],
  ['Delhi', 'Agra', 230, 240, true], ['Jaipur', 'Udaipur', 395, 390, true],
  ['Delhi', 'Lucknow', 550, 495, true], ['Lucknow', 'Delhi', 550, 495, false],
  ['Mumbai', 'Pune', 150, 180, true], ['Pune', 'Mumbai', 150, 195, true],
  ['Ahmedabad', 'Surat', 265, 270, true], ['Bengaluru', 'Chennai', 350, 360, true],
  ['Hyderabad', 'Bengaluru', 570, 510, true], ['Indore', 'Mumbai', 590, 540, true],
  ['Jodhpur', 'Jaipur', 340, 330, false], ['Chandigarh', 'Delhi', 250, 285, false],
  ['Chennai', 'Bengaluru', 350, 375, false], ['Mumbai', 'Ahmedabad', 530, 480, false],
  ['Ahmedabad', 'Mumbai', 530, 495, false], ['Jaipur', 'Kota', 250, 240, false],
  ['Delhi', 'Dehradun', 250, 330, false], ['Delhi', 'Shimla', 350, 420, false],
  ['Pune', 'Nashik', 210, 240, false], ['Kolkata', 'Patna', 600, 540, false],
  ['Jaipur', 'Ajmer', 135, 150, false], ['Surat', 'Ahmedabad', 265, 270, false],
  ['Jaipur', 'Jodhpur', 340, 330, false], ['Hyderabad', 'Chennai', 630, 570, false],
  ['Delhi', 'Gurugram', 32, 75, false], ['Noida', 'Agra', 190, 210, false],
  ['Amritsar', 'Chandigarh', 230, 240, false], ['Ludhiana', 'Delhi', 310, 330, false],
  ['Bhopal', 'Indore', 195, 210, false], ['Gwalior', 'Agra', 120, 150, false],
  ['Delhi', 'Haridwar', 220, 300, false], ['Goa', 'Mumbai', 590, 660, false]
];

const formatDuration = (minutes) => `${Math.floor(minutes / 60)}h${minutes % 60 ? ` ${minutes % 60}m` : ''}`;
const timeMinutes = (time) => { const [hour, minute] = time.split(':').map(Number); return hour * 60 + minute; };
const toTime = (minutes) => `${String(Math.floor(minutes / 60) % 24).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;

export const getRoutes = (cityMap) => routeRows.map(([sourceName, destinationName, distance, estimatedMinutes, isPopular]) => {
  const source = cityMap[sourceName];
  const destination = cityMap[destinationName];
  const sourceStops = stops[sourceName] || [[`${sourceName} Central Bus Stand`, '06:00'], [`${sourceName} Railway Station`, '06:20']];
  const destinationStops = stops[destinationName] || [[`${destinationName} Central Bus Stand`, toTime(6 * 60 + estimatedMinutes)], [`${destinationName} Railway Station`, toTime(6 * 60 + estimatedMinutes + 20)]];
  return {
    source: source?._id,
    destination: destination?._id,
    distance,
    estimatedDuration: formatDuration(estimatedMinutes),
    estimatedMinutes,
    boardingPoints: sourceStops.map(([name, time]) => ({ name, address: name, timing: time })),
    droppingPoints: destinationStops.map(([name, time]) => ({ name, address: name, timing: time })),
    isPopular
  };
});
