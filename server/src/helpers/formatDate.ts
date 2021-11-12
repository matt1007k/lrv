export function formatDate(date: Date, separator: string = "/"): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return day + separator + month + separator + year;
}
