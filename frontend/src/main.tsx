import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
// @ts-ignore: CSS module declaration
import './index.css';
import App from "./App";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from 'react-hot-toast'
import axios from "axios";

axios.defaults.baseURL="http://localhost:5000/api/v1";
axios.defaults.withCredentials=true;

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    allVariants: {
      color: '#ffffff',
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Toaster position="top-right" />
        <App />
      </ThemeProvider>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)