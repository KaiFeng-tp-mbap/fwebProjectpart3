import {createContext,useContext,useEffect,useState} from 'react';
import * as authApi from "../api/authApi";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { id, name, roles, username }
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // implementation
    // rehydrate session from storage on page refresh
  useEffect(() => {
    // retrieve token and user from localstorage
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);
    // store them into state
    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }
    setLoading(false);
  }, []);

    const [role, setRole] = useState(() => {
      return localStorage.getItem("role") || "user";
    });

    const login = async (email, password,userRole = "user") => {
    setLoading(true);
    setError(null);
    setRole(userRole);
    localStorage.setItem("role", userRole);
    try {
      // call login api and store token & data to localstorage and state
      const { user: _user, token: _token } = await authApi.login(email,password);
      saveAuthState(_user, _token);
      alert("Login successful");
      
    //   if (res.ok) {
    //         navigate("/"); // Go back to book List after signup
    //     }
    // alert(`password: ${_user.password}, email: ${_user.email}`);
    return true;
    
    } catch (e) {
      setError(e.message || "Login failed");
      alert("Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const saveAuthState = (u, t) => {
    setUser(u);
    setToken(t);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    localStorage.setItem(TOKEN_KEY, t);
  };

  // logout function, remove token and user from localstorage and state
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem("role");
    setRole("user");
    setUser(null);
    setToken(null);
  };
    
    // const isLoggedIn = () => !!token; 
    const isLoggedIn = !!token; 
    const value = { user, token, loading, error, role, login, logout,isLoggedIn };
    
    // Provide authentication state and actions (user, token, login, logout)
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
// custom hook to access authentication context
export const useAuthContext = () => useContext(AuthContext);
