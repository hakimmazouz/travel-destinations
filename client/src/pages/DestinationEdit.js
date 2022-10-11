import Page from "../core/Page.js";
import { getDestination, updateDestination } from "../utils/api.js";
import { formatDateForInput, formValues } from "../utils/helpers.js";

export default class DestinationEdit extends Page {
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

  async onSubmit(event) {
    event.preventDefault();
    const formData = formValues(new FormData(event.target));
    const { data, errors } = await updateDestination(
      this.getParam("id"),
      formData
    );

    if (errors) {
      this.errors = errors;
    } else {
      window.location.pathname = "/";
    }

    this.refresh();
  }

  render() {
    return /*html*/ `
      <div class="container">
        <h1>Edit destination ${this.destination.name}</h1>

        <form class="form" onsubmit="$this.onSubmit">
        <div class="field-group">
          <label for="name">Name</label>
          <input required value="${
            this.destination.name
          }" type="text" name="name" />
        </div>
        <div class="field-group">
          <label for="country">Country</label>
          <input required value="${
            this.destination.country
          }" type="text" name="country" />
        </div>
          <div class="field-group">
            <label for="date">Date</label>
            <input required value="${formatDateForInput(
              this.destination.date
            )}" type="date" name="date" />
          </div>
          <div class="field-group">
            <label for="description">Description</label>
            <textarea required name="description" rows="18">${
              this.destination.description
            }</textarea>
          </div>
          ${RenderErrors(this.errors)}
          <button type="submit" class="button button-primary">
            Update destination
          </button>
        </form>
      </div>
    `;
  }
}

const RenderErrors = (errors = {}) => {
  const errorList = Object.entries(errors);
  if (!errorList.length) return "";
  return /*html*/ `
    <div class="error-display">
      <ul>
        ${errorList.map(
          ([name, error]) =>
            /*html*/ `<li><span>${name}</span> — ${error.message}</li>`
        )}
      </ul>
    </div>
  `;
};
