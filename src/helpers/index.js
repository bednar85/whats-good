import moment from 'moment';

// Convert Degress to Radians
const degreesToRadians = (deg) => {
  return deg * Math.PI / 180;
}

export const getDistance = (lat1, lon1, lat2, lon2) => {
  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);
  lon1 = degreesToRadians(lon1);
  lon2 = degreesToRadians(lon2);
  // var R = 6371; // radius of the earth in kilometers
  var R = 3959; // radius of the earth in miles
  var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  var y = (lat2 - lat1);

  return Math.sqrt(x * x + y * y) * R;
}

export const getHours = (hours) => {
  const today = moment().format('ddd');
  const tomorrow = moment().add(1, 'day').format('ddd');

  const todaysHours = hours[today];
  const tomorrowsHours = hours[tomorrow];

  let isOpen = undefined;

  if (todaysHours.display === 'Closed') {
    isOpen = false;
  } else {
    const opens = todaysHours.opens.minute
      ? moment().set('hour', todaysHours.opens.hour, 'minute', todaysHours.opens.minute)
      : moment().set('hour', todaysHours.opens.hour)
    
    const closes = todaysHours.closes.minute
      ? moment().set('hour', todaysHours.closes.hour, 'minute', todaysHours.closes.minute)
      : moment().set('hour', todaysHours.closes.hour)
    
    isOpen = moment().isBetween(opens, closes, '[)');
  }

  return {
    todaysHours: `${today} - ${todaysHours.display}`,
    tomorrowsHours: `${tomorrow} - ${tomorrowsHours.display}`,
    isOpen
  };
};
