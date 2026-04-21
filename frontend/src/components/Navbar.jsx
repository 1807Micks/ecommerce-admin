import React from "react";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useUserStore } from "../stores/useUserStore.js";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";

  return (
    <header className="Header">
      <div className="Navbar">
        <div className="navContainer">
          <Link to="/" className="Logo">
            E-Commerce
          </Link>
          <nav className="Links">
            <Link to={"/"} className="Home">
              Home
            </Link>
            {user && (
              <Link to={"/cart"} className="Cart">
                <ShoppingCart className="ShoppingCart" size={20} />
                <span className="cartWord">Cart</span>
                <span className="cartNumber">3</span>
              </Link>
            )}
            {isAdmin && (
              <Link className="admin">
                <Lock className="lock" size={18} />
                <span className="dashboard">Dashboard</span>
              </Link>
            )}
            {user ? (
              <button className="logoutlogo" onClick={logout}>
                <LogOut size={18} />
                <span className="logout">Log Out</span>
              </button>
            ) : (
              <>
                <Link to={"/signup"} className="signupLink">
                  <UserPlus className="usericon" size={18} />
                  Sign Up
                </Link>
                <Link to={"/login"} className="loginLink">
                  <LogIn className="usericon" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
