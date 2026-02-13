import { Formik } from 'formik';
import { PiCaretRightBold } from "react-icons/pi";

export default function SignUp() {
  return (
    <div style={{
      background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
    }} className='h-screen'>
      <div className=''>
        <div className='flex items-center justify-center h-screen bg-blue-500 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 bg-blend-overlay'>
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
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
              <form className='p-5 bg-white rounded shadow-md' onSubmit={handleSubmit}>
                <input
                  className='block p-3 w-96 bg-transparent border-2 rounded-md font-BeVietnam'
                  placeholder='Enter email address'
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <div className='py-2'>{errors.email && touched.email && errors.email}</div>
                <input
                  className='block p-3 w-96 bg-transparent border-2 rounded-md font-BeVietnam'
                  placeholder='Enter password'
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <div className='py-2'>{errors.password && touched.password && errors.password}</div>
                <div className='text-center'>
                  <button className="rounded-full shadow-md inset-shadow-sm shadow-blue-500/20 bg-gradient-to-r from-[#095ae6] to-[#062794] px-9 py-3 font-BeVietnam font-bold text-white my-3" type="submit" disabled={isSubmitting}>
                    Continue to sign up
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>

    </div>
  )
}

