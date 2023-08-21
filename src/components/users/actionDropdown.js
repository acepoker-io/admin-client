import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

import { FaEllipsisV, FaInfoCircle, FaBan, FaWallet } from "react-icons/fa";

const ActionDropdown = ({
  handleShowUserInfo,
  handleShowUserBlock,
  handleShowUpdateWallet,
  handleUpdateUser,
  handleDeleteUser,
  data,
  type,
  handleShowReject,
}) => {
  return (
    <>
      <div className='threedotDiv'>
        {type === "tournament" ? (
          <Dropdown>
            <Dropdown.Toggle id='dropdown-basic'>
              <FaEllipsisV />
            </Dropdown.Toggle>
            <Dropdown.Menu className='userdropdownAction'>
              {!data.round && !data.isFinished && !data.isStart ? (
                <Dropdown.Item onClick={handleShowUserInfo}>
                  <FaInfoCircle />
                  Update
                </Dropdown.Item>
              ) : null}

              <Dropdown.Item onClick={handleShowUserBlock}>
                <FaBan /> Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : type === "redeem" ? (
          <Dropdown>
            <Dropdown.Toggle id='dropdown-basic'>
              <FaEllipsisV />
            </Dropdown.Toggle>
            <Dropdown.Menu
              drop='left'
              align='Left'
              flip='false'
              alignRight='false'
              className='userdropdownAction'>
              <Dropdown.Item onClick={handleShowUserInfo}>
                <FaInfoCircle /> Approve
              </Dropdown.Item>
              <Dropdown.Item onClick={handleShowReject}>
                <FaInfoCircle /> Reject
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Dropdown>
            <Dropdown.Toggle id='dropdown-basic'>
              <FaEllipsisV />
            </Dropdown.Toggle>
            <Dropdown.Menu align='start' className='userdropdownAction'>
              {/* <Dropdown.Item onClick={handleShowUserInfo}>
                <FaInfoCircle /> View Profile
              </Dropdown.Item> */}
              <Dropdown.Item onClick={handleShowUserBlock}>
                <FaBan /> {data?.isBlock ? "Active" : "Block"}
              </Dropdown.Item>
              <Dropdown.Item onClick={handleShowUpdateWallet}>
                <FaWallet /> Update user wallet
              </Dropdown.Item>
              <Dropdown.Item onClick={handleUpdateUser}>
                <FaWallet /> Update user
              </Dropdown.Item>
              {console.log("data ====> ", data)}
              {data.role !== "admin" ? (
                <Dropdown.Item onClick={handleDeleteUser}>
                  <FaWallet /> Delete user
                </Dropdown.Item>
              ) : null}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </>
  );
};

export default ActionDropdown;
