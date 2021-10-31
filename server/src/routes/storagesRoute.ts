import path from "path";
import fs from "fs";
import { Request, Response, Router } from "express";
import { testExistsFile } from "../tests/helpers";

const router = Router();

var dir = path.join(__dirname, "src");
const mime = {
  gif: "image/jpg",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
};

router.get("/:path", (req: Request, res: Response) => {
  const filePath = "storage/" + req.params.path;

  var file = path.resolve("src", filePath);

  if (testExistsFile(filePath)) {
    res.sendFile(file);
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

export default router;
