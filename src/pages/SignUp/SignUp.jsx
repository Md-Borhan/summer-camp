import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    createUser(data?.email, data?.password)
      .then(() => {
        toast.success("Sign up successfully!");
        updateUserProfile(data?.name, data?.photo)
          .then(() => {
            toast.success("User Profile update!");
          })
          .catch((error) => {
            toast.error(error.message);
          });
        reset();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  console.log(errors);

  // Confirm Password Validate
  const password = watch("password");
  const confirmPasswordValidator = (value) => {
    if (value === password) {
      return true;
    } else {
      return "Passwords do not match";
    }
  };

  // Handle google login
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        toast.success("Login Success");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Handle github login
  /*  const handleGithubLogin = () => {
    sigInWithGithub()
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        toast.success("Login Success");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }; */

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>United Champions | SignUp</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="px-3 py-4 w-full md:max-w-7xl mx-auto">
        <div className="grid">
          <div className="card-body shadow rounded-md shadow-blue-100">
            <h2 className="text-center text-white text-2xl sm:text-3xl font-bold">
              Create New Account
            </h2>
            <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">Name*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    {...register("name", { required: true, maxLength: 80 })}
                    placeholder="Name"
                    className="input shadow-blue-200 shadow input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">Email*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    {...register("email", {
                      required: true,
                    })}
                    placeholder="Email"
                    className="input shadow-blue-200 shadow input-bordered"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">Password*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      {...register("password", {
                        required: true,
                        pattern:
                          /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                        minLength: 6,
                        maxLength: 20,
                      })}
                      placeholder="Password"
                      className="input w-full shadow-blue-200 shadow input-bordered"
                    />
                    {errors.password?.type === "required" && (
                      <span className="text-red-500">
                        Password is required{" "}
                      </span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <span className="text-red-500">
                        Password at least 6 character
                      </span>
                    )}
                    {errors.password?.type === "maxLength" && (
                      <span className="text-red-500">
                        Password at least 6 character
                      </span>
                    )}
                    {errors.password?.type === "pattern" && (
                      <span className="text-red-500">
                        Password has should be one upper one lower one number &
                        one special character.
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">
                      Confirm Password*
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="confirmPassword"
                      {...register("confirmPassword", {
                        required: true,
                        validate: confirmPasswordValidator,
                      })}
                      placeholder="confirm password"
                      className="input w-full shadow-blue-200 shadow input-bordered"
                    />
                    {errors.confirmPassword && (
                      <span className="text-red-500">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">Photo URL*</span>
                  </label>
                  <input
                    type="text"
                    name="photo"
                    {...register("photo", {
                      required: true,
                    })}
                    placeholder="Photo URL"
                    className="input shadow-blue-200 shadow input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">Phone Number</span>
                  </label>
                  <input
                    type="text"
                    name="photo"
                    {...register("phoneNumber", {
                      required: true,
                      minLength: 6,
                      maxLength: 12,
                    })}
                    placeholder="Photo Number"
                    className="input shadow-blue-200 shadow input-bordered"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">Address</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    {...register("address", {
                      minLength: 6,
                      maxLength: 50,
                    })}
                    placeholder="Photo Number"
                    className="input shadow-blue-200 shadow input-bordered"
                  />
                </div>
                <div className=" pb-6">
                  <label className="label">
                    <span className="label-text text-white">Gender</span>
                  </label>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <label className="label">
                        <span className="label-text text-white">Male</span>
                      </label>
                      <input
                        className="radio radio-info"
                        {...register("gender")}
                        type="radio"
                        value="Male"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="label">
                        <span className="label-text text-white">Female</span>
                      </label>
                      <input
                        className="radio radio-info"
                        {...register("gender", { required: true })}
                        type="radio"
                        value="Female"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="label">
                        <span className="label-text text-white">Other</span>
                      </label>
                      <input
                        className="radio radio-info"
                        {...register("gender", { required: true })}
                        type="radio"
                        value="Other"
                      />
                    </div>
                  </div>
                  {/*  <select
                  className="select select-bordered input shadow-blue-200 shadow"
                  {...register("Gender", {
                    required: true,
                  })}
                >
                  <option disabled selected>
                    Pick one
                  </option>
                  <option value="female">female</option>
                  <option value="male">male</option>
                  <option value="other">other</option>
                </select> */}
                </div>
              </div>
              {/* TODO: implement one social login button */}
              <div className="w-full md:w-1/3 lg:w-2/6 mx-auto form-control border p-1 rounded-full border-[#571ce0] shadow-blue-100 shadow">
                <input
                  className="btn rounded-full border-transparent bg-[#571ce0] hover:bg-transparent text-white hover:border-[#571ce0]"
                  type="submit"
                  value="Sign up"
                />
              </div>
            </form>

            <div className="text-center mt-4 text-white">
              <p>
                Already have an account?{" "}
                <Link className=" text-[#571ce0] underline" to="/login">
                  <strong>Login</strong>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
