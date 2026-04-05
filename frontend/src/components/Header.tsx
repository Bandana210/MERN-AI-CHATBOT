// import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from './shared/Logo';
import Typography from '@mui/material/Typography';

import NavigationLink from "./shared/NavigationLink";
import { useAuth } from "../context/AuthContext"; 

const Header=() => {
    const auth= useAuth();
    return <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Logo/>
            <div>
                {auth.isLoggedIn ? <>
                    <NavigationLink to="/chat" text="Go to chat" bg="lightgray" textColor="black" />
                    <NavigationLink to="/home" text="Logout" bg="lightgray" textColor="white" onClick={() => auth.logout()} />
                </> :<>
                    <NavigationLink to="/login" text="Login" bg="lightgray" textColor="black" />
                    <NavigationLink to="/signup" text="Signup" bg="lightgray" textColor="white" />
                </> }
            </div>
        </Toolbar>
    </AppBar>;
};

export default Header;