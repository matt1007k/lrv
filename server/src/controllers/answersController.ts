import { Prisma } from ".prisma/client";
import { Request, Response } from "express";
import { WEB_URL } from "../helpers/config";
import prisma from "../helpers/prisma";
import { answerErrors } from "../validators/messagesValidation";
import { sendEmail } from "../helpers/sendEmail";

export const create = async (req: Request, res: Response) => {
  try {
    const {
      text,
      trackingCode,
      send,
    }: { text: string; trackingCode: string; send: boolean } = req.body;
    if (trackingCode === "" || trackingCode === undefined)
      return res
        .status(400)
        .json({ message: answerErrors.trackingCode.required });
    const claim = await prisma.claim.findFirst({
      where: { trackingCode },
    });
    const answerData: Prisma.AnswerCreateInput = {
      text,
      claim: { connect: { id: claim?.id } },
    };
    const answer = await prisma.answer.create({
      data: answerData,
    });

    if (!answer)
      return res.status(404).json({ message: answerErrors.notFount });

    const context = {
      answer,
      claim,
      url: `${WEB_URL}/#/detail/${trackingCode}`,
    };
    if (send && claim) {
      await sendEmail({
        to: claim.email,
        subject: "Respuesta al Reclamo o Queja",
        template: "answerClaim",
        context: context,
      });
    }

    res.status(200).json({ ...answer });
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
  const { trackingCode } = req.params;
  try {
    if (trackingCode === "" || trackingCode === undefined)
      return res
        .status(400)
        .json({ message: answerErrors.trackingCode.required });
    const claim = await prisma.claim.findFirst({
      where: { trackingCode },
    });
    const answers = await prisma.answer.findMany({
      where: {
        claim: {
          id: claim?.id,
        },
      },
    });
    res.status(200).json({ data: answers });
  } catch (error) {
    console.log(error);
  }
};
