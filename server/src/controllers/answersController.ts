import { Prisma } from ".prisma/client";
import { Request, Response } from "express";
import prisma from "../helpers/prisma";
import { answerErrors } from "../validators/messagesValidation";

export const create = async (req: Request, res: Response) => {
  try {
    const { text, claimId }: { text: string; claimId: number } = req.body;
    if (claimId === 0)
      return res.status(400).json({ message: "El reclamo id es necesario" });
    const answerData: Prisma.AnswerCreateInput = {
      text,
      claim: { connect: { id: claimId } },
    };
    const answer = await prisma.answer.create({
      data: answerData,
    });

    if (!answer)
      return res.status(404).json({ message: answerErrors.notFount });

    res.status(200).json({ answer });
  } catch (error) {
    console.log(error);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const answers = await prisma.answer.findMany();
    res.status(200).json({ data: answers });
  } catch (error) {
    console.log(error);
  }
};

export const getAllByClaim = async (req: Request, res: Response) => {
  try {
    const answers = await prisma.answer.findMany({
      where: {
        claimdId: parseInt(req.params.claimId),
      },
    });
    res.status(200).json({ data: answers });
  } catch (error) {
    console.log(error);
  }
};
