import React from 'react';
import {useEffect} from 'react';
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import CustomisedInput from '../components/shared/CustomisedInput';
import { toast } from 'react-hot-toast';
import { useAuth } from "../context/AuthContext";
import {useNavigate} from 'react-router-dom';


const Login = () => {
  const navigate=useNavigate();
  const auth= useAuth()
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try{
    toast.loading("Signing In",{id:"login"});
    await auth?.login(email,password);
    toast.success("Signed In Successfully",{id: "login"});
  } catch(error){
    console.log(error);
    toast.error("Signing In Failed",{id: "login"})
  }

  console.log(email, password);
};
useEffect(()=> {
  if(auth?.user){
    navigate("/chat");
  }
},[auth?.user]);

  return (
  <Box display="flex" width="100%" height="100vh" 
  sx={{
    minHeight: "100vh",
    overflow: "hidden",
    backgroundColor: "#020617",
    backgroundImage: `
      radial-gradient(circle at top left, rgba(0,255,252,0.10), transparent 30%),
      radial-gradient(circle at bottom right, rgba(0,150,255,0.08), transparent 35%),
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
    `,
    backgroundSize: "auto, auto, 40px 40px, 40px 40px",
  }}>

    {/* LEFT SIDE */}
    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      >
      <img
        src="/airobot2.png"
        alt="Robot"
        style={{ width: "300px", marginBottom: "20px" }}
      />

      <Typography variant="h4" color="white" fontWeight={600}>
        Welcome Back
      </Typography>

      <Typography variant="body1" color="gray">
        Login to continue
      </Typography>
    </Box>

    {/* RIGHT SIDE */}
    <Box
      flex={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
      >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "400px",
          padding: "40px",
          borderRadius: "12px",
          background: "#0f172a",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <Box display="flex" flexDirection="column" gap={3}>
          
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight={600}
            color="white"
          >
            Login
          </Typography>

          <CustomisedInput type="email" name="email" label="Email" />
          <CustomisedInput type="password" name="password" label="Password" />

          <Button
            type="submit"
            sx={{
              py: 1.5,
              borderRadius: 2,
              bgcolor: "#00fffc",
              fontWeight: 600,
              ":hover": {
                bgcolor: "#00cfcf",
              },
            }}
          >
            Login
          </Button>

        </Box>
      </form>
    </Box>

  </Box>
);
};

export default Login;