import { PrismaClient, Prisma, Type } from "@prisma/client";

const prisma = new PrismaClient();

const claimData: Prisma.ClaimCreateInput[] = [
  {
    trackingCode: "1234567890",
    fullName: "Max",
    email: "mahmoud@prisma.io",
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
    trackingCode: "0987654321",
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

async function main() {
  console.log(`Start seeding ...`);
  for (const c of claimData) {
    const claim = await prisma.claim.create({
      data: c,
    });
    console.log(`Created claim with id: ${claim.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
