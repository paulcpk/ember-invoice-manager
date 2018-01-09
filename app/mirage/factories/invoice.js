import { Factory, faker } from 'ember-cli-mirage';
import generateInvoiceItems from 'ember-invoice-manager/helpers/generate-invoice-items';

export default Factory.extend({
	status: faker.list.random('draft', 'sent', 'paid'),
	invoiceNumber(i) {
		return 'INV-' + ('000000000' + i).slice(-10);
	},
	senderAddress() {
		return faker.company.companyName() + '\n' + faker.address.streetAddress();
	},
	recipientAddress() {
		return faker.company.companyName() + '\n' + faker.address.streetAddress();
	},
	createdAt: faker.date.recent,
	editedAt: faker.date.recent,
	issuedDate: faker.date.recent,
	serviceFromDate: faker.date.recent,
	serviceToDate: faker.date.recent,
	paymentDueDate(i) {
		return (i % 3) === 0 ? faker.date.recent() : faker.date.future();
	},
	taxRate: 8.5,
	discountRate: 0,
	total: faker.finance.amount,
	totalAfterTax: faker.finance.amount,
	invoiceTerms: faker.lorem.paragraph,
	personalData: faker.lorem.paragraph,
	currency: 'EUR',
	invoiceItems() {
		return generateInvoiceItems(Math.floor(Math.random() * 7) + 1);
	},
	templateId: 1
});
