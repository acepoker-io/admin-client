import "./nodata.css";

const NoData = ({ heading }) => {
  return (
    <div className='no-data'>
      <i className='la la-exclamation-triangle' />
      <h6>{heading ? heading : "No Data Available"}</h6>
    </div>
  );
};
export default NoData;
