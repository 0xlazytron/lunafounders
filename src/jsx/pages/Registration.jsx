import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import logo from "../../images/logo_luna.png";
import loginbg from "../../images/bg_login.png";
import google from "../../images/google-logo.png";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import TextInput from "../components/custom/text-input";
import Button from "../components/custom/button";
import Loader from "../pages/Loader/Loader";
import {
  loadingToggleAction,
  signupAction,
} from "../../store/actions/AuthActions";

function Register(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [referralCode, setReferralCode] = useState("");
  let errorsObj = { email: "", password: "", username: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const refCode = searchParams.get("r");
    if (refCode) {
      setReferralCode(refCode);
    }
  }, [searchParams]);

  function onSignUp(e) {
    e.preventDefault();
    console.log("Form submitted with:", {
      email,
      password,
      username,
      referralCode,
    });

    let error = false;
    const errorObj = { ...errorsObj };

    if (username === "") {
      errorObj.username = "Username is Required";
      error = true;
    }

    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorObj.email = "Email is invalid";
      error = true;
    }

    if (password === "") {
      errorObj.password = "Password is Required";
      error = true;
    } else if (password.length < 6) {
      errorObj.password = "Password must be at least 6 characters";
      error = true;
    }

    setErrors(errorObj);

    if (error) {
      console.log("Form validation errors:", errorObj);
      return;
    }

    const termsCheckbox = document.getElementById("terms_checkbox");
    if (!termsCheckbox.checked) {
      setErrors({
        ...errorObj,
        terms: "You must agree to the Terms & Conditions",
      });
      return;
    }

    console.log("Dispatching signup action with:", {
      email,
      password,
      username,
      by: referralCode,
    });
    dispatch(loadingToggleAction(true));
    dispatch(signupAction(email, password, username, navigate, referralCode));

    // Form alanlarını sıfırla
    setEmail("");
    setUsername("");
    setPassword("");
    setReferralCode("");
    setErrors(errorsObj);
  }

  return (
    <div
      className="login-main-page"
      style={{ backgroundImage: "url(" + loginbg + ")" }}
    >
      <div className="login-wrapper">
        <div className="login-aside-right">
          <div className="row m-0 justify-content-center h-100 align-items-center">
            <div className="col-xl-11 mx-auto">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    {props.showLoading && <Loader />}
                    <div className="auth-form-1">
                      <div className="mb-4 text-center">
                        <img
                          src={logo}
                          alt="logo"
                          className="mb-3 pt-5"
                          style={{ maxWidth: "150px", height: "auto" }}
                        />
                        <h3
                          className="mb-1 fs-3"
                          style={{
                            color: "#fff",
                            background:
                              "linear-gradient(to right, #ffd36e, #e89b17)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          Create Account
                        </h3>
                        <p className="fs-6 text-white">
                          Please fill in your details to create an account
                        </p>
                      </div>
                      {props.errorMessage && (
                        <div className="bg-red-300 text-danger border border-red-900 p-1 my-2">
                          {props.errorMessage}
                        </div>
                      )}
                      {props.successMessage && (
                        <div className="bg-green-300 text-danger text-green-900 p-1 my-2">
                          {props.successMessage}
                        </div>
                      )}
                      <form onSubmit={onSignUp}>
                        <div className="form-group mb-3">
                          <TextInput
                            icon={<UserOutlined />}
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="username"
                          />
                          {errors.username && (
                            <div
                              className="text-danger"
                              style={{ fontSize: "10px" }}
                            >
                              {errors.username}
                            </div>
                          )}
                        </div>
                        <div className="form-group mb-3">
                          <TextInput
                            icon={<MailOutlined />}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            type="email"
                          />
                          {errors.email && (
                            <div
                              className="text-danger"
                              style={{ fontSize: "10px" }}
                            >
                              {errors.email}
                            </div>
                          )}
                        </div>
                        <div className="form-group mb-3">
                          <TextInput
                            icon={<LockOutlined />}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            type="password"
                          />
                          {errors.password && (
                            <div
                              className="text-danger"
                              style={{ fontSize: "10px" }}
                            >
                              {errors.password}
                            </div>
                          )}
                        </div>
                        <div className="form-row d-flex justify-content-between align-items-center mt-4 mb-2">
                          <div className="form-group mb-0 d-flex align-items-center">
                            <div className="form-check custom-checkbox mb-0">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="terms_checkbox"
                              />
                              <label
                                className="form-check-label mb-0"
                                htmlFor="terms_checkbox"
                                style={{ fontSize: "10px" }}
                              >
                                I agree to the Terms & Conditions
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <Button
                            type="submit"
                            htmlType="submit"
                            className="btn-block"
                          >
                            Sign Up
                          </Button>
                        </div>
                      </form>
                      <div className="google-box text-center my-1">
                        <div className="d-flex align-items-center justify-content-center">
                          <span className="px-3 text-muted fs-10 text-white text-center">
                            Or sign up with
                          </span>
                        </div>
                        <button className="btn d-flex align-items-center justify-content-center w-100">
                          <img
                            src={google}
                            alt="Google"
                            style={{ width: "44px", marginRight: "10px" }}
                          />
                        </button>
                      </div>{" "}
                      {/* end of google-box */}
                      <div className="text-center">
                        <p className="text-white">
                          Have an account? &nbsp;
                          <Link to="/login">
                            <span className="text-primary">Sign In</span>
                          </Link>
                        </p>
                      </div>
                    </div>
                    {/* end of auth-form-1 */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps, { loadingToggleAction })(Register);
