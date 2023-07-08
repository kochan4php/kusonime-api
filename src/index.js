import cors from "cors";
import express from "express";
import Route from "./routes/index.js";
import ResponseHelper from "./helpers/ResponseHelper.js";

const app = express();

app.use(cors());
app.use("/api", Route);

app.use("*", (_, res) => {
    return ResponseHelper.success(res, 200, {
        message:
            "Welcome to Kusonime REST API. Please visit https://github.com/kochan4php/Kusonime-API/blob/main/README.md for API Documentation.",
    });
});

app.listen(8000, () => console.log("Server in port 8000"));
