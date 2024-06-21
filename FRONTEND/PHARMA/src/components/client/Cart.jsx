import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowRight,
  ChevronDown,
  ShoppingBag,
  ShoppingCart,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [selectedMedicines, setSelectedMedicines] = useState({});

  useEffect(() => {
    const handleStorageChange = () => {
      const storedMedicines = localStorage.getItem("selectedMedicines");
      if (storedMedicines) {
        setSelectedMedicines(JSON.parse(storedMedicines));
      }
    };

    // Initial load from localStorage
    handleStorageChange();

    // Add event listener for custom storage event
    window.addEventListener("storageChange", handleStorageChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("storageChange", handleStorageChange);
    };
  }, []);

  const clearCart = () => {
    localStorage.removeItem("selectedMedicines");
    setSelectedMedicines({});
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="inline-flex flex-row gap-x-2 items-center"
          >
            <ShoppingCart size={21} />
            Cart
            <ChevronDown size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Your shopping cart</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {Object.keys(selectedMedicines).length > 0 ? (
              Object.values(selectedMedicines).map((med, index) => (
                <DropdownMenuItem key={index}>
                  <div>
                    <div className="flex flex-col gap-y-2">
                      <p className="font-semibold">{med.name}</p>
                      <div className="flex flex-row justify-between">
                        <span className="text-sm text-gray-500">
                          {med.price}
                        </span>
                        <span className="text-sm text-gray-500">
                          x{med.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <span className="font-semibold text-sm">No items added yet.</span>
            )}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer bg-green-700 text-gray-100">
            <Link
              to={"/buying"}
              className="flex flex-row justify-between items-center w-full h-full"
            >
              Checkout <ArrowRight size={18} />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={clearCart}
            className="flex flex-row justify-between items-center cursor-pointer bg-red-600 text-gray-100"
          >
            Clear cart <Trash size={18} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Cart;
