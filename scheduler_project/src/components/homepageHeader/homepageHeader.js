import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import CenterHeaderHomepage from './centerHeaderHomepage';
import RightHeaderHomepage from './rightHeaderHomepage';

export default class HomepageHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      inbox: [],
    }
  }
  render() {
    return (
        <div className='header_wrapper'>
            <div className='title_wrapper niceText'>
                <Link to='/homepage'>Scheduler</Link>
            </div>
            <CenterHeaderHomepage time={this.props.time}></CenterHeaderHomepage>
            <RightHeaderHomepage logoutHandler={() => this.logoutHandler()} notification={this.props.notification}></RightHeaderHomepage>
        </div>

    )
  }

  logoutHandler(){
    sessionStorage.setItem("login", false);
  }
}

HomepageHeader.propTypes = {
    time: PropTypes.string.isRequired,
    notification: PropTypes.array.isRequired
}