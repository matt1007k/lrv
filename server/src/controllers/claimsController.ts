import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
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
  const { orderBy, type, search } = req.query as QueryRequestTypes;

  try {
    const or: Prisma.ClaimWhereInput = search
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
      ...or,
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
