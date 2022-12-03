import React, { Component } from 'react'
import { Navigate} from 'react-router-dom';
import axios from 'axios';

import "../css/signup.css"
import CreateAccountForm from '../../components/createAccountForm';

export default class SignUp extends Component {
  constructor(props){
		super(props);

		this.state = {
			email: "",
			username: "",
			password: "",
			retype_pass: "",
			error_message: [],
			create: false
		}

    window.addEventListener("resize", function(e){
      const error = document.getElementsByClassName("login_message")[0];
      const error_width = document.getElementsByClassName("input")[0].clientWidth;

      if(error !== undefined){
        error.style.width = `${error_width}px`;
      }
    });
	}

	render() {
		document.title = "Create account"
    if(sessionStorage.getItem('login') !== "true"){
      return(
			  <div className='signup_wrapper'>
          <div className='blockup'></div>
          <div className='signup_container'>        
            <span className='signup_title niceText'>Sign Up</span>
            {this.state.error_message}
            <CreateAccountForm onSubmit={(e) => this.handleSubmit(e)} onChange={(e) => this.handleChange(e)}></CreateAccountForm>
          </div>
        </div>
      )
    }

    return(
       <Navigate to="/homepage"></Navigate>
    )
  }

  handleChange(e){
    this.setState({[e.target.name] : e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    
    const error_width = document.getElementsByClassName("input")[0].clientWidth;

    axios.post('http://localhost:4004/create', {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      retype_pass: this.state.retype_pass
    })
    .then((response) => {
      const res = JSON.parse(response.data);
      console.log(response);
      if(res.status === false){
        this.setState({error_message: 
          <div className='error_message'>
            <span className="error login_message niceText" style={{width: `${error_width}px`, display: "inline-block"}}>{res.message}</span>
          </div>
        });
      }
      else{
        this.setState({create: true});
        window.alert("Create successfully!");
      }
    })
    .catch(err => console.log(err));
  }
}
