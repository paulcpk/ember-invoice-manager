import Ember from 'ember';
import { faker } from 'ember-cli-mirage';

export default (invoiceItemCount, itemAmount) => {
  let invoiceItems = Ember.A();
  
  for (let i = invoiceItemCount; i--;) {
    const amount = itemAmount || faker.commerce.price();
    const description = faker.commerce.productName();

    invoiceItems.push({
      amount,
      description
    });
  }
  
  return invoiceItems;
}
