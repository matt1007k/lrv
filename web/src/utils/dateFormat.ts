export const getDateInline = (createdAt: string | undefined) => {
  if (!!createdAt) {
    const date = new Date(createdAt);
    let dayZero = date.getDay().toString();
    let monthZero = date.getMonth().toString();
    if (date.getDay() < 10) dayZero = `0${dayZero}`;
    if (date.getMonth() < 10) monthZero = `0${monthZero}`;

    return `${dayZero}/${monthZero}/${date.getFullYear()}`;
  } else return "";
};
