import Page from "../core/Page.js";
import { createDestination, loginUser, registerUser } from "../utils/api.js";
import { formValues } from "../utils/helpers.js";

export default class AuthRegister extends Page {
  async onSubmit(event) {
    event.preventDefault();
    const formData = formValues(new FormData(event.target));
    const { data, errors } = await registerUser(formData);
    if (data) {
      // window.location.pathname = "/destination/" + data._id;
      window.location.pathname = "/login.html";
    } else {
      if (errors) this.errors = errors;
    }
  }

  render() {
    return /*html*/ `
      <div class="container">
        <h1>Create a user</h1>

        <form class="form" onsubmit="$this.onSubmit">
          <div class="field-group">
            <label for="email">Email</label>
            <input required type="email" name="email" />
          </div>
          <div class="field-group">
            <label for="password">Password</label>
            <input required type="password" name="password" />
          </div>
          <div class="field-group">
            <label for="password_confirmation">Repeat password</label>
            <input required type="password" name="password_confirmation" />
          </div>
          ${RenderErrors(this.errors)}
          <button type="submit" class="button button-primary">
            Sign up
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
