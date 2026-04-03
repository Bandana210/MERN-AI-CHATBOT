import React from 'react';
import {Box,useTheme,useMediaQuery} from "@mui/material";
import TypingAnim from "../components/typer/TypingAnim";

const Home = () => {
    const theme = useTheme();
    const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Box width={"100%"} height={'100%'}>
            <Box sx={{ display: 'flex', width: "100%", flexDirection: { md: "row", xs: "column", sm: "column" }, alignItems: "center", mx: "auto", mt: 3, }}>
                <Box>TypingAnim</Box>
                <Box sx={{ display: "flex", width: "100%", mx: "auto" }}>
                    <img
                        src="/chat.png"
                        alt="chatbot"
                        style={{
                            display: "block",
                            margin: "auto",
                            width: "60%",
                            borderRadius: 20,
                            boxShadow: "-5px -5px 105px #64f3d5",
                            marginTop: 20,
                            marginBottom: 20,
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}
export default Home;