import React, { Component } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { formatTime, getThisWeekMonday} from '../../functions/time';
import {generateDateInputOption, generateHeader, generateTimeFromOption, generateTimeToOption} from '../../functions/generate';
import { checkToolHomepage, checkHeader, resizeHeader, resizeToolHomepage, unclickAdd, resizeUIWrapper} from '../../functions/checkHomepage';
import '../css/homepage.css';
import HomepageHeader from '../../components/homepageHeader/homepageHeader';
import ToolHomepage from '../../components/toolHomepage';
import Calendar from '../../components/calendar';
import AddEventForm from '../../components/addEventForm';


export default class Homepage extends Component {
	constructor(props){
		super(props);
		this.state = {
			offsetWeek: 0,
			username: sessionStorage.getItem('username'),
			data: [],
			headers: [],
			time: "",
			date_input: "",
			title_task: "",
			time_from: "",
			time_to: "",
			description: "",
			calendarDate: new Date(),
			navigate: true,
		};
	}

	componentDidMount(){
		this.getUserInfo(new Date());
		this.setState({headers: generateHeader(new Date())});
		this.timeInterval = setInterval(() => {			
			this.setState({ time: formatTime(new Date(), window)})
		}, 1000);
		this.checkAllHeader();
		resizeUIWrapper();

		window.addEventListener('resize', () => {
			const header = document.getElementsByClassName('header_wrapper')[0];
			const table = document.getElementsByClassName('calendar_table_wrapper')[0];		
			header.style.width = table.offsetWidth + 'px';
		});

		window.addEventListener('click', (e) => unclickAdd(e));

		window.addEventListener('resize', () => resizeUIWrapper());
	}

	checkAllHeader(){
		this.headerInterval = setInterval(() => resizeHeader(), 100);
		this.toolInterval = setInterval(() => resizeToolHomepage(), 100);
		if(checkToolHomepage()) clearInterval(this.toolInterval);
		if(checkHeader()) clearInterval(this.headerInterval);
	}

	componentWillUnmount() {
		clearInterval(this.timeInterval);
	}

  render() {
		document.title = "Homepage";

		if(sessionStorage.getItem('login') === "true"){
    	return (
				<div className='homepage'>
					<HomepageHeader time={this.state.time} logoutHandler={() => this.handleLogout()}></HomepageHeader>
					<ToolHomepage 
						addHandler={() => this.addHandler()} 							
						calendarDate={this.state.calendarDate} 
						onChangeDate={(date) => this.handleChangeDate(date)} 
						navigateCalendar={(e) => this.navigateCalendar(e)}>
					</ToolHomepage>
					<Calendar 
						data={this.state.data} 
						headers={this.state.headers} 
						style={[
            	{
                tag: "Testing",
                color: 'pink'
            	},
            	{
                tag: "NotTesting",
                color: 'lightBlue'
            	}
        	]}>
					</Calendar>
					<AddEventForm 
						dateOptions={generateDateInputOption()}
						timeFOptions={generateTimeFromOption()}
						timeTOptions={generateTimeToOption(this.state.time_from)}
						onSubmit={(e) => this.addScheduleHandler(e)}
						onChange={(e) => this.handleChange(e)}>
					</AddEventForm>
				</div>
    )
		}
		else{
			return(
				<Navigate to='/'></Navigate>
			)
		}
  }

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	handleChangeDate(date){
		this.setState({calendarDate: date});	
		this.setState({headers: generateHeader(date)});
		this.getUserInfo(date);
	}

	handleLogout(){
		sessionStorage.setItem('login', "false");
	}

	navigateCalendar(e){
		let newWeek = 0;
		if(e.target.id === "left_arrow" || e.target.parentElement.id === "left_arrow"){
			newWeek = new Date(this.state.calendarDate.getFullYear(), this.state.calendarDate.getMonth(), this.state.calendarDate.getDate() - 7);
		}
		else{
			newWeek = new Date(this.state.calendarDate.getFullYear(), this.state.calendarDate.getMonth(), this.state.calendarDate.getDate() + 7);
		}
		this.setState({calendarDate: new Date(newWeek)});
		this.setState({headers: generateHeader(newWeek)})
		this.getUserInfo(newWeek);
		
		// Pause navigating for the current calendar to load
		document.getElementById('left_arrow').classList.toggle('loading');
		document.getElementById('right_arrow').classList.toggle('loading');
		this.setState({navigate: false});
	}

	addScheduleHandler(e){
		e.preventDefault();
		axios.post("http://localhost:4003/create_schedule", {
			username: this.state.username,
			date: getThisWeekMonday(this.state.calendarDate),
			event: {
				start: this.state.time_from,
				end: this.state.time_to,
				title: this.state.title_task,
				day: this.state.date_input
			}
		})
		.then((res)=>{
			const info = JSON.parse(res.data);

			if(info.status === false){
				alert(info.message);
				window.location.reload();
			}
			else{
				this.setState({data: info.data});
				this.addHandler();
			}
		})
		.catch((err) => {
			console.log(err)
		})
	}

	addHandler(){
		document.getElementsByClassName('ui_wrapper')[0].classList.toggle("clicked");
		document.body.classList.toggle('ui_wrapper_clicked');
		document.querySelectorAll(".homepage > *:not(:last-child)").forEach((el) => {
			el.classList.toggle("ui_wrapper_clicked");
		})
	}

	getUserInfo(date){
		if(document.getElementsByClassName("homepage")[0] !== undefined){
			axios.get(`http://localhost:4002/user/?username=${this.state.username}&date=${getThisWeekMonday(date)}`)
			.then(res =>{
				const info = JSON.parse(res.data);
				this.setState({data: info.data});

				// Unpause navigating calendar
				if(!this.state.navigate){
					document.getElementById('left_arrow').classList.toggle('loading');
					document.getElementById('right_arrow').classList.toggle('loading');
					this.setState({navigate: true})
				}
			})
			.catch(err => {
				console.log(err);
			})
		}
	}
}
