import React, { Component } from 'react'
import ArrowUpIcon from '@rsuite/icons/ArrowUp';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import { IconButton } from 'rsuite';
import PropTypes from 'prop-types';

export default class TimerComponent extends Component {
  render() {
    return (
      <div className='timer_container'>
        <div className='timer_up_wrapper'>
          <IconButton icon={<ArrowUpIcon></ArrowUpIcon>} onMouseDown={this.props.modifyMin} onMouseUp={this.props.stopModifyMin}></IconButton>
          <IconButton icon={<ArrowUpIcon></ArrowUpIcon>} onMouseDown={this.props.modifySec} onMouseUp={this.props.stopModifySec}></IconButton>
        </div>
        <div className='timer niceText'>
          {this.props.timer}
        </div>
        <div className='timer_down_wrapper'>
          <IconButton icon={<ArrowDownIcon></ArrowDownIcon>} onMouseDown={this.props.modifyMin} onMouseUp={this.props.stopModifyMin}></IconButton>
          <IconButton icon={<ArrowDownIcon></ArrowDownIcon>} onMouseDown={this.props.modifySec} onMouseUp={this.props.stopModifySec}></IconButton>
        </div>
      </div>
    )
  }
}

TimerComponent.propTypes = {
  modifyMin: PropTypes.func.isRequired,
  modifySec: PropTypes.func.isRequired,
  timer: PropTypes.string.isRequired
}
