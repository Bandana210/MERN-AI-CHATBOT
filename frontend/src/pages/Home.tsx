import React from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TypingAnim from "../components/typer/TypingAnim";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  return (
    <Box
      width="100%"
      minHeight="100vh"
      sx={{
        overflowX: "hidden",
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
      {/* HERO */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: { xs: 2, sm: 3, md: 8 },
          py: { xs: 6, md: 8 },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "2.2rem", sm: "3rem", md: "6rem" },
            fontWeight: 100,
            lineHeight: 1.05,
            color: "white",
            fontFamily: "'Poppins', sans-serif",
            mb: 3,
            maxWidth: "1100px",
          }}
        >
          Build the next generation
          <br />
          of AI conversations.
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "1rem", md: "1.4rem" },
            color: "rgba(255,255,255,0.65)",
            maxWidth: "800px",
            mb: 5,
            lineHeight: 1.6,
          }}
        >
          ChatBro helps automate support, improve engagement,
          and deliver intelligent customer conversations instantly.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/signup")}
          sx={{
            px: { xs: 4, md: 5 },
            py: 1.5,
            fontSize: { xs: "0.9rem", md: "1rem" },
            width: { xs: "100%", sm: "auto" },
            maxWidth: "280px",
            borderRadius: "30px",
            bgcolor: "#00fffc",
            color: "black",
            fontWeight: 700,
            mb: 10,
            ":hover": {
              bgcolor: "white",
            },
          }}
        >
          Start Free Trial
        </Button>
      </Box>

      {/* MAIN */}
      <Box
        sx={{
          px: { xs: 2, md: 6 },
          pb: 8,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        {/* FEATURES */}
        <Box
          id="features"
          sx={{
            p: { xs: 2.5, md: 4 },
            borderRadius: 4,
            background: "#07111f",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 200,
              mb: 2,
            }}
          >
            Features
          </Typography>

          <Typography variant="h6" color="gray" mb={4}>
            Instant AI-powered responses with smart context understanding.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {[
              {
                title: "Instant Replies",
                desc: "Respond instantly with AI-powered assistance.",
              },
              {
                title: "Smart Context",
                desc: "Maintains flow and remembers user intent.",
              },
              {
                title: "24/7 Support",
                desc: "Round-the-clock customer service automation.",
              },
              {
                title: "Secure Data",
                desc: "Encrypted communication and session security.",
              },
              {
                title: "Fast Integration",
                desc: "Quickly plug into MERN applications.",
              },
              {
                title: "Scalable",
                desc: "Supports thousands of simultaneous users.",
              },
            ].map((card, index) => (
              <Box
                key={index}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                    fontWeight: 200,
                    mb: 1,
                  }}
                >
                  {card.title}
                </Typography>
                <Typography color="gray">{card.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* PRICING */}
        <Box
          id="pricing"
          sx={{
            p: { xs: 2.5, md: 4 },
            borderRadius: 4,
            background: "#07111f",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 200,
              mb: 2,
            }}
          >
            Pricing
          </Typography>

          <Typography variant="h6" color="gray" mb={4}>
            Flexible plans for startups and enterprise teams.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {[
              { plan: "Basic", price: "Free", desc: "Perfect for personal use." },
              { plan: "Pro", price: "₹499/mo", desc: "Best for teams." },
              { plan: "Enterprise", price: "Custom", desc: "Advanced support." },
            ].map((card, index) => (
              <Box
                key={index}
                sx={{
                  p: { xs: 2.5, md: 4 },
                  borderRadius: 3,
                  background: "#0f172a",
                  textAlign: "center",
                }}
              >
                <Typography variant="h4" fontWeight={200}>
                  {card.plan}
                </Typography>
                <Typography variant="h5" sx={{ color: "#00fffc", my: 2 }}>
                  {card.price}
                </Typography>
                <Typography color="gray">{card.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ABOUT */}
        <Box
          id="about"
          sx={{
            p: { xs: 2.5, md: 4 },
            borderRadius: 4,
            background: "#07111f",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 200,
              mb: 2,
            }}
          >
            About Us
          </Typography>

          <Typography variant="h6" color="gray" mb={4}>
            Built to automate conversations and improve support.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 3,
            }}
          >
            <Box sx={{ p: 4, borderRadius: 3, background: "#0f172a" }}>
              <Typography variant="h5" fontWeight={200} mb={2}>
                Contact
              </Typography>
              <Typography color="gray">support@chatbro.ai</Typography>
              <Typography color="gray">+91 98765 43210</Typography>
              <Typography color="gray">Bengaluru, India</Typography>
            </Box>

            <Box sx={{ p: 4, borderRadius: 3, background: "#0f172a" }}>
              <Typography variant="h5" fontWeight={200} mb={2}>
                Mission
              </Typography>
              <Typography color="gray">
                Building modern AI support systems for real businesses.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;