import React, { useState, useEffect, FormEvent, Fragment } from "react";
import logo from "./../images/logoWhite.svg";
import { useNavigate } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";
import { NavLink } from "react-router-dom";
import "./Signup.scss";
import Loading from "../components/loading/Loading";
import { setStorage } from "../utils/localStorage";
function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const { fetchSignUp, isLoading, error } = useSignUp();

  const navigate = useNavigate();

  useEffect(() => {
    setStorage("get", "tokenJwt") && navigate("./dashboard");
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
      const resp = await fetchSignUp({
        method: "POST",
        data: {
          name: userName,
          password,
          email,
          createdAt: new Date().getTime(),
        },
      });
      console.log("prova", resp);

      // navigate("./dashboard");
 
    // } else {
    //   setWrongLogin(true);
    // }
  };

  const renderForm = () => {
    return (
      <div className="w-full max-w-md ">
        <form
          className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              value={userName}
              onChange={({ target: { value } }) => setUserName(value)}
              type="text"
              placeholder="Username"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              placeholder="Email"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            {/* border-red-500 */}
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
              type="password"
              placeholder="******************"
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </div>
          <div className="flex flex-col items-center justify-center ">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline btn__form"
              type="submit"
            >
              Sign Up
            </button>
            <NavLink to="/signin">
              <p
                className="text-blue-500 mt-2 text-xs"
                style={{ textDecoration: "underline" }}
              >
                Sign In
              </p>
            </NavLink>

            {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a> */}
          </div>
        </form>
      </div>
    );
  };

  return (
    <Fragment>
     {isLoading && <Loading /> }
    <div className="my__container">
      <img src={logo} className="logo" alt="logo" />
      {renderForm()}
    </div>
    </Fragment>
  );
}

export default SignUp;
