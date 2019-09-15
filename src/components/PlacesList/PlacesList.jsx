import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Rate, Typography } from 'antd';

import data from '../../api/data';

const { Text, Title } = Typography;

export class PlacesList extends Component {
  constructor(props) {
    super(props);

    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.getDistance = this.getDistance.bind(this);
    this.getHoursData = this.getHoursData.bind(this);

    this.state = {
      currentLocation: null
    }
  }
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getCurrentLocation);
  }

  getCurrentLocation(position) {
    const { latitude, longitude } = position.coords;

    this.setState({
      currentLocation: {
        latitude,
        longitude
      }
    });
  }
  
  getDistance(lat1, lng1, lat2, lng2) {
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
  
    return PythagorasEquirectangular( lat1, lng1, lat2, lng2 );
  }

  getHoursData(hours) {
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
  }

  get preprocessData() {
    return data.map(datum => {
      const { hours, latitude, longitude } = datum;

      const { currentLocation } = this.state;

      const distance = currentLocation && currentLocation.latitude && currentLocation.longitude && this.getDistance(currentLocation.latitude, currentLocation.longitude, latitude, longitude);

      return {
        ...datum,
        ...this.getHoursData(hours),
        distance
      }
    })
  }

  get sortedAndFilteredData() {
    const { filters } = this.props;

    const data = this.preprocessData;

    let sortKey = '';

    switch(filters.sortBy) {
      case 'Highest Rated':
        sortKey = 'stars';
        break;
      case 'Most Reviewed':
        sortKey = 'reviews';
        break;
      default:
        sortKey = 'stars';
    }
    
    return filters.openNow
      ? data.filter(d => d.isOpen).sort((a, b) => b[sortKey] - a[sortKey])
      : data.sort((a, b) => b[sortKey] - a[sortKey]).filter(d => d);
  }

  get places() {
    return this.sortedAndFilteredData.length
      ? this.sortedAndFilteredData.map((place, index) => {
        const {
          address,
          distance,
          isOpen,
          name,
          reviews,
          stars,
          todaysHours,
          tomorrowsHours
        } = place;

        const closedClass = !isOpen && 'place--is-closed';

        return (
          <div className={`place ${closedClass}`} key={index}>
            <div className="place-content">
              <Title className="place-name" level={4}>{name}</Title>
              <Rate disabled allowHalf defaultValue={stars} />
              <Text className="place-reviews">{reviews} Reviews</Text>
              <Text className="place-address">{address}</Text>
              <div className="place-hours">
                <Text className="place-hours">{todaysHours}</Text>
                <Text className="place-hours">{tomorrowsHours}</Text>
              </div>
              {distance && <Text className="place-distance">{distance.toFixed(2)} miles</Text>}
            </div>
          </div>
        );
      })
      : <div>Sorry, there are no locations that match the filters you've selected.</div>;
  }

  render() {
    return (
      <div className="places-list">{this.places}</div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps)(PlacesList);
