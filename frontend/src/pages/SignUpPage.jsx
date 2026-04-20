import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import "../styles/SignUp.css";

const SignUpPage = () => {
  const loading = true;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="container">
      <motion.div
        className="motion"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="createAccount">Create your account</h2>
      </motion.div>
      <motion.div
        className="motion1"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="formDiv">
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="name" className="name">
              Full Name
            </label>
            <div className="userInput">
              <User className="usericon" aria-hidden="true" />
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="nameInfo"
                placeholder="Jane Doe"
              />
            </div>

            <label htmlFor="email" className="email">
              Email Address
            </label>
            <div className="userInput">
              <Mail className="mailicon" aria-hidden="true" />
              <input
                type="email"
                id="email"
                required
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
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
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="passwordInfo"
                placeholder="Password"
              />
            </div>

            <label htmlFor="confirmPassword" className="password">
              Confirm Password
            </label>
            <div className="userInput">
              <Lock className="passwordicon" aria-hidden="true" />
              <input
                type="password"
                id="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="passwordInfo"
                placeholder="Confirm Password"
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
                  <UserPlus className="buttonIcon" aria-hidden="true" />
                  Sign Up
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
