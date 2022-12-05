import React, { Component } from 'react'
import ReloadIcon from '@rsuite/icons/Reload';
import PauseIcon from '@rsuite/icons/legacy/Pause';
import PlayIcon from '@rsuite/icons/legacy/Play';
import { IconButton, ButtonToolbar } from 'rsuite';
import TimerComponent from '../../components/timerComponent';
// import 'rsuite/dist/rsuite-rtl.css'
import '../css/timer.css';

export default class Timer extends Component {
  constructor(props){
    super(props);
    this.state = {
      min: 0,
      second: 0,
      timer: "",
      minInterval: [],
      secInterval: [],
    }
  }

  componentDidMount(){
    this.getTimer();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.min !== this.state.min || prevState.second !== this.state.second)
      this.getTimer();
  }

  render() {
    return (
      <div className='timer_wrapper'>
        <TimerComponent 
          timer={this.state.timer} 
          modifyMin={(e) => {this.state.minInterval = setInterval(() => this.modifyMin(e), 35)}}             
          modifySec={(e) => {this.state.secInterval = setInterval(() => this.modifySec(e), 35)}}
          stopModifyMin={() => clearInterval(this.state.minInterval)}
          stopModifySec={() => clearInterval(this.state.secInterval)}
        ></TimerComponent>
        <ButtonToolbar>
          <IconButton icon={<PauseIcon />} placement="left" onClick={() => this.handlePause()}>
            Pause
          </IconButton>
          <IconButton icon={<PlayIcon />} 
            placement="left" 
            onClick={() => {
              if(this.startInterval === undefined || this.startInterval === null || this.startInterval === 0)
                this.startInterval = setInterval(() => this.handleCountdown(), 1000);
            }}>
            
            Start
          </IconButton>
          <IconButton icon={<ReloadIcon></ReloadIcon>} placement="left" onClick={() => this.handleReset()}>
            Reset
          </IconButton>
        </ButtonToolbar>
      </div>
    )
  }

  getTimer(){
    const minString = (this.state.min > 9) ? this.state.min : "0" + this.state.min;
    const secString = (this.state.second > 9) ? this.state.second : "0" + this.state.second;
    this.setState({timer: minString + " : " + secString});
  }

  modifyMin(e){
    if(e.target.firstChild.attributes["aria-label"].value === "arrow down")
      this.setState({min: (this.state.min > 0) ? this.state.min - 1 : this.state.min});
    else if(e.target.firstChild.attributes["aria-label"].value === "arrow up")
      this.setState({min: (this.state.min < 59) ? this.state.min + 1 : this.state.min}); 
  }
  
  modifySec(e){
    if(e.target.firstChild.attributes["aria-label"].value === "arrow down")
      this.setState({second: (this.state.second > 0) ? this.state.second - 1 : this.state.second});
    else if(e.target.firstChild.attributes["aria-label"].value === "arrow up")
      this.setState({second: (this.state.second < 59) ? this.state.second + 1 : this.state.second}); 
  }

  handleCountdown(){
    const min = this.state.min;
    const sec = this.state.second;
    
    if(sec === 0 && min === 0 && this.startInterval !== undefined && this.startInterval !== null){
      clearInterval(this.startInterval);
      this.startInterval = 0;
    }
    else if(sec === 0 && min > 0){
      this.setState({second: 59});
      this.setState({min: min - 1});
    }
    else{
      this.setState({second: sec - 1});
    }
  }

  handlePause(){
    clearInterval(this.startInterval);
    this.startInterval = 0;
  }

  handleReset(){
    clearInterval(this.startInterval);
    this.startInterval = 0;
    this.setState({min: 0});
    this.setState({second: 0});
  }
}
