import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Radio } from 'antd';

import { actions } from '../../modules/application';

export class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.actions = props.actions;

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.actions.updateFilters({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { sortBy, distance, hours } = this.props.filters;

    console.log(this.props.filters);

    const radioGroupStyles = {
      verticalAlign: 'top'
    };

    const radioStyles = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    
    return (
      <div>
        <Radio.Group
          name="sortBy"
          style={radioGroupStyles}
          onChange={this.handleChange}
          value={sortBy}
        >
          <Radio
            style={radioStyles}
            disabled
            value="Distance From You"
          >
            Distance From You
          </Radio>
          <Radio
            style={radioStyles}
            disabled
            value="Distance From Selected Location"
          >
            Distance From Selected Location
          </Radio>
          <Radio
            style={radioStyles}
            value="Highest Rated"
          >
            Highest Rated
          </Radio>
          <Radio
            style={radioStyles}
            value="Most Reviewed"
          >
            Most Reviewed
          </Radio>
        </Radio.Group>
        <Radio.Group
          name="distance"
          style={radioGroupStyles}
          onChange={this.handleChange}
          value={distance}
        >
          <Radio
            style={radioStyles}
            disabled
            value={0.5}
          >
            Within 4 Blocks
          </Radio>
          <Radio
            style={radioStyles}
            disabled
            value={1.5}
          >
            Walking (1.5 mi)
          </Radio>
          <Radio
            style={radioStyles}
            disabled
            value={5}
          >
            Bus/Subway (5 mi)
          </Radio>
          <Radio
            style={radioStyles}
            disabled
            value={Infinity}
          >
            Show All
          </Radio>
        </Radio.Group>
        <Radio.Group
          name="hours"
          style={radioGroupStyles}
          onChange={this.handleChange}
          value={hours}
        >
          <Radio
            style={radioStyles}
            disabled
            value="Open Now"
          >
            Open Now
          </Radio>
          <Radio
            style={radioStyles}
            value="Show All"
          >
            Show All
          </Radio>
        </Radio.Group>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    Object.assign({}, actions),
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
