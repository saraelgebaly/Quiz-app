import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import NavBar from './NavBar'

function MasterLayout() {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Groups");

  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled);
  };
  return (
    <>
    <div className="flex">
      <div>
        <SideBar
          toggled={isSidebarToggled} 
          toggleSidebar={toggleSidebar} 
          setSelectedMenuItem={setSelectedMenuItem} 
        />
      </div>
      <div className="w-full flex flex-col">
        <div className="bg-master-bg">
          <NavBar
            toggleSidebar={toggleSidebar} 
            selectedMenuItem={selectedMenuItem} 
          />
        </div>
        <div className="m-2 mt-3 md:m-5">
          <Outlet />
        </div>
      </div>
    </div>
    </>
  )
}

export default MasterLayout