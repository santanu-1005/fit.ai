import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getActivities, getActivityDetail } from "../service/api";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [activityDetail, setActivityDetail] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await getActivities();
        const allActivities = response.data;
        const currentActivity = allActivities.find((a) => a.id === id);
        setActivity(currentActivity);
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };
    fetchActivity();
  }, []);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await getActivityDetail(id);
        setActivityDetail(response.data);
        setRecommendation(response.data.recommendation);
      } catch (error) {
        console.error("Error fetching activity detail:", error);
      }
    };
    fetchActivityDetail();
  }, [id]);

  if (!activityDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2, border: "1px solid grey" }}>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Activity Details
          </Typography>
          <Typography>Type: {activity?.type}</Typography>
          <Typography>Duration: {activity?.duration}</Typography>
          <Typography>Calories Burned: {activity?.caloriesBurned}</Typography>
          <Typography>Date: {activityDetail.createdAt}</Typography>
        </CardContent>
      </Card>

      {activityDetail?.recomendation && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              AI Recommendation
            </Typography>
            <Typography variant="h5">Analysis</Typography>
            <Typography>{activityDetail.recomendation}</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h5">Improvements</Typography>
            {activityDetail.improvements?.map((improvement, index) => (
              <Typography key={index}>{improvement}</Typography>
            ))}

            <Typography variant="h5">Suggestions</Typography>
            {activityDetail.suggestions?.map((suggestion, index) => (
              <Typography key={index}>{suggestion}</Typography>
            ))}

            <Typography variant="h5">Safety Guidelines</Typography>
            {activityDetail.safety?.map((safety, index) => (
              <Typography key={index}>{safety}</Typography>
            ))}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ActivityDetail;
