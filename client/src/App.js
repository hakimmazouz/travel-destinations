import EventEmitter from "./core/EventEmitter.js";

export default class App {
  constructor({ el, pages }) {
    this.el = el || document.body;
    this.pages = pages;
    this.events = new EventEmitter();

    this.startPage();
  }

  async startPage() {
    const pageName = this.el.dataset.page;
    if (this.pages[pageName]) {
      const Page = this.pages[pageName];
      this.currentPage = new Page({ app: this });
      await this.currentPage.fetch();
      await this.currentPage.started();
      this.currentPage._renderPage();
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
