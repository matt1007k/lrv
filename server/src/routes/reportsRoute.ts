import { Request, Response, Router } from "express";
import createInvoice from "../helpers/pdfkit";

const invoice = {
  shipping: {
    name: "John Doe",
    address: "1234 Main Street",
    city: "San Francisco",
    state: "CA",
    country: "US",
    postal_code: 94111,
  },
  items: [
    {
      item: "TC 100",
      description: "Toner Cartridge",
      quantity: 2,
      amount: 6000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
  ],
  subtotal: 8000,
  paid: 0,
  invoice_nr: 1234,
};

const router = Router();
router.get("", (req: Request, res: Response) => {
  // const stream = res.writeHead(200, {
  //   "Content-Type": "application/pdf",
  //   "Content-Disposition": "attachment; filename=invoice.pdf",
  // });
  // createInvoice(
  //   invoice,
  //   "invoice.pdf",
  //   (chunk: any) => {
  //     stream.write(chunk);
  //   },
  //   () => stream.end()
  // );
  const { rangeDate } = req.query?.filter as Record<string, string>;
  const dateFrom = rangeDate.split(",")[0];
  const dateTo = rangeDate.split(",")[1];
  res.json({ dateFrom, dateTo });
});

export default router;
