import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    
    const handleSubmit = async () => {
        const payload={
            name, 
            email,
            gender,
            password
        }

        try {
          setLoading(true)
            const res = await fetch(`https://devnoteapp.onrender.com/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            alert('User registered successfully')
            setLoading(false)
            navigate('/login')
        } catch (error) {
          setLoading(false)
            alert(`An error occurred: ${error}`)
        }
    }

  return (
    <div>
      <h2>Register page</h2>

      <div>
        <input type="text"  placeholder="Enter name" value={name} onChange={(e)=> setName(e.target.value)} />
        <input type="text" placeholder='Enter email' value={email} onChange={(e)=> setEmail(e.target.value)} />
        <input type="text" placeholder='Enter gender' value={gender} onChange={(e)=> setGender(e.target.value)}  />
        <input type="text" placeholder='Enter password' value={password} onChange={(e)=> setPassword(e.target.value)} />
        <button onClick={handleSubmit}>{loading?"Registering...":"Register"}</button>
      </div>
    </div>
  )
}

export default Register
