import PDFDocument from "pdfkit";
import {
  generateHeader,
  generateHr,
  generateTableRow,
} from "../../helpers/pdfkitUtils";

function claimsPDF(claims: any, dataCallback: any, endCallback: any) {
  let doc = new PDFDocument({ margin: 50 });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  generateHeader(doc, "Reporte de reclamaciones");
  generateClaimTable(doc, claims);

  doc.end();
}

function generateClaimTable(doc: any, claims: any) {
  let i;
  const claimsTableTop = 150;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    claimsTableTop,
    "Nombre completo",
    "Dirección",
    "# celular",
    "tipo",
    "Estado"
  );
  generateHr(doc, claimsTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < claims.length; i++) {
    const item = claims[i];
    const position = claimsTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.fullName,
      item.addressComplete,
      item.phone,
      item.typeLabel,
      item.statusLabel
    );

    generateHr(doc, position + 25);
  }

  doc.font("Helvetica");
}

export default claimsPDF;
