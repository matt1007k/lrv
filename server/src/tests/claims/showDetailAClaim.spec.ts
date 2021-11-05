import { api, cleanClaimDB, logIn, user } from "../helpers";
import { Prisma, Type } from "@prisma/client";
import prisma from "../../helpers/prisma";

const claims: Prisma.ClaimCreateInput[] = [
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

beforeEach(async () => {
  await cleanClaimDB();

  for (const claim of claims) {
    await prisma.claim.create({ data: claim });
  }
});

describe("claim detail", () => {
  it("should get count by types", async () => {
    const { body } = await api.get("/api/claims/detail-count").expect(200);

    expect(body.total).toBeDefined();
    expect(body.totalClaims).toBeDefined();
    expect(body.totalComplains).toBeDefined();
  });
});
