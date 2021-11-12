import path from "path";
import { formatDate } from "./formatDate";

export function generateHeader(doc: any, title: string) {
  doc
    .image(path.resolve("src/assets/logo.png"), 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text(title, 110, 57)
    .fontSize(10)
    .text(formatDate(new Date()), 200, 65, { align: "right" })
    .moveDown();
}

export function generateFooter(doc: any, text: string) {
  doc.fontSize(10).text(text, 50, 780, { align: "center", width: 500 });
}

export function generateTableRow(
  doc: any,
  y: number,
  col1: any,
  col2: string,
  col3: string,
  col4: string,
  col5: any
) {
  doc
    .fontSize(10)
    .text(col1, 50, y, { width: 120 })
    .text(col2, 180, y, { width: 170 })
    .text(col3, 370, y, { width: 90, align: "left" })
    .text(col4, 450, y, { width: 90, align: "left" })
    .text(col5, 0, y, { align: "right" });
}

export function generateHr(doc: any, y: number) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

export function formatCurrency(cents: number) {
  return "$" + (cents / 100).toFixed(2);
}
