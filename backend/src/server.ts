import express, { Application } from "express";
import summarizeRouter from "./routes/summarizeRoute";


const PORT = 8000;
const app: Application = express();

app.use("/api", summarizeRouter);


app.get("/", function (req, res) {
 res.send("Hello World!");
});


app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}!`);
});