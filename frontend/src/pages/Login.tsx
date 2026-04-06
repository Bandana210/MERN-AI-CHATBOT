import React from "react";
import { useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import CustomisedInput from "../components/shared/CustomisedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Logging In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Log In Successful", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Log In Failed", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      navigate("/chat");
    }
  }, [auth?.user]);

  return (
    <Box
      display="flex"
      width="100%"
      minHeight="100vh"
      sx={{
        flexDirection: { xs: "column", md: "row" },
        overflow: "hidden",
        backgroundColor: "#020617",
        backgroundImage: `
          radial-gradient(circle at top left, rgba(0,255,252,0.10), transparent 30%),
          radial-gradient(circle at bottom right, rgba(0,150,255,0.08), transparent 35%),
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "auto, auto, 40px 40px, 40px 40px",
      }}
    >
      {/* TOP LEFT LOGO */}
      <Box
        position="absolute"
        top={20}
        left={30}
        display="flex"
        alignItems="center"
        gap={1.5}
        onClick={() => navigate("/")}
        sx={{
          cursor: "pointer",
          transition: "0.2s",
          zIndex: 10,
          "&:hover": {
            opacity: 0.85,
          },
        }}
      >
        <img
          src="/logo.jpeg"
          alt="logo"
          style={{
            width: "45px",
            height: "45px",
            objectFit: "contain",
          }}
        />

        <Typography
          variant="h5"
          fontWeight={700}
          color="white"
          sx={{ letterSpacing: "1px" }}
        >
          ChatBro
        </Typography>
      </Box>

      {/* LEFT */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          py: { xs: 12, md: 0 },
          px: 2,
        }}
      >
        <img
          src="/airobot2.png"
          alt="Robot"
          style={{
            width: "300px",
            maxWidth: "80%",
            marginBottom: "20px",
          }}
        />

        <Typography
          variant="h4"
          color="white"
          fontWeight={600}
          textAlign="center"
        >
          Welcome Back
        </Typography>

        <Typography
          variant="body1"
          color="gray"
          textAlign="center"
        >
          Login to continue
        </Typography>
      </Box>

      {/* RIGHT */}
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          px: 2,
          pb: { xs: 6, md: 0 },
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "400px",
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

            <CustomisedInput
              type="email"
              name="email"
              label="Email"
            />

            <CustomisedInput
              type="password"
              name="password"
              label="Password"
            />

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

            <Typography
              variant="body2"
              textAlign="center"
              color="gray"
              sx={{ cursor: "pointer" }}
            >
              Don’t have an account?{" "}
              <span
                style={{
                  color: "#00fffc",
                  fontWeight: 500,
                }}
                onClick={() => navigate("/signup")}
              >
                Signup
              </span>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;