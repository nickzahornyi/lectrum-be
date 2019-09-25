const EventEmitter = require("events");
const crypto = require("crypto");

class Bank extends EventEmitter {
  constructor() {
    super();

    this.users = [];
    this.userTypes = {
      name: "string",
      balance: "number",
    };

    this.on("add", this._add);
    this.on("get", this._get);
    this.on("withdraw", this._withdraw);
    this.on("send", this._send);
  }

  register(user) {
    this._validateUser(user);

    // https://stackoverflow.com/a/40191779
    const id = crypto.randomBytes(16).toString("hex");

    this.users.push({ ...user, id });

    return id;
  }

  _add(id, sum) {
    const currentUser = this._getUser(id);

    this._validateSum(sum);
    this._addSum(currentUser, sum);
  }

  _get(id, cb) {
    const currentUser = this._getUser(id);

    if (typeof cb !== "function") {
      this.emit("error", new Error("Callback must be a function"));
    }
    cb(currentUser.balance);
  }

  _withdraw(id, sum) {
    const currentUser = this._getUser(id);
    this._validateSum(sum);
    this._withdrawSum(currentUser, sum);
  }

  _send(senderId, receiverId, sum) {
    const sender = this._getUser(senderId);
    const receiver = this._getUser(receiverId);
    this._validateSum(sum);

    this._withdrawSum(sender, sum);
    this._addSum(receiver, sum);
  }

  _getUser(id) {
    const user = this.users.find(user => user.id === id);

    if (!user) this.emit("error", new Error(`There is no user with id - ${id}`));

    return user;
  }

  _validateUser(user) {
    this._checkRequired(user);
    this._checkNames(user.name);
    for (let key in user) {
      this._checkTypes(key, user[key]);
      if (key === "balance") {
        if (user[key] <= 0) {
          throw new Error("Balance must be greater then 0");
        }
      }
    }
  }

  _checkRequired(user) {
    Object.keys(this.userTypes).forEach(field => {
      if (!user.hasOwnProperty(field)) {
        throw new Error(`${field} field is required!`);
      }
    });
  }

  _checkNames(name) {
    const isExists = this.users.some(user => user.name === name);

    if (isExists) {
      throw new Error("User with that name has already been created");
    }
  }

  _checkTypes(field, value) {
    if (value == null || this.userTypes[field] !== typeof value) {
      throw new Error(`Wrong type of ${field} field. Must be a ${this.userTypes[field]}`);
    }
    return this.userTypes[field] === typeof value;
  }

  _validateSum(sum) {
    if (typeof sum !== "number" || sum <= 0) {
      this.emit("error", new Error("Sum must be a number and greater then 0"));
    }
  }

  _addSum(currentUser, sum) {
    this.users = this.users.map(user => {
      if (user.id === currentUser.id) {
        user.balance += sum;
      }
      return user;
    });
  }

  _withdrawSum(currentUser, sum) {
    this.users = this.users.map(user => {
      if (user.id === currentUser.id) {
        if (user.balance - sum >= 0) {
          user.balance -= sum;
        } else {
          this.emit("error", new Error(`Not enough money for this operation. Your balance is - ${user.balance}₴`));
        }
      }
      return user;
    });
  }
}

module.exports = Bank;
