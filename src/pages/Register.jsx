import { Box, Input, Stack, Button, Text, LinkBox } from "@chakra-ui/react";
import { Field } from "../components/ui/field";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!name || !email || !password || !gender){
      alert("All fileds is required")
      return
    }
    const payload = {
      name,
      email,
      gender,
      password,
    };

    try {
      setLoading(true);
      const res = await fetch(`https://devnoteapp.onrender.com/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      alert("User registered successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      alert(`An error occurred: ${error}`);
    }
  };

  return (
    <Box fontFamily='Playwrite IS'>
      <form>
        <Stack borderRadius='10px' border="1px solid grey" width="30vw" margin="auto" p="5" mt="5" gap='20px'>
          <Text textAlign="center" fontSize="20px" fontWeight='bold'>
            Register
          </Text>
          <Field required label="Name">
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>

          <Field required label="Email">
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field required label="Select your gender">
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">-</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </Field>

          <Field required label="Password">
            <Input
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>

          
          <Button disabled={loading} type='submit' background='blue.600' onClick={handleSubmit}>{loading?"Registering...":"Register"}</Button>

          <Text mt='5'>
          <Link style={{color:"blue"}} to='/login'>Please Login</Link>, if you're already registered 
        </Text>
        </Stack>
      </form>
    </Box>
  );
}

export default Register;
