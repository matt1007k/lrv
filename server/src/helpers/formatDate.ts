export function formatDate(date: Date, separator: string = "/"): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let dayZero = day < 10 ? `0${day}` : day;
  let monthZero = month < 10 ? `0${month}` : month;

  return dayZero + separator + monthZero + separator + year;
}
