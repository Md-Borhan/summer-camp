import { useContext, useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { GiSunkenEye, GiEyelashes } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../providers/AuthProvider";
import Lottie from "lottie-react";
import login from "../../assets/others/login.json";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEyeIcon = () => {
    setShowPassword(!showPassword);
  };

  const from = location.state?.from?.pathname || "/";

  const handleForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    setErrorText("");
    setSuccessText("");

    signIn(email, password)
      .then(() => {
        setSuccessText("😃 User login success!!!");
        form.reset();
        toast.success("Login Success");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrorText(error.message);
      });
  };
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        toast.success("Login Success");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrorText(error.message);
      });
  };

  /*  const handleGithubLogin = () => {
    sigInWithGithub()
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        toast.success("Login Success");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrorText(error.message);
      });
  }; */

  /*  const handleResetPass = () => {
    const email = emailRef.current.value;
    resetPassword(email)
      .then(() => {
        toast.success("Look at your email.", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
      })
      .catch((error) => {
        setErrorText(error.message);
      });
  }; */

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>United Champions | Login</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className={`px-3 py-4 h-screen w-full md:max-w-7xl mx-auto`}>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 py-5`}>
          <div className={`card-body shadow rounded-md shadow-blue-100`}>
            <h2 className="text-center text-3xl text-white font-bold">
              Please Login
            </h2>
            <form onSubmit={handleForm}>
              <div className={`form-control `}>
                <label className={`label `}>
                  <span className={`label-text `}>Email</span>
                </label>
                <input
                  type="email"
                  ref={emailRef}
                  name="email"
                  required
                  placeholder="email"
                  className={`input shadow-blue-100 shadow input-bordered `}
                />
              </div>
              <div className={`form-control `}>
                <label className="label">
                  <span className={`label-text `}>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="password"
                    className={`input w-full shadow-blue-100 shadow input-bordered `}
                  />
                  <span
                    title="show password"
                    className={`absolute right-4 top-4 text-xl `}
                    onClick={handleEyeIcon}
                  >
                    {showPassword ? (
                      <GiSunkenEye></GiSunkenEye>
                    ) : (
                      <GiEyelashes></GiEyelashes>
                    )}
                  </span>
                </div>
              </div>
              <label className={`label `}>
                <a href="#" className={`label-text-alt link link-hover `}>
                  Forgot password?
                </a>
              </label>
              <p className={`text-success `}>{successText}</p>
              <p className={`text-red-600 `}>{errorText}</p>
              <div
                className={`form-control mt-4 border p-1 rounded-full border-[#571ce0] shadow-blue-100 shadow`}
              >
                <button
                  className={`btn rounded-full border-transparent bg-[#571ce0] hover:bg-transparent text-white hover:border-[#571ce0]`}
                >
                  Login
                </button>
              </div>
            </form>
            <div className="flex flex-col sm:flex-row justify-between ">
              <button
                onClick={handleGoogleLogin}
                className={`flex lg:mb-4 w-full sm:w-[48%]  btn btn-error bg-transparent items-center shadow-blue-200 shadow hover:bg-[#571ce0] font-semibold  justify-center border border-[#571ce0] rounded-full mt-5 gap-1 text-white md:py-3 `}
              >
                <span>Login With Google</span>
                <span className="text-lg">
                  <FaGoogle></FaGoogle>
                </span>
              </button>
              <button
                className={`flex w-full  sm:w-[48%] mb-4  btn btn-error bg-transparent items-center shadow-blue-200 shadow font-semibold  justify-center border border-[#571ce0] hover:bg-[#571ce0] rounded-full mt-5 gap-1 text-white md:py-3 `}
              >
                <span>Login With Github</span>
                <span className="text-xl">
                  <FaGithub></FaGithub>
                </span>
              </button>
            </div>
            <p className="text-center text-white">
              Do not have account?{" "}
              <Link className="text-[#571ce0] underline" to="/signUp">
                <strong>Create</strong>
              </Link>
            </p>
          </div>
          <div>
            <Lottie style={{ height: "80vh" }} animationData={login} />
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default Login;
