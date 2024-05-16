import React, { useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DisplayParseTree from "../components/DispalyParseTree";
import parser from "../../backend/components/parser";
import ambiguousTest from "../../backend/components/ambiguousTest";
export default function Page() {
  //   const input = "a = (7+6) - (a+v)";
  //   const parseTree = parser(input);
  const [expr, setExpr] = useState("A = B + c");
  const [exprData, setExprData] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setExpr(exprData);
    // console.log(expr);
  }

  return (
    <div>
      <div>Header</div>
      <Card sx={{ maxWidth: 500 }}>
        <CardActionArea>
          <CardContent>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}> 
              <Typography
                sx={{ fontSize: 20 }}
                color="text.primary"
                gutterBottom
              >
                Parse Tree Generator
              </Typography>
              <div className="flex flex-row justify-center items-center  p-10 gap-2">
                <TextField
                  onChange={(e) => setExprData(e.target.value)}
                  id="outlined-basic"
                  label="Enter Expression"
                  variant="outlined"
                  placeholder="Ex. A = B + c"
                />
              </div>

              <Button 
              variant="outlined"
              type="submit"
              >Render</Button>
            </form>
          </CardContent>
        </CardActionArea>
      </Card>
      <div>{ambiguousTest(expr)?
      (<p>The Expression is Ambiguous</p>):(<p>The Expression is not Ambiguous</p>)}</div>
       {/* {console.log(ambiguousTest(expr))}  */}
      {DisplayParseTree(parser(expr))}
    </div>
  );
}
