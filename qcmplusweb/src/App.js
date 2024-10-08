import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import Home from "./pages/home/Home";
import Signin from "./pages/authentication/Signin/Signin";
import ForgetPassword from "./pages/authentication/ForgetPassword/ForgetPassword";
import Main from "./pages/main/Main";
import {isUserLoggedIn} from "./services/AuthService";

const AuthenticatedRoute = ({children}) => {
    const isAuth = isUserLoggedIn();
    return isAuth ? children : <Navigate to="/signin"/>;
};

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/forgetpassword" element={<ForgetPassword/>}/>
                <Route path="/main" element={
                    <AuthenticatedRoute>
                        <Main/>
                    </AuthenticatedRoute>
                }/>
            </Routes>
        </div>
    );
}

export default App;
