import { api } from "../helpers";

describe("POST /upload", () => {
  it("should upload a file", async () => {
    const { body } = await api
      .post("/api/uploads")
      .attach("file", "./src/tests/uploads/analyse.png")
      .expect(200);

    expect(body.filePath).toBeDefined();
  });
});
