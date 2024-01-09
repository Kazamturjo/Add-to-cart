import React from 'react'
import Navbar from '../Navbar/Navbar'
import {Outlet} from 'react-router-dom'

const Layout = ({cartData,setCartData}) => {
  return (
    <div>
        <Navbar cartData={cartData} setCartData={setCartData}/>
        <Outlet/>
    </div>
  )
}

export default Layout