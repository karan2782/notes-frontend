import React, { useEffect, useState } from "react";
import CreateNote from "../component/CreateNote";
import UpdateNote from "../component/UpdateNote";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [update, setUpdate] = useState("");
  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`https://devnoteapp.onrender.com/note`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      
      setNotes(data.notes);
    } catch (error) {
      alert(`An error occurred: ${error}`);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://devnoteapp.onrender.com/note/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      alert(data.message);
      fetchNotes();
    } catch (error) {
      console.log(`An error occurred: ${error}`);
    }
  };

  return (
    <div>
      <h2>Notes page</h2>
      <CreateNote fetchNotes={fetchNotes} />
      <ul style={{position:"relative"}}>
        {notes.map((note) => (
          <li
            key={note._id}
            style={{
              border: "1px solid",
              padding: "10px",
              listStyle: "none",
              margin: "10px 0",
            }}
          >
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <p>{note.status ? "Completed" : "Uncompleted"}</p>
            <button onClick={() => handleDelete(note._id)}>
              Delete the note
            </button>
            <button onClick={() => {
             setUpdate(id=> id === note._id ? "" : note._id)
            }}>Edit the note</button>
            {note._id === update && <UpdateNote note={note} fetchNotes={fetchNotes} setUpdate={setUpdate} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
