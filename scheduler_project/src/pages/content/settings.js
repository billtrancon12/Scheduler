import Input from '../../components/Input'
import React, { Component } from 'react'
import '../css/settings.css';
import { Button } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
export default class Settings extends Component {
  constructor(props){
    super(props);

    this.state = {
      hourInterval: "",
      minInterval : "",
      notification: [],
    }
  }
  render() {
    return (
      <form className='setting_form' onSubmit={(e) => this.handleSubmit(e)}>
        <div className='reminder_setting_wrapper'>
          <span className='reminder_setting'>Set Time Reminder Interval</span>
        </div>
        <div className='hour_reminder_input_wrapper'>
         <Input className='hour_reminder_input niceText' type="text" placeholder='Enter hour interval' name="hourInterval" onChange={(e) => this.handleChange(e)}></Input>
        </div>
        <div className='min_reminder_input_wrapper'>
          <Input className='min_reminder_input niceText' type="text" placeholder="Enter minute interval" name="minInterval" onChange={(e) => this.handleChange(e)}></Input>
        </div>
        <Button type="submit" variant="contained" endIcon={<ChevronRightIcon></ChevronRightIcon>} style={{backgroundColor: "lightcoral"}}>OK</Button>
        {this.state.notification}
      </form>
    )
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();

    axios.post("http://localhost:4003/reminder", {
      hour: this.state.hourInterval,
      min: this.state.minInterval,
      username: sessionStorage.getItem('username')
    })
    .then((res) =>{
      const data = JSON.parse(res.data);
      toast(data.message, {position: "top-center"});
      this.setState({notification: <ToastContainer autoClose="3000" style={{width: "fit-content"}}></ToastContainer>})
    })
    .catch((err) =>{
      console.log(err);
    })
  }
}
