import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { Input, FormGroup } from "reactstrap";
import game1 from "../../../assets/images/logo.png";
// import game2 from "../../../assets/images/game/game2.svg";
// import game3 from "../../../assets/images/game/game3.svg";
import user from "../../../assets/images/game/dummy.png";
// import CreateTableModal from "./createTableModal";

const OpenTournament = () => {
  const [setShow] = useState(false);

  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
          />
          <FaSearch className="searchlens" />
        </FormGroup>
        <Button className="yellowBtn" onClick={handleShow}>
          Create Table
        </Button>
      </div>
      <div className="opentable-body">
        <div className="noCardtable">
          <h3>No Tables</h3>
          <h4>Create a table to play</h4>
        </div>
        <div className="tableCards">
          <div className="tablecard">
            <div className="cardImgContainer">
              <img src={game1} alt="game" />
            </div>
            <div className="cardDetail">
              <h5>Username</h5>
              <div className="cardTableUsers">
                <div className="allUsersImg">
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                </div>
                <div className="allUsersCount">5 People</div>
              </div>
            </div>
          </div>
          <div className="tablecard">
            <div className="cardImgContainer">
              <img src={game1} alt="game" />
            </div>
            <div className="cardDetail">
              <h5>Username</h5>
              <div className="cardTableUsers">
                <div className="allUsersImg">
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                </div>
                <div className="allUsersCount">5 People</div>
              </div>
            </div>
          </div>

          <div className="tablecard">
            <div className="cardImgContainer">
              <img src={game1} alt="game" />
            </div>
            <div className="cardDetail">
              <h5>Username</h5>
              <div className="cardTableUsers">
                <div className="allUsersImg">
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                </div>
                <div className="allUsersCount">5 People</div>
              </div>
            </div>
          </div>
          <div className="tablecard">
            <div className="cardImgContainer">
              <img src={game1} alt="game" />
            </div>
            <div className="cardDetail">
              <h5>Username</h5>
              <div className="cardTableUsers">
                <div className="allUsersImg">
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                </div>
                <div className="allUsersCount">5 People</div>
              </div>
            </div>
          </div>
          <div className="tablecard">
            <div className="cardImgContainer">
              <img src={game1} alt="game" />
            </div>
            <div className="cardDetail">
              <h5>Username</h5>
              <div className="cardTableUsers">
                <div className="allUsersImg">
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                </div>
                <div className="allUsersCount">5 People</div>
              </div>
            </div>
          </div>
          <div className="tablecard">
            <div className="cardImgContainer">
              <img src={game1} alt="game" />
            </div>
            <div className="cardDetail">
              <h5>Username</h5>
              <div className="cardTableUsers">
                <div className="allUsersImg">
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                </div>
                <div className="allUsersCount">5 People</div>
              </div>
            </div>
          </div>
          <div className="tablecard">
            <div className="cardImgContainer">
              <img src={game1} alt="game" />
            </div>
            <div className="cardDetail">
              <h5>Username</h5>
              <div className="cardTableUsers">
                <div className="allUsersImg">
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                </div>
                <div className="allUsersCount">5 People</div>
              </div>
            </div>
          </div>
          <div className="tablecard">
            <div className="cardImgContainer">
              <img src={game1} alt="game" />
            </div>
            <div className="cardDetail">
              <h5>Username</h5>
              <div className="cardTableUsers">
                <div className="allUsersImg">
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                </div>
                <div className="allUsersCount">5 People</div>
              </div>
            </div>
          </div>
          <div className="tablecard">
            <div className="cardImgContainer">
              <img src={game1} alt="game" />
            </div>
            <div className="cardDetail">
              <h5>Username</h5>
              <div className="cardTableUsers">
                <div className="allUsersImg">
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                </div>
                <div className="allUsersCount">5 People</div>
              </div>
            </div>
          </div>
          <div className="tablecard">
            <div className="cardImgContainer">
              <img src={game1} alt="game" />
            </div>
            <div className="cardDetail">
              <h5>Username</h5>
              <div className="cardTableUsers">
                <div className="allUsersImg">
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                </div>
                <div className="allUsersCount">5 People</div>
              </div>
            </div>
          </div>
          <div className="tablecard">
            <div className="cardImgContainer">
              <img src={game1} alt="game" />
            </div>
            <div className="cardDetail">
              <h5>Username</h5>
              <div className="cardTableUsers">
                <div className="allUsersImg">
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                </div>
                <div className="allUsersCount">5 People</div>
              </div>
            </div>
          </div>
          <div className="tablecard">
            <div className="cardImgContainer">
              <img src={game1} alt="game" />
            </div>
            <div className="cardDetail">
              <h5>Username</h5>
              <div className="cardTableUsers">
                <div className="allUsersImg">
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                </div>
                <div className="allUsersCount">5 People</div>
              </div>
            </div>
          </div>
          <div className="tablecard">
            <div className="cardImgContainer">
              <img src={game1} alt="game" />
            </div>
            <div className="cardDetail">
              <h5>Username</h5>
              <div className="cardTableUsers">
                <div className="allUsersImg">
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                </div>
                <div className="allUsersCount">5 People</div>
              </div>
            </div>
          </div>
          <div className="tablecard">
            <div className="cardImgContainer">
              <img src={game1} alt="game" />
            </div>
            <div className="cardDetail">
              <h5>Username</h5>
              <div className="cardTableUsers">
                <div className="allUsersImg">
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                </div>
                <div className="allUsersCount">5 People</div>
              </div>
            </div>
          </div>
          <div className="tablecard">
            <div className="cardImgContainer">
              <img src={game1} alt="game" />
            </div>
            <div className="cardDetail">
              <h5>Username</h5>
              <div className="cardTableUsers">
                <div className="allUsersImg">
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                </div>
                <div className="allUsersCount">5 People</div>
              </div>
            </div>
          </div>
          <div className="tablecard">
            <div className="cardImgContainer">
              <img src={game1} alt="game" />
            </div>
            <div className="cardDetail">
              <h5>Username</h5>
              <div className="cardTableUsers">
                <div className="allUsersImg">
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                </div>
                <div className="allUsersCount">5 People</div>
              </div>
            </div>
          </div>
          <div className="tablecard">
            <div className="cardImgContainer">
              <img src={game1} alt="game" />
            </div>
            <div className="cardDetail">
              <h5>Username</h5>
              <div className="cardTableUsers">
                <div className="allUsersImg">
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                  <img src={user} alt="game" />
                </div>
                <div className="allUsersCount">5 People</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <CreateTableModal show={show} onHide={handleClose} /> */}
    </div>
  );
};

export default OpenTournament;
