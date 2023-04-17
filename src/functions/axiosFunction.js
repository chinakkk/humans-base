import axios from "axios";

export const getAxiosUsers = async () => {
  try {
    const {data} = await axios.get('https://64303a35b289b1dec4c4281e.mockapi.io/users')
    return data

  } catch (error) {
    alert('Ошибка при получении пользователей.')
  }

}
export const deleteAxiosUser = async (id) => {
  try {
    await axios.delete(`https://64303a35b289b1dec4c4281e.mockapi.io/users/${id}`)
  } catch (error) {
    alert('Ошибка при удалении пользователя.')
  }
}

export const userIsExistsAxios = async (login) => {
  try {
    const {data} = await axios.get(`https://64303a35b289b1dec4c4281e.mockapi.io/users`)
    const existsUser = data.filter((user) => user.login === login)
    console.log(existsUser)

    return !!existsUser.length
  } catch (error) {
    alert('Ошибка при проверке, существует ли пользователь.')
  }

}
