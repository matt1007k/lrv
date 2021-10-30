import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

import claimsRoute from "./routes/claimsRoute";
import usersRoute from "./routes/usersRoute";
import uploadsRoute from "./routes/uploadsRoute";
import { PORT } from "./helpers/config";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/users", usersRoute);
app.use("/api/claims", claimsRoute);
app.use("/api/uploads", uploadsRoute);

if (process.env.NODE_ENV !== "test") {
  const server = app.listen(PORT, () =>
    console.log(`🚀 Server ready at: http://localhost:${PORT}`)
  );
}

export default app;
