import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
	status: faker.list.random('draft', 'sent', 'paid'),
	invoiceTitle: faker.lorem.word,
	invoiceNumber(i) {
		return ('000000000' + i).slice(-10);
	},
	senderLogo: faker.image.avatar,
	senderAddress: faker.address.streetAddress,
	recipientAddress: faker.address.streetAddress,
	createdAt: faker.date.recent,
	editedAt: faker.date.recent,
	issuedDate: faker.date.recent,
	serviceFromDate: faker.date.recent,
	serviceToDate: faker.date.recent,
	paymentDueDate(i) {
		return (i % 3) === 0 ? faker.date.recent() : faker.date.future();
	},
	taxRate: 20,
	discountRate: 0,
	total: faker.finance.amount,
	totalAfterTax: faker.finance.amount,
	invoiceTerms: faker.lorem.paragraph,
	personalData: faker.lorem.paragraph,
	currency: 'EUR',
	isTemplate: false
});
