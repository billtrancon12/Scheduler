import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import CenterHeaderHomepage from './centerHeaderHomepage';
import AccountMenu from '../ReactMenu';

export default class HomepageHeader extends Component {
  render() {
    return (
        <div className='header_wrapper'>
            <div className='title_wrapper niceText'>
                <Link to='/homepage'>Scheduler</Link>
            </div>
            <CenterHeaderHomepage time={this.props.time}></CenterHeaderHomepage>
            <AccountMenu logoutHandler={this.props.logoutHandler}></AccountMenu>
        </div>

    )
  }
}

HomepageHeader.propTypes = {
    time: PropTypes.string.isRequired,
    logoutHandler: PropTypes.func.isRequired
}