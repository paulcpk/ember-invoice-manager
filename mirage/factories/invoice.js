import { Factory, association, faker } from 'ember-cli-mirage';

export default Factory.extend({
    status: 'sent',
    invoiceTitle: faker.lorem.words,
    invoiceNumber: `${faker.lorem.number}-${faker.date.recent}`,
    senderLogo: faker.image.avatar,
    senderAddress: faker.address.streetAddress,
    recipientAddress: faker.address.streetAddress,
    createdAt: faker.date.recent,
    editedAt: faker.date.recent,
    issuedDate: faker.date.recent,
    serviceFromDate: faker.date.recent,
    serviceToDate: faker.date.recent,
    paymentDueDate: faker.date.future,
    tax: 0.20,
    total: faker.finance.amount,
    totalAfterTax: faker.finance.amount,
    invoiceTerms: faker.lorem.paragraph,
    personalData: faker.lorem.paragraph,
    currency: 'EUR',
    isTemplate: false
});
