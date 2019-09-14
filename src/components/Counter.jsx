import React, { Component } from 'react';
import { connect } from 'react-redux';

class Counter extends Component {
  render() {
    return (
      <div>
        <div>{this.props.count}</div>
        <div>
          <button
            onClick={() => this.props.dispatch({ type: 'DECREMENT'})}>
              Decrement
          </button>
          <button
            onClick={() => this.props.dispatch({ type: 'INCREMENT'})}>
              Increment
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}

export default connect(mapStateToProps)(Counter);