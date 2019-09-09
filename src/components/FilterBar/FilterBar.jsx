import React, { Component } from 'react';

export class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.onSort = this.onSort.bind(this);

    this.state = {
      sortBy: 'Highest Rated'
    };
  }

  onSort(sortBy) {
    console.log('');
    console.log('FilterBar - onSort');
    console.log('  sortBy:', sortBy);

    this.setState({
      sortBy
    });
  }

  render() {
    const { handleSubmit } = this.props;
    
    return (
      <div>
        <button onClick={() => this.onSort('Highest Rated')}>Highest Rated</button>
        <button onClick={() => this.onSort('Most Reviewed')}>Most Reviewed</button>
        <button onClick={() => handleSubmit(this.state)}>Submit</button>
      </div>
    );
  }
}

export default FilterBar;
