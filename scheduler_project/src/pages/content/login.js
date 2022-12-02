import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import "../css/login.css";
import LoginForm from '../../components/loginForm';

export default class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: "",
      password: "",
      error_message: "",
      login: false,
    };
  }
  
  render() {
    document.title = "Login";

    if(!this.state.login && sessionStorage.getItem('login') !== 'true'){
      return (
        <div className='login_wrapper'>
          <div className='blockup'></div>
          <LoginForm error_message={this.state.error_message} onChange={(e) => this.handleChange(e)} onSubmit={(e) => this.handleSubmit(e)}></LoginForm>
        </div>
      )
    }
    else{
      return(
        <Navigate to="/homepage"></Navigate>
      )
    }
  }

  handleChange(e){
    this.setState({[e.target.name] : e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    
    axios.get(`http://localhost:4001/login/?username=${this.state.username}&password=${this.state.password}`)
    .then((response) => {
      const res = JSON.parse(response.data);

      if(res.status === false){
        this.setState({error_message: 
          <div className='error_message'>
            <span className="error login_message niceText">{res.message}</span>
          </div>
        });
      }
      else{
        this.setState({login: true});
        sessionStorage.setItem("login", "true");
        sessionStorage.setItem('username', this.state.username);
      }
    })
    .catch(err => console.log(err));
  }

  handleDateChange(date){
    this.setState({startDate: date})
  }
}
