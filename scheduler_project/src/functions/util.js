
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