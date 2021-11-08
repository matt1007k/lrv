import config from "./config";
import headersDefault from "./headersDefault";

interface OptionsHeaders {
  method: string;
  body?: string;
  headers?: Headers;
}

const request = (
  url: string,
  params: Record<string, string> = {},
  method: string
) => {
  const options: OptionsHeaders = {
    method,
    headers: headersDefault(),
  };

  if (method === "GET") {
    if (params.filter) {
      const { filter, ...otherParams } = params;
      url +=
        "?" + new URLSearchParams(otherParams).toString() + "&" + params.filter;
    } else {
      url += "?" + new URLSearchParams(params).toString();
    }
  } else {
    options.body = JSON.stringify(params);
  }

  return fetch(config.API_URL + url, options).then(async (response) => {
    return {
      status: response.status,
      data: await response.json(),
    };
  });
};
export const get = (url = "", params = {}) => request(url, params, "GET");
export const post = (url = "", params = {}) => request(url, params, "POST");
export const deleteFetch = (url = "", params = {}) =>
  request(url, params, "DELETE");
