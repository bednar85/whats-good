import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Rate, Typography } from 'antd';

import data from '../../api/data';

const { Text, Title } = Typography;

export class PlacesList extends Component {
  constructor(props) {
    super(props);

    this.getHoursData = this.getHoursData.bind(this);
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

  get sortedData() {
    const { filters } = this.props;

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
    
    return data.sort((a, b) => b[sortKey] - a[sortKey]);
  }

  get places() {
    return this.sortedData.map((place, index) => {
      const { name, stars, reviews, address, hours } = place;
      const { todaysHours, tomorrowsHours, isOpen } = this.getHoursData(hours);

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
          </div>
        </div>
      );
    });
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
