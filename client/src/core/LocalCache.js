export default class LocalCache {
  constructor({ key = "main" } = {}) {
    this.key = key;
  }

  store(state) {
    window.localStorage.setItem(this.key, JSON.stringify(state));

    return state;
  }

  retrieve() {
    const stateString = window.localStorage.getItem(this.key);

    try {
      const state = JSON.parse(stateString);

      return state;
    } catch (e) {
      return {};
    }
  }

  clear() {
    window.localStorage.removeItem(this.key);
  }
}
