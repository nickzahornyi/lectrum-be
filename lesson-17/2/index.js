use nzahornyi;

db.orders
  .aggregate([
    {
      $group: {
        _id: {
          product: "$product",
          customerId: "$customerId"
        },
        total: {
          $sum: 1
        }
      }
    },
    {
      $lookup: {
        from: "customers",
        localField: "_id.customerId",
        foreignField: "_id",
        as: "customer"
      }
    },
    {
      $group: {
        _id: {
          customerId: "$_id.customerId"
        },
        fName: {
          $first: "$customer.name.first"
        },
        lName: {
          $first: "$customer.name.last"
        },
        orders: {
          $push: {
            _id: "$_id.product",
            total: "$total"
          }
        }
      }
    },
    {
      $unwind: "$fName"
    },
    {
      $unwind: "$lName"
    },
    {
      $sort: {
        "_id.customerId": 1
      }
    },
    {
      $project: {
        _id: false
      }
    }
  ])
  .pretty();
