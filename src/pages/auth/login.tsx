import { useReducer, Reducer, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useThemeStore from "../../components/store/theme";

enum ActionEnum {
  SET_EMAIL = "SET_EMAIL",
  SET_PASSWORD = "SET_PASSWORD",
}

interface StateType {
  email: undefined | string;
  password: undefined | string;
}

interface ActionType {
  type: ActionEnum;
  payload: string;
}

export default function Login() {
  const theme = useThemeStore((state) => state.theme);
  const [stateTheme, setStateTheme] = useState<string>();

  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);

  const [state, dispatch] = useReducer<Reducer<StateType, ActionType>>(
    (state: StateType, action: ActionType): StateType => {
      switch (action.type) {
        case ActionEnum.SET_EMAIL:
          return {
            email: action.payload,
            password: state.password,
          };
        case ActionEnum.SET_PASSWORD:
          return {
            email: state.email,
            password: action.payload,
          };
        default:
          throw new Error(`Unhandled action type ${action.type}`);
      }
    },
    {
      email: undefined,
      password: undefined,
    }
  );
  return (
    <div className="min-h-screen py-6 flex flex-col place-items-center justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl text-black font-semibold">
                 Login
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    className="peer placeholder-transparent bg-white h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                    value={state.email}
                    onChange={(event) =>
                      dispatch({
                        type: ActionEnum.SET_EMAIL,
                        payload: event.target.value,
                      })
                    }
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer placeholder-transparent bg-white h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                    value={state.password}
                    onChange={(event) =>
                      dispatch({
                        type: ActionEnum.SET_PASSWORD,
                        payload: event.target.value,
                      })
                    }
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <button
                    // onClick={(event) => postData(event)}
                    data-theme={stateTheme}
                    className="btn btn-accent"
                  >
                    Submit
                  </button>
                  <p className="mt-4 text-grey-600 text-sm">
                    Don't have an account{" "}
                    <Link
                      className="text-blue-600 hover:underline"
                      to="/auth/signup"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
