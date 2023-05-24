import {setDoc, doc, getDoc, collection, getDocs} from "firebase/firestore";
import axios from "axios";
import {fireStoreDB} from "../firebase";
import {uid} from "uid";

const axiosURL = 'https://64303a35b289b1dec4c4281e.mockapi.io'

export const getAxiosUsers = async () => {
  try {
    const {data} = await axios.get(axiosURL + '/users')
    return data

  } catch (error) {
    alert('Ошибка при получении пользователей.')
  }


}
export const deleteAxiosUser = async (id) => {
  try {
    await axios.delete(axiosURL + `/users/${id}`)


  } catch (error) {
    alert('Ошибка при удалении пользователя.')
  }


}

export const postAxiosUsers = async (newUser) => {
  try {
    await axios.post(axiosURL + `/users`, newUser)
    const uuid = uid()
    await setDoc(doc(fireStoreDB, "users", uuid), {
      uid: uuid,
      ...newUser
    });

  } catch (err) {

  }


}

export const userIsExistsAxios = async (login) => {
  try {
    const {data} = await axios.get(axiosURL + `/users`)
    const existsUser = data.filter((user) => user.login === login)

    return !!existsUser.length
  } catch (error) {
    alert('Ошибка при проверке на существование пользователя.')
  }

}