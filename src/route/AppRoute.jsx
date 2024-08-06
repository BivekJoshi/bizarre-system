import React from 'react';
import ScrollToTop from '../utils/ScrollToTop';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Error404 from '../pages/PageNotFound/Error404';
import LoginPage from '../pages/Controller/Auth/LoginPage';
import AddBranch from '../pages/Controller/Branch/AddBranch';
import ChangePassword from '../pages/Controller/User/ChangePassword';

const AppRoute = () => {
    return (
        <HashRouter hashType="slash">
            <ScrollToTop>
                <Routes>
                    <Route exact path="*" element={<Error404 />} />
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/branch" element={<AddBranch />} />
                    <Route path="/change-password" element={<ChangePassword />} />

                </Routes>
            </ScrollToTop>
        </HashRouter>
    );
}

export default AppRoute;
