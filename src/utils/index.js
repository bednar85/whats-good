import moment from 'moment';

// Convert Degress to Radians
const degreesToRadians = (deg) => deg * Math.PI / 180;

// Revisit this and replace with getting the distance using a mapping API like Google or Bing
// https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
export const getDistance = (lat1, lon1, lat2, lon2) => {
  const radLat1 = degreesToRadians(lat1);
  const radLon1 = degreesToRadians(lon1);
  const radLon2 = degreesToRadians(lon2);
  const radLat2 = degreesToRadians(lat2);

  // var R = 6371; // radius of the earth in kilometers
  const R = 3959; // radius of the earth in miles
  const x = (radLon2 - radLon1) * Math.cos((radLat1 + radLat2) / 2);
  const y = (radLat2 - radLat1);

  return Math.sqrt(x * x + y * y) * R;
};

export const getHours = (hours) => {
  const today = moment().format('ddd');
  const tomorrow = moment().add(1, 'day').format('ddd');

  const todaysHours = hours[today];
  const tomorrowsHours = hours[tomorrow];

  let isOpen;

  if (todaysHours.display === 'Closed') {
    isOpen = false;
  } else {
    const opens = todaysHours.opens.minute
      ? moment().set('hour', todaysHours.opens.hour, 'minute', todaysHours.opens.minute)
      : moment().set('hour', todaysHours.opens.hour);

    const closes = todaysHours.closes.minute
      ? moment().set('hour', todaysHours.closes.hour, 'minute', todaysHours.closes.minute)
      : moment().set('hour', todaysHours.closes.hour);

    isOpen = moment().isBetween(opens, closes, '[)');
  }

  return {
    todaysHours: `${today} - ${todaysHours.display}`,
    tomorrowsHours: `${tomorrow} - ${tomorrowsHours.display}`,
    isOpen
  };
};
