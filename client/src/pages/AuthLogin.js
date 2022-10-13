import Page from "../core/Page.js";
import { loginUser } from "../utils/api.js";
import { formValues } from "../utils/helpers.js";

export default class AuthLogin extends Page {
  async onSubmit(event) {
    event.preventDefault();
    const formData = formValues(new FormData(event.target));
    const { data, error } = await loginUser(formData);
    if (data) {
      // window.location.pathname = "/destination/" + data._id;
      this.store.state.currentUser = data.user;
      this.store.state.currentUserToken = data.token;

      window.location.pathname = "/";
    } else {
      if (error) {
        this.error = error;
        this.refresh();
      }
    }
  }

  render() {
    return /*html*/ `
      <div class="container">
        <h1>Login</h1>
        ${
          this.error
            ? /*html*/ `<div class="error-display">${this.error}</div>`
            : ""
        }
        <form class="form" onsubmit="$this.onSubmit">
          <div class="field-group">
            <label for="email">Email</label>
            <input required type="email" name="email" />
          </div>
          <div class="field-group">
            <label for="password">Password</label>
            <input required type="password" name="password" />
          </div>
          ${RenderErrors(this.errors)}
          <button type="submit" class="button button-primary">
            Log in
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
