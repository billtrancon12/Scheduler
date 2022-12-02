import { getDayOffset, formatDate, getDay} from "./time";
/**
 * 
 * @param {Date} date // Date object
 * @return {Array} headers // Returning headers for table
 */
export function generateHeader(date){
	const currDate = new Date(date);
	const headers = [{
		Header: 'Time',
		accessor: 'time'
	}];

	if(currDate.getDay() !== 1){
		currDate.setDate(currDate.getDate() - getDayOffset(currDate.getDay()));
	}

	for(let i = 0; i < 7; i++){
		headers.push({
			Header: `${formatDate(currDate)}`,
			accessor: `${getDay(currDate.getDay()).toLowerCase()}`
		})

		currDate.setDate(currDate.getDate() + 1);
	}
	return headers;
}

export function generateDateInputOption(){
  return [
    {
      id: "monday_option",
      selectable: true,
      value: 'monday',
      placeholder: 'Monday'
    },
    {
      id: "tuesday_option",
      selectable: true,
      value: 'tuesday',
      placeholder: 'Tuesday'
    },
    {
      id: "wednesday_option",
      selectable: true,
      value: 'wednesday',
      placeholder: 'Wednesday'
    },
    {
      id: "thursday_option",
      selectable: true,
      value: 'thursday',
      placeholder: 'Thursday'
    },
  	{
    	id: "friday_option",
      selectable: true,
      value: 'friday',
      placeholder: 'Friday'
    },
    {
      id: "saturday_option",
      selectable: true,
      value: 'saturday',
      placeholder: 'Saturday'
    },
    {
      id: "sunday_option",
      selectable: true,
      value: 'sunday',
      placeholder: 'Sunday'
    },
    {
      id: "date_option",
      selectable: false,
      value: null,
      placeholder: 'Select date'
    }
  ]
}

/**
 * 
 * @returns {Array} // Time from input options
 */
export function generateTimeFromOption(){
    const interval = 30;
    const options = [];
    for(let hour = 0; hour < 24; hour++){
        for(let min = 0; min < 60; min += interval){
            const hourString = (hour > 9) ? hour : "0" + hour ;
            const minuteString = (min > 9) ? min : "0" + min;
            options.push({
                id: hour+min+"time_from_option",
                selectable: true,
                value: hourString + " : " + minuteString,
                placeholder: hourString + ":" + minuteString
            })
        }
    }
    options.push({
        id: 'time_from_option',
        selectable: false,
        value: null,
        placeholder: 'Select time'
    })

    return options;
}

/**
 * 
 * @param {String} time_from // Time from input 
 * @returns {Array} options // Time to input options
 */
export function generateTimeToOption(time_from){	
    const interval = 30;
    const options = [];
    let time_to_start_hour = 0;
    let time_to_start_min = 0;

    if(time_from !== ""){
        const hour_from = time_from.split(":")[0];
        const min_from = time_from.split(":")[1];

        if(!isNaN(hour_from)){
            time_to_start_hour = parseInt(hour_from, 10);
        }
        if(!isNaN(min_from)){
            time_to_start_min = parseInt(min_from, 10);
        }

        if((time_to_start_min + interval) % 60 === 0){
            time_to_start_min = 0;
            time_to_start_hour++;
        }
        else time_to_start_min += interval;
    }

    for(let hour = time_to_start_hour; hour < 24; hour++){
        for(let min = time_to_start_min; min < 60; min += interval){
            const hourString = (hour > 9) ? hour : "0" + hour ;
            const minuteString = (min > 9) ? min : "0" + min;
            options.push({
                id: hour+min+"time_from_option",
                selectable: true,
                value: hourString + " : " + minuteString,
                placeholder: hourString + ":" + minuteString
            })
        }
    }
    options.push({
        id: 'time_from_option',
        selectable: false,
        value: null,
        placeholder: 'Select time'
    })
    return options;
}
