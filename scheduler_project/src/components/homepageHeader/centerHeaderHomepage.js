import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class CenterHeaderHomepage extends Component {
  render() {
    return (
        <div className='center_wrapper'>
            <div className='calendar_wrapper niceText'>
                <span>Calendar</span>
            </div>
            <div className='time_wrapper'>
                <span>{this.props.time}</span>
            </div>
            <div className='timer_title_wrapper niceText'>
                <Link to='/homepage/timer'>Timer</Link>
            </div>
        </div>
    )
  }
}

CenterHeaderHomepage.propTypes = {
    time: PropTypes.string.isRequired
}
