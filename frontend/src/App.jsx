import "./App.css";

import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";

import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <>
      <div className="Page-Basics">
        <div className="TopBar">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
