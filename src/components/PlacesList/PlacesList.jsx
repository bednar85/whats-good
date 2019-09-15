import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Rate, Typography } from 'antd';

import data from '../../api/data';
import { getDistance, getHours } from '../../helpers/index';

const { Text, Title } = Typography;

export class PlacesList extends Component {
  constructor(props) {
    super(props);

    this.getCurrentLocation = this.getCurrentLocation.bind(this);

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

  get preprocessData() {
    return data.map(datum => {
      const { hours, latitude, longitude } = datum;

      const { currentLocation } = this.state;

      const distance = 
        currentLocation && currentLocation.latitude && currentLocation.longitude
        && getDistance(currentLocation.latitude, currentLocation.longitude, latitude, longitude);

      return {
        ...datum,
        ...getHours(hours),
        distance
      }
    })
  }

  get sortedAndFilteredData() {
    const { filters } = this.props;
    const { distance, isOpenNow, sortBy }  = filters;

    const data = this.preprocessData;

    let sortKey = '';

    switch(sortBy) {
      case 'Closest To You':
        sortKey = 'distance';
        break;
      case 'Highest Rated':
        sortKey = 'stars';
        break;
      case 'Most Reviewed':
        sortKey = 'reviews';
        break;
      default:
        sortKey = 'stars';
    }

    const filteredData = isOpenNow
      ? data.filter(d => d.distance <= distance && d.isOpen)
      : data.filter(d => d.distance <= distance);
    
    // sort ascending (0-100) if the sortKey is distance
    return sortKey === 'distance'
      ? filteredData.sort((a, b) => a[sortKey] - b[sortKey])
      : filteredData.sort((a, b) => b[sortKey] - a[sortKey]);
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
