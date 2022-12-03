import React, { Component } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { formatTime } from './functions/time';
import './pages/css/homepage.css';
import HomepageHeader from './components/homepageHeader/homepageHeader';
import HomepageContent from './pages/content/homepageContent';
import { getThisWeekMonday } from './functions/time'
import axios from 'axios';
import Settings from './pages/content/settings';


export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			time: "",
      notification: [],
			reminderHour: 1,		// default value
			reminderMin: 30,		// default value
		};
	}

	componentDidMount(){
		this.timeInterval = setInterval(() => {			
			this.setState({ time: formatTime(new Date(), window)})
		}, 1000);
		this.getNotification();
	}

  render() {
		document.title = "Homepage";
		if(sessionStorage.getItem('login') === "true"){
    	return (
				<React.Fragment>
					<HomepageHeader time={this.state.time} notification={this.state.notification}></HomepageHeader>
          <Routes>
            <Route path='/' element={<HomepageContent></HomepageContent>}></Route>
						<Route path='/setting' element={<Settings></Settings>}></Route>
            <Route path='/*' element={<div>404 Not Found</div>}></Route>
          </Routes>
				</React.Fragment>
    )
		}
		
		return(
			<Navigate to='/'></Navigate>
		)
  }

  getNotification(){
    axios.get(`http://localhost:4002/reminder/?username=${sessionStorage.getItem('username')}&date=${getThisWeekMonday(new Date())}&hour=${this.state.reminderHour}&min=${this.state.reminderMin}`)
    .then((res) => {
      const data = JSON.parse(res.data);
			if(data.status === false){
				alert(data.message);
			}

			this.setState({notification: data.data});
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

