import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ClientNavbar from "../components/client/ClientNavbar";
import axios from "axios";

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check if the user is authenticated
        const res = await axios.get("http://localhost:8000/api/user", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <>
      {isAuthenticated ? <ClientNavbar /> : <Navbar />}

      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
