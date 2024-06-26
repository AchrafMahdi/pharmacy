import React from "react";
import { Link, useLocation } from "react-router-dom";
import ToggleTheme from "./Theme/ToggleTheme";
import Cart from "./client/Cart";

const Navbar = () => {
  const { pathname } = useLocation();

  const links = [
    {
      name: "Homepage",
      path: "/home",
    },
    {
      name: "Pharmacies",
      path: "/pharmacies",
    },
    {
      name: "Medicines",
      path: "/meds/page/1",
    },
    {
      name: "Contact",
      path: "/contact",
    },
    // zidi lien mn hna
  ];
  return (
    <>
      {/* <!-- ========== HEADER ========== --> */}
      <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-7">
        <nav
          className="relative max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-6 md:px-8 mx-auto"
          aria-label="Global"
        >
          <div className="md:col-span-3">
            {/* <!-- Logo --> */}
            <Link
              className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
              to={"/home"}
              aria-label="Preline"
            >
              <img className=" w-32" src="/Images/pharmapicc.png" />
            </Link>
            {/* <!-- End Logo --> */}
          </div>

          {/* <!-- Button Group --> */}
          <div className="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
            <Link
              to={"login"}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            >
              Sign in
            </Link>
            <Link
              to={"/signup"}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-transparent bg-lime-400 text-black hover:bg-lime-500 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-lime-500"
            >
              Register
            </Link>
            <Cart />

            <div className="md:hidden">
              <button
                type="button"
                className="hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden flex-shrink-0 size-4"
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
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden flex-shrink-0 size-4"
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
          {/* <!-- End Button Group --> */}

          {/* <!-- Collapse --> */}
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6"
          >
            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
              {links.map((link) => (
                <div>
                  {pathname === link.path ? (
                    <Link
                      className="relative inline-block text-black before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400"
                      to={link.path}
                      aria-current="page"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <Link
                      className="relative inline-block text-black "
                      to={link.path}
                      aria-current="page"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* <!-- End Collapse --> */}
        </nav>
      </header>
      {/* <!-- ========== END HEADER ========== --> */}
    </>
  );
};

export default Navbar;
