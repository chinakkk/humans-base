import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type registrationType = {
    login?: string ,
    password?: string ,
    repeatPassword?: string ,
    name?: string ,
    surname?: string ,
    level?: string ,
    birthday?: string ,
}

interface registrationSliceType {
    registrationUser: registrationType;
}


const initialState: registrationSliceType = {
    registrationUser: {
        login: '',
        password: '',
        repeatPassword:'',
        name: '',
        surname: '',
        level: '',
        birthday: '',
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
        },
        setRegistrationLogPass(state, action: PayloadAction<registrationType>) {
          state.registrationUser.login=action.payload.login
          state.registrationUser.password=action.payload.password
          state.registrationUser.repeatPassword=action.payload.repeatPassword
        },
        clearRegistrationData(state) {
            state.registrationUser.login = ''
            state.registrationUser.password = ''
            state.registrationUser.name = ''
            state.registrationUser.surname = ''
            state.registrationUser.level = ''
            state.registrationUser.birthday = ''
            state.registrationUser.repeatPassword = ''
        },

    }
})

export const {setRegistrationAbout,setRegistrationLogPass,clearRegistrationData} = registrationSlice.actions
export default registrationSlice.reducer












