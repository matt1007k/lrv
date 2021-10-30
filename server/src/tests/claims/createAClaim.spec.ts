import { Prisma } from "@prisma/client";

import { api } from "../helpers";
import { claimErrors } from "../../validators/messagesValidation";

const claim: Prisma.ClaimCreateInput = {
  fullName: "Mahmoud",
  email: "mahmoud@prisma.io",
  address: "Jr Lima 234",
  reference: "Al lado de",
  department: "Ayacucho",
  province: "Huamanga",
  district: "Ayacucho",
  phone: "976543234",
  type: "CLAIM",
  detail: "Falta de",
  order: "231323",
  file: "/path/document.pdf",
  createdAt: new Date().toISOString(),
};

describe("POST /api/claims", () => {
  it("can create a claim", async () => {
    const { body } = await api.post("/api/claims").send(claim).expect(201);
    const data = body as Prisma.ClaimCreateInput;

    expect(data.fullName).toBe(claim.fullName);
    expect(data.email).toBe(claim.email);
  });

  it("cannot create a claim", async () => {
    const { body } = await api
      .post("/api/claims")
      .send({
        fullName: null,
      })
      .expect(422);

    const errors = body.errors as Prisma.ClaimCreateInput;

    expect(errors.fullName).toBe(claimErrors.fullName.required);
    expect(errors.email).toBe(claimErrors.email.required);
    expect(errors.phone).toBe(claimErrors.phone.required);
    expect(errors.address).toBe(claimErrors.address.required);
    expect(errors.reference).toBe(claimErrors.reference.required);
    expect(errors.department).toBe(claimErrors.department.required);
    expect(errors.province).toBe(claimErrors.province.required);
    expect(errors.district).toBe(claimErrors.district.required);
    expect(errors.type).toBe(claimErrors.type.required);
    expect(errors.detail).toBe(claimErrors.detail.required);
    expect(errors.order).toBe(claimErrors.order.required);
  });

  it("cannot create a claim why the email is not valid", async () => {
    const { body } = await api
      .post("/api/claims")
      .send(Object.assign(claim, { email: "dde" }))
      .expect(422);

    const errors = body.errors as Prisma.ClaimCreateInput;

    expect(errors.email).toBe(claimErrors.email.isEmail);
  });
  it("should the phone must be numeric", async () => {
    const { body } = await api
      .post("/api/claims")
      .send(Object.assign(claim, { phone: "ddd" }))
      .expect(422);

    const errors = body.errors as Prisma.ClaimCreateInput;

    expect(errors.phone).toBe(claimErrors.phone.isNumeric);
  });
  it("should the phone must be valid", async () => {
    const { body } = await api
      .post("/api/claims")
      .send(Object.assign(claim, { phone: "9999" }))
      .expect(422);

    const errors = body.errors as Prisma.ClaimCreateInput;

    expect(errors.phone).toBe(claimErrors.phone.isPhone);
  });
});
