import { useContext, useEffect } from "react";
import { useClerk } from "@clerk/clerk-react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const RecruiterLogin = () => {
  const { setShowRecruiterLogin } = useContext(AppContext);
  const { openSignIn, openSignUp } = useClerk();

  useEffect(() => {
    // prevent background scroll while this panel is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSignIn = () => {
    setShowRecruiterLogin(false);
    openSignIn({ afterSignInUrl: "/dashboard" });
  };

  const handleSignUp = () => {
    setShowRecruiterLogin(false);
    openSignUp({ afterSignUpUrl: "/dashboard" });
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <div className="relative bg-white p-10 rounded text-slate-500 w-full max-w-sm">
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Recruiter Access
        </h1>
        <p className="text-sm text-center mt-2">
          Sign in with the same account system job seekers use, then head to
          your dashboard to post jobs and review applicants.
        </p>

        <button
          onClick={handleSignIn}
          className="bg-blue-600 w-full text-white py-2 rounded-full mt-6"
        >
          Login
        </button>
        <button
          onClick={handleSignUp}
          className="border border-blue-600 text-blue-600 w-full py-2 rounded-full mt-3"
        >
          Create an account
        </button>

        <img
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute top-5 right-5 cursor-pointer"
          src={assets.cross_icon}
          alt=""
        />
      </div>
    </div>
  );
};

export default RecruiterLogin;
