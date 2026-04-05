import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const auth = useAuth();

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80;
      const y =
        section.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <AppBar
      sx={{
        bgcolor: "#07111f",
        position: "sticky",
        top: 0,
        boxShadow: "none",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Toolbar
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          px: 4,
          py: 1,
        }}
      >
        {/* LEFT */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            justifySelf: "start",
          }}
        >
          <img
            src="/logo.jpeg"
            alt="logo"
            style={{
              width: "45px",
              height: "45px",
              objectFit: "contain",
              borderRadius: "6px",
            }}
          />

          <Typography
            sx={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "2rem",
              fontWeight: 700,
              color: "white",
              letterSpacing: "0.5px",
            }}
          >
            ChatBro
          </Typography>
        </Box>

        {/* CENTER NAV */}
        {!auth?.isLoggedIn && (
          <Box
            sx={{
              display: "flex",
              gap: 4,
              justifySelf: "center",
            }}
          >
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => scrollToSection("features")}
            >
              Features
            </Typography>

            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => scrollToSection("pricing")}
            >
              Pricing
            </Typography>

            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => scrollToSection("about")}
            >
              About Us
            </Typography>
          </Box>
        )}

        {/* RIGHT */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifySelf: "end",
          }}
        >
          {auth?.isLoggedIn ? (
            <Button
              variant="contained"
              onClick={() => auth?.logout()}
              sx={{
                bgcolor: "#00fffc",
                color: "black",
                fontWeight: 600,
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                onClick={() => (window.location.href = "/login")}
                sx={{
                  bgcolor: "#00fffc",
                  color: "black",
                  fontWeight: 600,
                }}
              >
                Login
              </Button>

              <Button
                variant="contained"
                onClick={() => (window.location.href = "/signup")}
                sx={{
                  bgcolor: "#00fffc",
                  color: "black",
                  fontWeight: 600,
                }}
              >
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;