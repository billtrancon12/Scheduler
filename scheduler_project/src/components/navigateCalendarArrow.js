import React, { Component } from 'react'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import '../pages/css/navigateCalendarArrow.css';
import PropTypes from 'prop-types'

export default class NavigateCalendarArrow extends Component {
  render() {
    return (
      <div className='calendar_navigation_wrapper'>
        <div className='navigate_prev_week'>
            <ArrowCircleLeftIcon onClick={this.props.navigateCalendar} id="left_arrow"></ArrowCircleLeftIcon>
        </div>
        <div className='navigate_next_week'>
            <ArrowCircleRightIcon onClick={this.props.navigateCalendar} id="right_arrow"></ArrowCircleRightIcon>
        </div>
      </div>
    )
  }
}

NavigateCalendarArrow.propTypes = {
    navigateCalendar: PropTypes.func.isRequired
}
