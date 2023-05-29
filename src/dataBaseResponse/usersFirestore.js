import {setDoc, doc, collection, getDocs, deleteDoc, getDoc, updateDoc} from "firebase/firestore";
import {fireStoreDB} from "../firebase";
import {uid} from "uid";


export const updateImgByUidFirestore = async (uid, imageURL) => {

  const userRef = doc(fireStoreDB, "users", uid);

  await updateDoc(userRef, {
    imageURL: imageURL
  });
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
      ...newUser,
      uid: uuid
    });
    console.log(uuid)
    return uuid

  } catch (error) {
    alert('Ошибка при создании пользователя.')
    console.log(error)

  }


}

export const usernameIsExistsFirestore = async (login) => {
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

export const getUserByUid = async (uid) => {
  try {
    const user = await getDoc(doc(fireStoreDB, 'users', uid))
    return user.data()

  } catch (error) {
    console.log(error)
    alert('Ошибка при поиске по uid.')
  }

}

export const getCurrentUserFirestore = async (login, password) => {
  try {
    const usersArr = []
    const userDocs = await getDocs(collection(fireStoreDB, "users"));
    userDocs.forEach((doc) => usersArr.push(doc.data()));

    const currentUser = (usersArr.filter((user) => {
      return user.login === login && user.password === password
    }))[0]

    return currentUser

  } catch (error) {
    console.log(error)
    console.log('Ошибка при получении пользователя')
    alert('Ошибка при получении пользователя')
  }

}