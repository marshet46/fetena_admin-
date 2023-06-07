import React from "react";
import { Formik, Form, Field, useField, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/features/user/user-slice";
import App from '../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Loader } from "../components";

const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
  });

function Login() {


    const dispatch = useDispatch();
  const auth = useSelector(state => state.user);
    const handleSubmit=(values) => {

        dispatch(signIn(values));

  }
  if (auth.isLoading) {
    return <Loader />;
  }
  if (auth.error) {
    return <div><p>{auth.error}</p></div>;
  }
  if (auth.isAuthenticated) {
    return <App />;
  }
  return (
    <div>
    <Formik
        // validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values)=>{
            handleSubmit(values);
        }
        }
    handleSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,

        }) => (

    <div className="login">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <span>Login</span>

            <input
              type="email"
              name="email"
              onChange={
                (value, event)=>{
                    handleChange(value)
                }
              }
              onBlur={handleBlur}
              placeholder="Enter email id / username"
              className="form-control inp_text"
              id="email"
              style={{borderColor:errors.email?'red':'inherit'}}


            />

            <input
              type="password"
              name="password"
              onChange={(value, event)=>{
                handleChange(value)
            }}
              onBlur={handleBlur}
              placeholder="Enter password"
              className="form-control"

              style={{borderColor:errors.password?'red':'inherit'}}
            />

            <button type="submit" >Login</button>
          </form>
        </div>
      </div>
      )}
      </Formik>
      </div>
  );
}

export default Login;