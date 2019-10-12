import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Spin, Icon } from 'antd';

import Spinner from '../Spinner/Spinner';

export class Loader extends Component {
  static propTypes = {
    asOverlay: PropTypes.bool,
    error: PropTypes.object.isRequired,
    loaded: PropTypes.bool.isRequired,
    render: PropTypes.func
  };

  static defaultProps = {
    asOverlay: false,
    render: null
  };

  get hasError() {
    const { error } = this.props;

    return error.show;
  }

  get component() {
    const { loaded, error, render } = this.props;

    if (!loaded) {
      return this.hasError ? (
        <div className="wg-service-error">{error.message}</div>
      ) : (
        <Spinner />
      );
    }

    return render();
  }

  get overlay() {
    const { loaded } = this.props;

    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    if (!loaded) {
      return (
        <div className="wg-loader-overlay">
          <Spin indicator={antIcon} />
        </div>
      );
    }

    return null;
  }

  render() {
    const { asOverlay } = this.props;

    if (asOverlay) {
      return this.overlay;
    }

    return this.component;
  }
}

export default Loader;
