import { Request, Response } from "express";
import { Prisma, Claim } from "@prisma/client";

import { QueryRequestTypes } from "../types/QueryRequestTypes";

import claimsPDF from "../templates/report/claimsPDF";

import { formatDate } from "../helpers/formatDate";
import prisma from "../helpers/prisma";
import {
  getAddressInline,
  getAddressShortInline,
  getStatusHumanize,
  getTypeHumanize,
} from "../helpers/claims";
import { Workbook } from "exceljs";

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

export const reportClaimsExcel = async (req: Request, res: Response) => {
  const filename = `${formatDate(new Date(), "-")}-reporte-reclamaciones`;

  res.writeHead(200, {
    "Content-Type":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-Disposition": `attachment; filename=${filename}.xlsx`,
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
      const {
        type,
        status,
        department,
        province,
        address,
        createdAt,
        ...otherFields
      } = claim;
      const statusLabel = getStatusHumanize(status);
      const typeLabel = getTypeHumanize(status);
      const addressComplete = getAddressInline(claim);
      const createdAtFormat = formatDate(new Date(createdAt), "-");
      return {
        ...otherFields,
        statusLabel,
        typeLabel,
        addressComplete,
        createdAtFormat,
      };
    });

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Libro de Reclamaciones");

    worksheet.columns = [
      { header: "ID", key: "id", width: 5 },
      { header: "Nombre completo", key: "fullName", width: 25 },
      { header: "Correo eletrónico", key: "email", width: 25 },
      { header: "Nro. Celular", key: "phone", width: 20 },
      { header: "Dirección", key: "addressComplete", width: 25 },
      { header: "Detalle", key: "detail", width: 25 },
      { header: "Orden", key: "order", width: 25 },
      { header: "Archivo adjunto", key: "file", width: 25 },
      { header: "Tipo", key: "typeLabel", width: 20 },
      { header: "Estado", key: "statusLabel", width: 20 },
      { header: "Fecha de registro", key: "createdAtFormat", width: 20 },
    ];

    worksheet.addRows(newClaims);

    return workbook.xlsx.write(res).then(() => {
      res.end();
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
