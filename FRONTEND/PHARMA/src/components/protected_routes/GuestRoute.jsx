import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const GuestRoute = ({ children }) => {
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
      setUser(null); // User is not authenticated
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading && user) {
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
  }, [loading, user, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Or render a loading spinner/component
  }

  return !user ? children : null;
};

export default GuestRoute;
