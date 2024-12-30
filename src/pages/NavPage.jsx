import React from 'react'
import { NavLink } from 'react-router-dom'

function NavPage() {
    const handleLogout=()=>{
        if(!localStorage.getItem("token")){
            alert("You are not logged in")
            return
        }
        localStorage.removeItem("token")
        alert("You have been logged out")
        window.location.href='/'
    }
  return (
    <div style={{display:"flex", justifyContent:"space-between",  border:"1px solid black"}}>
    
    <div style={{display:"flex", gap:"10px", padding:"10px", width:"100%", margin:"auto"}}>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/notes'>Notes</NavLink>
      <NavLink to='/login'>Login</NavLink>
    </div>
    <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default NavPage
