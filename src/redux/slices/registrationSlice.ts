import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type registrationType = {
    login?: string ,
    password?: string ,
    name?: string ,
    surname?: string ,
    role?: string ,
    group?: string ,
    birthday?: string ,
}

interface registrationSliceType {
    registrationUser: registrationType;
}


const initialState: registrationSliceType = {
    registrationUser: {
        login: '',
        password: '',
        name: '',
        surname: '',
        role: '',
        group: '',
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
          state.registrationUser.role = action.payload.role
          state.registrationUser.group = action.payload.group
          state.registrationUser.birthday = action.payload.birthday
        },
        setRegistrationLogPass(state, action: PayloadAction<registrationType>) {
          state.registrationUser.login=action.payload.login
          state.registrationUser.password=action.payload.password
        },
        clearRegistrationData(state) {
            state.registrationUser.login = ''
            state.registrationUser.password = ''
            state.registrationUser.name = ''
            state.registrationUser.surname = ''
            state.registrationUser.role = ''
            state.registrationUser.group = ''
            state.registrationUser.birthday = ''
        },

    }
})

export const {setRegistrationAbout,setRegistrationLogPass,clearRegistrationData} = registrationSlice.actions
export default registrationSlice.reducer












