import { api, testExistsFile } from "../helpers";

describe("POST /upload", () => {
  it("should upload a file", async () => {
    const { body } = await api
      .post("/api/uploads")
      .attach("file", "./src/tests/uploads/analyse.png")
      .expect(200);

    expect(body.filePath).toBeDefined();
    expect(body.fullPath).toBeDefined();
  });

  it("should verify before from delete the file upload", async () => {
    const { body } = await api
      .delete("/api/uploads/")
      .send({
        path: "storage/1635628674770-screen-shot-2021-10-26-at-18.29.342.png",
      })
      .expect(404);

    expect(body.message).toEqual("El archivo no existe");
  });

  it("should delete the file upload", async () => {
    const res = await api
      .post("/api/uploads")
      .attach("file", "./src/tests/uploads/analyse.png")
      .expect(200);

    const { body } = await api
      .delete("/api/uploads/")
      .send({
        path: res.body.filePath,
      })
      .expect(200);

    expect(body.message).toEqual("El archivo ha sido eliminado");
    expect(testExistsFile(res.body.filePath)).toBeFalsy();
  });
});
