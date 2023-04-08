import {createSlice, PayloadAction} from "@reduxjs/toolkit";



export type userType={
    login: string,
    password: string,
    name: string,
    surname: string,
    role: string,
    group: string,
    birthday: string,
}

interface userSliceType {
    user:userType|null;
}


const initialState:userSliceType= {
    user: null

}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<userType|null>) {
            state.user=action.payload
        }
    }
})

export const {setUser} = userSlice.actions
export default userSlice.reducer












