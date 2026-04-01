import React from 'react';
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
  return (
    <Box width={"100%"} height={"100vh"} display="flex" flex={1}>
      <Box
        padding={8}
        mt={8}
        sx={{ display:"flex"}}
      >
        <img src="/airobot.png" alt="Robot" style={{width:"400px"}} />
      </Box>
      <Box display={'flex'} 
      justifyContent={'center'} 
      alignItems={'center'}
      ml={'aut'}
      mt={16}
      >
        <form
        onSubmit={handleSubmit}
        style={{
        margin: "auto",
        padding: "30px",
        boxShadow: "10px 10px 20px rgba(0,0,0,0.2)",
        borderRadius: "10px",
        border: "none",
        }}>
                <Box sx={{display:"flex",
                    flexDirection:'column',
                    justifyContent:'center',
                    }}>
                    <Typography variant="h4"
                     textAlign='center'
                     padding={2}
                     fontWeight={600}
                     >Login
                    </Typography> 
                    <CustomisedInput type="email" name="email" label="Email" />
                    <CustomisedInput type="password" name="password" label="Password" />
                    <Button type="submit" sx={{px:2,
                      py:1,
                      mt:2,
                      width:"400px",
                      borderRadius:2,
                      bgcolor:"#00fffc",
                      ":hover":{
                        bgcolor:"white",
                        color:"black",
                      }
                      }}
                      >Login</Button>
                </Box>
            </form>
      </Box>
    </Box>
  );
};

export default Login;