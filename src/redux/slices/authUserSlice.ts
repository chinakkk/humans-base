import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const localStorageUser = JSON.parse(localStorage.getItem('user') || '{}')

export type userType = {
    uid?: string,
    login: string,
    password?: string,
    name: string,
    surname: string,
    level: string,
    birthday: string,
    imageURL?: string,
    about?:string,
}

interface userSliceType {
    user: userType;
    adminUser: { login: string };
}
const initialState: userSliceType = {
    user: {
        login: localStorageUser.login || '',
        password: localStorageUser.password || '',
        name: localStorageUser.name || '',
        surname: localStorageUser.surname || '',
        level: localStorageUser.level || '',
        birthday: localStorageUser.birthday || '',
        uid: localStorageUser.uid || '',
        imageURL: localStorageUser.imageURL || '',
        about: localStorageUser.about || '',


    },
    adminUser: {
        login: 'a'
    }
}

const authUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<userType>) {
            state.user.login = action.payload.login
            state.user.name = action.payload.name
            state.user.surname = action.payload.surname
            state.user.level = action.payload.level
            state.user.birthday = action.payload.birthday
            state.user.uid = action.payload.uid
            state.user.imageURL = action.payload.imageURL
            state.user.about = action.payload.about

            localStorage.setItem('user', JSON.stringify(state.user))

        },
        removeUser(state) {
            state.user.login = ''
            state.user.password = ''
            state.user.name = ''
            state.user.surname = ''
            state.user.level = ''
            state.user.birthday = ''
            state.user.uid = ''
            state.user.imageURL = ''
            state.user.about = ''

            localStorage.removeItem('user')

        }
    }
})

export const {setUser, removeUser} = authUserSlice.actions
export default authUserSlice.reducer












