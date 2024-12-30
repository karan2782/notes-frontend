import React, { useState } from 'react'

function CreateNote({fetchNotes}) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [status, setStatus] = useState(false)

    const handleSubmit = async (e)=>{
        e.preventDefault()
        console.log(title, content, status)
        setTitle('')
        setContent('')
        setStatus(false)

        const token = localStorage.getItem('token') 
        try {
            const res = await fetch(`https://devnoteapp.onrender.com/note/create`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({title, content, status}),
            })
            const data = await res.json()
            
            
            alert(data.message)
            fetchNotes()
            
        } catch (error) {
           alert(`An error occurred: ${error}`);
            
        }
    }
  return (
    <div>
        <h3>Create New Note</h3>
      <form onSubmit={handleSubmit}
       style={{
        display:"flex", 
        flexDirection:"column",
        alignItems:"center"
       }}
       >
        <input type="text" placeholder='Enter Title' value={title} onChange={(e)=>setTitle(e.target.value)} />
        <textarea placeholder='Enter Content' value={content} onChange={(e)=>setContent(e.target.value)} ></textarea>

        <label>Completed</label>
        <input type="checkbox" checked={status} onChange={(e)=>setStatus(e.target.checked)}   />
        <button>Add New Note</button>
      </form>
    </div>
  )
}

export default CreateNote
