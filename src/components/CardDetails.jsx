import React from "react";
import { TelephoneInboundFill } from "react-bootstrap-icons";
import { TelephoneOutboundFill } from "react-bootstrap-icons";
import { InfoCircleFill } from "react-bootstrap-icons";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export const CardDetails = ({ activityDetail }) => {
  const history = useHistory();
  const handleClick = (ID) => {
    history.push({ pathname: `/details`, state: ID });
  };
  return Object.entries(activityDetail)?.map(([date, valueList]) => {
    return (
      <div key={date}>
        <Card.Text className="cardText">{new Date(date).toDateString()}</Card.Text>
        {valueList?.map((activity) => {
          return (
            <Card
              className="simpleCard"
              key={activity.id}
              onClick={() => handleClick(activity.id)}
            >
              <Card.Body className="customCard">
                <div className="cardBody">
                  <div className="cardSubBody">
                    {activity.direction === "inbound" ? (
                      <TelephoneInboundFill />
                    ) : (
                      <TelephoneOutboundFill />
                    )}
                    <div style={{ marginLeft: "10px" }}>
                      <Card.Title className="cardTitle">
                        {activity.from}
                      </Card.Title>
                      <Card.Text style={{ marginBottom: 2, color: "gray" }}>
                        Tried to call via {activity.via}
                      </Card.Text>
                    </div>
                  </div>
                  <Card.Subtitle>
                    {new Date(activity.created_at)
                      .toLocaleTimeString()
                      .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
                  </Card.Subtitle>
                  <Card.Subtitle
                    style={{ cursor: "pointer", marginLeft: "2px" }}
                  >
                    <InfoCircleFill
                      size={16}
                      onClick={() => handleClick(activity.id)}
                    />
                  </Card.Subtitle>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  });
};
