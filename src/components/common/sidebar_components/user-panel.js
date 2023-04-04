import React, { useContext } from "react";
import user from "../../../assets/images/user.png";
import AdminContext from "../../context/adminContgext";

const UserPanel = () => {
  const { admin } = useContext(AdminContext);
  return (
    <div>
      <div className='sidebar-user text-center'>
        <div>
          <img
            className='img-60 rounded-circle lazyloaded blur-up'
            src={admin.profile ? admin.profile : user}
            alt='#'
          />
        </div>
        <h6 className='mt-3 f-14'>Admin</h6>
        <p>Admin manager</p>
      </div>
    </div>
  );
};

export default UserPanel;
