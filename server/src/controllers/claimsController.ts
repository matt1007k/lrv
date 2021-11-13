import { Request, Response } from "express";
import { Prisma, Type } from "@prisma/client";
import { randomInt } from "crypto";

import { QueryRequestTypes } from "../types/QueryRequestTypes";
import { getPaginationLinks } from "../helpers/getPaginationLinks";

import prisma from "../helpers/prisma";
import { MyRequest } from "../types/MyRequestTypes";

export const create = async (req: Request, res: Response) => {
  const body: Prisma.ClaimCreateInput = req.body;
  const trackingCode = randomInt(999999999).toString();

  try {
    const claim = await prisma.claim.create({
      data: {
        trackingCode,
        ...body,
      },
    });
    // console.log("class: ", claim);

    res.status(201).json(claim);
  } catch (error) {}
};

export const getAll = async (req: MyRequest, res: Response) => {
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

    const total = await prisma.claim.count({
      where: whereClaim,
    });

    const { offsetSkip, perPage, lastPage, page } = await getPaginationLinks({
      expressRequest: req,
      modelTotal: total,
    });

    const claims = await prisma.claim.findMany({
      where: whereClaim,
      take: perPage || undefined,
      skip: offsetSkip || undefined,
      orderBy: {
        createdAt: orderBy || undefined,
      },
    });

    res.json({
      data: claims,
      links: {
        perPage,
        page,
        lastPage,
        total,
      },
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const detailCount = async (req: MyRequest, res: Response) => {
  try {
    const total = await prisma.claim.count();
    const claims: any[] = await prisma.$queryRaw(
      Prisma.sql`SELECT count(*) as total FROM Claim WHERE type=${Type.CLAIM}`
    );
    const complains: any[] = await prisma.$queryRaw(
      Prisma.sql`SELECT count(*) as total FROM Claim WHERE type=${Type.COMPLAIN}`
    );

    res.status(200).json({
      total,
      totalClaims: claims[0].total,
      totalComplains: complains[0].total,
    });
  } catch (error) {
    console.log(error);
  }
};

export const detail = async (req: MyRequest, res: Response) => {
  try {
    const id = req.params.id;
    const claim = await prisma.claim.findFirst({
      where: { id: parseInt(id) },
    });

    if (!claim) return res.status(404).json({ message: "No claim found" });

    res.status(200).json({ ...claim });
  } catch (error) {
    console.log(error);
  }
};
