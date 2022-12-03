import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import { formatTime} from '../../functions/time';
import '../css/homepage.css';
import HomepageHeader from '../../components/homepageHeader/homepageHeader';
import HomepageContent from './homepageContent';


export default class Homepage extends Component {
	constructor(props){
		super(props);
		this.state = {
			time: "",
		};
	}

	componentDidMount(){
		this.timeInterval = setInterval(() => {			
			this.setState({ time: formatTime(new Date(), window)})
		}, 1000);
	}

  render() {
		document.title = "Homepage";

		if(sessionStorage.getItem('login') === "true"){
    	return (
				<React.Fragment>
					<HomepageHeader time={this.state.time} logoutHandler={() => this.handleLogout()}></HomepageHeader>
					<HomepageContent></HomepageContent>
				</React.Fragment>
    )
		}
		
		return(
			<Navigate to='/'></Navigate>
		)
  }

}
