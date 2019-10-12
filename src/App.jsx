import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from './components/Header/Header';
import PlacesList from './components/PlacesList/PlacesList';

import { actions } from './modules/application';

function App(props) {
  // get the current location using the Geolocation API and Google Maps API
  navigator.geolocation.getCurrentPosition(position =>
    props.actions.loadData('location', position.coords)
  );

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
