import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ShoppingCart } from "lucide-react";
import Cart from "./Cart";
import axios from "axios";

const ClientNavbar = () => {
  const handleLogout = async () => {
    await axios.post(
      "http://localhost:8000/api/logout",
      {},
      { withCredentials: true, withXSRFToken: true }
    );
  };
  return (
    <>
      <header className="sticky top-0 left-0 w-full md:px-8 py-3 flex flex-row md:justify-between items-center bg-white">
        <Link
          className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
          to={"/home"}
          aria-label="Preline"
        >
          <img className="w-32" src="/Images/pharmapicc.png" />
        </Link>

        <div className="flex flex-row items-center gap-x-6">
          <Link className="relative inline-block text-black " to={"pharmacies"}>
            Pharmacies
          </Link>
          <Link
            className="relative inline-block text-black "
            to={"meds/page/1"}
          >
            Medecines
          </Link>
          <Cart />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Account</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};

export default ClientNavbar;
