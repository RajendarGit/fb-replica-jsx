import React from "react";
import { Box, Card, CardContent, Typography, useMediaQuery, useTheme } from "@mui/material";

const ProfileCard = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  if (!isLargeScreen) {
    return null;
  }

  return (
    <Box
      sx={{
        minWidth: 300,
        position: "fixed",
        top: 145,
        marginTop: 0,
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Posts
          </Typography>
          <Typography variant="body1">
            Here are some posts from the Redux store
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileCard;