import { useNavigate } from "react-router-dom";
import { Button } from "./button";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      // Broadcast to other tabs
      window.dispatchEvent(new StorageEvent("storage", { key: "token", newValue: null } as any));
    } finally {
      navigate("/login");
    }
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;

