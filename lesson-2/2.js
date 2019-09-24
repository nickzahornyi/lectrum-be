class TimersManager {
  constructor() {
    this.timers = [];
    this.types = {
      name: "string",
      delay: "number",
      interval: "boolean",
      job: "function",
    };
    this.started = false;
  }

  _findTimer(name) {
    const index = this.timers.findIndex(timer => timer.name === name);
    return this.timers[index];
  }

  _checkRequired(timer) {
    Object.keys(this.types).forEach(field => {
      if (!timer.hasOwnProperty(field)) {
        throw new Error(`${field} field in ${timer.name} object is required!`);
      }
    });
  }

  _checkTypes(field, value) {
    if (value == null || this.types[field] !== typeof value) {
      throw new Error(`Wrong value of ${field} field`);
    }
    return this.types[field] === typeof value;
  }

  _checkNames(name) {
    const isExists = this.timers.some(timer => timer.name === name);

    if (isExists) {
      throw new Error("Timer with that name has already been created");
    }
  }

  _validateTimer(timer) {
    if (this.started) {
      throw new Error("Timers are already running");
    }
    this._checkRequired(timer);
    this._checkNames(timer.name);
    for (let key in timer) {
      this._checkTypes(key, timer[key]);
      if (key === "delay") {
        if (timer[key] < 0 || timer[key] > 5000) {
          throw new Error("Delay must be between 0 and 5000");
        }
      }
    }
  }

  _startTimer(name) {
    const timer = this._findTimer(name);

    if (timer.interval) {
      timer.task = setInterval(() => timer.job(...timer.options), timer.delay);
    } else {
      timer.task = setTimeout(() => timer.job(...timer.options), timer.delay);
    }
    return this;
  }

  _clearTimer(name) {
    const timer = this._findTimer(name);

    if (timer.interval) {
      clearInterval(timer.task);
      timer.task = null;
    } else {
      clearTimeout(timer.task);
      timer.task = null;
    }
  }

  add(timer, ...options) {
    this._validateTimer(timer);
    timer.options = options;
    this.timers.push(timer);
    return this;
  }

  remove(name) {
    this.timers = this.timers.filter(timer => timer.name !== name);
  }

  start() {
    this.timers.map(timer => {
      if (!timer.task) {
        this._startTimer(timer.name);
      }
    });
    this.started = true;
  }

  stop() {
    this.timers.forEach(timer => {
      if (timer.task) {
        this._clearTimer(timer.name);
      }
    });
    this.started = false;
  }

  pause(name) {
    this._checkTypes("name", name);
    const timer = this._findTimer(name);
    if (!timer) {
      throw new Error(`There is no timer with name - ${name}`);
    } else if (!timer.task) {
      return null;
    }
    this._clearTimer(name);
  }

  resume(name) {
    this._checkTypes("name", name);
    const timer = this._findTimer(name);
    if (!timer) {
      throw new Error(`There is no timer with name - ${name}`);
    } else if (timer.task) {
      return null;
    }
    this._startTimer(name);
  }
}
