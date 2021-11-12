import { Claim } from "@prisma/client";

export const getStatusHumanize = (status: string | undefined): string => {
  if (!!status) {
    if (status === "SUCCESSFUL") return "Atendido";
    else return "Pendiente";
  } else return "";
};

export const getTypeHumanize = (type: string | undefined): string => {
  if (!!type) {
    if (type === "CLAIM") return "Reclamo";
    else return "Queja";
  } else return "";
};

export const getAddressInline = (claim: Claim): string => {
  return `${claim.department}, ${claim.district}, ${claim.address}`;
};
export const getAddressShortInline = (claim: Claim): string => {
  return `${claim.district}, ${claim.address}`;
};
