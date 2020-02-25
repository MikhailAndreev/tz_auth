import React from 'react';
import { NavLink } from 'react-router-dom';

import './Tips.scss';

const Tips = (props ) => (
  <div className='tips'>
    <p className='tips-text'>
      {props.text}
    </p>

    <NavLink
      to={props.link}
      exact
    >
      {props.linkText}
    </NavLink>

  </div>
);

export default Tips;