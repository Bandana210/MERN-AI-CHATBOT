import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loginUser, signupUser, logoutUser } from "../helpers/api-communicators";

type User = {
  name: string;
  email: string;
  password: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // fetch if the user's cookies are valid then skip login
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data) {
      setUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setIsLoggedIn(true);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const data = await signupUser(name, email, password);
    if (data) {
      setUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setIsLoggedIn(true);
    }
  };

  const logout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload();
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);