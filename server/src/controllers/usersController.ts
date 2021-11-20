import { Prisma } from "@prisma/client";
import { hash, verify } from "argon2";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { v4 } from "uuid";

import { SECRET_KEY, WEB_URL } from "../helpers/config";
import redis from "../helpers/connectRedis";
import { FORGET_PASSWORD_PREFIX } from "../helpers/constants";
import prisma from "../helpers/prisma";
import { sendEmail } from "../helpers/sendEmail";
import { validateEmail } from "../helpers/validationRegex";
import { MyRequest } from "../types/MyRequestTypes";
import { userErrors } from "../validators/messagesValidation";

export const register = async (req: Request, res: Response) => {
  const { confirmPassword, ...params } = req.body as {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  try {
    const hasUser = await prisma.user.findFirst({
      where: { email: req.body.email },
    });
    if (hasUser)
      return res.status(400).json({ message: userErrors.email.hasExit });

    if (req.body.password != confirmPassword)
      return res
        .status(422)
        .send({ errors: { confirmPassword: userErrors.password.notEquals } });

    const hashedPassword = await hash(req.body?.password);

    const user = await prisma.user.create({
      data: Object.assign(params, { password: hashedPassword }),
    });

    !user && res.status(404).json({ message: userErrors.notFound });
    const { password, ...others } = user;
    res.status(201).json(others);
  } catch (error) {}
};

export const logIn = async (req: MyRequest, res: Response) => {
  const { email } = req.body as Prisma.UserCreateInput;
  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    !user &&
      res.status(400).send({ message: userErrors.email.wrongCredentials });
    const validated = await verify(user?.password as string, req.body.password);
    !validated &&
      res.status(400).send({ message: userErrors.email.wrongCredentials });

    if (user) {
      const { password, ...others } = user;
      const token = sign(user, SECRET_KEY, { expiresIn: "1h" });
      res.status(200).json({ user: others, token });
    }
  } catch (error) {
    // res.status(400).json(error);
  }
};

export const detail = async (req: MyRequest, res: Response) => {
  const { email } = req.body as Prisma.UserCreateInput;
  const whereUser: Prisma.UserWhereInput = email
    ? { email }
    : { id: req.userId };

  try {
    const user = await prisma.user.findFirst({
      where: whereUser,
    });

    !user && res.status(404).send({ message: "El usuario no existe" });

    if (user) {
      const { password, ...others } = user;
      res.status(200).json(others);
    }
  } catch (error) {
    // res.status(400).json(error);
  }
};

export const changePassword = async (req: MyRequest, res: Response) => {
  const { currentPassword, newPassword, confirmPassword } = req.body as {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };

  try {
    if (newPassword != confirmPassword)
      return res
        .status(422)
        .send({ errors: { confirmPassword: userErrors.password.notEquals } });

    const userExists = await prisma.user.findFirst({
      where: { id: req.userId },
    });
    !userExists && res.status(404).send({ message: "El usuario no existe" });

    const checkPassword = await verify(
      userExists?.password as string,
      currentPassword
    );
    if (!checkPassword) {
      return res.status(422).send({
        errors: { currentPassword: "La contraseña actual no es correcta." },
      });
    }

    const passwordHash = await hash(newPassword);

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: {
        password: passwordHash,
      },
    });

    if (user) {
      const { password, ...others } = user;
      res.status(200).json(others);
    }
  } catch (error) {
    // res.status(400).json(error);
  }
};

export const changeInfo = async (req: MyRequest, res: Response) => {
  const { email, name } = req.body as {
    email: string;
    name: string;
  };

  try {
    const user = await prisma.user.update({
      where: { id: req.userId },
      data: {
        email,
        name,
      },
    });

    !user && res.status(404).json({ message: "El usuario no existe" });

    if (user) {
      const { password, ...others } = user;
      res.status(200).json(others);
    }
  } catch (error) {
    // res.status(400).json(error);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const email = req.body.email;
  if (!email) return res.status(422).json({ email: userErrors.email.required });
  if (!validateEmail(email))
    return res.status(422).json({ email: userErrors.email.isEmail });
  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) return res.status(404).json({ message: "El usuario no existe" });

    const token = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    ); // 3 days
    const context = {
      user,
      url: `${WEB_URL}/#/reset-password/${token}`,
    };
    await sendEmail({
      to: email,
      subject: "Recuperar contraseña",
      template: "forgotPassword",
      context: context,
    });
    res.status(200).json({ send: true });
  } catch (error) {}
};

export const changeResetPassword = async (req: Request, res: Response) => {
  try {
    const {
      newPassword,
      confirmPassword,
      token,
    }: { newPassword: string; confirmPassword: string; token: string } =
      req.body;

    if (newPassword != confirmPassword)
      return res
        .status(422)
        .send({ errors: { confirmPassword: userErrors.password.notEquals } });

    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);

    if (!userId)
      return res.status(400).json({ message: "El token ha expirado." });

    const user = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: {
        password: await hash(newPassword),
      },
    });

    if (user) {
      await redis.del(key);
      const { password, ...otherFields } = user;
      res.status(200).json(otherFields);
    }
  } catch (error) {}
};
