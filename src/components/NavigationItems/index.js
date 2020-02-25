import React from 'react';

import './NavigationItems.scss';
import NavigationItem from './NavigationItem';

const NavigationItems = (props ) => (
    <div className='nav-items'>
        <NavigationItem link="login" exact>вход</NavigationItem>
        <NavigationItem link="auth" exact>регистрация</NavigationItem>
    </div>
);

export default NavigationItems;