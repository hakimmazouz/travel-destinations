const bcrypt = require("bcrypt");
const entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;",
};

/**
 *
 * @param {*} string
 * @returns string
 * @source https://github.com/janl/mustache.js/blob/master/mustache.js#L55
 */
exports.escapeHTML = function escapeHTML(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
    return entityMap[s];
  });
};

exports.hashPassword = (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};
