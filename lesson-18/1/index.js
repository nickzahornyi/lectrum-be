use nzahornyi;

db.customers.createIndex({ email: 1 });
db.customers.createIndex({ "name.first": 1, "name.last": 1 });
db.customers.createIndex({ email: 1, created: -1 });
