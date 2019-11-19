use nzahornyi;

db.customers.createIndex({
    "name.first": "text",
    "name.last": "text",
    nickname: "text",
    email: "text",
});
