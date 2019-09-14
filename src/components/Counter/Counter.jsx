import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from '../../modules/application';

class Counter extends Component {
  constructor(props) {
    super(props);

    this.actions = props.actions;
  }

  render() {
    return (
      <div>
        <div>{this.props.count}</div>
        <div>
          <button
            onClick={this.actions.decrementCounter}>
              Decrement
          </button>
          <button
            onClick={this.actions.incrementCounter}>
              Increment
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  count: state.count
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    Object.assign({}, actions),
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);