import React from 'react';
import styles from './App.module.scss'
import {Navigate, Route, Routes} from 'react-router-dom'
import MenuLayout from "./layouts/MenuLayout/MenuLayout";
import Profile from "./pages/menuPages/Profile/Profile";
import Programmers from "./pages/menuPages/Programmers/Programmers";
import Authentication from "./pages/formPages/Authentication/Authentication";
import RegistrationAbout from "./pages/formPages/RegistrationAbout";
import Home from "./pages/Home/Home";
import Tasks from "./pages/menuPages/Tasks/Tasks";
import Chat from "./pages/menuPages/Chat/Chat";
import RegistrationLogin from "./pages/formPages/RegistrationLogin";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store";


function App() {
    console.log('UPD')
    const {user} = useSelector((state: RootState) => state.userSlice)
    const {registrationUser} = useSelector((state: RootState) => state.registrationSlice)
    const onClickTestButton=() => {
        console.log('------testButton------')

        console.log('------testButton------')
    }
    return (
        <div className={styles.container}>
            <button onClick={onClickTestButton} className={styles.testButton}>click</button>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/*'} element={<Navigate to={'/'}/>}/>

                {
                    //Если пользователь не авторизован, рендер окна авторизации.
                    !user.login &&
                    <>
                      <Route path={'/authentication'} element={<Authentication/>}/>
                      <Route path={'/registration/*'} element={<Navigate to={'/registration/about'}/>}/>
                      <Route path={'/registration/about'} element={<RegistrationAbout/>}/>
                    </>
                }

                {
                    //Не заполнена форма с именем, тогда навигация к ней.
                    !registrationUser.name &&
                    <Route path={'/registration/login'} element={<Navigate to={'/registration/about'}/>}/>
                }

                <Route path={'/registration/login'} element={<RegistrationLogin/>}/>
                <Route path={'*'} element={<Navigate to={'/authentication'}/>}/>

                {
                    //Пользователь авторизован, тогда рендер меню.
                    !!user.login &&
                    <Route path={'/menu'} element={<MenuLayout/>}>
                      <Route path={'/menu'} element={<Navigate to={'/menu/profile'}/>}/>
                      <Route path={'/menu/*'} element={<Navigate to={'/menu/profile'}/>}/>
                      <Route path={'/menu/profile'} element={<Profile/>}/>
                      <Route path={'/menu/programmers'} element={<Programmers/>}/>
                      <Route path={'/menu/tasks'} element={<Tasks/>}/>
                      <Route path={'/menu/chat'} element={<Chat/>}/>
                    </Route>
                }


            </Routes>
        </div>
    );
}

export default App;
