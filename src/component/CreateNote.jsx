import { Box, Input, Textarea } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import React, { useState } from "react";

function CreateNote({ fetchNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title || !content){
      alert("Please enter title and content of your notes!")
      return
    }
    setTitle("");
    setContent("");
    setStatus(false);

    const token = localStorage.getItem("token");
    try {
      setIsLoading(true);
      const res = await fetch(`https://devnoteapp.onrender.com/note/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, status }),
      });
      const data = await res.json();

      setIsLoading(false);
      alert(data.message);

      fetchNotes();
    } catch (error) {
      setIsLoading(false);
      alert(`An error occurred: ${error}`);
    }
  };
  return (
    <Box>
      <form
        style={{
          border: "1px solid black",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Field label="Title" required>
          <Input
            placeholder="Enter your title of note"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field>

        <Field label="Content" required>
          <Textarea
            placeholder="Enter content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Field>

        <Checkbox
          checked={status}
          variant={"outline"}
          onCheckedChange={(e) => setStatus(e.checked)}
        >
          Status
        </Checkbox>
        <Button
          loading={isLoading ? true : false}
          loadingText={isLoading ? "Creating Note" : ""}
          onClick={handleSubmit}
        >
          Create Note
        </Button>
      </form>
    </Box>
  );
}

export default CreateNote;
