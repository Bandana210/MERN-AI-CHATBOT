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
      overflowX="hidden"
      sx={{
        px: { xs: 2, md: 6 },
        py: 4,
      }}
    >
      {/* HERO SECTION */}
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 6,
          mt: 6,
        }}
      >
        {/* LEFT HERO */}
        <Box flex={1}>
          <Box
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              fontSize: { xs: "2.5rem", md: "4rem" },
              lineHeight: 1.1,
              mb: 3,
            }}
          >
            <TypingAnim />
          </Box>

          <Typography
            variant="h6"
            sx={{
              color: "gray",
              mb: 4,
              maxWidth: "600px",
            }}
          >
            Automate conversations, improve user engagement,
            and provide instant responses with your intelligent AI assistant.
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/signup")}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              bgcolor: "#00fffc",
              color: "black",
              fontWeight: 600,
              ":hover": {
                bgcolor: "white",
              },
            }}
          >
            Start for Free
          </Button>
        </Box>

        {/* RIGHT IMAGE */}
        <Box
  flex={1}
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
                  <Box
                      sx={{
                          p: 2,
                          borderRadius: 4,
                          background: "rgba(15, 23, 42, 0.6)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          boxShadow: "0 0 60px rgba(0,255,252,0.12)",
                          backdropFilter: "blur(8px)",
                      }}
                  >
                      <img
                          src="/hero-photo.jpg"
                          alt="chatbot"
                          style={{
                              width: isBelowMd ? "100%" : "500px",
                              maxWidth: "100%",
                              borderRadius: "18px",
                              display: "block",
                          }}
                      />
                  </Box>
              </Box>
      </Box>

      {/* STACKED SECTIONS */}
      <Box
        sx={{
          mt: 12,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "100%",
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        {/* FEATURES */}
        <Box
          id="features"
          sx={{
            p: 4,
            borderRadius: 4,
            background: "#07111f",
          }}
        >
          <Typography variant="h3" fontWeight={700} mb={2}>
            Features
          </Typography>

          <Typography variant="h6" color="gray" mb={3}>
            Instant AI-powered responses with smart context understanding.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "repeat(3, minmax(0, 1fr))",
              },
              gap: 3,
              mt: 4,
              width: "100%",
            }}
          >
            {[
              {
                title: "Instant Replies",
                desc: "Respond to users instantly with AI-powered chat assistance.",
              },
              {
                title: "Smart Context",
                desc: "Maintains conversation flow and remembers user intent.",
              },
              {
                title: "24/7 Support",
                desc: "Provide round-the-clock customer service automation.",
              },
              {
                title: "Secure Data",
                desc: "Encrypted communication and secure session handling.",
              },
              {
                title: "Fast Integration",
                desc: "Quickly plug into your MERN stack application.",
              },
              {
                title: "Scalable",
                desc: "Built to support thousands of simultaneous users.",
              },
            ].map((card, index) => (
              <Box
                key={index}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "0.3s",
                  ":hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 0 30px rgba(0,255,252,0.12)",
                  },
                }}
              >
                <Typography variant="h5" fontWeight={600} mb={1}>
                  {card.title}
                </Typography>
                <Typography variant="body1" color="gray">
                  {card.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* PRICING */}
        <Box
          id="pricing"
          sx={{
            p: 4,
            borderRadius: 4,
            background: "#07111f",
          }}
        >
          <Typography variant="h3" fontWeight={700} mb={2}>
            Pricing
          </Typography>

          <Typography variant="h6" color="gray" mb={3}>
            Flexible plans for startups and enterprise teams.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: 3,
              mt: 4,
              width: "100%",
            }}
          >
            {[
              {
                plan: "Basic",
                price: "Free",
                desc: "Perfect for testing and personal use.",
              },
              {
                plan: "Pro",
                price: "₹499/mo",
                desc: "Best for projects and small teams.",
              },
              {
                plan: "Enterprise",
                price: "Custom",
                desc: "Advanced integrations and scale support.",
              },
            ].map((card, index) => (
              <Box
                key={index}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.08)",
                  textAlign: "center",
                  transition: "0.3s",
                  ":hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 0 30px rgba(0,255,252,0.12)",
                  },
                }}
              >
                <Typography variant="h4" fontWeight={700} mb={1}>
                  {card.plan}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{ color: "#00fffc", mb: 2 }}
                >
                  {card.price}
                </Typography>

                <Typography color="gray">
                  {card.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ABOUT */}
        <Box
          id="about"
          sx={{
            p: 4,
            borderRadius: 4,
            background: "#07111f",
            mb: 10,
          }}
        >
          <Typography variant="h3" fontWeight={700} mb={2}>
            About Us
          </Typography>

          <Typography variant="h6" color="gray" mb={4}>
            Built to automate conversations and improve customer support.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 4,
            }}
          >
            <Box
              sx={{
                p: 4,
                borderRadius: 3,
                background: "#0f172a",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Typography variant="h5" fontWeight={600} mb={2}>
                Contact
              </Typography>
              <Typography color="gray">support@chatbro.ai</Typography>
              <Typography color="gray">+91 98765 43210</Typography>
              <Typography color="gray">Bengaluru, India</Typography>
            </Box>

            <Box
              sx={{
                p: 4,
                borderRadius: 3,
                background: "#0f172a",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Typography variant="h5" fontWeight={600} mb={2}>
                Mission
              </Typography>
              <Typography color="gray">
                We build intelligent chatbot systems for modern customer support.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;