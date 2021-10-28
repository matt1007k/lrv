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
    await api.post("/users/register").send(user).expect(201);

    const containEmails = await (
      await prisma.user.findMany()
    ).map((userdb) => userdb.email);

    expect(containEmails).toContain(user.email);
  });

  it("can log in an user", async () => {
    await api.post("/users/register").send(user);
    const { body } = await api
      .post("/users/login")
      .send({
        email: "max123@gmail.com",
        password: "password",
      })
      .expect(200);

    expect(body.user.email).toBe(user.email);
    expect(body).toHaveProperty("token");
  });

  it("should show the detail of an authenticated user", async () => {
    await api.post("/users/register").send(user);
    const response = await api.post("/users/login").send({
      email: "max123@gmail.com",
      password: "password",
    });

    const { token } = response.body.token;

    const { body } = await api
      .get("/users/detail")
      .set("Authorization", "Bearer " + token)
      .expect(200);

    expect(body.name).toBe(user.name);
    expect(body.email).toBe(user.email);
  });

  it("should show the detail of an user", async () => {
    await api
      .post("/users/register")
      .send(Object.assign(user, { email: "mx32@gmail.com" }));

    const { body } = await api.get(`/users/detail/${user.email}`).expect(200);

    expect(body.name).toBe(user.name);
    expect(body.email).toBe(user.email);
  });
});
