import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import 'normalize.css';
import Header from '../components/Header';

const propTypes = {
  children: PropTypes.node,
};

class App extends Component {

  render() {
    const { children } = this.props;
    return (
      <div>
        <Header />
        <nav>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/picture">Picture</Link></li>
          <li><Link to="/counter">Counter</Link></li>
        </nav>
        {children}
      </div>
    );
  }
}

App.propTypes = propTypes;

export default connect()(App);
