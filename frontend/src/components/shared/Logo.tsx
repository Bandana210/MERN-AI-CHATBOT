import { Box, Typography } from "@mui/material";

const Logo = () => {
  return (
    <Box display="flex" alignItems="center" gap={1.5}>
      <img
        src="/logo.jpeg"
        alt="logo"
        style={{ width: "45px", height: "45px", objectFit: "contain" }}
      />

      <Typography
        variant="h5"
        fontWeight={700}
        sx={{ letterSpacing: "1px" }}
      >
        ChatBro
      </Typography>
    </Box>
  );
};

export default Logo;