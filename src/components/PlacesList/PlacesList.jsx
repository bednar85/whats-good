import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Rate, Typography } from 'antd';

import data from '../../api/data';
import { getDistance, getHours } from '../../utils';

const { Text, Title } = Typography;

export class PlacesList extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.placesListClass = 'wg-places-list';
    this.placeClass = 'wg-place';

    this.getCurrentLocation = this.getCurrentLocation.bind(this);

    this.state = {
      currentLocation: null
    };
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

      const distance = currentLocation
        && currentLocation.latitude
        && currentLocation.longitude
        && getDistance(currentLocation.latitude, currentLocation.longitude, latitude, longitude);

      return {
        ...datum,
        ...getHours(hours),
        distance
      };
    });
  }

  get sortedAndFilteredData() {
    const { filters } = this.props;
    const { distance, isOpenNow, sortBy } = filters;

    const initialData = this.preprocessData;

    let sortKey = '';

    switch (sortBy) {
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
      ? initialData.filter(d => d.distance <= distance && d.isOpen === true)
      : initialData.filter(d => d.distance <= distance);

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

        const closedClass = !isOpen && `${this.placeClass}--is-closed`;

        return (
          <div className={`${this.placeClass} ${closedClass}`} key={index}>
            <div className={`${this.placeClass}-content`}>
              <div className={`${this.placeClass}-main-content`}>
                <Title className={`${this.placeClass}-name`} level={4}>{name}</Title>
                <Rate
                  className={`${this.placeClass}-stars`}
                  disabled
                  allowHalf
                  defaultValue={stars}
                />
                <Text className={`${this.placeClass}-reviews`}>
                  {reviews}
                  Reviews
                </Text>
                <div className={`${this.placeClass}-hours-of-operation`}>
                  <Text className={`${this.placeClass}-hours ${this.placeClass}-hours--today`}>{todaysHours}</Text>
                  <Text className={`${this.placeClass}-hours`}>{tomorrowsHours}</Text>
                </div>
              </div>
              <div className={`${this.placeClass}-secondary-content`}>
                <div className={`${this.placeClass}-location-details`}>
                  <Text className={`${this.placeClass}-address`}>{address}</Text>
                  <Text className={`${this.placeClass}-distance`}>
                    {
                      distance
                        ? `${distance.toFixed(2)} miles away from you`
                        : 'calculating distance...'
                    }
                  </Text>
                </div>
              </div>
            </div>
          </div>
        );
      })
      : <div>Sorry, there are no locations that match the filters you&apos;ve selected.</div>;
  }

  render() {
    return (
      <div className={this.placesListClass}>{this.places}</div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps)(PlacesList);
