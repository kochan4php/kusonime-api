import express from "express";
import Route from "./routes/index.js";

const app = express();

app.use("/api", Route);
app.listen(8000, () => console.log("Server in port 8000"));
