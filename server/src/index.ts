import express, { Application } from "express";
import cors from "cors";

import { PORT } from "./helpers/config";

const app: Application = express();

import claimsRoute from "./routes/claimsRoute";
import usersRoute from "./routes/usersRoute";
import uploadsRoute from "./routes/uploadsRoute";
import storagesRoute from "./routes/storagesRoute";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/users", usersRoute);
app.use("/api/claims", claimsRoute);
app.use("/api/uploads", uploadsRoute);

app.use("/storage", storagesRoute);

if (process.env.NODE_ENV !== "test") {
  const server = app.listen(PORT, () =>
    console.log(`🚀 Server ready at: http://localhost:${PORT}`)
  );
}

export default app;
