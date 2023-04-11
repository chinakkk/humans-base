import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type userType = {
    login: string | null,
    password: string | null,
    name: string | null,
    surname: string | null,
    role: string | null,
    group: string | null,
    birthday: string | null,
}

interface userSliceType {
    user: userType;
}


const initialState: userSliceType = {
    user: {
        login: null,
        password: null,
        name: null,
        surname: null,
        role: null,
        group: null,
        birthday: null,
    }

}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<userType>) {
            state.user.login = action.payload.login
            state.user.password = action.payload.password
            state.user.name = action.payload.name
            state.user.surname = action.payload.surname
            state.user.role = action.payload.role
            state.user.group = action.payload.group
            state.user.birthday = action.payload.birthday
        },
        removeUser(state) {
            state.user.login = null
            state.user.password = null
            state.user.name = null
            state.user.surname = null
            state.user.role = null
            state.user.group = null
            state.user.birthday = null
        }
    }
})

export const {setUser,removeUser} = userSlice.actions
export default userSlice.reducer












