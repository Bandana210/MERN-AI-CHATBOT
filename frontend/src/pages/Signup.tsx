import React from 'react';
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import CustomisedInput from '../components/shared/CustomisedInput';
import { toast } from 'react-hot-toast';
import { useAuth } from "../context/AuthContext";
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';


const Signup = () => {
  const navigate=useNavigate();
  const auth= useAuth()
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try{
    toast.loading("Signing Up",{id:"signup"});
    await auth?.signup(name,email,password);
    toast.success("Signed Up Successfully",{id: "signup"});
  } catch(error){
    console.log(error);
    toast.error("Signing Up Failed",{id: "signup"});
  }
};
    useEffect(()=> {
    if (auth?.user){
      navigate("/chat");
    }},[auth?.user]);

    
  return (
  <Box
    width="100%"
    height="100vh"
    display="flex"
    alignItems="center"
    justifyContent="space-evenly"
    px={4}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="/airobot2.png"
        alt="Robot"
        style={{ width: "400px" }}
      />
    </Box>

    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "35px",
          boxShadow: "10px 10px 20px rgba(0,0,0,0.2)",
          borderRadius: "10px",
          width: "450px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight={600}
          >
            Signup
          </Typography>

          <CustomisedInput type="text" name="name" label="Name" />
          <CustomisedInput type="email" name="email" label="Email" />
          <CustomisedInput
            type="password"
            name="password"
            label="Password"
          />

          <Button
            type="submit"
            sx={{
              px: 2,
              py: 1,
              mt: 1,
              width: "100%",
              maxWidth: "400px",
              borderRadius: 2,
              bgcolor: "#00fffc",
              ":hover": {
                bgcolor: "white",
                color: "black",
              },
            }}
          >
            Signup
          </Button>
        </Box>
      </form>
    </Box>
  </Box>
);
};

export default Signup;