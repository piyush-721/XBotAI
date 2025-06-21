import { Outlet } from 'react-router-dom';
import React from 'react';
import threeDots from "./Assets/three-dots.png";

function AppLayout() {
  return (
    <div>
        <img src={threeDots} alt="dots" />
        <Outlet />
    </div>
  )
}

export default AppLayout;