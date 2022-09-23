import App from "./src/App.js";
import DestinationIndex from "./src/pages/DestinationIndex.js";
import DestinationShow from "./src/pages/DestinationShow.js";
import DestinationCreate from "./src/pages/DestinationCreate.js";
import DestinationEdit from "./src/pages/DestinationEdit.js";

window.addEventListener("load", () => {
  window.$app = new App({
    el: document.getElementById("app"),
    pages: {
      DestinationIndex,
      DestinationShow,
      DestinationCreate,
      DestinationEdit,
    },
  });
});
