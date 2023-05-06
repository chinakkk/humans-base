import axios from "axios";

export const getAllAxiosTasks = async () => {
  try {
    const {data} = await axios.get('https://64303a35b289b1dec4c4281e.mockapi.io/tasks')
    return data

  } catch (error) {
    console.log('Ошибка при получении закладок всех пользователей.')
    alert('Ошибка при получении закладок всех пользователей.')


  }

}
export const getAxiosTasksAboutLogin = async (login) => {
  try {
    const {data} = await axios.get('https://64303a35b289b1dec4c4281e.mockapi.io/tasks')
    return data.filter((task) => task.login === login)

  } catch (error) {
    console.log('Ошибка при получении закладок пользователя.')
    alert('Ошибка при получении закладок пользователя.')

  }

}

export const deleteAxiosTaskById = async (id) => {
  try {
    await axios.delete(`https://64303a35b289b1dec4c4281e.mockapi.io/tasks/${id}`)
  } catch (error) {
    alert('Ошибка при удалении закладки.')
    console.log('Ошибка при удалении закладки.')

  }
}

export const updateAxiosTask = async (id, task) => {
  try{
    await axios.put(`https://64303a35b289b1dec4c4281e.mockapi.io/tasks/${id}`, task)
  }
  catch(error){
    console.log('Ошибка при изменении состояния таска.')
    alert('Ошибка при изменении состояния таска.')
  }
}

export const addAxiosTaskAboutLogin = async (username, title, text, date) => {
  try{
    const today = new Date()
    const options = {day: 'numeric', month: 'numeric', year: 'numeric'}
    const formattedTodayDate = today.toLocaleDateString('en-GB', options).replaceAll('/', '.')

    const newTask = {
      title: title,
      text: text || '',
      date: date || formattedTodayDate,
      login: username || '',
      state: false,
    }
    if (title.length) await axios.post('https://64303a35b289b1dec4c4281e.mockapi.io/tasks/', newTask)
  }
  catch(error){
    console.log('Ошибка при добавлении таска.')
    alert('Ошибка при добавлении таска.')

  }

}

