import Page from "../core/Page.js";
import { deleteDestination, getDestinations } from "../utils/api.js";

export default class DestinationIndex extends Page {
  get head() {
    return {
      title:
        this.destinations && this.destinations.length + " travel destinations ",
    };
  }

  async fetch() {
    const { data: destinations } = await getDestinations();
    this.destinations = destinations;
  }

  async deleteDestination(event) {
    if (window.confirm("Do you really want to delete this destination?")) {
      const id = event.target.closest("[data-id]").dataset.id;
      const { error } = await deleteDestination(id);
      console.log(error);

      if (!error) {
        this.destinations = [];
        this.refresh({ fetch: true });
      }
    }
  }

  render() {
    console.log("Rendering", this.destinations);
    return /*html*/ `
    <div class="container">
        <ul>
            ${this.renderList(
              this.destinations,
              (d) => /*html*/ `<li class="destination-item" data-id="${d._id}">
                        <p class="destination-item-meta">
                            <span>${d.country}</span>
                        </p>
                        <p class="destination-item-title">${d.name} + ${d._id}</p>
                        <p class="destination-item-body">${d.description}</p>
                        <div class="destination-item-actions">
                            <button class="button button-danger" onclick="$this.deleteDestination">Delete</button>
                            <a href="/edit-destination.html?id=${d._id}" class="button button-primary">Edit</a>
                        </div>
                </li>`
            )}
        </ul>
    </div>
    `;
  }
}
