import supertest from "supertest";

import prisma from "../helpers/prisma";

import app from "../index";

export const api = supertest(app);

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
