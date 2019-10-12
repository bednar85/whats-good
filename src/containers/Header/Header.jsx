import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Button,
  Col,
  Drawer,
  Icon,
  Input,
  Radio,
  Row,
  Switch,
  Typography
} from 'antd';

import Loader from 'components/Loader/Loader';

import applicationSelectors from 'modules/application/selectors';
import { actions } from 'modules/application';

const { Search } = Input;
const { Title } = Typography;

export class Header extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    location: PropTypes.object,
    locationLoaded: PropTypes.bool.isRequired,
    searchTerm: PropTypes.string.isRequired
  };

  static defaultProps = {
    location: {}
  };

  constructor(props) {
    super(props);

    this.actions = props.actions;

    this.hideFilterDrawer = this.hideFilterDrawer.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.showFilterDrawer = this.showFilterDrawer.bind(this);

    this.baseClass = 'wg-header';

    this.radioGroupStyles = {
      verticalAlign: 'top'
    };

    this.radioStyles = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    };

    this.state = {
      visible: false
    };
  }

  onFilterChange(event) {
    const { name, value } = event.target;

    this.actions.updateFilters({
      [name]: value
    });
  }

  onSearchChange(searchTerm) {
    const { locationLoaded } = this.props;

    this.actions.updateSearchTerm(searchTerm);

    /**
     * if location is loaded
     * and there is a search query
     * try loading places data from Yelp
     */
    if (locationLoaded && searchTerm.length) {
      this.actions.loadData('places', {
        term: searchTerm
      });
    }
  }

  get sortByText() {
    const { filters } = this.props;
    const { sortBy } = filters;

    switch (sortBy) {
      case 'Closest To You':
        return 'closest';
      case 'Highest Rated':
        return 'highest rated';
      case 'Most Reviewed':
        return 'most reviewed';
      default:
        return null;
    }
  }

  get locationText() {
    const { filters, location } = this.props;
    const { maxDistance } = filters;
    const { neighborhood, city } = location;

    switch (maxDistance) {
      case 0.5:
      case 1.5:
        return neighborhood;
      case 5:
        return city;
      default:
        return neighborhood;
    }
  }

  get distanceText() {
    const { filters } = this.props;
    const { maxDistance } = filters;

    switch (maxDistance) {
      case 0.5:
        return '4 blocks';
      case 1.5:
        return 'walking distance';
      case 5:
        return 'bus/subway distance';
      default:
        return null;
    }
  }

  get openNowText() {
    const { filters } = this.props;
    const { isOpenNow } = filters;

    return isOpenNow ? 'that are open now' : null;
  }

  get filterSummary() {
    const { searchTerm } = this.props;

    const searchTermIsSingular = searchTerm.slice(-1) !== 's';

    return searchTerm.length ? (
      <Title className={`${this.baseClass}-filter-summary`} level={2}>
        The {this.sortByText} spots to get {searchTermIsSingular && 'a'}{' '}
        {searchTerm} in {this.locationText} within {this.distanceText} of you{' '}
        {this.openNowText}.
      </Title>
    ) : null;
  }

  get sortByGroup() {
    const { filters } = this.props;
    const { sortBy } = filters;

    return (
      <Radio.Group
        name="sortBy"
        style={this.radioGroupStyles}
        onChange={this.onFilterChange}
        value={sortBy}
      >
        <Radio style={this.radioStyles} value="Closest To You">
          Closest To You
        </Radio>
        <Radio style={this.radioStyles} value="Highest Rated">
          Highest Rated
        </Radio>
        <Radio style={this.radioStyles} value="Most Reviewed">
          Most Reviewed
        </Radio>
      </Radio.Group>
    );
  }

  get distanceGroup() {
    const { filters } = this.props;
    const { maxDistance } = filters;

    return (
      <Radio.Group
        name="maxDistance"
        style={this.radioGroupStyles}
        onChange={this.onFilterChange}
        value={maxDistance}
      >
        <Radio style={this.radioStyles} value={0.5}>
          Within 4 Blocks (0.5 mi)
        </Radio>
        <Radio style={this.radioStyles} value={1.5}>
          Walking (1.5 mi)
        </Radio>
        <Radio style={this.radioStyles} value={5}>
          Bus/Subway (5 mi)
        </Radio>
      </Radio.Group>
    );
  }

  get openNowToggle() {
    const { filters, searchTerm } = this.props;
    const { isOpenNow } = filters;

    const styles = {
      marginRight: 8
    };

    return (
      <Fragment>
        <Switch
          id="isOpenNow"
          style={styles}
          defaultChecked={isOpenNow}
          onChange={() => {
            this.actions.updateFilters({
              isOpenNow: !isOpenNow
            });

            this.onSearchChange(searchTerm);
          }}
        />
        <label htmlFor="isOpenNow">Open Now</label>
      </Fragment>
    );
  }

  get searchInputs() {
    const { location, locationLoaded } = this.props;
    const { neighborhood } = location;

    const inputStyles = {
      minWidth: 275,
      width: '30%'
    };

    return (
      <div className={`${this.baseClass}-search-inputs`}>
        <div className={`${this.baseClass}-search-input-wrapper`}>
          <Search
            className={`${this.baseClass}-search-input`}
            prefix="Find"
            placeholder="enter a food or drink"
            onSearch={this.onSearchChange}
            style={inputStyles}
            size="large"
            disabled={!locationLoaded}
            enterButton
          />
        </div>
        <div className={`${this.baseClass}-search-input-wrapper`}>
          <Loader loaded={locationLoaded} asOverlay />
          <Search
            className={`${this.baseClass}-search-input`}
            prefix="Near"
            value={neighborhood}
            onSearch={this.onSearchChange}
            style={inputStyles}
            size="large"
            enterButton={<Icon type="environment" />}
          />
        </div>
      </div>
    );
  }

  showFilterDrawer() {
    this.setState({
      visible: true
    });
  }

  hideFilterDrawer() {
    this.setState({
      visible: false
    });
  }

  render() {
    const { visible } = this.state;

    return (
      <div className={this.baseClass}>
        <Drawer
          closable={false}
          height="auto"
          onClose={this.hideFilterDrawer}
          placement="top"
          visible={visible}
        >
          <Row gutter={16}>
            <Col span={9}>{this.sortByGroup}</Col>
            <Col span={9}>{this.distanceGroup}</Col>
            <Col span={6}>{this.openNowToggle}</Col>
          </Row>
        </Drawer>
        <Button
          className={`${this.baseClass}-show-filters-button`}
          onClick={this.showFilterDrawer}
          size="large"
        >
          Show Filters
        </Button>
        {this.searchInputs}
        {this.filterSummary}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: applicationSelectors.getFilters(state),
  location: applicationSelectors.getLocation(state),
  locationLoaded: applicationSelectors.getLocationLoaded(state),
  places: applicationSelectors.getPlaces(state),
  searchTerm: applicationSelectors.getSearchTerm(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
