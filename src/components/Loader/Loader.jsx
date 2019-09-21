import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../Spinner/Spinner';

export class Loader extends Component {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    render: PropTypes.func.isRequired
  };

  get component() {
    const { loaded, render } = this.props;

    if (!loaded) {
      return <Spinner />;
    }

    return render();
  }

  render() {
    return this.component;
  }
}

export default Loader;
