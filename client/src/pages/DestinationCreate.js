import Page from "../core/Page.js";
import { createDestination } from "../utils/api.js";
import { formValues } from "../utils/helpers.js";

export default class DestinationCreate extends Page {
  async onSubmit(event) {
    event.preventDefault();
    const formData = formValues(new FormData(event.target));
    const { data, errors } = await createDestination(formData);
    console.log(data);
    if (data) {
      // window.location.pathname = "/destination/" + data._id;
      window.location.pathname = "/";
    } else {
      if (errors) this.errors = errors;
    }
  }

  render() {
    return /*html*/ `
      <div class="container">
        <h1>Create a destination</h1>

        <form class="form" onsubmit="$this.onSubmit">
          <div class="field-group">
            <label for="name">Name</label>
            <input required type="text" name="name" />
          </div>
          <div class="field-group">
            <label for="country">Country</label>
            <input required type="text" name="country" />
          </div>
          <div class="field-group">
            <label for="date">Date</label>
            <input required type="date" name="date" />
          </div>
          <div class="field-group">
            <label for="description">Description</label>
            <textarea required name="description" rows="18"></textarea>
          </div>
          ${RenderErrors(this.errors)}
          <button type="submit" class="button button-primary">
            Create destination
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
