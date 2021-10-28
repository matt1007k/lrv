const headersDefault = () => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  if (localStorage.getItem("token")) {
    headers.set("Authorization", "Bearer " + localStorage.getItem("token"));
  }

  return headers;
};

export default headersDefault;
