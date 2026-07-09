import { Formik } from "formik";
import { Link, useNavigate } from "react-router";
import { LuUserRoundPlus, LuCircleCheck } from "react-icons/lu";
import Loader from "../components/Loader.js";
import logo from "../assets/venus_logo.svg";
import { useState } from "react";
import axios from "axios";
import { getAuthDataFromResponse, storeAuth } from "../services/helper.js";

export default function SignUp() {
  const [apiErrors, setApiErrors] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [shake, setShake] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [username, setUsername] = useState("");
  const SIGNUP_BASE = process.env.REACT_APP_SIGNUP_BASE;
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    //Destructure form data
    const { name, email, password } = values;
    setApiErrors("");
    setUsername(name);
    setIsFormSubmitting(true);
    try {
      const response = await axios.post(
        SIGNUP_BASE,
        {
          name,
          email,
          password,
        },
      );


      const authData = getAuthDataFromResponse(response.data);
      const authStored = storeAuth(response.data);
      if (authStored) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${authData.token}`;
      }

      if (response && response.status === 201) {
        setIsFormSubmitting(false);
        setShowConfirmationModal(true);
      }


    } catch (error) {
      setIsFormSubmitting(false);
      setShake(true);
      if (error.response && error.response.status === 409) {
        setApiErrors("User with this email already exists.");
      } else {
        setApiErrors("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen custom-bg relative ">
      <div className="px-10 py-5 fixed top-0 left-0 z-50 ">
        <Link to="/" className="text-blue-500 hover:underline">
          <img src={logo} className="App-logo" width={150} alt="logo" />
        </Link>
      </div>

      <div className="">
        <div className="flex items-center justify-center h-screen  bg-blue-500 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 bg-blend-overlay">
          {showConfirmationModal ? (
            <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4">
              <div className="relative z-[80] w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
                <div className="mb-4 flex justify-center">
                  <LuCircleCheck size={52} color="green" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800">
                  Account created successfully
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Your account is ready. Continue to sign in to access your dashboard.
                </p>
                <button
                  type="button"
                  className="mt-6 rounded-full bg-gradient-to-r from-[#095ae6] to-[#062794] px-8 py-3 font-semibold text-white shadow-md hover:cursor-pointer"
                  onClick={() => navigate("/sign-in")}
                >
                  Continue to Sign In
                </button>
              </div>
            </div>
          ) : isFormSubmitting ? (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white/10 px-10 py-12 text-center shadow-xl backdrop-blur">
              <Loader />
              <p className="mt-4 text-sm text-gray-200">
                Creating your account. Please wait...
              </p>
            </div>
          ) : (
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (values.password.length < 6) {
                  errors.password =
                    "Password must be at least 6 characters long";
                }
                if (!values.name) {
                  errors.name = "Full-names required. Please enter your names.";
                }
                if (!values.email) {
                  errors.email =
                    "Email address is required. Please enter your email.";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address.";
                }
                return errors;
              }}
              onSubmit={(values, { resetForm }) => {
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
                handleSubmit: formikHandleSubmit,
                validateForm,
                submitForm,
                isSubmitting,
              }) => (
                <form
                  className={`p-10 glassmorphism shadow-lg rounded-lg ${shake ? "shake" : ""}`}
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
                  {apiErrors && (
                    <div className="text-xs text-orange-600 border-l-4 py-4 px-2 mb-4 bg-red-100 border-orange-400 rounded-sm">
                      {apiErrors}
                    </div>
                  )}
                  <LuUserRoundPlus className="text-white" size={32} />
                  <div className="flex items-center justify-between gap-2 text-2xl font-bold my-8">
                    <h4 className="font-BeVietnam tracking-tight text-white">
                      {" "}
                      Sign up
                    </h4>
                    <Link
                      to="/sign-in"
                      className="text-sm text-blue-500 cursor-pointer border-b-2 border-blue-500"
                    >
                      I already have an account
                    </Link>
                  </div>
                  <input
                    className="block py-4 px-1 w-96 bg-transparent border-b border-white/20 text-white/50 text-md mb-2 focus:outline-none focus:ring-0 focus:border-blue-500"
                    placeholder="Enter full names"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <div className="text-xs text-red-500 px-1 my-2">
                    {errors.name && touched.name && errors.name}
                  </div>
                  <input
                    className="block py-4 px-1 w-96 bg-transparent border-b border-white/20 text-white/50  text-md mb-2 focus:outline-none focus:ring-0 focus:border-blue-500"
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
                    className="block py-4 px-1 w-96 bg-transparent border-b  border-white/20 text-white/50 text-md mb-2 focus:outline-none focus:ring-0 focus:border-blue-500"
                    placeholder="Create a password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <div className="text-xs text-red-500 px-1 my-2">
                    {errors.password && touched.password && errors.password}
                  </div>

                  <div className="text-center">
                    <button
                      className="rounded-full hover:cursor-pointer w-96 shadow-md  bg-gradient-to-r from-[#095ae6] to-[#062794] px-9 py-3 font-BeVietnam font-bold text-white my-5 disabled:opacity-50 disabled:cursor-not-allowed"
                      type="submit"
                      disabled={isFormSubmitting}
                    >
                      {isFormSubmitting
                        ? "Signing up..."
                        : "Continue to sign up"}
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
