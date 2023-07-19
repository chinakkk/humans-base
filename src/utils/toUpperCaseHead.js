export const toUpperCaseHead = (string) => {
  return string[0].toUpperCase() + string.slice(1).toLowerCase()
}

export const getCurrentDate = () => {

  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')
  const hours = String(currentDate.getHours()).padStart(2, '0')
  const minutes = String(currentDate.getMinutes()).padStart(2, '0')
  const seconds = String(currentDate.getSeconds()).padStart(2, '0')

  return `${year}${month}${day}${hours}${minutes}${seconds}`
}

export const getCurrentDateUTC = () => {
  const currentDate = new Date()

  const year = currentDate.getUTCFullYear()
  const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getUTCDate()).padStart(2, '0')
  const hours = String(currentDate.getUTCHours()).padStart(2, '0')
  const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0')
  const seconds = String(currentDate.getUTCSeconds()).padStart(2, '0')

  return `${year}${month}${day}${hours}${minutes}${seconds}`

}
export const transformDateFromUser = (date) => {

  const year = parseInt(date.slice(0, 4), 10);
  const month = parseInt(date.slice(4, 6), 10) - 1;
  const day = parseInt(date.slice(6, 8), 10);
  const hour = parseInt(date.slice(8, 10), 10);
  const minute = parseInt(date.slice(10, 12), 10);
  const second = parseInt(date.slice(12, 14), 10);

  const userDate = new Date(year, month, day, hour, minute, second);

  // Изменение времени на указанное количество часов
  userDate.setHours(userDate.getHours() - (new Date().getTimezoneOffset() / 60));


  const newYear = userDate.getFullYear()
  const newMonth = String(userDate.getMonth() + 1).padStart(2, '0')
  const newDay = String(userDate.getDate()).padStart(2, '0')
  const newHours = String(userDate.getHours()).padStart(2, '0')
  const newMinutes = String(userDate.getMinutes()).padStart(2, '0')
  const newSeconds = String(userDate.getSeconds()).padStart(2, '0')

  return `${newYear}${newMonth}${newDay}${newHours}${newMinutes}${newSeconds}`
}
export const convertDate = (birthDaInputValue) => {
  const birthDayArr = birthDaInputValue.split('-')
  const birthDay = `${birthDayArr[2]}.${birthDayArr[1]}.${birthDayArr[0]}`
  return birthDay
}
export const resetConvertDate = (birthDaInputValue) => {
  if (!birthDaInputValue) return ''
  const birthDayArr = birthDaInputValue.split('.')
  const birthDay = `${birthDayArr[2]}-${birthDayArr[1]}-${birthDayArr[0]}`
  return birthDay
}


export const getFullDate=(month, day) =>{
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${months[month-1]} ${day}`;
}
