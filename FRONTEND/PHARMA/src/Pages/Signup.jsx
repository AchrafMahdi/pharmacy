import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // so the page don't refresh fach ndiro submit
    const values = {
      name,
      email,
      phone_number: phone,
      password,
      password_confirmation: passwordConfirmation,
    };
    try {
      await axios.post("http://localhost:8000/api/register", values, {
        withCredentials: true,
        withXSRFToken: true,
      });
      const res = await axios.get("http://localhost:8000/api/user", {
        withCredentials: true,
        withXSRFToken: true,
      });
      switch (res.data.role) {
        case "admin":
          navigate("/admin/dashboard", { replace: true });
          break;
        case "user":
          navigate("/buying", { replace: true });
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* <!-- Hero --> */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-screen-md py-12 px-4 sm:px-6 md:max-w-screen-xl md:py-20 lg:py-32 md:px-8">
          <div className="md:pe-8 md:w-1/2 xl:pe-0 xl:w-5/12">
            {/* <!-- Title --> */}
            <h1 className="text-3xl text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight">
              Meeting Your <span className="text-lime-600">Health</span> Needs
              Anytime{" "}
            </h1>
            <p className="mt-3 text-base text-gray-500">
              Built on reliable technology, Pharma connects you to 24/7
              pharmacies and ensures quick access to essential medications,
              making healthcare accessible whenever you need it.
            </p>
            {/* <!-- End Title --> */}

            <div className="my-8"></div>

            {/* <!-- Form --> */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  for="hs-hero-name-2"
                  className="block text-sm font-medium"
                >
                  <span className="sr-only">Full name</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  type="text"
                  id="hs-hero-name-2"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border"
                  placeholder="Full name"
                />
              </div>

              <div className="mb-4">
                <label
                  for="hs-hero-email-2"
                  className="block text-sm font-medium"
                >
                  <span className="sr-only">Email address</span>
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  id="hs-hero-email-2"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border"
                  placeholder="Email address"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">
                  <span className="sr-only">Phone number</span>
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  name="phone_number"
                  type="text"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border"
                  placeholder="(+212) 999999999..."
                />
              </div>

              <div className="mb-4">
                <label
                  for="hs-hero-password-2"
                  className="block text-sm font-medium"
                >
                  <span className="sr-only">Password</span>
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                  id="hs-hero-password-2"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border"
                  placeholder="Password"
                />
              </div>
              <div className="mb-4">
                <label
                  for="hs-hero-password-2"
                  className="block text-sm font-medium"
                >
                  <span className="sr-only">confirm Password</span>
                </label>
                <input
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  type="password"
                  name="password_confirmation"
                  id="hs-hero-password-2"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border"
                  placeholder="confirm Password ..."
                />
              </div>

              <div className="grid">
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Sign up
                </button>
              </div>
            </form>
            {/* <!-- End Form --> */}
          </div>
        </div>

        <div className="hidden md:block md:absolute md:top-0 md:start-1/2 md:end-0 h-full bg-[url('https://images.unsplash.com/photo-1543243803-2c586f6068b6?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-center bg-cover"></div>
        {/* <!-- End Col --> */}
      </div>
      {/* <!-- End Hero --> */}
    </div>
  );
};

export default Signup;
