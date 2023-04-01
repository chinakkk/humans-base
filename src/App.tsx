import React from 'react';
import styles from './App.module.scss'
import {Navigate, Route, Routes} from 'react-router-dom'
import MenuLayout from "./layouts/MenuLayout/MenuLayout";
import Profile from "./pages/menuPages/Profile/Profile";
import Students from "./pages/menuPages/Students/Students";
import Authentication from "./pages/formPages/Authentication/Authentication";
import RegistrationBasic from "./pages/formPages/registrationPages/RegistrationBasic/RegistrationBasic";
import Home from "./pages/Home/Home";
import Deleted from "./pages/menuPages/Deleted/Deleted";
import Favorites from "./pages/menuPages/Favorites/Favorites";


function App() {
    return (
        <div className={styles.container}>
            <Routes>

                <Route path={'/'} element={<Home/>}/>
                <Route path={'/authentication'} element={<Authentication/>}/>
                <Route path={'/registration'} element={<RegistrationBasic/>}/>

                <Route path={'/menu'} element={<MenuLayout/>}>
                    <Route path={'/menu'} element={<Navigate to={'/menu/profile'}/>}/>
                    <Route path={'/menu/profile'} element={<Profile/>}/>
                    <Route path={'/menu/students'} element={<Students/>}/>
                    <Route path={'/menu/deleted'} element={<Deleted/>}/>
                    <Route path={'/menu/favorites'} element={<Favorites/>}/>
                </Route>

            </Routes>
        </div>
    );
}

export default App;
