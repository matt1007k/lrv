import { Prisma } from "@prisma/client";
import prisma from "../../helpers/prisma";
import { api, cleanUserDB } from "../helpers";

const user: Prisma.UserCreateInput = {
  name: "Max Meza",
  email: "max123@gmail.com",
  password: "password",
};

beforeEach(() => {
  cleanUserDB();
});

describe("User Authentication", () => {
  it("can register an user", async () => {
    await api.post("/api/users/register").send(user).expect(201);

    const containEmails = await (
      await prisma.user.findMany()
    ).map((userdb) => userdb.email);

    expect(containEmails).toContain(user.email);
  });

  it("can log in an user", async () => {
    await api.post("/api/users/register").send(user);
    const { body } = await api
      .post("/api/users/login")
      .send({
        email: "max123@gmail.com",
        password: "password",
      })
      .expect(200);

    expect(body.user.email).toBe(user.email);
    expect(body).toHaveProperty("token");
  });

  it("should show the detail of an authenticated user", async () => {
    await api.post("/api/users/register").send(user);
    const response = await api.post("/api/users/login").send({
      email: "max123@gmail.com",
      password: "password",
    });

    const { token } = response.body.token;

    const { body } = await api
      .get("/api/users/detail")
      .set("Authorization", "Bearer " + token)
      .expect(200);

    expect(body.name).toBe(user.name);
    expect(body.email).toBe(user.email);
  });

  it("should show the detail of an user", async () => {
    await api
      .post("/api/users/register")
      .send(Object.assign(user, { email: "mx32@gmail.com" }));

    const { body } = await api
      .get(`/api/users/detail/${user.email}`)
      .expect(200);

    expect(body.name).toBe(user.name);
    expect(body.email).toBe(user.email);
  });

  it("should auth user update your password", async () => {
    await api
      .post("/api/users/register")
      .send(Object.assign(user, { email: "max123@gmail.com" }));
    const response = await api.post("/api/users/login").send({
      email: "max123@gmail.com",
      password: "password",
    });

    const { body } = await api
      .post("/api/users/update-password")
      .set("Authorization", "Bearer " + response.body.token)
      .send({
        currentPassword: "password",
        newPassword: "123456",
        confirmPassword: "123456",
      })
      .expect(200);

    expect(body.email).toBeDefined();
  });
  it("should auth user update info", async () => {
    await api.post("/api/users/register");
    //   .send(Object.assign(user, { email: "max123@gmail.com" }));
    // const response = await api.post("/api/users/login").send({
    //   email: "max123@gmail.com",
    //   password: "password",
    // });

    const { body } = await api
      .post("/api/users/update-info")
      // .set("Authorization", "Bearer " + response.body.token)
      .send({
        email: "mx32@gmail.com",
        name: "Max update",
      })
      .expect(200);

    expect(body.email).toBeDefined();
  });
});
