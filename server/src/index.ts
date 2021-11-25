import express, { Application } from "express";
import cors from "cors";

import { PORT, WEB_URL } from "./helpers/config";

const app: Application = express();

import claimsRoute from "./routes/claimsRoute";
import usersRoute from "./routes/usersRoute";
import answersRoute from "./routes/answersRoute";
import uploadsRoute from "./routes/uploadsRoute";
import storagesRoute from "./routes/storagesRoute";
import reportsRoute from "./routes/reportsRoute";

import { errorHandler, notFound } from "./middlewares/apiErrors";

app.use(express.json());
app.use(
  cors({
    origin: WEB_URL,
  })
);

app.use("/api/users", usersRoute);
app.use("/api/claims", claimsRoute);
app.use("/api/answers", answersRoute);
app.use("/api/uploads", uploadsRoute);

app.use("/storage", storagesRoute);
app.use("/report", reportsRoute);

app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  const server = app.listen(PORT, () =>
    console.log(`🚀 Server ready at: http://localhost:${PORT}`)
  );
}

export default app;
