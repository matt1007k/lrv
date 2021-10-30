import supertest from "supertest";
import path from "path";
import fs from "fs-extra";

import prisma from "../helpers/prisma";

import app from "../index";

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
