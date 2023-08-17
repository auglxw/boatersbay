import React, { useState, useEffect } from "react";
import FilterBar from "../../components/FilterBar/FilterBar";
import EditAbout from "./EditAbout";
import EditFAQ from "./EditFAQ";
import EditProduct from "./EditProduct";
import { Water } from "react-bootstrap-icons";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function Admin() {
    const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [editItem, updateEditItem] = useState("About");

  useEffect(() => {
      if (!user) {
          navigate("/login");
      }
  }, [user]);

  function logout() {
      signOut(auth);
      navigate("/");
  }

  return (
    <div>
      <div className="header">
        <a href="/" className="name">
          BOATERS BAY{" "}
        </a>
        <Water size={25} />
      </div>
      <p className="admin-title">Admin Portal</p>
      <div className="admin-logout-div">
        <Button id="admin-logout-button" onClick={logout}>Logout <LogoutIcon sx={{fontSize: "small"}} /></Button>
      </div>
      <FilterBar
        label="Edit Item"
        options={["About", "FAQs", "Products"]}
        callback={updateEditItem}
      />
      <p className="admin-section-label">Edit {editItem} Section</p>
      {editItem === "About" && <EditAbout />}
      {editItem === "FAQs" && <EditFAQ />}
      {editItem === "Products" && <EditProduct />}
    </div>
  );
}

export default Admin;
