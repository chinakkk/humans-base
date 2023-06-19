import {collection, deleteDoc, doc, getDocs, setDoc, query, where, updateDoc} from "firebase/firestore";
import {fireStoreDB} from "../firebase";
import {uid} from "uid";
import {getCurrentDate} from "../utils/toUpperCaseHead";

export const getAllTasksFirestore = async () => {
  try {
    const tasksArr = []
    const tasksDoc = await getDocs(collection(fireStoreDB, 'tasks'))
    tasksDoc.forEach((taskDoc) => tasksArr.push(taskDoc.data()))
    return tasksArr

  } catch (error) {
    console.log(error)
    console.log('Ошибка при получении закладок всех пользователей.')
    alert('Ошибка при получении закладок всех пользователей.')


  }

}
export const getTasksByUserUIDFirestore = async (userUID) => {
  try {

    const tasksArr = []
    const queryDoc = query(collection(fireStoreDB, "tasks"), where("userUID", "==", userUID));

    const tasksDoc = await getDocs(queryDoc)
    tasksDoc.forEach((taskDoc) => tasksArr.push(taskDoc.data()))

    return tasksArr


  } catch (error) {
    console.log(error)
    console.log('Ошибка при получении тасков пользователя.')
    alert('Ошибка при получении тасков пользователя.')

  }
}

export const deleteTaskByUIDFirestore = async (uid) => {
  try {

    await deleteDoc(doc(fireStoreDB, 'tasks', uid))

  } catch (error) {
    console.log(error)
    alert('Ошибка при удалении таска.')
    console.log('Ошибка при удалении таска.')

  }
}
export const deleteAllTaskByUIDFirestore = async (uid) => {
  try{
    const userTasks = await getTasksByUserUIDFirestore(uid)
    userTasks.forEach((userTask) => {
      deleteTaskByUIDFirestore(userTask.uid)
    })
  }
  catch(error){
    console.log('Ошибка при удалении всех тасков.')
    console.log(error)
    alert('Ошибка при удалении всех тасков.')

  }
}

export const setStateTaskByUIDFirestore = async (uid, newState) => {
  try {
    await updateDoc(doc(fireStoreDB, 'tasks', uid), {
      state: newState
    })
  } catch (error) {
    console.log('Ошибка при изменении состояния таска.')
    console.log(error)
    alert('Ошибка при изменении состояния таска.')
  }
}
export const updateTaskByUIDFirestore = async (uid, updatedTask) => {
  try {
    await updateDoc(doc(fireStoreDB, 'tasks', uid), updatedTask)
  } catch (error) {
    console.log('Ошибка при изменении таска.')
    console.log(error)
    alert('Ошибка при изменении таска.')
  }
}


export const postTaskByLoginFirestore = async (username, title, text, userUID) => {
  try {

    const uuid = uid()

    const newTask = {
      title: title,
      text: text || '',
      date: getCurrentDate() || '',
      username: username || '',
      state: false,
      userUID: userUID,
      uid: uuid || ''
    }

    if (!!title.length) await setDoc(doc(fireStoreDB, 'tasks', uuid), newTask)

  } catch (error) {
    console.log(error)
    console.log('Ошибка при добавлении таска.')

    alert('Ошибка при добавлении таска.')

  }

}

