import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../styles/style.css";

function Layout() {
    return (
        <>
            <div className="container py-5">
                <Outlet />  {/* This is where page components render */}
            </div>
        </>
    );
}

export default Layout;