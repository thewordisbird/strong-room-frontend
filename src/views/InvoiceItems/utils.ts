import { InvoiceData } from '../../shared/Firebase/Firestore/interfaces/InvoiceData';

export const filterInvoiceData = (invoiceData: InvoiceData[], params: {vendor: string | null, startDate: Date | null, endDate: Date | null}): InvoiceData[] => {
  let filteredResults = invoiceData;
  if (params.vendor) {
    filteredResults = filteredResults.filter((invoice) => invoice.Vendor === params.vendor);
  }

  // For data filters. The firestore data currently holds the dates as strings. This has to be converted and compared until
  // The firestore db is updated with better typed data.
  if (params.startDate !== null) {
    const { startDate } = params;
    filteredResults = filteredResults.filter((invoice) => {
      const invoiceDate = new Date(invoice.invoiceDate);
      return invoiceDate >= startDate;
    });
  }

  if (params.endDate) {
    const { endDate } = params;
    filteredResults = filteredResults.filter((invoice) => {
      const invoiceDate = new Date(invoice.invoiceDate);
      return invoiceDate <= endDate;
    });
  }
  return filteredResults;
};
