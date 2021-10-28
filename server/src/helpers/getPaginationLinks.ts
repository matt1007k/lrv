import { Request } from "express";

type setPaginationParamsTypes = {
  expressRequest: Request;
  modelTotal: number;
};

export const getPaginationLinks = async ({
  expressRequest,
  modelTotal,
}: setPaginationParamsTypes) => {
  const { perPage, page } = expressRequest.query;

  const perPageQuery = Number(perPage);
  const pageQuery = Number(page);

  const offsetSkip = (pageQuery - 1) * perPageQuery;
  const lastPage = Math.round(modelTotal / perPageQuery);

  return { offsetSkip, lastPage, perPage: perPageQuery, page: pageQuery };
};
