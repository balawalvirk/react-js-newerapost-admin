import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

export default function MediaCard({image}) {
  return (
    <Card sx={{ width: "250px", height: "335px" }}>
      <CardMedia
        sx={{ height: 335 }}
        image={image.src}
      />
    </Card>
  );
}
