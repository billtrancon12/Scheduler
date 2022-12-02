import React, { Component } from 'react'
import Input from './Input'
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

export default class CreateAccountForm extends Component {
  render() {
    return (
      <form className='signup_form' onSubmit={this.props.onSubmit}>
        <div className='email_signup_wrapper signup_input_wrapper'>
          <Input className="email_signup input niceText" type="text" placeholder="Enter your email" name="email" onChange={this.props.onChange}></Input>
        </div>
        <div className='username_signup_wrapper signup_input_wrapper'>
          <Input className="username_signup input niceText" type="text" placeholder="Enter your username" name="username" onChange={this.props.onChange}></Input>
          <InfoIcon></InfoIcon>
        </div>
        <div className='password_signup_wrapper signup_input_wrapper'>
          <Input className="password_signup input niceText" type="password" placeholder="Enter your password" name="password" onChange={this.props.onChange}></Input>
          <InfoIcon></InfoIcon>
        </div>
        <div className='retype_pass_signup_wrapper signup_input_wrapper'>
          <Input className="retype_pass_signup input niceText" type="password" placeholder="Retype your password" name="retype_pass" onChange={this.props.onChange}></Input>
        </div>
        <div className='sign_in_redirect_wrapper'>
          <Link className="sign_in_link niceText" to="/login">Already have an account?</Link>
        </div>
        <div className="button_wrapper">
          <button type="submit" className='signup_button button'>Create</button>
        </div>
      </form>
    )
  }
}

CreateAccountForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired
}
