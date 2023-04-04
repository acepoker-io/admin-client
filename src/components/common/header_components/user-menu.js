import React, { Fragment } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import user from "../../../assets/images/user.png";
//images import
// import man from "../../../assets/images/dashboard/man.png";
import AdminContext from "../../context/adminContgext";

const UserMenu = () => {
  const { admin } = useContext(AdminContext);
  const logoutHandler = () => {
    localStorage.removeItem("adminToken");
    localStorage.clear();
    document.cookie = null;
  };
  return (
    <Fragment>
      <li className="onhover-dropdown">
        <div className="media align-items-center">
          <img
            className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
            src={admin.profile ? admin.profile : user}
            alt="header-user"
          />
          <div className="dotted-animation">
            <span className="animate-circle"></span>
            <span className="main-circle"></span>
          </div>
        </div>
        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
          <li>
            <Link to={`${process.env.PUBLIC_URL}/settings/profile`}>
              <i data-feather="user"></i>Edit Profile
            </Link>
          </li>
          <li onClick={logoutHandler}>
            <Link to={`${process.env.PUBLIC_URL}/`}>
              <i data-feather="log-out"></i>Logout
            </Link>
          </li>
        </ul>
      </li>
    </Fragment>
  );
};

export default UserMenu;
