import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../Spinner/Spinner';

export class Loader extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    loaded: PropTypes.bool.isRequired,
    render: PropTypes.func.isRequired
  };

  get hasError() {
    const { error } = this.props;

    return error.show;
  }

  get component() {
    const { loaded, error, render } = this.props;

    if (!loaded) {
      return this.hasError ? <div>{error.message}</div> : <Spinner />;
    }

    return render();
  }

  render() {
    return this.component;
  }
}

export default Loader;
