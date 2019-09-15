import moment from 'moment';

export const getDistance = (lat1, lng1, lat2, lng2) => {
  // Convert Degress to Radians
  function Deg2Rad(deg) {
    return deg * Math.PI / 180;
  }

  function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
    lat1 = Deg2Rad(lat1);
    lat2 = Deg2Rad(lat2);
    lon1 = Deg2Rad(lon1);
    lon2 = Deg2Rad(lon2);
    // var R = 6371; // km
    var R = 3959; // miles
    var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    var y = (lat2 - lat1);
    var d = Math.sqrt(x * x + y * y) * R;
    return d;
  }

  return PythagorasEquirectangular(lat1, lng1, lat2, lng2);
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
