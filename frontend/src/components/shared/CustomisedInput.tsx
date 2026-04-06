import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomisedInput = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = props.type === "password";

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
      type={isPassword && showPassword ? "text" : props.type}
      InputProps={{
        endAdornment: isPassword ? (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOff sx={{ color: "white" }} />
              ) : (
                <Visibility sx={{ color: "white" }} />
              )}
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
};

export default CustomisedInput;