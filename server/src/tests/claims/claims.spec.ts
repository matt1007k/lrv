import { apiAuthGet, cleanClaimDB, cleanUserDB } from "../helpers";
import { Prisma, Type } from "@prisma/client";
import prisma from "../../helpers/prisma";
import { PaginationLinkTypes } from "../../types/PaginationTypes";

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

beforeEach(async () => {
  cleanClaimDB();
  // cleanUserDB();

  for (const claim of claims) {
    await prisma.claim.create({ data: claim });
  }
});

describe("claims", () => {
  it("get all claims", async () => {
    const { body, auth } = await apiAuthGet("/api/claims");

    const data = body.data as Prisma.ClaimCreateInput[];

    const containFullNames = data.map((claim) => claim.fullName);

    expect(containFullNames).toContain(claims[0].fullName);
    expect(containFullNames).toContain(claims[1].fullName);
  });

  it("can order by descending createdAt", async () => {
    const { body } = await apiAuthGet("/api/claims?orderBy=desc");

    const data = body.data as Prisma.ClaimCreateInput[];

    // const claimsDesc = claims.sort(
    //   (a, b) => (a.fullName  > b.fullName && 1) || -1
    // );
    const claimsDesc = claims.sort((a, b) =>
      !!a.createdAt && !!b.createdAt && a.createdAt < b.createdAt ? 1 : -1
    );
    // const claimsDesc = claims.sort((a, b) => {
    //   if (!!a.createdAt && !!b.createdAt) {
    //     if (a.createdAt < b.createdAt) return 1;
    //     else return -1;
    //   }
    //   return -1;
    // });

    expect(data).toMatchObject(claimsDesc);
  });

  it("can paginate the claim list", async () => {
    const { body } = await apiAuthGet("/api/claims?perPage=1&page=1");

    const data = body.data as Prisma.ClaimCreateInput[];
    const links = body.links as PaginationLinkTypes;

    expect(links).toMatchObject({
      perPage: 1,
      page: 1,
      lastPage: 2,
      total: 2,
    });

    expect(data[0].fullName).toBe(claims[0].fullName);
    expect(data[0].email).toBe(claims[0].email);
    expect(data[0].phone).toBe(claims[0].phone);
  });

  it("can filter by type CLAIM a claim", async () => {
    const { body } = await apiAuthGet(`/api/claims?type=${Type.CLAIM}`);

    const data = body.data as Prisma.ClaimCreateInput[];

    const containTypes = data.map(
      (claim: Prisma.ClaimCreateInput) => claim.type
    );

    expect(containTypes).toContain(Type.CLAIM);
  });

  it("can filter by type COMPLAIN a claim", async () => {
    const { body } = await apiAuthGet(`/api/claims?type=${Type.COMPLAIN}`);

    const data = body.data as Prisma.ClaimCreateInput[];

    const containTypes = data.map(
      (claim: Prisma.ClaimCreateInput) => claim.type
    );

    expect(containTypes).toContain(Type.COMPLAIN);
  });

  it("can search a claim by fullName", async () => {
    const { body } = await apiAuthGet(`/api/claims?search=jua`);

    const data = body.data as Prisma.ClaimCreateInput[];

    const containFullNames = data.map(
      (claim: Prisma.ClaimCreateInput) => claim.fullName
    );

    expect(containFullNames).toContain("Juan");
  });

  it("can search a claim by email", async () => {
    const { body } = await apiAuthGet(`/api/claims?search=ax123`);

    const data = body.data as Prisma.ClaimCreateInput[];

    const containEmails = data.map(
      (claim: Prisma.ClaimCreateInput) => claim.email
    );

    expect(containEmails).toContain("max123@prisma.io");
  });

  it("can search a claim by address", async () => {
    const { body } = await apiAuthGet(`/api/claims?search=lima`);

    const data = body.data as Prisma.ClaimCreateInput[];

    const containAddresses = data.map(
      (claim: Prisma.ClaimCreateInput) => claim.address
    );

    expect(containAddresses).toContain("Jr Lima 234");
  });

  it("can search a claim by phone", async () => {
    const { body } = await apiAuthGet(`/api/claims?search=9654`);

    const data = body.data as Prisma.ClaimCreateInput[];

    const containPhones = data.map(
      (claim: Prisma.ClaimCreateInput) => claim.phone
    );

    expect(containPhones).toContain("965445231");
  });

  it("can filter clain by range date", async () => {
    const { body } = await apiAuthGet(
      `/api/claims?filter[rangeDate]=2021-09-23,2021-10-02`
    );

    const data = body.data as Prisma.ClaimCreateInput[];

    const containPhones = data.map(
      (claim: Prisma.ClaimCreateInput) => claim.phone
    );

    expect(containPhones).toContain("976543234");
  });
});

// beforeAll(async () => {
// closeServer();
//   await cleanClaimDB();
// });
afterAll(async () => {
  // closeServer();
});
