import React, { useState, useEffect, FormEventHandler, FormEvent, Fragment } from "react";
import logo from "./../images/logoWhite.svg";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Signin.scss";
import useSignIn from "../hooks/useSignIn";
import Loading from "../components/loading/Loading";
function SignIn() {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {fetchSignIn, isLoading, error} = useSignIn();

  const navigate = useNavigate();

  useEffect(() => {
    // localStorage.getItem("authorized") === "true" && navigate("./dashboard", {replace: true});
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    console.log('e');
      e.preventDefault();
      if(!password || !email) {
          console.log('e');
          
        setErrorMessage("All fields are required!");
        return;
      }
 
      const resp = await fetchSignIn({
        method: "POST",
        data: {
          email,
          password,
        },
      });
      if(resp){
          console.log("🚀 ~ file: Signin.tsx ~ line 38 ~ handleSubmit ~ resp", resp)
          navigate("/dashboard", {replace: true});
      }
    // } else {
    //   setWrongLogin(true);
    // }
  };

  const renderForm = () => {
    return (
      <div className="w-full max-w-md ">
        <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={(e) =>handleSubmit(e)}>
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
              onChange={({target:{value}}) => setEmail(value)}
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
              type="password"
              value={password}
              onChange={({target:{value}}) => setPassword(value)}

              placeholder="******************"
            />
          { errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p> }
          { error && <p className="text-red-500 text-xs italic">{error}</p> }

          </div>
          <div className="flex flex-col items-center justify-center ">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline btn__form"
              type="submit"
            >
              Sign In
            </button>
            <NavLink to="/signup">
              <p
                className="text-blue-500 mt-2 text-xs"
                style={{ textDecoration: "underline" }}
              >
                Sign Up
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

export default SignIn;
