import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as actions from '../../store/actions/index';
import './MainContainer.scss';
import Layout from "../../hoc/Layout";


class MainContainer extends Component {
  state = {
    loading: true
  };

  componentDidMount() {

    this.spinnerShow()
    console.log(this.props.isAuthenticated)
  }

  spinnerShow = () => {
    setTimeout(() => {
      this.setState(prevState => ({
          loading: !prevState.loading
      }))
    }, 2000)
  };

  render() {
    let authRedirect = null;
    if (this.props.isAuthenticated && !this.state.loading) {
      authRedirect = <Redirect to='/location'/>
    } if (!this.props.isAuthenticated && !this.state.loading) {
      authRedirect = <Redirect to='/login'/>
    }
    return (
        <div className='main-container'>

          {authRedirect}

          <div className="spinner-border spinner-color" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className='loading'>
            Загрузка...
          </p>

        </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);