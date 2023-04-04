import { Spinner } from "react-bootstrap";
import "./loader.css";

const TableLoader = () => {
  return (
    <div className="table-loader">
      <Spinner animation="border" />
    </div>
  );
};

export default TableLoader;