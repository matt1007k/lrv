import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

import claimsRoute from "./routes/claimsRoute";
import usersRoute from "./routes/usersRoute";

app.use(express.json());
app.use(cors());

app.use("/users", usersRoute);
app.use("/claims", claimsRoute);

if (process.env.NODE_ENV !== "test") {
  const server = app.listen(5000, () =>
    console.log(`🚀 Server ready at: http://localhost:5000`)
  );
}

export default app;
