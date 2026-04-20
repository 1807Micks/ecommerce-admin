import React from "react";
import "../styles/Login.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 2. Start loading
    setLoading(true);
    try {
      console.log("Form Data:");
      // Simulate an API call (e.g., waiting 2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Success! Move to next page or show success message
    } catch (error) {
      console.error(error);
    } finally {
      // 3. Stop loading whether it worked or failed
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <motion.div
        className="motion"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="loginAccount">Login to your account</h2>
      </motion.div>
      <motion.div
        className="motion1"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="formDiv">
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="email" className="email">
              Email Address
            </label>
            <div className="userInput">
              <Mail className="mailicon" aria-hidden="true" />
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="emailInfo"
                placeholder="you@email.com"
              />
            </div>

            <label htmlFor="password" className="password">
              Password
            </label>
            <div className="userInput">
              <Lock className="passwordicon" aria-hidden="true" />
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="passwordInfo"
                placeholder="**********"
              />
            </div>
            <button type="submit" className="button" disabled={loading}>
              {loading ? (
                <>
                  <Loader className="loaderIcon" aria-hidden="true" />
                  Loading...
                </>
              ) : (
                <>
                  <LogIn className="buttonIcon" aria-hidden="true" />
                  Login
                </>
              )}
            </button>
          </form>
          <p className="signup">
            Dont have an account?
            <Link to="/signup" className="signuplink">
              Sign up here <ArrowRight className="signupIcon" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
