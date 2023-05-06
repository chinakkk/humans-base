import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type registrationType = {
    login?: string,
    password?: string,
    repeatPassword?: string,
    name?: string,
    surname?: string,
    level?: string,
    birthday?: string,
}

interface registrationSliceType {
    registrationUser: registrationType;
}

const localStorageRegistrationUser = JSON.parse(localStorage.getItem('registrationUser') || '{}')

const initialState: registrationSliceType = {
    registrationUser: {
        login: localStorageRegistrationUser.login || '',
        password: localStorageRegistrationUser.password || '',
        repeatPassword: localStorageRegistrationUser.repeatPassword || '',
        name: localStorageRegistrationUser.name || '',
        surname: localStorageRegistrationUser.surname || '',
        level: localStorageRegistrationUser.level || '',
        birthday: localStorageRegistrationUser.birthday || '',
    }

}

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setRegistrationAbout(state, action: PayloadAction<registrationType>) {
            state.registrationUser.name = action.payload.name
            state.registrationUser.surname = action.payload.surname
            state.registrationUser.level = action.payload.level
            state.registrationUser.birthday = action.payload.birthday
            localStorage.setItem('registrationUser',JSON.stringify(state.registrationUser))
        },
        setRegistrationLogPass(state, action: PayloadAction<registrationType>) {
            state.registrationUser.login = action.payload.login
            state.registrationUser.password = action.payload.password
            state.registrationUser.repeatPassword = action.payload.repeatPassword
            localStorage.setItem('registrationUser',JSON.stringify(state.registrationUser))

        },
        clearRegistrationData(state) {
            state.registrationUser.login = ''
            state.registrationUser.password = ''
            state.registrationUser.name = ''
            state.registrationUser.surname = ''
            state.registrationUser.level = ''
            state.registrationUser.birthday = ''
            state.registrationUser.repeatPassword = ''
            localStorage.removeItem('registrationUser')

        },

    }
})

export const {setRegistrationAbout, setRegistrationLogPass, clearRegistrationData} = registrationSlice.actions
export default registrationSlice.reducer












