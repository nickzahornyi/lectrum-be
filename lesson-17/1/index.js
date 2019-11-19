use nzahornyi;

db.customers
  .aggregate([
    {
      $lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "customerId",
        as: "orders"
      }
    },
    {
      $project: {
        fName: "$name.first",
        lName: "$name.last",
        "orders._id": true,
        "orders.count": true,
        "orders.price": true,
        "orders.discount": true,
        "orders.product": true,
        _id: false
      }
    }
  ])
  .pretty();
