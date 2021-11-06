import { Claim } from "../store/modules/claim/state";

export const getStatusHumanize = (status: string | undefined): string => {
  if (!!status) {
    if (status === "SUCCESSFUL") return "Atendido";
    else return "Pendiente";
  } else return "";
};

export const getAddressInline = (claim: Claim): string => {
  return `${claim.department}, ${claim.district}, ${claim.address}`;
};

export const getFileName = (claim: Claim): string => {
  return (!!claim.file && claim.file.split("/")[4]) || "";
};
