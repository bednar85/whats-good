import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Rate, Typography } from 'antd';

import { Loader } from '../Loader/Loader';

import { actions } from '../../modules/application';

const { Text, Title } = Typography;

export class PlacesList extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    loaded: PropTypes.bool.isRequired,
    places: PropTypes.array.isRequired,
    searchQuery: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.actions = props.actions;

    this.placesListClass = 'wg-places-list';
    this.placeClass = `${this.placesListClass}-place`;
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
      <div className={`${this.placesListClass}-no-results`}>
        <Title level={4}>Sorry, there are no locations that match.</Title>
      </div>
    );
  }

  render() {
    const { loaded, error, searchQuery } = this.props;

    if (!searchQuery.length) {
      return null;
    }

    return (
      <div className={this.placesListClass}>
        <Loader loaded={loaded} error={error} render={() => this.places} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.errors.places,
  filters: state.data.filters,
  loaded: state.loaded.places,
  places: state.data.places,
  searchQuery: state.data.searchQuery
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacesList);
