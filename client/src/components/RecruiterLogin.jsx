import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const RecruiterLogin = () => {
  const { setShowRecruiterLogin } = useContext(AppContext);

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [imagess, SetImage] = useState(null);
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up" && !isTextDataSubmitted) {
      setIsTextDataSubmitted(true);
    }
  };

  //   WE were scrolling even we opened recruiter login component
  // to avoid this I created this useEffect

  useEffect(() => {
    // prevent scrolling
    document.body.style.overflow = "hidden";
    return () => {
      // when we cancel recruiter login component , it enables scroll again
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm  bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700  font-medium">
          Recruiter {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>
        {/* To show company logo */}
        {state === "Sign Up" && isTextDataSubmitted ? (
          <>
            <div className="flex items-center gap-4 my-10">
              <label htmlFor="image">
                <img
                  className="w-16 rounded-full"
                  src={
                    imagess ? URL.createObjectURL(imagess) : assets.upload_area
                  }
                  alt=""
                />
                <input
                  onChange={(e) => SetImage(e.target.files[0])}
                  type="file"
                  hidden
                  id="image"
                />
              </label>
              <p>
                Upload Company <br />
                logo
              </p>
            </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} alt="" />

                <input
                  className="outline-none text-sm"
                  placeholder="Company Name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
            )}

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="" />
              <input
                className="outline-none text-sm"
                placeholder="Email Id"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} alt="" />
              <input
                className="outline-none text-sm"
                required
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </>
        )}
        {state === "Login" && (
          <p className="text-sm text-blue-600 mt-4 cursor-pointer">
            Forgot password?
          </p>
        )}

        <button className="bg-blue-600 w-full text-white py-2 rounded-full mt-4">
          {state === "Login"
            ? "login"
            : isTextDataSubmitted
            ? "create account"
            : "next"}
        </button>
        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              SignUp
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute top-5 right-5 cursor-pointer"
          src={assets.cross_icon}
          alt=""
        />
      </form>
    </div>
  );
};

export default RecruiterLogin;
