import { RouterProvider } from "react-router-dom";
import router from "./router/index";
import { ThemeProvider } from "./components/Theme/ThemeProvider";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
