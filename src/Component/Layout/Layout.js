import React from 'react'
import Navbar from '../Navbar/Navbar'
import {Outlet} from 'react-router-dom'

const Layout = ({count}) => {
  return (
    <div>
        <Navbar count={count}/>
        <Outlet/>
    </div>
  )
}

export default Layout