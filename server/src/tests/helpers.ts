import supertest from "supertest";
import path from "path";
import fs from "fs-extra";

import prisma from "../helpers/prisma";
import { Prisma, Type } from "@prisma/client";

import app from "../index";
import { CreateUserInput } from "../types/users";

export const api = supertest(app);

export const URL_API = "http://localhost:5000/api";

// export const closeServer = () => server.close();

export const cleanClaimDB = async () => {
  const deleteClaim = prisma.claim.deleteMany();

  await prisma.$transaction([deleteClaim]);
  await prisma.$disconnect();
};
export const cleanUserDB = async () => {
  const deleteUser = prisma.user.deleteMany();

  await prisma.$transaction([deleteUser]);
  await prisma.$disconnect();
};

export const testExistsFile = (filePath: string): boolean => {
  const pathLocal = path.resolve(`src/${filePath}`);
  try {
    if (fs.existsSync(pathLocal)) return true;
    else return false;
  } catch (e) {
    return false;
  }
};

export const user: CreateUserInput = {
  name: "Max Meza",
  email: "max123@gmail.com",
  password: "password",
  confirmPassword: "password",
};

export const claims: Prisma.ClaimCreateInput[] = [
  {
    fullName: "Max",
    email: "max123@prisma.io",
    address: "Jr Lima 234",
    reference: "Al lado de",
    department: "Ayacucho",
    province: "Huamanga",
    district: "Ayacucho",
    phone: "976543234",
    type: Type.CLAIM,
    detail: "Falta de",
    order: "231323",
    file: "/path/document.pdf",
    createdAt: new Date(2021, 9, 1).toISOString(),
  },
  {
    fullName: "Juan",
    email: "juan@gmail.com",
    address: "Av Cusco 432",
    reference: "Al lado de",
    department: "Ayacucho",
    province: "Huamanga",
    district: "San Juan Bautista",
    phone: "965445231",
    type: Type.COMPLAIN,
    detail: "Falta de",
    order: "76223",
    file: "/path/document.pdf",
    createdAt: new Date(2021, 9, 2).toISOString(),
  },
];

export const logIn = async () => {
  await api.post("/api/users/register").send({
    name: "User Auth",
    email: "auth@gmail.com",
    password: "password",
    confirmPassword: "password",
  });
  const { body } = await api.post("/api/users/login").send({
    email: "auth@gmail.com",
    password: "password",
  });

  return body;
};

export const apiAuthGet = async (
  url: string,
  expect: number = 200
): Promise<any> => {
  const { token, user: auth } = await logIn();

  const { body } = await api
    .get(url)
    .set("Authorization", "Bearer " + token)
    .expect(expect);
  return { body, auth };
};

export const apiAuthPost = async (
  url: string,
  params: Record<string, any>,
  expect: number = 201
): Promise<any> => {
  const { token, user: auth } = await logIn();

  const { body } = await api
    .post(url)
    .set("Authorization", "Bearer " + token)
    .send(params)
    .expect(expect);
  return { body, auth };
};
