import React from 'react';
import TextField from "@mui/material/TextField";


type Props = {
    name: string;
    type: string;
    label: string;
};
const CustomisedInput = (props: Props) => {
    return (
       <TextField
  sx={{
    width: "400px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      color: "white",
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
      "& input": {
        color: "white",
        backgroundColor: "transparent",
      },
      "& input:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 100px transparent inset",
        WebkitTextFillColor: "white",
        transition: "background-color 5000s ease-in-out 0s",
      },
    },
    "& .MuiInputLabel-root": {
      color: "white",
    },
  }}
  name={props.name}
  label={props.label}
  type={props.type}
/>
    );
};

export default CustomisedInput;