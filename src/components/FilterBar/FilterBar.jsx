import React, { Component } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup
} from '@material-ui/core';

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
    
    return (
      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend">Sort By</FormLabel>
          <RadioGroup
            aria-label="Sort By"
            name="sortBy"
            value={sortBy}
            onChange={this.handleChange}
          >
            <FormControlLabel
              value="Distance From You"
              disabled
              control={<Radio color="primary" />}
              label="Distance From You"
            />
            <FormControlLabel
              value="Distance From Selected Location"
              disabled
              control={<Radio color="primary" />}
              label="Distance From Selected Location"
            />
            <FormControlLabel
              value="Highest Rated"
              control={<Radio color="primary" />}
              label="Highest Rated"
            />
            <FormControlLabel
              value="Most Reviewed"
              control={<Radio color="primary" />}
              label="Most Reviewed"
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

export default FilterBar;
