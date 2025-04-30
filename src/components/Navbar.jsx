import { usePrivy } from "@privy-io/react-auth";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { login, logout, authenticated, user } = usePrivy();
  const { handleLogin, handleLogout } = useAuth();

  const handleAuth = async () => {
    if (authenticated) {
      await handleLogout();
      logout();
    } else {
      await login();
      handleLogin();
    }
  };

  return (
    <nav>
      <button onClick={handleAuth}>{authenticated ? "Logout" : "Login"}</button>
    </nav>
  );
}

export default Navbar;
