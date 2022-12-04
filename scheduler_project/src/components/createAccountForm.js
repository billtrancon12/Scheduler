import React, { Component } from 'react'
import Input from './Input'
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default class CreateAccountForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      usernameInstruction: [],
      passwordInstruction: []
    }
  }
  render() {
    console.log(this.state.usernameInstruction);
    return (
      <form className='signup_form' onSubmit={this.props.onSubmit}>
        <div className='email_signup_wrapper signup_input_wrapper'>
          <Input className="email_signup input niceText" type="text" placeholder="Enter your email" name="email" onChange={this.props.onChange}></Input>
        </div>
        <div className='username_signup_wrapper signup_input_wrapper'>
          <Input className="username_signup input niceText" type="text" placeholder="Enter your username" name="username" onChange={this.props.onChange}></Input>
          <InfoIcon onClick={() => this.showUsernameInstructions()}></InfoIcon>{this.state.usernameInstruction}
        </div>
        <div className='password_signup_wrapper signup_input_wrapper'>
          <Input className="password_signup input niceText" type="password" placeholder="Enter your password" name="password" onChange={this.props.onChange}></Input>
          <InfoIcon onClick={() => this.showPasswordInstruction()}></InfoIcon>{this.state.passwordInstruction}
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

  showUsernameInstructions(){
    const toasted = document.getElementsByClassName("Toastify")[0];
    if(toasted === undefined || toasted === null || toasted.childElementCount === 0){
      toast(this.getUsernameInstruction(), {position: 'top-center', style: {marginTop: "250px"}});
      this.setState({usernameInstruction: <ToastContainer autoClose={3000} className="niceText" rows={3}></ToastContainer>})
    }
  }

  showPasswordInstruction(){
    const toasted = document.getElementsByClassName("Toastify")[0];
    if(toasted === undefined || toasted === null || toasted.childElementCount === 0){
      toast(this.getPasswordInstruction(), {position: 'top-center', style: {marginTop: "250px"}});
      this.setState({passwordInstruction: <ToastContainer autoClose={3000} className="niceText" rows={3}></ToastContainer>})
    }
  }
  getUsernameInstruction(){
    return(
      <span className='username_instruction niceText'>
        1. Must be 8-12 characters long
        <br></br>
        2. Cannot have special characters
      </span>
    )
  }

  getPasswordInstruction(){
    return(
      <span className='password_instruction niceText'>
        1. Must be 8-20 characters long
        <br></br>
        2. Must have at least one special characters 
        including '?', '@', '!', '#', '$', '%', '^', '&'
        <br></br>
        3. Must have at least one number
        <br></br>
        4. Must have at least one lowercase character
        <br></br>
        5. Must have at least one uppercase character
      </span>
    )
  }
}

CreateAccountForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired
}
