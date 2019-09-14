import React, { Component } from 'react';
import { Radio, Input } from 'antd';

export class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      sortBy: 'Highest Rated'
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { sortBy } = this.state;

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    
    return (
      <div>
        <Radio.Group
          name="sortBy"
          onChange={this.handleChange}
          value={this.state.sortBy}
        >
          <Radio
            style={radioStyle}
            disabled
            value="Distance From You"
          >
            Distance From You
          </Radio>
          <Radio
            style={radioStyle}
            disabled
            value="Distance From Selected Location"
          >
            Distance From Selected Location
          </Radio>
          <Radio
            style={radioStyle}
            value="Highest Rated"
          >
            Highest Rated
          </Radio>
          <Radio
            style={radioStyle}
            value="Most Reviewed"
          >
            Most Reviewed
          </Radio>
        </Radio.Group>
      </div>
    );
  }
}

export default FilterBar;
