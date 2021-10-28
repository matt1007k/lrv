import { initialPaginationLinks, PaginationLinksType } from "../../types";
import { User } from "../user/userState";
export interface Claim {
  id?: number;
  trackingCode?: string;
  fullName: string;
  email: string;
  address: string;
  reference: string;
  department: string;
  province: string;
  district: string;
  phone: string;
  type: "CLAIM" | "COMPLAIN";
  detail: string;
  order: string;
  file?: string;
  status: "PENDING" | "SUCCESSFUL";
  createdAt: string;
  updatedAt: string;
  authorId?: number;
  author?: User;
}
export type ClaimState = {
  claims: Claim[];
  links: PaginationLinksType;
};

export const state: ClaimState = {
  claims: [],
  links: initialPaginationLinks,
};
