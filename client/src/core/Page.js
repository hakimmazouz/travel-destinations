import Element from "./Element.js";

export default class Page extends Element {
  constructor({ app }) {
    super({ app, el: app.el });
  }

  async fetch() {}

  getParam(param) {
    const params = new URLSearchParams(window.location.search);

    return params.get(param);
  }
}
