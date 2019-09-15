import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Rate, Typography } from 'antd';

import data from '../../api/data';

const { Text, Title } = Typography;

export class PlacesList extends Component {
  constructor(props) {
    super(props);

    this.setHoursData = this.setHoursData.bind(this);
  }

  setHoursData(hours) {
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
      const { hours } = datum;

      return {
        ...datum,
        ...this.setHoursData(hours)
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
