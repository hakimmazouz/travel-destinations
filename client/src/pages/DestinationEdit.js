import Page from "../core/Page.js";
import { getDestination, updateDestination } from "../utils/api.js";
import { formValues } from "../utils/helpers.js";

export default class DestinationEdit extends Page {
  get head() {
    return {
      title: "Edit destination " + this.destination.name,
    };
  }

  async fetch() {
    const id = this.getIDFromUrl();
    const { data } = (await getDestination(id)) || {};

    if (!data) window.location.redirect("/");

    this.destination = data;
  }

  getIDFromUrl() {
    const params = new URLSearchParams(window.location.search);

    return params.get("id");
  }

  async onSubmit(event) {
    event.preventDefault();
    const formData = formValues(new FormData(event.target));
    const { data, errors } = await updateDestination(
      this.getIDFromUrl(),
      formData
    );
    if (data) this.destination = data;
    if (errors) this.errors = errors;

    this.refresh();
  }

  render() {
    return /*html*/ `
      <div>
        <form class="form" onsubmit="$this.onSubmit">
          <div class="field-group">
            <label for="name">Name</label>
            <input required value="${
              this.destination.name
            }" type="text" name="name" />
          </div>
          <div class="field-group">
            <label for="description">Description</label>
            <textarea required name="description" rows="18">${
              this.destination.description
            }</textarea>
          </div>
          ${RenderErrors(this.errors)}
          <button type="submit" class="button button-primary">
            Update
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
          ([name, error]) => /*html*/ `<li><span>${name}</span> — ${error}</li>`
        )}
      </ul>
    </div>
  `;
};
