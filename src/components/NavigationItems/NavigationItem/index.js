import React from 'react';
import { NavLink } from 'react-router-dom';

import '../NavigationItems.scss';

const NavigationItems = (props ) => (
    <div className='nav-item'>
        <NavLink 
            to={props.link}
            exact={props.exact}
            activeClassName='active'
        >
          {props.children}
        </NavLink>
    </div>
);

export default NavigationItems;