import React, { Component } from 'react';

import data from './data';

export class PlacesList extends Component {
  get places() {
    return data.map((place, index) => {
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

export default PlacesList;
