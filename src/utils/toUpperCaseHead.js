export const toUpperCaseHead = (string) => {
  return string[0].toUpperCase() + string.slice(1).toLowerCase()
}

export const currentDate = () => {

  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')
  const hours = String(currentDate.getHours()).padStart(2, '0')
  const minutes = String(currentDate.getMinutes()).padStart(2, '0')
  const seconds = String(currentDate.getSeconds()).padStart(2, '0')

  return `${year}${month}${day}${hours}${minutes}${seconds}`
}

export const convertDate = (birthDaInputValue) => {
  const birthDayArr=birthDaInputValue.split('-')
  const birthDay = `${birthDayArr[2]}.${birthDayArr[1]}.${birthDayArr[0]}`
  return birthDay
}
export const resetConvertDate = (birthDaInputValue) => {
  const birthDayArr=birthDaInputValue.split('.')
  const birthDay = `${birthDayArr[2]}-${birthDayArr[1]}-${birthDayArr[0]}`
  return birthDay
}
