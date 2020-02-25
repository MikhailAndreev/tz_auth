import React from 'react';

import './Header.scss';

const Header = (props ) => (
  <div className={`${'header'} ${props.style}`}>
    <img className='header-logo' src={props.logoImg} alt=""/>
    <p className='header-title'>{props.logoTitle}</p>
  </div>
);

export default Header;