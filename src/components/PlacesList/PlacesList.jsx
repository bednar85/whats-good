import React, { Component } from 'react';
import { connect } from 'react-redux';

import data from '../../api/data';

export class PlacesList extends Component {
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
      const { name, stars, reviews, address } = place;

      return (
        <div className="place" key={index}>
          <div className="place-content">
            <h3 className="place-name">{name}</h3>
            <p className="place-stars">{stars} Stars</p>
            <p className="place-reviews">{reviews} Reviews</p>
            <p className="place-address">{address}</p>
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
