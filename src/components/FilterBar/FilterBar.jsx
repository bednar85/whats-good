import React, { Component } from 'react';
import { Radio, Input } from 'antd';

export class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      sortBy: 'Highest Rated',
      distance: 1.5, 
      hours: "Show All"
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { sortBy } = this.state;

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
          value={this.state.sortBy}
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
          value={this.state.distance}
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
          value={this.state.hours}
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

export default FilterBar;
