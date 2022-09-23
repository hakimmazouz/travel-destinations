export default class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    } else {
      this.listeners[event] = [callback];
    }

    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].splice(this.listeners[event].indexOf(callback), 1);
    }
  }

  emit(event, ...args) {
    if (this.listeners[event]?.length) {
      for (let callback of this.listeners[event]) {
        callback(...args);
      }
    }
  }

  reset() {
    this.listeners = {};
  }
}
