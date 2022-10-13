import App from "./src/App.js";
import AuthRegister from "./src/pages/AuthRegister.js";
import AuthLogin from "./src/pages/AuthLogin.js";
import DestinationIndex from "./src/pages/DestinationIndex.js";
import DestinationShow from "./src/pages/DestinationShow.js";
import DestinationCreate from "./src/pages/DestinationCreate.js";
import DestinationEdit from "./src/pages/DestinationEdit.js";
import Header from "./src/elements/Header.js";
import { APP_STATE } from "./src/utils/const.js";

window.addEventListener("load", () => {
  window.$app = new App({
    el: document.getElementById("app"),
    state: APP_STATE,
    pages: {
      AuthRegister,
      AuthLogin,
      DestinationIndex,
      DestinationShow,
      DestinationCreate,
      DestinationEdit,
    },
    elements: {
      Header,
    },
  });
});
