import React, { useState } from "react";
import { motion } from "framer-motion";

import "../styles/adminStyles/Admin.css";
import tabs from "../components/admin/Tabs.js";
import CreateProductForm from "../components/admin/CreateProductForm.jsx";
import ProductsList from "../components/admin/ProductsList.jsx";
import AnalyticsTab from "../components/admin/AnalyticsTab.jsx";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  return (
    <div className="admin-contain">
      <div className="admin-container">
        <motion.h1
          className="admin-h1"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Admin Dashboard
        </motion.h1>

        <div className="tabs">
          {tabs.map((tab) => (
            <button
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="tab-icon" />
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductsList />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
};

export default AdminPage;
