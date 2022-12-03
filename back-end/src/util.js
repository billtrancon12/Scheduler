/**
 * 
 * @param {String} time1 // String time1 in "hh : mm" format 
 * @param {String} time2  // String time2 in "hh : mm" format
 * @returns {Integer} number // 1 means time1 < time2; -1 means time1 > time2, 0 means time1 = time2
 */
module.exports.compareTime = function compareTime(time1, time2){
  for(let index = 0; index < time1.length; index++){
    if(time1.charCodeAt(index) < time2.charCodeAt(index)){
      return -1;
    }
    else if(time1.charCodeAt(index) > time2.charCodeAt(index)){
      return 1;
    }
  }
  return 0;
}

/**
 * 
 * @param {{hour:Integer, min:Integer}} reminderTime 
 * @returns {Date} date
 */
module.exports.getNextReminderTime = function getNextReminderTime(reminderTime){
	const currDate = new Date();
  const tempDate = new Date();
  tempDate.setHours(currDate.getHours() + reminderTime.hour, currDate.getMinutes() + reminderTime.min, 0, 0);
  
  if(tempDate.getDay() !== currDate.getDay()){
    currDate.setHours(23, 59, 0, 0);
  }
  else{
    currDate.setHours(currDate.getHours() + reminderTime.hour, currDate.getMinutes() + reminderTime.min, 0, 0);
  }
  return currDate;
}

/**
 * 
 * @param {Date} reminderTimeTo 
 * @param {array} calendar 
 * @returns {array}
 */
module.exports.getAllNotification = function getAllNotification(reminderTimeTo, calendar){
  const reminderDay = module.exports.getDay(reminderTimeTo.getDay()).toLowerCase();
  const reminderTime = module.exports.formatTime(reminderTimeTo);
  const currTime = module.exports.formatTime(new Date());
  const notification = [];

  for(const event of calendar){
    if(module.exports.compareTime(currTime, event.time) <= 0 && module.exports.compareTime(event.time, reminderTime) <= 0 && event[reminderDay] !== ""){
      notification.push(event[reminderDay] + " at " + event.time);
    }
  }
  return notification;
}

/**
 * 
 * @param {Date} dateObj
 * @return  {string} time // Time formatted in "hh : mm" 
 */
module.exports.formatTime = function formatTime(dateObj){
	const hourString = (dateObj.getHours() > 9) ? dateObj.getHours() : "0" + dateObj.getHours() ;
	const minuteString = (dateObj.getMinutes() > 9) ? dateObj.getMinutes() : "0" + dateObj.getMinutes();
  return hourString + " : " + minuteString;
}

/**
 * 
 * @param {Integer} date // Date Object 
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
 * @param {*} hour 
 * @returns 
 */
 module.exports.isHour = function isHour(hour){
  if(isNaN(hour)) return false;

  if(typeof hour === "string") {
    const hourNum = parseInt(hour, 10);
    return 0 <= hourNum && hourNum <= 23;
  }
  else if(typeof hour === "number" || typeof hour === "bigint") return 0 <= hour && hour <= 23;
  else return false;
}

/**
 * 
 * @param {*} min 
 * @returns 
 */
module.exports.isMin = function isMin(min){
  if(isNaN(min)) return false;

  if(typeof min === "string"){
    const minNum = parseInt(min, 10);
    return 0 <= minNum && minNum <= 59;
  }
  else if(typeof min === "number" || typeof min === "bigint") return 0 <= min && min <= 59;
  else return false;
}