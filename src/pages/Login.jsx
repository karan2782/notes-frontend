import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const handleLogin = async () => {
    const payload = {
      email,
      password
    }

    try {
      setLoading(true)
      const res = await fetch(`https://devnoteapp.onrender.com/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if(res.ok===false){
        alert(data.message)
      }
      
     
      if(data.token){
        alert(`${data.message}`)
        localStorage.setItem('token', data.token)
        navigate("/notes")
      }
      
      setLoading(false)
      
    } catch (error) {
      alert(`An error occurred: ${error}`)
      setLoading(false)
  }
}
  return (
    <div>
      <h2>Login Page</h2>

      <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
        <input type="text"  placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="text" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button style={{color:"blue"}} onClick={handleLogin} >{loading?"Loading...":"Login"}</button>
      </div>
      <div>
        <span>If you're not registered!</span><button onClick={()=>navigate('/register')}>To Register click me!</button>
      </div>
    </div>
  )
}

export default Login
