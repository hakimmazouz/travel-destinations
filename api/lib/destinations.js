const { validatePresence } = require("./validator");

exports.prepareForInsert = (data) => {
  return data;
};

exports.prepareForJson = (data) => {
  return data;
};

exports.validateDestinationUpdate = (data) => {
  const fillable = ["name", "description"];
  const filtered = Object.entries(data)
    .filter(([key]) => fillable.includes(key))
    .reduce((newData, [key, value]) => {
      newData[key] = value;
      return newData;
    }, {});
  const { errors } = validatePresence(filtered);
  if (errors) return { errors };

  return { updated: filtered };
};
