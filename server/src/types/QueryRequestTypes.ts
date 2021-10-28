import { Prisma, Type } from "@prisma/client";

export interface QueryRequestTypes {
  orderBy?: Prisma.SortOrder;
  perPage?: number;
  page?: number;
  type?: Type;
  search?: string;
}
