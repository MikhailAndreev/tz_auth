import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import './LoginContainer.scss';
import axios from '../../utils/axios';
import WithClass from '../../hoc/withClass';
import * as actions from '../../store/actions/index';
import Layout from "../../hoc/Layout";
import Tips from "../../components/Tips";
import {errorsHandler} from '../../utils/errorsHandler'


class LoginContainer extends Component {
  state = {
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

  checkValidity = (value, rules) => {
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
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };
    this.setState({controls: updatedControls});
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, false);
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
        isSignup={false}
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
        sectionStyle='loginContainer'
      >
        {authRedirect}
        <form className='login-form' onSubmit={this.submitHandler}>
          {form}

          <Tips
            text='Еще не зарегестрированы ?'
            link='auth'
            linkText='Регистрация'
          />

          <Button
            btnType="Success"
            disabled={this.props.loading}
          >
            Войти
          </Button>
        </form>


        {this.props.loading &&
        <div className="spinner-border spinner-color" role="status">
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
    error: state.auth.errorLogin
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);