import React, { Component } from 'react';

import data from './data';

export class PlacesList extends Component {
  get places() {
    return data.map((place, index) => {
      const { name, stars, reviews, address } = place;

      return (
        <div className="place" key={index}>
          <div className="place-content">
            <div className="place-name">{name}</div>
            <div className="place-stars">{stars} Stars</div>
            <div className="place-reviews">{reviews} Reviews</div>
            <div className="place-address">{address}</div>
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

export default PlacesList;
