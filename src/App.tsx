import React, {useState} from 'react';
import styles from './App.module.scss'
import {Navigate, Route, Routes} from 'react-router-dom'
import MenuLayout from "./layouts/MenuLayout/MenuLayout";
import Profile from "./pages/menuPages/Profile/Profile";
import Students from "./pages/menuPages/Students/Students";
import Authentication from "./pages/formPages/Authentication/Authentication";
import RegistrationAboutMe from "./pages/formPages/registrationPages/RegistrationBasic/RegistrationAboutMe";
import Home from "./pages/Home/Home";
import Deleted from "./pages/menuPages/Deleted/Deleted";
import Favorites from "./pages/menuPages/Favorites/Favorites";
import RegistrationLogin from "./pages/formPages/registrationPages/RegistrationLogin/RegistrationLogin";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store";


function App() {
    const {user}=useSelector((state:RootState) => state.userSlice)
    return (
        <div className={styles.container}>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/authentication'} element={<Authentication/>}/>
                <Route path={'/registration/about'} element={<RegistrationAboutMe/>}/>
                <Route path={'/registration/login'} element={<RegistrationLogin/>}/>
                <Route path={'*'} element={<Navigate to={'/authentication'}/>}/>

                {
                    !!user.login &&
                    <Route path={'/menu'} element={<MenuLayout/>}>
                      <Route path={'/menu'} element={<Navigate to={'/menu/profile'}/>}/>
                      <Route path={'/menu/*'} element={<Navigate to={'/menu/profile'}/>}/>
                      <Route path={'/menu/profile'} element={<Profile/>}/>
                      <Route path={'/menu/programmers'} element={<Students/>}/>
                        {
                            (user.role!=='student')&&
                            <>
                              <Route path={'/menu/tasks'} element={<Deleted/>}/>
                              <Route path={'/menu/chat'} element={<Favorites/>}/>
                            </>

                        }

                    </Route>
                }


            </Routes>
        </div>
    );
}

export default App;
