export const generateInvoices = (server, invoiceCount, invoiceItemCount) => {
  
  for (let i = invoiceCount; i--;) {
    const randomNumber = invoiceItemCount || Math.floor(Math.random() * 7) + 1;

    const invoice = server.create('invoice');
    server.createList('invoiceItem', randomNumber, { invoiceId: invoice.id });
  }
  
}
