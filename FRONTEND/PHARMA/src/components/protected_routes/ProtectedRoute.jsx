import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user", {
        withCredentials: true,
      });
      setUser(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      navigate("/login", { replace: true }); // Redirect to login if user is not authenticated
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (user) {
    switch (user.role) {
      case "user":
        navigate("/buying", { replace: true });
        break;
      case "admin":
        navigate("/admin/dashboard", { replace: true });
        break;
      default:
        break;
    }
  }

  return user ? children : null;
};

export default ProtectedRoute;
