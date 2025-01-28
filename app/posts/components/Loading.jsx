import React from "react";
import { Box, Card, Skeleton } from "@mui/material";

const PostLoading = () => {
  return (
    <Card
      sx={{
        padding: 2,
        marginBottom: 2,
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        width: 800
      }}
    >
      {/* Header: Avatar and Text */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Skeleton variant="circular" width={50} height={50} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="40%" height={20} />
        </Box>
      </Box>

      {/* Content Box */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={200}
        sx={{ borderRadius: 1 }}
      />

      {/* Footer: Two Lines */}
      <Box>
        <Skeleton variant="text" width="80%" height={20} />
        <Skeleton variant="text" width="60%" height={20} />
      </Box>
    </Card>
  );
};

export default PostLoading;