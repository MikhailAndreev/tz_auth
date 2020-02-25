import React, { Component } from 'react';

import './Layout.scss';
import NavigationItems from "../../components/NavigationItems";
import Header from "../../components/Header";
import logoImg from '../../assets/images/header-logo.png';
import WithClass from '../withClass'


class Layout extends Component {
  state = {
    showSideDrawer: false
  };


  render () {

    return (
      <div className={this.props.wrapperStyle}>
        <WithClass>
          <Header
            logoImg={logoImg}
            logoTitle='потерял нашел'
            style={this.props.headerStyle}
          />

          {this.props.isNavDisabled ?
            <div>
              <p className='title-map'>
                Будем знакомы ;)
              </p>
              <p className='title-map small-title'>
                Вы здесь
              </p>
            </div>
            :
          <NavigationItems/>
          }

        </WithClass>
          <WithClass classes='layout'>
            {this.props.children}
          </WithClass>
      </div>
    )
  }
}

export default Layout;