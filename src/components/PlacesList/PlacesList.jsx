import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Rate, Typography } from 'antd';

import { actions } from '../../modules/application';

const { Text, Title } = Typography;

export class PlacesList extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    places: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.actions = props.actions;

    this.placesListClass = 'wg-places-list';
    this.placeClass = 'wg-place';
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position =>
      this.actions.loadData('places', position.coords)
    );
  }

  get sortedAndFilteredData() {
    const { filters, places } = this.props;
    const { maxDistance, isOpenNow, sortBy } = filters;

    let sortKey = '';

    switch (sortBy) {
      case 'Closest To You':
        sortKey = 'distance';
        break;
      case 'Highest Rated':
        sortKey = 'rating';
        break;
      case 'Most Reviewed':
        sortKey = 'reviews';
        break;
      default:
        sortKey = 'rating';
    }

    console.log(places);

    const filteredData = isOpenNow
      ? places.filter(d => d.distance <= maxDistance && !d.is_closed)
      : places.filter(d => d.distance <= maxDistance);

    // sort ascending (0-100) if the sortKey is distance
    return sortKey === 'distance'
      ? filteredData.sort((a, b) => a[sortKey] - b[sortKey])
      : filteredData.sort((a, b) => b[sortKey] - a[sortKey]);
  }

  get places() {
    return this.sortedAndFilteredData.length ? (
      this.sortedAndFilteredData.map(place => {
        const { distance, id, location, name, rating, review_count } = place;

        // is_closed is referring to if the location is permanetly closed not it's hours of operation
        // if I want to do that I'll need to make other adjustments
        // const closedClass = is_closed && `${this.placeClass}--is-closed`;

        return (
          <div className={this.placeClass} key={id}>
            <div className={`${this.placeClass}-content`}>
              <div className={`${this.placeClass}-main-content`}>
                <Title className={`${this.placeClass}-name`} level={4}>
                  {name}
                </Title>
                <Rate
                  className={`${this.placeClass}-stars`}
                  disabled
                  allowHalf
                  defaultValue={rating}
                />
                <Text className={`${this.placeClass}-reviews`}>
                  {review_count} Reviews
                </Text>
              </div>
              <div className={`${this.placeClass}-secondary-content`}>
                <div className={`${this.placeClass}-location-details`}>
                  <Text className={`${this.placeClass}-address`}>
                    {location.address1}
                  </Text>
                  <Text className={`${this.placeClass}-distance`}>
                    {distance
                      ? `${distance.toFixed(2)} miles away from you`
                      : 'calculating distance...'}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div>
        Sorry, there are no locations that match the filters you&apos;ve
        selected.
      </div>
    );
  }

  render() {
    return <div className={this.placesListClass}>{this.places}</div>;
  }
}

const mapStateToProps = state => ({
  filters: state.data.filters,
  places: state.data.places
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacesList);
