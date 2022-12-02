import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Input from './Input'
import PropTypes from 'prop-types'

export default class LoginForm extends Component {
  render() {
    return (
    	<div className='login_container'>        
        <span className='login_title niceText'>Sign In</span>
        {this.props.error_message}
        <form className='login_form' onSubmit={this.props.onSubmit}>
          <div className='username_login_wrapper login_input_wrapper'>
            <Input className="username_login input niceText" type="text" placeholder="Enter your username" name="username" onChange={this.props.onChange}></Input>
          </div>
          <div className='password_login_wrapper login_input_wrapper'>
            <Input className="password_login input niceText" type="password" placeholder="Enter your password" name="password" onChange={this.props.onChange}></Input>
          </div>
          <div className='forgot_password_wrapper'>
            <Link className="forgot_password niceText" to="/forgot_password">Forgot Password</Link>
          </div>
          <button type="submit" className='login_button button'>Login</button>
          <div className='separator'><span className='niceText'>OR</span></div>
          <div className='sign_up_wrapper'>
            <Link to="/signup" className='sign_up niceText'>Create Account</Link>
          </div>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
	error_message: PropTypes.string,
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired
}
