import { Box, Button, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Field } from "../components/ui/field";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    if(!email || !password){
      alert("Please Enter your email and password")
      return
    }
    e.preventDefault()
    const payload = {
      email,
      password,
    };

    try {
      setLoading(true);
      const res = await fetch(`https://devnoteapp.onrender.com/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok === false) {
        alert(data.message);
      }

      if (data.token) {
        alert(`${data.message}`);
        localStorage.setItem("token", data.token);
        navigate("/notes");
      }

      setLoading(false);
    } catch (error) {
      alert(`An error occurred: ${error}`);
      setLoading(false);
    }
  };
  return (
    <Box>
      <form
        style={{
          width: "30vw",
          border: "1px solid grey",
          borderRadius:'10px',
          padding: "20px",
          textAlign: "center",
          margin: "auto",
          marginTop: "50px",
        }}
        onSubmit={handleLogin}
      >
        <Text fontSize="20px" fontWeight='500'>Login</Text>
        <Field label="Email" required>
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Password" required>
          <Input
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Button backgroundColor='blue.600' disabled={loading} type='submit' mt="3" width="full">
          {loading?"Loggin In...":"Login"}
        </Button>
        <Text mt='5'>
          <Link style={{color:"blue"}} to='/register'>Please Register</Link> , if you're not registered 
        </Text>
      </form>
    </Box>
  );
}

export default Login;
