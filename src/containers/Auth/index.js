import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import './Auth.scss';
import * as actions from '../../store/actions/index';
import Layout from "../../hoc/Layout";
import {errorsHandler} from '../../utils/errorsHandler'

const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;


class Auth extends Component {
  state = {
    errMsg: '',
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Пароль'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
      console.log(isValid)
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const validValue = cyrillicPattern.test(event.target.value) ? '' : event.target.value;
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: validValue,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };
    this.setState({controls: updatedControls});
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, true);
  };

  render() {
    const errorMsg = errorsHandler(this.props.error, this.props.message);
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    const form = formElementsArray.map(formElement => (
      <Input
        isSignup={true}
        error={this.props.error}
        errorMsg={errorMsg}
        label={formElement.config.elementConfig.placeholder}
        isDisabled={this.props.loading}
        key={formElement.id}
        elementType={formElement.config.elementConfig.type}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>

    ));

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to='location'/>
    }

    return (

      <Layout
        sectionStyle='auth'
      >
        {authRedirect}
        <form className='auth-form' onSubmit={this.submitHandler}>

          {form}

          <Button
            disabled={this.props.loading}
            btnType="Success">
            Регистрация
          </Button>
        </form>

        {this.props.loading &&
        <div className="spinner-border " role="status">
          <span className="sr-only">Loading...</span>
        </div>
        }

      </Layout>
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    error: state.auth.errorAuth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);