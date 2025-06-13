import React, { useState } from 'react'
import "./sideNav.css"
import { useDispatch } from 'react-redux'
import { isOpen } from '../../features/stateSlice'
import { useSelector } from 'react-redux'
const SideNavBar = () => {
  const status = useSelector((state) => state.state.open)
  const dispatch = useDispatch()
  const handleCloseSideBar = () => {
    dispatch(isOpen({ open: false }))
  }

  return (
    <div className={status ? "sideNav" : "discard"}>
      <div className='topArea  flexContainer'>
        <h1 className='icon'>shop.co</h1>
        <img className='close' src="cross.svg" alt="close" onClick={handleCloseSideBar} />
      </div>

      <div className="navArea">
        <ul className='flexContainer sideBarNav'>
          <li>shop</li>
          <li>On sale</li>
          <li>New Arrivals</li>
          <li>Brands</li>
        </ul>
      </div>
    </div>
  )
}

export default SideNavBar
