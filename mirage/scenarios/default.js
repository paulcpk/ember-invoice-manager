
export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  const NUMBER_OF_INVOICES = 30;

  for (let i = NUMBER_OF_INVOICES; i--;) {
    const randomNumber = Math.floor(Math.random() * 7) + 1;

    const invoice = server.create('invoice');
    server.createList('invoiceItem', randomNumber, { invoiceId: invoice.id });
  }
  
}
