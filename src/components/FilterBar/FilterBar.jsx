import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Button,
  Col,
  Drawer,
  Radio,
  Row,
  Switch,
  Typography
} from 'antd';

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

    this.hideDrawer = this.hideDrawer.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.showDrawer = this.showDrawer.bind(this);

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
    const { distance } = filters;

    switch (distance) {
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
      <Title level={4}>
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
        <Radio
          style={this.radioStyles}
          value="Closest To You"
        >
          Closest To You
        </Radio>
        <Radio
          style={this.radioStyles}
          value="Highest Rated"
        >
          Highest Rated
        </Radio>
        <Radio
          style={this.radioStyles}
          value="Most Reviewed"
        >
          Most Reviewed
        </Radio>
      </Radio.Group>
    );
  }

  get distanceGroup() {
    const { filters } = this.props;
    const { distance } = filters;

    return (
      <Radio.Group
        name="distance"
        style={this.radioGroupStyles}
        onChange={this.onFilterChange}
        value={distance}
      >
        <Radio
          style={this.radioStyles}
          value={0.5}
        >
          Within 4 Blocks (0.5 mi)
        </Radio>
        <Radio
          style={this.radioStyles}
          value={1.5}
        >
          Walking (1.5 mi)
        </Radio>
        <Radio
          style={this.radioStyles}
          value={5}
        >
          Bus/Subway (5 mi)
        </Radio>
      </Radio.Group>
    );
  }

  get openNowToggle() {
    const { filters } = this.props;
    const { isOpenNow } = filters;

    const styles = {
      marginRight: 8
    };

    return (
      <div>
        <Switch
          id="isOpenNow"
          style={styles}
          defaultChecked={isOpenNow}
          onChange={() => this.actions.updateFilters({
            isOpenNow: !isOpenNow
          })}
        />
        <label htmlFor="isOpenNow">Open Now Only</label>
      </div>
    );
  }

  showDrawer() {
    this.setState({
      visible: true
    });
  }

  hideDrawer() {
    this.setState({
      visible: false
    });
  }

  render() {
    const { visible } = this.state;

    return (
      <div>
        {this.filterSummary}
        <Button onClick={this.showDrawer}>
          Show Filters
        </Button>
        <Drawer
          placement="top"
          closable={false}
          onClose={this.hideDrawer}
          visible={visible}
        >
          <Row gutter={16}>
            <Col span={9}>{this.sortByGroup}</Col>
            <Col span={9}>{this.distanceGroup}</Col>
            <Col span={6}>{this.openNowToggle}</Col>
          </Row>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { ...actions },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
