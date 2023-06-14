import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {taskType} from "../../types/types";
import {registrationType} from "./registrationSlice";



interface tasksSliceType {
    taskItems:taskType[]
}
const initialState:tasksSliceType = {
    taskItems:[]
}

const tasksSlice=createSlice({
  name:'tasks',
  initialState,
  reducers:{
      setTaskItems(data,action:PayloadAction<taskType[]>){
          data.taskItems=action.payload
      },
      deleteTaskByUid(data,action: PayloadAction<string>){
          data.taskItems=data.taskItems.filter((task) =>task.uid!== action.payload)
      },


  }
})

export const {}=tasksSlice.actions
export default tasksSlice.reducer