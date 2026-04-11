import React from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

const RefereshHandler = ({setAuthenticated}) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setAuthenticated(true);
            if(location.pathname == '/' || location.pathname == '/login' || location.pathname == '/Signup'){
                navigate('/home',{replace : true});
            }
        }
    },[location , navigate , setAuthenticated]);

}

export default RefereshHandler
