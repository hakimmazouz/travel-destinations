const { escapeHTML } = require("./helpers");
const { validatePresence } = require("./validator");

exports.prepareForInsert = (data) => {
  return data;
};

exports.prepareForJson = (data) => {
  return data;
};

exports.validateDestinationUpdate = (data) => {
  const fillable = ["name", "description", "country", "date"];

  const transforms = {
    date: (string) => new Date(string),
  };

  const filtered = Object.entries(data)
    .filter(([key]) => fillable.includes(key))
    .reduce((newData, [key, value]) => {
      newData[key] = transforms[key]
        ? transforms[key](value)
        : escapeHTML(value);
      return newData;
    }, {});

  const { errors } = validatePresence(filtered);

  if (errors) return { errors };

  return { updated: filtered };
};

exports.validateDestinationCreate = this.validateDestinationUpdate;
