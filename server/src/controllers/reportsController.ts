import { Request, Response } from "express";
import { Prisma, Claim } from "@prisma/client";

import claimsPDF from "../templates/report/claimsPDF";

import { formatDate } from "../helpers/formatDate";
import prisma from "../helpers/prisma";
import { QueryRequestTypes } from "../types/QueryRequestTypes";
import {
  getAddressShortInline,
  getStatusHumanize,
  getTypeHumanize,
} from "../helpers/claims";

export const reportClaimsPDF = async (req: Request, res: Response) => {
  const filename = `${formatDate(new Date(), "-")}-reporte-reclamaciones`;

  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=${filename}.pdf`,
  });

  const { orderBy, type, search, filter } = req.query as QueryRequestTypes;

  try {
    const orRangeDate: Prisma.ClaimWhereInput = filter
      ? {
          createdAt: {
            gte: new Date(filter.rangeDate.split(",")[0]),
            lt: new Date(filter.rangeDate.split(",")[1]),
          },
        }
      : {};
    const orSearch: Prisma.ClaimWhereInput = search
      ? {
          OR: [
            { fullName: { contains: search } },
            { email: { contains: search } },
            { address: { contains: search } },
            { phone: { contains: search } },
          ],
        }
      : {};
    const whereClaim = {
      type,
      ...orSearch,
      ...orRangeDate,
    };

    const claims = await prisma.claim.findMany({
      where: whereClaim,
      orderBy: {
        createdAt: orderBy || undefined,
      },
    });

    const newClaims = claims.map((claim: Claim) => {
      const { type, status, department, province, address, ...otherFields } =
        claim;
      const statusLabel = getStatusHumanize(status);
      const typeLabel = getTypeHumanize(status);
      const addressComplete = getAddressShortInline(claim);
      return { ...otherFields, statusLabel, typeLabel, addressComplete };
    });

    claimsPDF(
      newClaims,
      (chunk: any) => {
        stream.write(chunk);
      },
      () => stream.end()
    );
  } catch (error) {
    res.status(400).json(error);
  }
};
