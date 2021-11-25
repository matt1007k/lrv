import { Claim } from "../claim/state";

export interface Answer {
  id?: number;
  text: string;
  claimId: number;
  claim: Claim;
  createdAt?: string;
  updatedAt?: string;
}
export type AnswerState = {
  answers: Answer[];
};

export const initialAnswer = {
  text: "",
};

export const state: AnswerState = {
  answers: [],
};
