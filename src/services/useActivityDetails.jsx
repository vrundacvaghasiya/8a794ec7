import React from "react";
import { BASE_URL } from "../constants/commonURL.jsx";

export function useActivityDetails() {
  const [activityDetail, setActivityDetails] = React.useState([]);
  const [activityDetailsByID, setActivityDetailsByID] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);

  const fetchActivityDetails = async (archived = false) => {
    setLoading(true);
    return await fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const filterData = data.filter(
          (value) => value.is_archived === archived
        );
        let sortedByDate = filterData
          .sort((a, b) => {
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            );
          })
          .reverse();
        const groupedByDate = sortedByDate.reduce((acc, el) => {
          if (!acc[new Date(el.created_at).toISOString().split("T")[0]])
            acc[new Date(el.created_at).toISOString().split("T")[0]] = [];
          acc[new Date(el.created_at).toISOString().split("T")[0]].push(el);
          return acc;
        }, {});
        setLoading(false);
        setActivityDetails(groupedByDate);
      })
      .catch((error) => console.log(error));
  };

  const fetchActivityDetailsByID = async (ID) => {
    setLoading(true);
    return await fetch(`${BASE_URL}/${ID}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setActivityDetailsByID(data);
      })
      .catch((error) => console.log(error));
  };
  const updateCallToArchived = async (ID, archived) => {
    setButtonLoading(true);
    return await fetch(`${BASE_URL}/${ID}`, {
      method: "PATCH",
      body: JSON.stringify({ is_archived: archived }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res)
      .then((data) => {
        fetchActivityDetailsByID(ID);
        setButtonLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const archivedAllCalls = async () => {
    return Object.entries(activityDetail).map(([key, values]) => {
      values.map(async (value) => {
        return await fetch(
          `${BASE_URL}/${value.id}`,
          {
            method: "PATCH",
            body: JSON.stringify({ is_archived: true }),
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
          }
        );
      });
      fetchActivityDetails();
    });
  };

  const unarchiveAllCalls = async () => {
    return await fetch("https://aircall-api.onrender.com/reset/", {
      method: "PATCH",
    })
      .then((res) => res)
      .then((data) => {
        fetchActivityDetails(true);
      })
      .catch((error) => console.log(error));
  };

  return {
    fetchActivityDetails,
    fetchActivityDetailsByID,
    activityDetail,
    activityDetailsByID,
    updateCallToArchived,
    unarchiveAllCalls,
    archivedAllCalls,
    loading,
    buttonLoading,
  };
}
