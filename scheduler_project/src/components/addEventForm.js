import React, { Component } from 'react'
import Input from './Input'
import PropTypes from 'prop-types'

export default class AddEventForm extends Component {
  render() {
    return (
      <form className='add_scheduler_ui_wrapper ui_wrapper' onSubmit={this.props.onSubmit}>
        <div className='ui_wrapper_title'>
            <span className='ui_wrapper_title niceText'>Create Event/Task for this week</span>
        </div>
        <div className='ui_wrapper_title_input_wrapper'>
            <span className='ui_wrapper_title_input niceText'>Title: &nbsp;</span>
            <Input type="text" className="title_input niceText" name="title_task" onChange={this.props.onChange}></Input>
            <span className='asterisk'>*</span>
        </div>
        <div className='ui_wrapper_date_input_wrapper'>
            <span className='ui_wrapper_date_input niceText'>Date: &nbsp;</span>
            <Input type="select" options={this.props.dateOptions} className="date_input niceText" name="date_input" onChange={this.props.onChange}></Input>
            <span className='asterisk'>*</span>
        </div>
        <div className='time_stamp_from_wrapper'>
            <span className='ui_wrapper_from niceText'>From: &nbsp;</span>
            <Input type="select" options={this.props.timeFOptions} className="time_from_input niceText" name="time_from" onChange={this.props.onChange}></Input>
            <span className='asterisk'>*</span>
        </div>
        <div className='time_stamp_to_wrapper'>
            <span className='ui_wrapper_to'>To: &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Input type="select" options={this.props.timeTOptions} className="time_to_input niceText" name="time_to" onChange={this.props.onChange}></Input>
            <span className='asterisk'>*</span>
        </div>
        <div className="description_wrapper">
            <span className='description'>Description: &nbsp;</span>
            <div><Input type="textarea" className="description_input niceText" name="description" onChange={this.props.onChange}></Input></div>
        </div>
        <button type="submit" className='add_scheduler_submission'>Create</button>
    	</form>
    )
  }
}

AddEventForm.propTypes = {
	dateOptions: PropTypes.array.isRequired,
	timeFOptions: PropTypes.array.isRequired,
	timeTOptions: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
}