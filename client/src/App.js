import EventEmitter from "./core/EventEmitter.js";
import Store from "./core/Store.js";
import { APP_STATE } from "./utils/const.js";

export default class App {
  constructor({ el, pages, state, elements }) {
    this.el = el || document.body;
    this.pages = pages;
    this.elements = elements;
    this.events = new EventEmitter();
    this.store = new Store({ state });

    this.startElements();
    this.startPage();
  }

  startElements() {
    this.currentElements = {};
    Object.entries(this.elements).forEach(async ([name, constructor]) => {
      const el = document.querySelector(constructor.parent);
      if (el) {
        this.currentElements[name] = new constructor({
          app: this,
          el,
        });

        await this.currentElements[name].started();
        this.currentElements[name]._renderElement();
        await this.currentElements[name].mounted();
      }
    });
  }

  async startPage() {
    const pageName = this.el.dataset.page;
    if (this.pages[pageName]) {
      const Page = this.pages[pageName];
      this.currentPage = new Page({ app: this });
      await this.currentPage.fetch();
      await this.currentPage.started();
      this.currentPage._renderElement();
      await this.currentPage.mounted();

      this.updateHead();
    }
  }

  stopPage() {
    this.currentPage?.destroy?.();
  }

  updateHead() {
    const head = this.currentPage?.head;
    if (head) {
      document.title = head.title || document.head.title;
    }
  }
}
