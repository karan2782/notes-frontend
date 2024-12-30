import React from 'react'
import {useNavigate} from "react-router-dom"

function Home() {
    const navigate = useNavigate()
  return (
    <div>
      <h1>Welcome to homepage</h1>
      <button onClick={()=>navigate('/register')} >To register click me!</button>
    </div>
  )
}

export default Home
