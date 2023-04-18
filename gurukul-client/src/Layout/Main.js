import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Pages/Shared/NavBar/NavBar';

const Main = () => {
    return (
        <div className=''>
            <NavBar />
            <Outlet></Outlet>
            
            
        </div>
    );
};

export default Main;