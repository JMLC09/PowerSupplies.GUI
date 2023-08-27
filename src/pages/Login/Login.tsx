import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BiUserCircle, BiLockOpenAlt } from "react-icons/bi";
function Login() {
  const AuthCtx = useContext(AuthContext);

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const loginHandler = () => {
    AuthCtx.login(login.username, login.password);
  };

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") loginHandler();
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-full">
      {AuthCtx.isAuthenticated ? <Navigate to="/" /> : null}
      <div className="absolute top-0 left-0 w-full h-full object-scale-down blur-sm brightness-95">
        <img
          src="background-login.png"
          alt="Login Background Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="relative rounded-3xl max-w-sm h-[calc(100vp-150px)] w-full opacity-90 transition-all duration-50 ease-in-out hover:opacity-100 bg-gradient-to-t from-[#4facfe] to-[#e2ebf0]">
        <div className="flex items-center justify-center flex-col py-10 ">
          <span className="flex w-[300px] items-center justify-center">
            <span>
              <img src="loginsvg.svg" className="h-[130px]" alt="Login SVG" />
            </span>
          </span>
          <label className="block text-xl text-center text-black font-bold ">
            PowerSupplies Login
          </label>
          <label className="block mt-5 text-md text-center text-black ">
            Ingresa tus credenciales
          </label>
          <div className="mt-7">
            {/* Input UserName */}
            <div className="flex items-center w-full border-none bg-gray-100 h-14 rounded-xl shadow-lg px-4">
              <BiUserCircle className="mr-2" size={32} />
              <input
                type="text"
                placeholder="Usuario"
                value={login.username}
                onChange={(e) =>
                  setLogin({ ...login, username: e.target.value })
                }
                className="block w-full bg-gray-100 border-none h-11 rounded-xl px-3"
                onKeyDown={keyPressHandler}
              />
            </div>
            {/* Input Password */}
            <div className="flex items-center w-full border-none bg-gray-100 h-14 rounded-xl shadow-lg px-4 mt-8">
              <input
                type="password"
                placeholder="Password"
                value={login.password}
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
                className="block w-full bg-gray-100 border-none h-11 rounded-xl px-3"
                onKeyDown={keyPressHandler}
              />
              <BiLockOpenAlt className="ml-2" size={32} />
            </div>
            {/* Boton Login */}
            <div className="mt-10 flex items-center justify-center">
              <a
                onClick={loginHandler}
                className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
              >
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
                <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                  LOGIN
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
