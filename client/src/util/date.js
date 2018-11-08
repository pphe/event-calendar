/**
 * Converts values from Date object to a string value 
 * accepted by <input type='date'> elements.
 * 
 * @param {Date} theDate a date object
 * @returns {String} formatted as YYYY-MM-DD
 */
export function dateToDateInput(theDate) {
    if (!theDate) return '';
    return [
        theDate.getFullYear().toString().padStart(4, '0'),
        (theDate.getMonth() + 1).toString().padStart(2, '0'),
        theDate.getDate().toString().padStart(2, '0')
    ].join('-');
}

/**
 * Converts values from Date object to a string value 
 * accepted by <input type='time'> elements.
 * 
 * @param {Date} theDate
 * @returns {String} formatted as HH:MM (24-hours)
 */
export function dateToTimeInput(theDate) {
    if (!theDate) return '';
    return [
        theDate.getHours().toString().padStart(2, '0'),
        theDate.getMinutes().toString().padStart(2, '0')
    ].join(':');
}

/**
 * Converts date and time input element values to a Date object.
 * 
 * @param {String} theDate formatted as YYYY-MM-DD
 * @param {String} theTime formatted as HH:MM
 * @returns {Date}
 */
export function convertToDate(theDate, theTime) {
    const date = theDate.split('-');
    date[1]--;
    return new Date(...date, ...theTime.split(':')).toString();
}
