import React from "react";
import { useActivityDetails } from "../services/useActivityDetails.jsx";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import ArchivedCalls from "./ArchivedCalls.jsx";
import { CardDetails } from "../components/CardDetails.jsx";
import Spinner from "react-bootstrap/Spinner";

const ActivityFeed = () => {
  const {
    fetchActivityDetails,
    activityDetail,
    archivedAllCalls,
    loading,
    buttonLoading,
  } = useActivityDetails();
  const [key, setKey] = React.useState("all");
  React.useEffect(() => {
    fetchActivityDetails();
  }, [key]);
  return (
    <Tabs
      defaultActiveKey="all"
      id="fill-tab-example"
      className="mb-3"
      fill
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="all" title="All">
        {!loading ? (
          <div>
            <div className="mainDetailsDiv">
              <Button
                variant="success"
                style={{ width: "90%", height: "45px" }}
                onClick={() => archivedAllCalls()}
                disabled={Object.keys(activityDetail).length <= 0}
              >
                {buttonLoading ? (
                  <Spinner animation="border" variant="success" />
                ) : (
                  "Archive All"
                )}
              </Button>
            </div>
            <div className="cardDetails">
              {activityDetail && (
                <CardDetails activityDetail={activityDetail} />
              )}
            </div>
          </div>
        ) : (
          <div className="spinnerDiv">
            <Spinner animation="border" variant="success" />
          </div>
        )}
      </Tab>
      <Tab eventKey="archived" title="Archived">
        <ArchivedCalls keyTab={key} />
      </Tab>
    </Tabs>
  );
};
export default ActivityFeed;
