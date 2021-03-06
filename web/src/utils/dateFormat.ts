export const getDateInline = (
  createdAt: string | undefined,
  separator: string = "/"
) => {
  if (!!createdAt) {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let dayZero = day < 10 ? `0${day}` : day;
    let monthZero = month < 10 ? `0${month}` : month;

    return `${dayZero}${separator}${monthZero}${separator}${year}`;
  } else return "";
};

export const getDateAndTimeInline = (
  createdAt: string | undefined,
  separator: string = "/"
) => {
  if (!!createdAt) {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let dayZero = day < 10 ? `0${day}` : day;
    let monthZero = month < 10 ? `0${month}` : month;

    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${dayZero}${separator}${monthZero}${separator}${year} a las ${hour}:${minutes}`;
  } else return "";
};
