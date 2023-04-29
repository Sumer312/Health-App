import useThemeStore, { themeEnum } from "../components/store/theme";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const theme = useThemeStore((state) => state.theme);
  const [stateTheme, setStateTheme] = useState<string>();
  const changeTheme = useThemeStore((state) => state.changeTheme);
  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);
  return (
    <>
      <nav className="hidden fixed z-50 md:navbar lg:navbar xl:navbar bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-20">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" to="/">
            Health & Diet WebApp
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 mr-8">
            <li tabIndex={0}>
              <img
                src={
                  stateTheme === themeEnum.LIGHT
                    ? "https://img.icons8.com/ios-glyphs/256/bright-moon--v2.png"
                    : "https://img.icons8.com/material-rounded/96/FFFFFF/sun--v1.png"
                }
                alt="Theme"
                width="60"
                height="40"
                onClick={changeTheme}
              />
            </li>
          </ul>
        </div>
      </nav>
      <div className="fixed z-50 md:hidden lg:hidden xl:hidden navbar bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-60">
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" to="/">
            Health & Diet WebApp
          </Link>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
