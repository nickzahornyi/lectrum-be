load("./random.js");
use nzahornyi;

db.customers.drop();

const customers = [];

for (let i = 0; i < 3000; i++) {
    const customer = {
        name: {
            first: faker.fName(),
            last: faker.lName(),
        },
        nickname: `customer_${i}`,
        email: `customer_${i}@gmail.com`,
        password: `secret_${randomNumber(1, 15000)}`,
        created: new Date()
    };
    customers.push({ insertOne: { document: customer } });
}
db.customers.bulkWrite(customers);

