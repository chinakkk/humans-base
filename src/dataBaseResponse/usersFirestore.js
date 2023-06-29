import {setDoc, doc, collection, getDocs, deleteDoc, getDoc, updateDoc} from "firebase/firestore";
import {fireStoreDB, storage} from "../firebase";
import {uid} from "uid";
import {deleteObject, ref} from "firebase/storage";
import {setUser} from "../redux/slices/authUserSlice";
import {deleteAllTaskByUIDFirestore} from "./tasksFirestore";


export const updateImgByUidFirestore = async (uid, imageURL) => {
  try {
    const userRef = doc(fireStoreDB, "users", uid);

    await updateDoc(userRef, {
      imageURL: imageURL
    });
  } catch (error) {
    alert('Ошибка при добавлении фотографии в FS.')
    console.log(error)
  }
}
export const updateUserInfoByUidFirestore = async (uid, userObj) => {
  try {
    const userRef = doc(fireStoreDB, "users", uid);

    await updateDoc(userRef, userObj);
  } catch (error) {
    alert('Ошибка при изменении данных пользователя в FS.')
    console.log(error)
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
export const deleteUserFirestore = async (uid,image) => {
  try {
    //удаление пользователя
    await deleteDoc(doc(fireStoreDB, 'users', uid))

    //удаление фото пользователя
    if (!!image){
      const deleteRef = ref(storage, `programmersImg/${uid}`);
      deleteObject(deleteRef).then().catch((error) => {
        console.log('Ошибка при удалении фотографии пользователя.')
        console.log(error)
      });
    }

    //удаление тасков пользователя
    await deleteAllTaskByUIDFirestore(uid)

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

export const getUserByUidFirestore = async (uid) => {
  try {
    const user = await getDoc(doc(fireStoreDB, 'users', uid))
    return user.data()

  } catch (error) {
    console.log(error)
    console.log('Ошибка при получении пользователя по id.')
  }

}