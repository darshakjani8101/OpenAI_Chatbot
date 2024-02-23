import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { checkAuthStatus, loginUser } from "../helpers/api-communicator";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  signup: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // fetch if the user's cookie is still valid then skip login
    async function checkStatus() {
      const data = await checkAuthStatus();

      if (data) {
        setUser({ name: data.name, email: data.email });
        setIsLoggedIn(true);
      }
    }

    checkStatus();
  }, []);

  //const signup = async (name: string, email: string, password: string) => {};
  const signup = async () => {};
  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);

    if (data) {
      setUser({ name: data.name, email: data.email });
      setIsLoggedIn(true);
    }
  };
  const logout = async () => {};

  const value = {
    isLoggedIn,
    user,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
