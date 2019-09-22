import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button, Col, Drawer, Radio, Row, Switch, Typography } from 'antd';

import { actions } from '../../modules/application';

const { Title } = Typography;

export class FilterBar extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.actions = props.actions;

    this.hideFilterDrawer = this.hideFilterDrawer.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.showFilterDrawer = this.showFilterDrawer.bind(this);

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
    this.actions.updateFilters({
      [event.target.name]: event.target.value
    });
  }

  get sortByText() {
    const { filters } = this.props;
    const { sortBy } = filters;

    switch (sortBy) {
      case 'Closest To You':
        return 'The closest coffee spots in Philly';
      case 'Highest Rated':
        return 'The highest rated coffee spots in Philly';
      case 'Most Reviewed':
        return 'The most reviewed coffee spots in Philly';
      default:
        return 'The best coffee spots in Philly';
    }
  }

  get distanceText() {
    const { filters } = this.props;
    const { maxDistance } = filters;

    switch (maxDistance) {
      case 0.5:
        return ', 4 blocks or less away from you';
      case 1.5:
        return ', within walking distance of you';
      case 5:
        return ', within bus/subway distance of you';
      default:
        return '';
    }
  }

  get openNowText() {
    const { filters } = this.props;
    const { isOpenNow } = filters;

    return isOpenNow ? ', which are open now.' : '.';
  }

  get filterSummary() {
    return (
      <Title className="wg-filter-bar-summary" level={2}>
        {this.sortByText}
        {this.distanceText}
        {this.openNowText}
      </Title>
    );
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
      <div className="wg-filter-bar">
        {this.filterSummary}
        <Button onClick={this.showFilterDrawer}>Show Filters</Button>
        <Drawer
          closable={false}
          height="auto"
          onClose={this.hideFilterDrawer}
          placement="top"
          visible={visible}
        >
          <Row gutter={16}>
            <Col span={12}>{this.sortByGroup}</Col>
            <Col span={12}>{this.distanceGroup}</Col>
          </Row>
        </Drawer>
      </div>
    );
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
)(FilterBar);
