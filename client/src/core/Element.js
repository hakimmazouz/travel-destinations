import EventEmitter from "./EventEmitter.js";

const BINDABLE_EVENTS = ["click", "submit"];

export default class Element {
  constructor({ app, el }) {
    this.$app = app;
    this.parent = el;
    this.$events = new EventEmitter();
  }

  async started() {}
  async mounted() {}
  async destroy() {}

  renderEach(list, render) {
    return list.reduce((markup, current) => `${markup}${render(current)}`, ``);
  }

  _renderElement() {
    this.parent.innerHTML = this.render();
    this._replaceEventsHandlers();
  }

  _replaceEventsHandlers() {
    const elements = this.collectElementsWithListeners();
    elements.forEach((el) => {
      console.dir(el);

      BINDABLE_EVENTS.forEach((event) => {
        const attr = "on" + event;

        if (el.getAttribute(attr)?.startsWith?.("$this.")) {
          const method = el.getAttribute(attr).replace("$this.", "");
          el[attr] = this[method].bind(this) || "";
        }
      });
    });
  }

  methodRef(methodName) {
    return methodName.replace("$this.", "window.$app.currentPage.");
  }
  collectElementsWithListeners() {
    return BINDABLE_EVENTS.reduce((collectedElements, currentEvent) => {
      const elements = this.parent.querySelectorAll(`[on${currentEvent}]`);
      return [...collectedElements, ...elements];
    }, []);
  }

  $(selector) {
    const els = this.parent.querySelectorAll(selector);

    if (els.length > 1) return els;
    if (els.length == 1) return els[0];

    return null;
  }

  get store() {
    return this.$app.store;
  }

  /**
   * Notifies the page a change has been made and a re-render is needed
   */
  async refresh({ fetch = false } = {}) {
    if (fetch) await this.fetch();
    this._renderElement();
  }
}
