import prisma from "../../helpers/prisma";
import { CreateUserInput } from "../../types/users";
import { api, cleanUserDB, logIn, apiAuthGet, apiAuthPost } from "../helpers";

const user: CreateUserInput = {
  name: "Max Other",
  email: "mx32@gmail.com",
  password: "password",
  confirmPassword: "password",
};

beforeEach(() => {
  cleanUserDB();
});

describe("User Authentication", () => {
  it("can register an user", async () => {
    await api
      .post("/api/users/register")
      .send({ ...user, email: "register@gmail.com" });

    const containEmails = await (
      await prisma.user.findMany()
    ).map((userdb) => userdb.email);

    expect(containEmails).toContain("register@gmail.com");
  });

  it("can log in an user", async () => {
    const body = await logIn();

    expect(body.user).toBeDefined();
    expect(body).toHaveProperty("token");
  });

  it("should show the detail of an authenticated user", async () => {
    const { body, auth } = await apiAuthGet("/api/users/detail");

    expect(body.name).toBe(auth.name);
    expect(body.email).toBe(auth.email);
  });

  it("should show the detail of an user", async () => {
    await api
      .post("/api/users/register")
      .send({ ...user, name: "User test", email: "test@example.com" });

    const { body } = await apiAuthGet(`/api/users/detail/test@example.com`);

    expect(body.name).toBe("User test");
    expect(body.email).toBe("test@example.com");
  });

  it("should auth user update your password", async () => {
    await api.post("/api/users/register").send({
      name: "Other user",
      email: "user1@example.com",
      password: "password",
      confirmPassword: "password",
    });

    const res = await api
      .post("/api/users/login")
      .send({ email: "user1@example.com", password: "password" });

    const { body } = await api
      .post("/api/users/update-password")
      .set("Authorization", "Bearer " + res.body.token)
      .send({
        currentPassword: "password",
        newPassword: "123456",
        confirmPassword: "123456",
      })
      .expect(200);

    expect(body.email).toBeDefined();
  });
  it("should auth user update info", async () => {
    await api.post("/api/users/register").send({
      name: "Other user",
      email: "user2@example.com",
      password: "password",
      confirmPassword: "password",
    });

    const res = await api
      .post("/api/users/login")
      .send({ email: "user2@example.com", password: "password" });

    const { body } = await api
      .post("/api/users/update-info")
      .send({
        email: "mx32@gmail.com",
        name: "Max update",
      })
      .set("Authorization", "Bearer " + res.body.token)
      .expect(200);

    expect(body.email).toBeDefined();
    expect(body.name).toEqual("Max update");
    expect(body.email).toEqual("mx32@gmail.com");
  });
});
