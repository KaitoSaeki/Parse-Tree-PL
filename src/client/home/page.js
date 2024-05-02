import React from "react";
// import Box from "@mui/material/Box";
// import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
export default function page() {
  return (
    <div>
      <Card sx={{ maxWidth: 500 }}>
        <CardActionArea>
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
              Parse Tree Generator
            </Typography>
            <div className="flex flex-row justify-center items-center  p-10 gap-2">
              <TextField
                sx={{ width: 50 }}
                id="outlined-basic"
                label=""
                variant="outlined"
              />
              <Typography
                sx={{ fontSize: 15 }}
                color="text.primary"
                gutterBottom
              >
                =
              </Typography>
              <TextField
                id="outlined-basic"
                label="Enter Expression"
                variant="outlined"
              />
            </div>

            <Button variant="outlined">Render</Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
