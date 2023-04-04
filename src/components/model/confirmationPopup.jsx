import React from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

const DeletePopup = ({ show, setDelatePopup, handleDelete, spinLoader, title }) => {
  return (
    <div>
      <Modal
        centered
        show={show}
        onHide={() => {
          setDelatePopup(false);
        }}
        className="delete-popup"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="opentableModal">
            <h4>Are you sure to delete this ?</h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="darkBtn" onClick={() => setDelatePopup(false)}>
            No
          </button>
          <button
            className="yellowBtn"
            color="primary"
            type="button"
            onClick={() => handleDelete()}
          >
            {!spinLoader ? "Yes" : <Spinner animation="border" />}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeletePopup;
