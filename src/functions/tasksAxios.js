import axios from "axios";

export const getAllAxiosTasks = async () => {
  try {
    const {data} = await axios.get('https://64303a35b289b1dec4c4281e.mockapi.io/tasks')
    return data

  } catch (error) {
    alert('Ошибка при получении закладок всех пользователей.')
  }

}
export const getAxiosTasksAboutLogin = async (login) => {
  try {
    const {data} = await axios.get('https://64303a35b289b1dec4c4281e.mockapi.io/tasks')
    return data.filter((task) => task.login === login)

  } catch (error) {
    alert('Ошибка при получении закладок пользователя.')
  }

}

export const deleteAxiosTask = async (id) => {
  try {
    await axios.delete(`https://64303a35b289b1dec4c4281e.mockapi.io/tasks/${id}`)
  } catch (error) {
    alert('Ошибка при удалении закладки.')
  }
}

export const updateAxiosTask = async (id, task) => {
  await axios.put(`https://64303a35b289b1dec4c4281e.mockapi.io/tasks/${id}`, task)
}

export const addAxiosTaskAboutLogin = async (login,title,text,date) => {
  const today = new Date()
  const options = { day: 'numeric', month: 'numeric' }
  const formattedDate = today.toLocaleDateString('en-GB', options).replace('/','.')

  const newTask={
    title:  title,
    text:  text,
    date: date||formattedDate,
    login: login,
    state: false,
  }
  if(title.length) await axios.post('https://64303a35b289b1dec4c4281e.mockapi.io/tasks/',newTask)
}

