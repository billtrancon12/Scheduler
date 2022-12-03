
/**
 * 
 * @param {Date} date // Date object 
 * @returns {String} formattedDate // Date in format "Day Month Date, Year"
 */
module.exports.formatDate = function formatDate(date){
    return module.exports.getDay(date.getDay()) + " " + module.exports.getMonth(date.getMonth()) + " " + date.getDate() + ", " + date.getFullYear();
}

/**
 * 
 * @param {Date} date // Date Object 
 * @returns {String} day // Returning from Sunday to Saturday according number from 0-6
 */
module.exports.getDay = function getDay(date){
	switch(date){
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2: 
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Monday";
   }
}

	/**
	 * 
	 * @param {Integer} month // Ranging from 0-11 from January-December 
	 * @returns {String} monthString // Get the month according to the number
	 */
module.exports.getMonth = function getMonth(month){
		switch(month){
			case 0:
				return "Jan";
			case 1:
				return "Feb";
			case 2:
				return  "Mar";
			case 3:
				return "Apr";
			case 4:
				return "May";
			case 5:
				return "Jun";
			case 6:
				return "July";
			case 7:
				return "Aug";
			case 8:
				return "Sept";
			case 9:
				return "Oct";
			case 10:
				return "Nov";
			case 11:
				return "Dec";
			default:
				return "Jan";
		}
	}

		/**
	 * 
	 * @param {Integer} date // Ranging from 0-6 from Sunday-Saturday 
	 * @returns {Integer} offset // Offset
	 */
module.exports.getDayOffset = function getDayOffset(date){
	switch(date){
		case 0:
			return 6;
		case 1:
			return 0;
		case 2:
			return 1;
		case 3:
			return 2;
		case 4:
			return 3;
		case 5:
			return 4;
		case 6:
			return 5;
		default:
			return 0;
	}
}


	/**
	 * 
	 * @param {Date} dateObj // Date object
	 * @param {Window} window // window in HTML
	 * @return {String} formattedDate // Return a formatted date in string 
	 */
module.exports.formatTime = function formatTime(dateObj, window){
	const hourString = (dateObj.getHours() > 9) ? dateObj.getHours() : "0" + dateObj.getHours() ;
	const minuteString = (dateObj.getMinutes() > 9) ? dateObj.getMinutes() : "0" + dateObj.getMinutes();
	const secondString = (dateObj.getSeconds() > 9) ? dateObj.getSeconds() : "0" + dateObj.getSeconds();

	if(window.outerWidth > 1150){
		if(dateObj.getHours() < 12)
			return hourString + ":" + minuteString + ":" + secondString + " AM";
		else 
			return hourString + ":" + minuteString + ":" + secondString + " PM";
	}
	else{
		return hourString + " : " + minuteString + ":" + secondString;
	}
}

/**
 * @param {Date} date  // current selected date
 * @returns {String} date // Returning date in format "Month Date, Year" for the this week Monday 
 */
module.exports.getThisWeekMonday = function getThisWeekMonday(date){
	const currDate = new Date(date);
	if(currDate.getDay() !== 1){
		currDate.setDate(currDate.getDate() - module.exports.getDayOffset(currDate.getDay()));
	}
	const monthString = (currDate.getMonth() + 1 > 9) ? currDate.getMonth() + 1 : "0" + (currDate.getMonth() + 1);
	const dayString = (currDate.getDate() > 9) ? currDate.getDate() : "0" + currDate.getDate();

	return monthString + "" + dayString + "" + currDate.getFullYear();
}

/**
 * 
 * @param {Date} date1 // Date object 1 
 * @param {Date} date2 // Date Object 2
 * @returns {Integer} offset  // week offset between two dates
 */
module.exports.getWeekOffset = function getWeekOffset(date1, date2){
	return Math.round((date2 - date1) / (7 * 24 * 60 * 60 * 1000));
}