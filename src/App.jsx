import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from './components/Header/Header';
import PlacesList from './components/PlacesList/PlacesList';

import { actions } from './modules/application';

function App(props) {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;

    return props.actions.setCurrentLocation({
      latitude,
      longitude
    });
  });

  return (
    <div className="app">
      <Header />
      <PlacesList />
    </div>
  );
}

App.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(App);
