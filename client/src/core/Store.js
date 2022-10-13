import EventEmitter from "./EventEmitter.js";
import LocalCache from "./LocalCache.js";

export default class Store extends EventEmitter {
  constructor({ state = {}, cache = true }) {
    super();
    if (cache) {
      this.cache = new LocalCache();
    }
    this.initialState = state;
    this.start();
  }

  start() {
    const cachedState = this.cache ? this.cache.retrieve() : null;
    const state = cachedState || this.initialState;

    this.state = new Proxy(state, {
      get: (target, prop) => {
        return target[prop];
      },
      set: (target, prop, value) => {
        target[prop] = value;
        this.cache.store(target);
        this.emit("change", this.state);

        return target[prop];
      },
    });
  }

  retrieveState() {
    if (this.cache) {
    }
  }

  clear() {
    this.cache.clear();
    this.start();
  }

  subscribe(callback) {
    return this.on("change", callback);
  }
}
