import { useActivityDetails } from "../services/useActivityDetails.jsx";
import Card from "react-bootstrap/Card";
import { useLocation } from "react-router-dom";
import React from "react";
import {
  convertDateFormate,
  convertMinutesToTime,
  convertTimeFormate,
} from "../validation.jsx";
import { Button, Spinner } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";

const ActivityDetail = () => {
  const location = useLocation();
  const data = location.state;
  const {
    activityDetailsByID,
    fetchActivityDetailsByID,
    updateCallToArchived,
    buttonLoading,
  } = useActivityDetails();
  const history = useHistory();

  React.useMemo(() => {
    return fetchActivityDetailsByID(data);
  }, [data]);

  const handleClick = () => {
    history.push({ pathname: `/` });
  };

  return activityDetailsByID ? (
    <div style={{ marginTop: "5%" }}>
      <Button
        variant="success"
        className="backButton"
        onClick={() => handleClick()}
      >
        <ArrowLeft size={18} fontWeight={500} />
      </Button>
      <Card className="cardBlock">
        <Card.Subtitle>
          {convertDateFormate(activityDetailsByID.created_at)}
        </Card.Subtitle>
        <Card.Body>
          <div className="cardBody">
            <div className="cardBody">
              <Card.Text>
                {new Date(activityDetailsByID.created_at)
                  .toLocaleTimeString()
                  .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
              </Card.Text>
              <Card.Text
                style={{ marginLeft: "5px", textTransform: "capitalize" }}
              >
                {activityDetailsByID.call_type}
              </Card.Text>
            </div>
            <Card.Text>
              Duration: {convertMinutesToTime(activityDetailsByID.duration)}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
      <Card className="cardBlock">
        <Card.Subtitle>Participate</Card.Subtitle>
        <Card.Body>
          <Card.Text>Callee: {activityDetailsByID.to}</Card.Text>
          <Card.Text>Caller: {activityDetailsByID.from}</Card.Text>
        </Card.Body>
      </Card>

      <Card className="cardBlock">
        <Card.Subtitle>Others</Card.Subtitle>
        <Card.Body>
          <Card.Text style={{ textTransform: "capitalize" }}>
            direction: {activityDetailsByID.direction}
          </Card.Text>
          <Card.Text>Via: {activityDetailsByID.via}</Card.Text>
        </Card.Body>
      </Card>

      <Button
        onClick={() =>
          updateCallToArchived(
            activityDetailsByID.id,
            !activityDetailsByID.is_archived
          )
        }
        className="archiveButton"
        variant="success"
      >
        {buttonLoading ? (
          <Spinner animation="border" variant="success" />
        ) : activityDetailsByID.is_archived ? (
          "Unarchive"
        ) : (
          "Archived"
        )}
      </Button>
    </div>
  ) : (
    <div className="spinnerDiv">
      <Spinner animation="border" variant="success" />
    </div>
  );
};
export default ActivityDetail;
