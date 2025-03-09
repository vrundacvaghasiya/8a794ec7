import React from "react";
import { useActivityDetails } from "../services/useActivityDetails.jsx";
import { CardDetails } from "../components/CardDetails.jsx";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const ArchivedCalls = ({ keyTab }) => {
  const {
    fetchActivityDetails,
    activityDetail,
    unarchiveAllCalls,
    loading,
    buttonLoading,
  } = useActivityDetails();

  React.useEffect(() => {
    fetchActivityDetails(true);
  }, [keyTab]);

  return !loading ? (
    <div>
      <div className="mainDetailsDiv">
        <Button
          variant="success"
          style={{ width: "90%", height: "45px" }}
          onClick={() => unarchiveAllCalls()}
          disabled={Object.keys(activityDetail).length <= 0}
        >
          {buttonLoading ? (
            <Spinner animation="border" variant="success" />
          ) : (
            "Unarchive All"
          )}
        </Button>
      </div>
      <div className="cardDetails">
        {activityDetail && <CardDetails activityDetail={activityDetail} />}
      </div>
    </div>
  ) : (
    <div className="spinnerDiv">
      <Spinner animation="border" variant="success" />
    </div>
  );
};
export default ArchivedCalls;
