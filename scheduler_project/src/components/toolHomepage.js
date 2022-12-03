import React, { Component } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'	
import NavigateCalendarArrow from './navigateCalendarArrow';
import '../pages/css/toolHomepage.css'

export default class ToolHomepage extends Component {
	constructor(props){
		super(props);

		this.state = {
		}
	}
  render() {
    return (
      <div className="tool_wrapper">
        <div className='calendar_tool_wrapper'>
          <div className='add_wrapper'>
            <AddCircleIcon onClick={this.props.addHandler} id="add_circle"></AddCircleIcon>
          </div>
        </div>
				<DatePicker selected={this.props.calendarDate} onChange={this.props.onChangeDate} popperPlacement="auto"></DatePicker>
        <NavigateCalendarArrow navigateCalendar={this.props.navigateCalendar}></NavigateCalendarArrow>
      </div>
    )
  }

}

ToolHomepage.propTypes = {
    onClick: PropTypes.func,
		calendarDate: PropTypes.object.isRequired,
		onChangeDate: PropTypes.func.isRequired,
    navigateCalendar: PropTypes.func.isRequired
}


