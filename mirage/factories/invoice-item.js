import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
	createdAt: faker.date.recent,
	editedAt: faker.date.recent,
	amount: faker.commerce.price,
	description: faker.commerce.productName
});
