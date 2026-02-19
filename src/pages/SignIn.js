import { Formik } from "formik";
import { Link, useNavigate } from "react-router";
import Loader from "../components/Loader.js";
import logo from "../assets/venus_logo.svg";
import { useState } from "react";
import axios from "axios";

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [shake, setShake] = useState(false);
  const [userName, setUsername] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    setErrorMessage("");
    setIsFormSubmitting(true);
    try {
      const response = await axios.post(
        "https://subscription-tracker-api-e5u0.onrender.com/api/v1/auth/sign-in",
        {
          email,
          password,
        },
      );

      const Userdata = response.data;
      setUsername(Userdata.data.user.name);

      //only continue if the response is successful and contains the expected data object
      if (response && response.status === 200) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {
      setIsFormSubmitting(false);
      setShake(true);
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid email or password. Please try again.");
      } else {
        setErrorMessage("User not found. Please enter valid credentials.");
      }
    }
  };

  return (
    <div className="h-screen custom-bg">
      <div className="px-10 py-5 fixed top-0 left-0 z-50 ">
        <Link to="/" className="text-blue-500 hover:underline">
          <img src={logo} className="App-logo" width={150} alt="logo" />
        </Link>
      </div>
      <div className="">
        <div className="flex items-center justify-center h-screen bg-blue-500 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 bg-blend-overlay">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div>
                <Loader />
              </div>
              <p className="text-sm text-gray-300 mt-4">
                {userName && `Welcome back ${userName}`}
              </p>
            </div>
          ) : (
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.password) {
                  errors.password =
                    "Password is required. Please enter your password.";
                } else if (values.password.length < 8) {
                  errors.password =
                    "Password must be at least 8 characters long";
                }
                if (!values.email) {
                  errors.email =
                    "Email address is required. Please enter your email.";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                return errors;
              }}
              onSubmit={(values, { isSubmitting, resetForm }) => {
                handleSubmit(values);

                resetForm();
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                submitForm,
                validateForm,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form
                  className={`p-10 bg-white rounded shadow-lg ${shake ? "shake" : ""}`}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formErrors = await validateForm();
                    if (formErrors && Object.keys(formErrors).length > 0) {
                      setShake(true);
                      setTimeout(() => setShake(false), 600);
                      return;
                    }
                    // no validation errors -> submit the form
                    await submitForm();
                  }}
                >
                  {errorMessage && (
                    <div className="text-xs text-orange-600 border-l-4 py-5 px-3 mb-4 bg-red-100 border-orange-400 rounded-sm">
                      {errorMessage}
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-2 text-2xl font-bold my-8">
                    <h4 className="font-BeVietnam tracking-tight"> Sign in</h4>
                    <Link
                      to="/sign-up"
                      className="text-sm text-blue-500 cursor-pointer border-b-2 border-blue-500"
                    >
                      I don't have an account
                    </Link>
                  </div>
                  <input
                    className="block py-4 px-1 w-96 bg-transparent border-b font-BeVietnam text-sm mb-2 focus:outline-none focus:ring-0 focus:border-blue-500  "
                    placeholder="Enter email address"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <div className="text-xs text-red-500 px-1 my-2">
                    {errors.email && touched.email && errors.email}
                  </div>
                  <input
                    className="block py-4 px-1 w-96 bg-transparent border-b font-BeVietnam text-sm mb-2 focus:outline-none focus:ring-0 focus:border-blue-500  "
                    placeholder="Enter password"
                    type="password"
                    name="password"
                    autoComplete="true"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <div className="text-xs text-red-500 px-1 my-2">
                    {errors.password && touched.password && errors.password}
                  </div>
                  <div className="text-center">
                    <button
                      className="rounded-full hover:cursor-pointer w-96 shadow-md inset-shadow-sm shadow-blue-500/20 bg-gradient-to-r from-[#095ae6] to-[#062794] px-9 py-3 font-BeVietnam font-bold text-white my-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      type="submit"
                      disabled={isFormSubmitting}
                    >
                      {isFormSubmitting
                        ? "Signing in..."
                        : "Continue to sign in"}
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}
