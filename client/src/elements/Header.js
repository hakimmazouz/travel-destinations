import Element from "../core/Element.js";

export default class Header extends Element {
  static parent = "#top-elements";

  onLogOut() {
    this.store.clear();

    window.location.pathname = "/";
  }

  render() {
    const { currentUser } = this.store.state;
    return /*html*/ `
        <header class="page-header">
        ${
          currentUser
            ? /*html*/ `<button class="button button-danger" onclick="$this.onLogOut">Log ${currentUser.email} out</button>`
            : ""
        }
        ${!currentUser ? /*html*/ `<a href="/login.html">Log in</a>` : ""}
        </header>
        `;
  }
}
