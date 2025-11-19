import cors from "cors";

export const corsConfig = cors({
    // https://expressjs.com/en/resources/middleware/cors.html

    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
});

export const publicCors = cors({
    origin: "*",
    methods: ["GET"],
})