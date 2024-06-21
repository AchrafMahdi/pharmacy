import axios from "axios";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Buying() {
  const [selectedMedicines, setSelectedMedicines] = useState({});
  const [adress, setAdress] = useState("");
  const navigate = useNavigate();
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

  const removeFromCart = (medicineName) => {
    let storedMedicines = JSON.parse(localStorage.getItem("selectedMedicines")); // hada bach kanakhdo data mn localstorage dkchi li wsst () how lkey

    if (storedMedicines) {
      storedMedicines = storedMedicines.filter(
        (medicine) => medicine.name !== medicineName
      ); // kandiro filter ldata ou kan7ydo dkchi li 3ndo nafss smia dial hadik li wrakna fiha 3la remove

      localStorage.setItem(
        "selectedMedicines",
        JSON.stringify(storedMedicines)
      ); // hna kanbadlo data li 3ndna deja flocalstorage bdata li drna liha filter li 7ydna mnha dkchi li bghina
      setSelectedMedicines(storedMedicines);
    }
  };
  const totalPrice = Object.values(selectedMedicines).reduce(
    (total, medicine) => {
      // Example: medicine.price is "10.50 dhs"
      const priceString = medicine.price.replace(/[^\d.-]/g, ""); // kan7ydo ga3 dkchi li machi ar9am (numbers) bregex
      const itemPrice = parseFloat(priceString); // kanrj3ouh lfloat

      if (!isNaN(itemPrice)) {
        const itemTotal = itemPrice * medicine.quantity;
        return total + itemTotal;
      } else {
        console.error(
          `Invalid price format for ${medicine.name}: ${medicine.price}`
        );
        return total; // Skip invalid prices
      }
    },
    0
  );
  const handleSubmit = async () => {
    try {
      const items = Object.values(selectedMedicines).map((medicine) => ({
        medicine_name: medicine.name,
        quantity: medicine.quantity,
        price: parseFloat(medicine.price.replace(/[^\d.-]/g, "")),
      }));

      const requestData = {
        delivery_address: adress,
        items: items,
      };
      console.log(requestData);
      const response = await axios.post(
        "http://localhost:8000/api/orders",
        requestData,
        { withCredentials: true, withXSRFToken: true }
      );
      console.log("Order sent successfully:", response.data);

      // Optionally, clear localStorage after successful submission
      localStorage.removeItem("selectedMedicines");
      navigate("/meds/page/1", { replace: true });

      // Handle further logic based on backend response if needed
    } catch (error) {
      console.error("Error sending order:", error);
      // Handle error scenario
    }
  };
  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {Object.keys(selectedMedicines).length > 0 &&
                  Object.values(selectedMedicines).map((med, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                    >
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="#" className="shrink-0 md:order-1"></a>

                        <label for="counter-input" className="sr-only">
                          Choose quantity:
                        </label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            <button
                              type="button"
                              id="decrement-button"
                              data-input-counter-decrement="counter-input"
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              <Minus size={14} />
                            </button>
                            <input
                              type="text"
                              id="counter-input"
                              data-input-counter
                              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                              placeholder=""
                              value={med.quantity}
                              required
                            />
                            <button
                              type="button"
                              id="increment-button"
                              data-input-counter-increment="counter-input"
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                              {med.price}
                            </p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a
                            href="#"
                            className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                          >
                            {med.name}
                          </a>

                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => removeFromCart(med.name)}
                              type="button"
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            >
                              <svg
                                className="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M6 18 17.94 6M18 18 6.06 6"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        {totalPrice} DH
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Savings
                      </dt>
                      <dd className="text-base font-medium text-green-600">
                        -$00.00
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Store Pickup
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        $00
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Tax
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        $00
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      {totalPrice} DH
                    </dd>
                  </dl>
                </div>
                <div>
                  <label className="text-base font-bold text-gray-900 dark:text-white">
                    Your Home Address:<span className="text-red-500">*</span>
                  </label>
                  <input
                    value={adress}
                    onChange={(e) => setAdress(e.target.value)}
                    name="delivery_address"
                    type="text"
                    id="voucher"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder=""
                    required
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="flex w-full items-center justify-center rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 "
                >
                  Proceed to Checkout
                </button>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {" "}
                    or{" "}
                  </span>
                  <Link
                    to="/meds/page/1"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  >
                    Continue Shopping
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <form className="space-y-4">
                  <div>
                    <label
                      for="voucher"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Do you have a voucher or gift card?{" "}
                    </label>
                    <input
                      type="text"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder=""
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Apply Code
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
