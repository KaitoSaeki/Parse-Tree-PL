import React, {useState } from "react";
// import Box from "@mui/material/Box";
// import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import DisplayParseTree from "../components/DispalyParseTree";
import parser from "../../backend/components/parser";
import ambiguousTest from "../../backend/components/ambiguousTest";
import exprValid from "../../backend/components/exprValid";
export default function Page() {
  //   const input = "a = (7+6) - (a+v)";
  //   const parseTree = parser(input);
  const [expr, setExpr] = useState("A = B + c");
  const [exprData, setExprData] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setExpr(exprData);
    console.log(expr);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius:2,
    boxShadow: 24,
    p: 4,
  };
  

  return (
    <div className="flex flex-col justify-center items-center md:mt-20">
      <div>
        <Card sx={{ width: "70vw", height: "auto" }}
        // style={{backgroundColor: "transparent"}}
        >
          <CardActionArea>
            <CardContent>
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Typography
                  // sx={{ fontSize: 20 }}
                  color="text.primary"
                  gutterBottom
                  variant="h4"
                >
                  Parse Tree Generator
                </Typography>
                <div className="flex flex-row justify-center items-center p-4">
                  <TextField
                    onChange={(e) => setExprData(e.target.value)}
                    id="outlined-basic"
                    label="Enter Expression"
                    variant="outlined"
                    placeholder="Ex. A = B + c"
                    sx={{width:"60vw"}}
                  />
                </div>
                <div className="">
                  <Button variant="outlined" type="submit">
                    Render
                  </Button>
                  <Button onClick={handleOpen}>Production Rules</Button>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                      backdrop: {
                        timeout: 500,
                      },
                    }}
                  >
                    <Fade in={open}>
                      <Box sx={style}>
                        <Typography
                          sx={{ fontSize: 16, mt: 2 }}
                          id="transition-modal-description"
                          textAlign={"left"}
                          color="text.primary"
                          gutterBottom
                        >
                          &lt;assign&gt; -&gt; &lt;ID&gt; &lt;EQUALS&gt;
                          &lt;expr&gt;
                          <br />
                          &lt;OPERATOR&gt; -&gt; + | - | * | /<br />
                          &lt;EQUALS&gt; -&gt; =<br />
                          &lt;ID&gt; -&gt; a | b | c | d | e | f | g | h | i | j
                          | k | l | m | n | o | p | q | r | s | t | u | v | w |
                          x | y | z<br />
                          &lt;expr&gt; -&gt; &lt;ID&gt; &lt;OPERATOR&gt;
                          &lt;ID&gt; | &lt;expr&gt; &lt;OPERATOR&gt;
                          &lt;expr&gt; | &lt;cons&gt; &lt;OPERATOR&gt;
                          &lt;cons&gt; | &lt;ID&gt; &lt;OPERATOR&gt;
                          &lt;cons&gt; | &lt;ID&gt; &lt;OPERATOR&gt;
                          &lt;expr&gt; | &lt;cons&gt; &lt;OPERATOR&gt;
                          &lt;ID&gt; | &lt;cons&gt; &lt;OPERATOR&gt;
                          &lt;expr&gt; | &lt;expr&gt; &lt;OPERATOR&gt;
                          &lt;ID&gt; | &lt;expr&gt; &lt;OPERATOR&gt;
                          &lt;cons&gt;
                          <br />
                          &lt;cons&gt; -&gt; 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
                          9
                        </Typography>
    
                      </Box>
                    </Fade>
                  </Modal>
                </div>
              </form>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>

      <div>
        {exprValid(expr)?ambiguousTest(parser(expr)) ? (
          <p className=" text-red-500">The Expression is Ambiguous</p>
        ) : (
          <p className=" text-green-500">The Expression is not Ambiguous</p>

        ):<p className=" text-red-500">The Expression is Not Valid</p>}
      </div>
      {/* {console.log(ambiguousTest(expr))}  */}
      {exprValid(expr)?DisplayParseTree(parser(expr)):<p className=" font-bold text-center text-7xl text-slate-400">No Expression To Parse</p>}
    </div>
  );
}
