import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type userType = {
    id?: string,
    login: string | null,
    password?: string | null,
    name: string | null,
    surname: string | null,
    level: string | null,
    birthday: string | null,
}

interface userSliceType {
    user: userType;
    adminUser: { login: string };
}


const initialState: userSliceType = {
    user: {
        login: '',
        password: '',
        name: '',
        surname: '',
        level: '',
        birthday: '',
    },
    adminUser: {
        login: 'a'
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
            state.user.level = action.payload.level
            state.user.birthday = action.payload.birthday
        },
        removeUser(state) {
            state.user.login = null
            state.user.password = null
            state.user.name = null
            state.user.surname = null
            state.user.level = null
            state.user.birthday = null
        }
    }
})

export const {setUser, removeUser} = userSlice.actions
export default userSlice.reducer












