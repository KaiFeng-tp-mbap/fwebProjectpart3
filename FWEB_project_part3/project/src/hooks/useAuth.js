import { useAuthContext } from "../context/AuthContext";

/* wrapper hook for accessing authentication context.
   using useAuth() keeps imports clean and allows us to change the underlying
   auth implementation later.
*/
export function useAuth() {
  const { user, token,role ,login, logout, error } = useAuthContext();

  // helper function to check isLoggedIn
  const isLoggedIn = () => !!user && !!token;

  return { user, token,role ,login, logout, error, isLoggedIn };
}
