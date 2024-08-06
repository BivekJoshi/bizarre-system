import React from 'react';
import ScrollToTop from '../utils/ScrollToTop';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Error404 from '../pages/PageNotFound/Error404';
import LoginPage from '../pages/Controller/Auth/LoginPage';

const AppRoute = () => {
    return (
        <HashRouter hashType="slash">
            <ScrollToTop>
                <Routes>
                    <Route exact path="*" element={<Error404 />} />
                    <Route path="/" element={<LoginPage />} />
                </Routes>
            </ScrollToTop>
        </HashRouter>
    );
}

export default AppRoute;
