load("./random.js");
use nzahornyi

db.customers.drop();
db.orders.drop();

const customers = [];
const orders = [];

for (let i = 0; i < 3000; i++) {
  const customer = {
    name: {
      first: faker.fName(),
      last: faker.lName()
    },
    balance: randomNumber(1000, 15000),
    created: new Date()
  };
  customers.push(customer);
}

const { insertedIds } = db.customers.insertMany(customers);

for (let i = 0; i < insertedIds.length; i++) {
  for (let j = 0; j < randomNumber(1, 10); j++) {
    const productName = faker.product();

    const order = {
      customerId: insertedIds[i],
      count: randomNumber(1, 100),
      price: randomNumber(20, 100),
      discount: randomNumber(5, 30),
      title: `Title of ${productName}`,
      product: productName
    };

    orders.push({ insertOne: { document: order } });
  }
}

db.orders.bulkWrite(orders);
