import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import Spinner from "react-bootstrap/Spinner";
const options = [
  { value: "Adam", label: "Adam" },
  { value: "Roxie", label: "Roxie" },
  { value: "John", label: "John" },
];
const customStyles = {
  option: (provided) => ({
    ...provided,
    background: "#2a2a2a",
    color: "#fff",
    fontWeight: "400",
    fontSize: "16px",
    padding: "12px",
    lineHeight: "16px",
    cursor: "pointer",
    ":hover": {
      background: "#151515",
      border: "none !important",
    },
  }),
  menu: (provided) => ({
    ...provided,
    background: "rgb(21 21 21)",
    padding: "0px",
    border: "1px solid #2a2a2a",
  }),
  control: () => ({
    background: "rgb(21 21 21)",
    border: "1px solid #4e4e4e !important",
    borderRadius: "30px",
    padding: "0.375rem 0.75rem",
    color: "#fff",
    display: "flex",
    alignItem: "center",
    height: "44px",
    ":hover": {
      background: "rgb(21 21 21)",
      border: "1px solid #4e4e4e !important",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "16px",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "19px",
    color: "rgb(93 101 107)",
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff",
    fontSize: "1rem",
  }),
};

const CreateTableModal = ({ show, onHide }) => {
  const [spinLoader, setSpinLoader] = useState(false);
  const routeChange = () => {
    setSpinLoader(!spinLoader);
    // setTimeout(() => {
    //   history.push(`${process.env.PUBLIC_URL}/resetpassword`);
    // }, 500);
  };
  return (
    <div>
      <Modal centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Create Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="opentableModal">
            <Form.Group>
              <Form.Label>
                <h4>Host Name</h4>
              </Form.Label>
              <Form.Control type="text" placeholder="John Smith" />
            </Form.Group>
            <div className="opentable-userBy">
              <h4>User buy in</h4>
              <div className="opentable-userByinput">
                <Form.Group className="userBuy">
                  <Form.Label>Small Blind</Form.Label>
                  <Form.Control type="number" placeholder="50" />
                </Form.Group>
                <Form.Group className="userBuy">
                  <Form.Label>Big Blind</Form.Label>
                  <Form.Control type="number" placeholder="5000" />
                </Form.Group>
              </div>
            </div>
            <div className="searchSelectDropdown">
              <h4>Invite Users</h4>
              <Select options={options} styles={customStyles} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="yellowBtn"
            variant="primary"
            onClick={() => routeChange()}
          >
            {!spinLoader ? "Create" : <Spinner animation="border" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateTableModal;
