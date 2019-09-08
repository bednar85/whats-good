import React, { Component } from 'react';

import data from './data';

export class Places extends Component {
  get places() {
    return data.map((place, index) => {
      const { name, stars, reviews, address } = place;

      return (
        <div className="places-place" key={index}>
          <div>{name}</div>
          <div>{stars}</div>
          <div>{reviews}</div>
          <div>{address}</div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="places">{this.places}</div>
    );
  }
}

export default Places;
