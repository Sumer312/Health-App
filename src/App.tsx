import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import Navbar from "./components/navbar.tsx";
import useThemeStore, { themeEnum } from "./components/store/theme.ts";
import { useEffect, useState } from "react";
import Home from "./pages/home.tsx";
import UserInput from "./pages/userInput.tsx";

function App() {
  const theme = useThemeStore(state => state.theme);
  const [stateTheme, stateStateTheme] = useState<string>(theme)
  useEffect(() => {
    stateStateTheme(theme)
  }, [theme])
  return (
    <div data-theme={stateTheme} className={stateTheme === themeEnum.LIGHT ? "bg-white" : "bg-black"}>  
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/user-input/:type" element={<UserInput />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
