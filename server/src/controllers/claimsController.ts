import { Request, Response } from "express";
import { Prisma, Type, Status } from "@prisma/client";

import { QueryRequestTypes } from "../types/QueryRequestTypes";
import { getPaginationLinks } from "../helpers/getPaginationLinks";

import prisma from "../helpers/prisma";
import { MyRequest } from "../types/MyRequestTypes";
import { verifyToken } from "../helpers/verifyToken";
import { claimErrors } from "../validators/messagesValidation";

export const create = async (req: MyRequest, res: Response) => {
  const body: Prisma.ClaimCreateInput = req.body;
  const trackingCode = new Date().getTime().toString();

  const userId = await verifyToken(req);
  const hasAuthor =
    userId != null ? { author: { connect: { id: userId } } } : {};

  try {
    const claim = await prisma.claim.create({
      data: {
        trackingCode,
        ...body,
        ...hasAuthor,
      },
    });

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
            { trackingCode: { contains: search } },
          ],
        }
      : {};

    const user = await prisma.user.findFirst({ where: { id: req.userId } });

    const orWhereAuthor =
      req.userId && user?.role === "USER"
        ? {
            authorId: req.userId,
          }
        : {};
    const whereClaim: Prisma.ClaimWhereInput = {
      type,
      ...orSearch,
      ...orRangeDate,
      ...orWhereAuthor,
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
    const user = await prisma.user.findFirst({ where: { id: req.userId } });

    const orWhereAuthor =
      req.userId && user?.role === "USER"
        ? {
            authorId: req.userId,
          }
        : {};
    const total = await prisma.claim.count({
      where: { ...orWhereAuthor },
    });
    const claims = await prisma.claim.count({
      where: {
        type: Type.CLAIM,
        ...orWhereAuthor,
      },
    });
    const complains = await prisma.claim.count({
      where: {
        type: Type.COMPLAIN,
        ...orWhereAuthor,
      },
    });

    // const claims: any[] = await prisma.$queryRaw(
    //   Prisma.sql`SELECT count(*) as total FROM Claim WHERE type=${Type.CLAIM}`
    // );
    // const complains: any[] = await prisma.$queryRaw(
    //   Prisma.sql`SELECT count(*) as total FROM Claim WHERE type=${Type.COMPLAIN}`
    // );

    res.status(200).json({
      total,
      totalClaims: claims,
      totalComplains: complains,
    });
  } catch (error) {
    console.log(error);
  }
};

export const detail = async (req: MyRequest, res: Response) => {
  try {
    const trackingCode = req.params.trackingCode;
    const claim = await prisma.claim.findFirst({
      where: {
        trackingCode,
      },
    });

    if (!claim) return res.status(404).json({ message: claimErrors.notFound });

    res.status(200).json({ ...claim });
  } catch (error) {
    console.log(error);
  }
};

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const { trackingCode } = req.params;
    const claim = await prisma.claim.update({
      data: {
        status: req.body.isSuccess ? Status.SUCCESSFUL : Status.PENDING,
      },
      where: {
        trackingCode,
      },
    });
    res.status(200).json({ ...claim });
  } catch (error) {
    console.log(error);
  }
};
