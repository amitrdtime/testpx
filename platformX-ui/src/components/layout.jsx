import React, { useState } from "react";
import ResponsiveAppBar from "./AppBar";
import SideNavBar from "./sideNav";
import "../styles/layout.css";

const Layout = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarExpanded((prev) => !prev);
  };

  return (
    <div className="app">
      <SideNavBar expanded={sidebarExpanded} onToggle={handleSidebarToggle} />
      <div className={`content ${sidebarExpanded ? "overlay-active" : ""}`}>
        <ResponsiveAppBar />
        <main className="main-content">{children}</main>
      </div>
      {sidebarExpanded && (
        <div className="overlay" onClick={handleSidebarToggle}></div>
      )}
    </div>
  );
};

export default Layout;
