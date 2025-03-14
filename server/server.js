import express from "express";
import "./config/instrument.cjs";
import * as Sentry from "@sentry/node";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import clerkWebhook from "./controller/webhook.js";

// Initialize Express

const app = express();

// connnect to db
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Route
app.get("/", (req, res) => res.send("API Working"));

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebhook);

// PORT
const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
