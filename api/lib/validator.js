exports.validatePresence = (data) => {
  for (let key in data) {
    if (!data[key] || data[key] == "") return false;
  }

  return true;
};

exports.writable = (keys = [], data) => {
  return keys.reduce((entity, key) => {
    entity[key] = data[key];

    return entity;
  }, {});
};
