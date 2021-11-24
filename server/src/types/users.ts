import { Prisma } from "@prisma/client";

export type CreateUserInput = Prisma.UserCreateInput & {
  confirmPassword: string;
};
