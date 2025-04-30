import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import useAuthStore from "../../store/authStore";
import logo from "../../images/logo_luna.png";
import loginbg from "../../images/bg_login.png";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import TextInput from "../components/custom/text-input";
import Button from "../components/custom/button";

function Login() {
  const navigate = useNavigate();
  const { login: privyLogin, authenticated, getAccessToken } = usePrivy();
  const { login, verifyToken, isAuthenticated, loading, error } =
    useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isAuthenticated) {
      console.log("isAuthenticated", isAuthenticated);
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = false;
    const errorObj = { email: "", password: "" };

    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }
    if (password === "") {
      errorObj.password = "Password is Required";
      error = true;
    }

    setErrors(errorObj);
    if (error) {
      return;
    }

    const result = await login(email, password);
    if (!result.success) {
      setErrors({ ...errorObj, email: result.error });
    }
  };

  const handlePrivyLogin = async () => {
    try {
      console.log("Starting Privy login process...");

      // First, ensure we're authenticated with Privy
      if (!authenticated) {
        console.log("Not authenticated, initiating Privy login...");
        await privyLogin();
        console.log("Privy login initiated, waiting for completion...");
        // Wait for authentication to complete
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      console.log("Attempting to get Privy token...");
      // Get the access token
      const privyToken = await getAccessToken();
      console.log("Privy token received:", privyToken ? "Yes" : "No");

      if (!privyToken) {
        console.log("Token not received, attempting re-authentication...");
        // If token is not available, try to re-authenticate
        await privyLogin();
        console.log("Re-authentication initiated, waiting...");
        await new Promise((resolve) => setTimeout(resolve, 3000));

        console.log("Attempting to get token after re-authentication...");
        const newToken = await getAccessToken();
        console.log("Token after re-authentication:", newToken ? "Yes" : "No");

        if (!newToken) {
          console.error("Failed to get token after re-authentication");
          throw new Error(
            "Failed to get Privy token after re-authentication. Please try again or contact support."
          );
        }

        return await handlePrivyTokenVerification(newToken);
      }

      return await handlePrivyTokenVerification(privyToken);
    } catch (error) {
      console.error("Privy login error details:", error);
      setErrors({
        ...errors,
        email: "Authentication failed. Please try again or use email login.",
      });
    }
  };

  const handlePrivyTokenVerification = async (token) => {
    try {
      console.log("Verifying Privy token with backend...");
      const response = await fetch(
        `https://api.lunafounder.io/api/auth/verify-privy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );

      console.log("Backend response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend verification error:", errorData);
        throw new Error(
          errorData.error || "Failed to verify Privy token with backend"
        );
      }

      const data = await response.json();
      console.log("Backend verification successful");

      if (data.token) {
        console.log("Setting auth token...");
        localStorage.setItem("token", data.token);
        await verifyToken();
        navigate("/");
      } else {
        throw new Error("No token received from backend after verification");
      }
    } catch (error) {
      console.error("Token verification error details:", error);
      setErrors({
        ...errors,
        email: "Verification failed. Please try again or use email login.",
      });
    }
  };

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
                          Sign in your account
                        </h3>
                        <p className="fs-6 text-white">
                          Please enter your details to sign in
                        </p>
                      </div>
                      {error && (
                        <div className="bg-red-300 text-danger border border-red-900 p-1 my-2">
                          {error}
                        </div>
                      )}
                      <form onSubmit={handleSubmit}>
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
                        <div className="form-group mb-3">
                          <Button
                            type="submit"
                            className="btn btn-primary btn-block"
                            style={{ width: "100%" }}
                            disabled={loading}
                          >
                            {loading ? "Signing in..." : "Sign In"}
                          </Button>
                        </div>
                        <div className="form-group mb-3">
                          {/* <Button
                            onClick={handlePrivyLogin}
                            className="btn btn-secondary btn-block"
                            style={{ width: "100%" }}
                            disabled={loading}
                          >
                            Continue with Privy
                          </Button> */}
                        </div>
                        <div className="form-group text-center">
                          <Link to="/forgot-password" className="text-white">
                            Forgot Password?
                          </Link>
                        </div>
                        <div className="form-group text-center">
                          <span className="text-white">
                            Don't have an account?{" "}
                          </span>
                          <Link
                            to="/register"
                            className="text-primary text-nowrap"
                          >
                            Sign up
                          </Link>
                        </div>
                      </form>
                    </div>
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

export default Login;
