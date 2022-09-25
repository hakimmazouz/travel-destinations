import Page from "../core/Page.js";

export default class DestinationShow extends Page {
  get head() {
    return {
      title: "Edit destination " + this.destination.name,
    };
  }

  async fetch() {
    const { data } = (await getDestination(this.getParam("id"))) || {};

    if (!data) window.location = "/";

    this.destination = data;
  }
}
