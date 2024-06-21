import { useEffect, useState } from "react";
import * as cheerio from "cheerio";
import { Button } from "@/components/ui/button";

import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const Medicaments = () => {
  const { page } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const nav = useNavigate();

  const [meds, setMeds] = useState(null);
  const [url, setUrl] = useState(`http://localhost:8000/api/meds/${page}`);
  const [selectedMedicines, setSelectedMedicines] = useState(() => {
    // Initialize selected medicines from localStorage if present
    const storedMedicines = localStorage.getItem("selectedMedicines");
    return storedMedicines ? JSON.parse(storedMedicines) : {};
  });
  const fetchMedsHtml = async () => {
    try {
      const response = await fetch(url);
      const data = await response.text();
      const $ = cheerio.load(data);

      // Extracting and transforming the data into objects
      const medicaments = [];
      $("tr").each((index, element) => {
        const details = $(element).find(".details").text().trim();
        if (details) {
          // Split the details into name and price info
          const [name, other] = details.split("\n");
          const [presentation, price] = other.split(" - ");
          // Create an object with name, ppv, and other details
          medicaments.push({
            name: name.trim(),
            presentation: presentation.trim(),
            price: price.trim(), // Renamed from 'other'
          });
        }
      });

      setMeds(medicaments);
    } catch (error) {
      console.log("Error while fetching:", error);
    }
  };

  useEffect(() => {
    if (page > 1 && page > 0) {
      if (searchParams.get("search")) {
        setUrl(
          `http://localhost:8000/api/meds/${page}?search=${searchParams.get(
            "search"
          )}`
        );
      } else {
        setUrl(`http://localhost:8000/api/meds/${page}`);
      }
    }
  }, [page]);

  useEffect(() => {
    if (searchParams.get("search")) {
      setUrl(
        `http://localhost:8000/api/meds/${page}?search=${searchParams.get(
          "search"
        )}`
      );
    }
    fetchMedsHtml();
  }, [url, searchParams]); // Fetch data when URL changes

  function handleSearch(e) {
    e.preventDefault();
    if (page > 1) {
      nav("/meds/page/1");
    }
    setSearchParams({ search: searchInput });
  }

  function handleNext() {
    if (searchParams.get("search")) {
      nav(
        `/meds/page/${parseInt(page) + 1}?search=${searchParams.get("search")}`
      );
    } else {
      nav(`/meds/page/${parseInt(page) + 1}`);
    }
  }

  function handlePrevious() {
    if (searchParams.get("search")) {
      if (parseInt(page) > 1) {
        nav(
          `/meds/page/${parseInt(page) - 1}?search=${searchParams.get(
            "search"
          )}`
        );
      } else {
        nav(`/meds/page/1?search=${searchParams.get("search")}`);
      }
    } else {
      if (parseInt(page) > 1) {
        nav(`/meds/page/${parseInt(page) - 1}`);
      } else {
        nav(`/meds/page/1`);
      }
    }
  }

  const handleBuyClick = (med) => {
    setSelectedMedicines((prevSelected) => {
      const updatedSelected = { ...prevSelected };

      if (updatedSelected[med.name]) {
        updatedSelected[med.name].quantity += 1;
      } else {
        updatedSelected[med.name] = {
          name: med.name,
          price: med.price,
          quantity: 1,
        };
      }

      // Update localStorage and dispatch custom event
      localStorage.setItem(
        "selectedMedicines",
        JSON.stringify(updatedSelected)
      );
      window.dispatchEvent(new Event("storageChange"));

      return updatedSelected;
    });
  };
  return (
    <div>
      {/* <!-- Table Section --> */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* <!-- Card --> */}
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {/* <!-- Header --> */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Medicaments
                    </h2>
                    <p className="text-sm text-gray-600">
                      list de medicaments.
                    </p>
                  </div>
                  <div className="sm:col-span-1">
                    <label
                      for="hs-as-table-product-review-search"
                      className="sr-only"
                    >
                      Search
                    </label>
                    <form onSubmit={handleSearch} className="relative">
                      <input
                        type="text"
                        id="hs-as-table-product-review-search"
                        name="search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="py-2 px-3 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border"
                        placeholder="Search"
                      />
                      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                        <svg
                          className="flex-shrink-0 size-4 text-gray-400 dark:text-neutral-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.3-4.3" />
                        </svg>
                      </div>
                    </form>
                  </div>
                </div>
                {/* <!-- End Header --> */}

                {/* <!-- Table --> */}
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 divide-y divide-gray-200">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start border-s border-gray-200"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                          Name
                        </span>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                          Price
                        </span>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800"></span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {meds &&
                      meds.map((med, index) => (
                        <tr key={index}>
                          <td className="h-px w-auto whitespace-nowrap">
                            <div className="px-6 py-2 flex items-center gap-x-3">
                              <a className="flex  flex-col gap-x-2" href="#">
                                <span className="text-sm text-blue-600 decoration-2 hover:underline">
                                  {med.name}
                                </span>

                                <span className="text-sm text-gray-500">
                                  {med.presentation}
                                </span>
                              </a>
                            </div>
                          </td>
                          <td className="h-px w-auto whitespace-nowrap">
                            <div className="px-6 py-2">
                              <span className="text-sm text-blue-600 decoration-2 hover:underline">
                                {med.price}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-auto whitespace-nowrap">
                            <div className="px-6 py-2">
                              <Button
                                className=""
                                onClick={() => handleBuyClick(med)}
                              >
                                Buy
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {/* <!-- End Table --> */}

                {/* <!-- Footer --> */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600"></p>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      <button
                        onClick={handlePrevious}
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        <svg
                          className="flex-shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="m15 18-6-6 6-6" />
                        </svg>
                        Prev
                      </button>

                      <button
                        onClick={handleNext}
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Next
                        <svg
                          className="flex-shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                {/* <!-- End Footer --> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}
      </div>
      {/* <!-- End Table Section -->       */}
    </div>
  );
};

export default Medicaments;
