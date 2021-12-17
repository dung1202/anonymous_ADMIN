import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link } from 'react-router-dom'
export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <Link to='/profile'> <img src="https://png.pngtree.com/png-clipart/20210418/original/pngtree-cyan-voucher-png-image_6243629.png" alt="" className="topAvatar" /></Link>
        </div>
      </div>
    </div>
  );
}