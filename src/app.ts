import morgan from "morgan";
import express, { Express } from "express";

import dontenv from "dotenv";
import helmet from "helmet";

dontenv.config();

import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

import { logRequest } from "./api/v1/middleware/logRequest";

const app: Express = express();

app.use(express.json());
app.use(morgan("combined"));
app.use(logRequest);

const helmetConfig = helmet({
    noSniff: true,

    hidePoweredBy: true,

    referrerPolicy: { policy: "no-referrer" },

});

app.use(helmetConfig);

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