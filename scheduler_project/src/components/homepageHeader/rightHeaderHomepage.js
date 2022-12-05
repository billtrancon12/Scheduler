import React, { Component } from 'react'
import AccountMenu from '../ReactMenu'
import InboxIcon from '@mui/icons-material/Inbox';
import '../../pages/css/rightHeaderHomepage.css';
import PropTypes from 'prop-types';
import { toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default class RightHeaderHomepage extends Component {
	constructor(props){
		super(props);
		this.state = {
			inbox: [],
		}
	}
	render() {
    return (
      <div className="right_header_homepage_wrapper">
        <div className="inbox_icon_wrapper">
					<InboxIcon onClick={() => this.showInbox()}></InboxIcon>
				</div>
        <AccountMenu 
          logoutHandler={this.props.logoutHandler} 
          settingLink="/homepage/setting"
          notificationLink="/homepage/notification"
          profileLink="/homepage/profile"
        ></AccountMenu>
				{this.state.inbox}
      </div>
    )
  }

	showInbox(){
		if(this.props.notification.length === 0){
			alert("Inbox is empty");
			return;
		}

		this.props.notification.forEach((notification, index) => {
			if(index === 0)
				toast(notification, {style: {marginTop: "50px"}});
			else
				toast(notification);
		})
		
		this.setState({inbox: <ToastContainer autoClose="8000" toastStyle={{marginTop: "10px"}} className="niceText"></ToastContainer>})
	}
}

RightHeaderHomepage.propTypes = {
	logoutHandler: PropTypes.func.isRequired,
	notification: PropTypes.array.isRequired,
}
