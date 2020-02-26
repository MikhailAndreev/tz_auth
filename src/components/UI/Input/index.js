import React from 'react';

import './Input.scss';


const Input = (props) => {
  let inputElement = null;
  console.log(props)
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

  let errMsg = null;
  if (props.error && props.error.message === 'INVALID_PASSWORD' && props.elementType === 'password') {
    errMsg = props.errorMsg
  }
  if (props.error && props.isSignup && props.error.message === 'WEAK_PASSWORD : Password should be at least 6 characters' && props.elementType === 'password') {
    errMsg = props.errorMsg
  }
  if (props.error && props.error.message === 'INVALID_EMAIL' && props.elementType === 'text') {
    errMsg = props.errorMsg
  }
  if (props.error && props.error.message === 'EMAIL_NOT_FOUND' && props.elementType === 'text') {
    errMsg = props.errorMsg
  }
  if (props.error && props.isSignup && props.error.message === 'EMAIL_EXISTS' && props.elementType === 'text') {
    errMsg = props.errorMsg
  }
  if (props.error && props.isSignup && props.error.message === 'INVALID_EMAIL' && props.elementType === 'text') {
    errMsg = props.errorMsg
  }
  

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
