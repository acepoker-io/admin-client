import React from "react";
import { CardBody, Table } from "reactstrap";

function GameHistory() {
  return (
    <>
      <CardBody className="user-datatable">
      <h4 className="datatableheading">Recent Played Game History </h4>
      <hr className="user-datatableLine" />
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Table Name</th>
              <th>Participants</th>
              <th>Winners</th>
              <th>Loosers</th>
              <th>Total Bet Tokens</th>
              {/* <th>Phone</th>
                      <th>Payment Status</th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Open Table</td>
              <td>4</td>
              <td>2</td>
              <td>2</td>
              <td>100000</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Tournament Table</td>
              <td>5</td>
              <td>3</td>
              <td>2</td>
              <td>658000</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Sit & Go</td>
              <td>3</td>
              <td>2</td>
              <td>1</td>
              <td>78300</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Open Table</td>
              <td>4</td>
              <td>2</td>
              <td>2</td>
              <td>100000</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Tournament Table</td>
              <td>5</td>
              <td>3</td>
              <td>2</td>
              <td>658000</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Sit & Go</td>
              <td>3</td>
              <td>2</td>
              <td>1</td>
              <td>78300</td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </>
  );
}

export default GameHistory;
