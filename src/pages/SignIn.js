import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router';
import Loader from '../components/Loader.js';
import { useState } from 'react';


export default function SignIn() {
    const [apiErrors, setApiErrors] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    const handleSubmit = (values) => {

        const { email, password } = values; // destructure the values from the form
        const registerUser = async () => {
            try {
                setApiErrors(''); // Clear previous errors
                const response = await fetch('https://subscription-tracker-api-e5u0.onrender.com/api/v1/auth/sign-in', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    setApiErrors(data.message || 'Could not process your actions. Please try again.');
                } else {

                    setUser(data.data.user.name);
                    setIsLoading(true);
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 3000);

                }
            } catch (error) {
                console.error('Error signing in user:', error);
                setApiErrors(error.message || 'An error occurred. Please try again.');
            }
        }
        registerUser();
    }
    return (
        <div className='h-screen custom-bg'>
            <div className=''>
                <div className='flex items-center justify-center h-screen bg-blue-500 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 bg-blend-overlay'>
                    {isLoading ? (
                        <div className='flex flex-col items-center justify-center py-12'>
                            <div><Loader /></div>
                            <p className='text-sm text-gray-300 mt-4'>{user && `Welcome ${user}`}</p>
                        </div>
                    ) : (
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validate={values => {
                                const errors = {};
                                if (!values.password) {
                                    errors.password = 'Password is required. Please enter your password.';
                                } else if (values.password.length < 8) {
                                    errors.password = 'Password must be at least 8 characters long';
                                }
                                if (!values.email) {
                                    errors.email = 'Email address is required. Please enter your email.';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                handleSubmit(values);
                                setIsLoading(true);
                                setSubmitting(true);
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
                                isSubmitting,
                                /* and other goodies */
                            }) => (
                                <form className='p-10 bg-white rounded shadow-lg' onSubmit={handleSubmit}>
                                    {apiErrors && <div className='text-xs text-orange-600 border-l-4 py-5 px-3 mb-4 bg-red-100 border-orange-400 rounded-sm'>{apiErrors}</div>}
                                    <div className='flex items-center justify-between gap-2 text-2xl font-bold my-8'><h4 className='font-BeVietnam tracking-tight'> Sign in</h4><Link to="/sign-up" className="text-sm text-blue-500 cursor-pointer border-b-2 border-blue-500">I don't have an account</Link></div>
                                    <input
                                        className='block py-4 px-1 w-96 bg-transparent border-b font-BeVietnam text-sm mb-2 focus:outline-none focus:ring-0 focus:border-blue-500  '
                                        placeholder='Enter email address'
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                    <div className='text-xs text-red-500 px-1 my-2'>{errors.email && touched.email && errors.email}</div>
                                    <input
                                        className='block py-4 px-1 w-96 bg-transparent border-b font-BeVietnam text-sm mb-2 focus:outline-none focus:ring-0 focus:border-blue-500  '
                                        placeholder='Enter password'
                                        type="password"
                                        name="password"
                                        autoComplete='true'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
                                    <div className='text-xs text-red-500 px-1 my-2'>{errors.password && touched.password && errors.password}</div>
                                    <div className='text-center'>
                                        <input className="rounded-full hover:cursor-pointer w-96 shadow-md inset-shadow-sm shadow-blue-500/20 bg-gradient-to-r from-[#095ae6] to-[#062794] px-9 py-3 font-BeVietnam font-bold text-white my-3" type="submit" disabled={isSubmitting} value="Continue to sign in" />
                                    </div>
                                </form>
                            )}
                        </Formik>
                    )}
                </div>
            </div>

        </div>
    )
}

