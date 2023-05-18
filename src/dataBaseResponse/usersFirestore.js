import {setDoc, doc, collection, getDocs, deleteDoc} from "firebase/firestore";
import {fireStoreDB} from "../firebase";
import {uid} from "uid";


export const getCurrentUserFirestore = async (login,password) => {
  try{
    const usersArr = []
    const userDocs = await getDocs(collection(fireStoreDB, "users"));
    userDocs.forEach((doc) => usersArr.push(doc.data()));

    const currentUser = (usersArr.filter((user) => {
      return user.login === login && user.password === password
    }))[0]

    return currentUser

  }
  catch(error){
    console.log(error)
    console.log('Ошибка при получении пользователя')
    alert('Ошибка при получении пользователя')
  }

}

  export const getUsersFirestore = async () => {
    try {
      const usersArr = []
      const userDocs = await getDocs(collection(fireStoreDB, "users"));
      userDocs.forEach((doc) => {
        usersArr.push(doc.data())
      });

      return usersArr

    } catch (error) {
      console.log(error)
      alert('Ошибка при получении пользователей.')
    }


  }
  export const deleteUserFirestore = async (uid) => {
    try {
      await deleteDoc(doc(fireStoreDB, 'users', uid))
    } catch (error) {
      console.log(error)
      alert('Ошибка при удалении пользователя.')
    }


  }

  export const postUserFirestore = async (newUser) => {
    try {
      const uuid = uid()
      await setDoc(doc(fireStoreDB, "users", uuid), {
        uid: uuid,
        ...newUser
      });
      return uuid

    } catch (error) {
      alert('Ошибка при создании пользователя.')
      console.log(error)

    }


  }

  export const userIsExistsFirestore = async (login) => {
    try {
      const usersArr = []
      const userDocs = await getDocs(collection(fireStoreDB, "users"));
      userDocs.forEach((doc) => {
        usersArr.push(doc.data())
      });

      const existsUser = usersArr.filter((user) => user.login === login)

      return !!existsUser.length
    } catch (error) {
      console.log(error)

      alert('Ошибка при проверке на существование пользователя.')
    }

  }