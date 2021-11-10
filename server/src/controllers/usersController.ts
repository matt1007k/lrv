import { Prisma } from "@prisma/client";
import { hash, verify } from "argon2";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

import { SECRET_KEY } from "../helpers/config";
import prisma from "../helpers/prisma";
import { MyRequest } from "../types/MyRequestTypes";
import { userErrors } from "../validators/messagesValidation";

export const register = async (req: Request, res: Response) => {
  const body = req.body;

  const hashedPassword = await hash(body?.password);

  try {
    const user = await prisma.user.create({
      data: Object.assign(body, { password: hashedPassword }),
    });

    !user && res.status(404).json({ email: userErrors.email.hasExit });
    const { password, ...others } = user;
    res.status(201).json(others);
  } catch (error) {}
};

export const logIn = async (req: Request, res: Response) => {
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
      const token = sign(user, SECRET_KEY);
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
        .send({ errors: { confirmPassword: "Las contraseñas no coinciden" } });

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
