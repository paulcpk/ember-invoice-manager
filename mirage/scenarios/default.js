export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  server.createList('invoice', 10);
  server.createList('invoice-item', 20);
}
