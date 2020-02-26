import React from 'react';

import './Input.scss';
import {errorsHandlerInput} from '../../../utils/errorsHandler';

const Input = (props) => {
  let inputElement = null;
  const inputClasses = ['input-element'];

  if (props.error) {
    inputClasses.push('invalid')
  }

  switch (props.elementType) {
    case ('file'):
      inputElement = (
        <label className="label">
          <i className="material-icons"></i>
          <span className="title"></span>
          <img className='img-user' alt=""/>
          <input
            className={'image-input'}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}/>
        </label>);

      break;
    case ('textarea'):
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>;
      break;
    case ('select'):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>;
  }

  const errMsg = errorsHandlerInput(props.error, props.elementType, props.isSignup, props.errorMsg)

  return (
    <div className='input-section'>

      {props.elementType === 'file' &&
      <>
        {inputElement}
      </>
      }

      {props.elementType !== 'file' &&
      <div>
        <label className='Label'>{props.label}</label>
        {inputElement}

        <p className='error-msg'>
          {errMsg}

        </p>
      </div>
      }

    </div>
  );

};

export default Input;
