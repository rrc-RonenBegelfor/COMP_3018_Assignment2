import morgan from "morgan";
import express, { Express } from "express";

import dontenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

dontenv.config();

import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

import { logRequest } from "./api/v1/middleware/logRequest";

const app: Express = express();

app.use(express.json());
app.use(morgan("combined"));
app.use(logRequest);

const helmetConfig = helmet({
    /* https://stackoverflow.com/questions/60706823/what-modules-of-helmet-should-i-use-in-my-rest-api
    *  The creator kind of created this reply, so I just used what made sense from the suggestions and compared with notes.
    */
    noSniff: true,

    hidePoweredBy: true,

    referrerPolicy: { policy: "no-referrer" },

});

app.use(helmetConfig);

const corsConfig = cors({
    // https://expressjs.com/en/resources/middleware/cors.html

    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],

    
});

app.use(corsConfig);

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

export default app;