import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from './shared/Logo';
import NavigationLink from "./shared/NavigationLink";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const auth = useAuth();

  return (
    <AppBar
      sx={{
        bgcolor: "#020617",
        position: "static",
        boxShadow: "none",
        px: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
        
        <Logo />

        <div>
          {auth.isLoggedIn ? (
            <>
              <NavigationLink to="/chat" text="Chat" bg="lightgray" textColor="black" />
              <NavigationLink
                to="/"
                text="Logout"
                bg="lightgray"
                textColor="black"
                onClick={() => auth.logout()}
              />
            </>
          ) : (
            <>
              <NavigationLink to="/login" text="Login" bg="lightgray" textColor="black" />
              <NavigationLink to="/signup" text="Signup" bg="lightgray" textColor="black" />
            </>
          )}
        </div>

      </Toolbar>
    </AppBar>
  );
};

export default Header;