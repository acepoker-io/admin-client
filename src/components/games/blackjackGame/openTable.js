import React from "react";
import { FaSearch } from "react-icons/fa";
// import Button from "react-bootstrap/Button";
import { Input, FormGroup } from "reactstrap";
import game1 from "../../../assets/images/logo.png";
// import game2 from "../../../assets/images/game/game2.svg";
// import game3 from "../../../assets/images/game/game3.svg";
import user from "../../../assets/images/game/dummy.png";
//import CreateTableModal from "./createTableModal";

const OpenTable = ({ allRooms, setKeyword }) => {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  return (
    <div className="OpenTable">
      <div className="openTable-header">
        <h4>All Tables</h4>
        <FormGroup className="searchFromgroup">
          <Input
            type="text"
            name="search"
            id="exampleEmail"
            placeholder="Search here..."
            className="searchFromInput"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <FaSearch className="searchlens" />
        </FormGroup>
        {/* <Button className="yellowBtn" onClick={handleShow}>
          Create Table
        </Button> */}
      </div>
      <div className="opentable-body">
        {allRooms?.length === 0 ? (
          <div className="noCardtable">
            <h3>No Tables</h3>
            <h4>Create a table to play</h4>
          </div>
        ) : null}
        <div className="tableCards">
          {allRooms?.map((room) => (
            <div className="tablecard">
              <div className="cardImgContainer">
                <img src={game1} alt="game" />
                <span>
                  <Trash />
                </span>
              </div>
              <div className="cardDetail">
                <h5>{room.gameName}</h5>
                <div className="cardTableUsers">
                  <div className="allUsersImg">
                    {room?.players?.map((player) => (
                      <img
                        src={player.photoURI ? player.photoURI : user}
                        alt="game"
                      />
                    ))}
                  </div>
                  <div className="allUsersCount">
                    {room?.players?.length} People
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpenTable;

const Trash = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-trash-2"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  );
};
