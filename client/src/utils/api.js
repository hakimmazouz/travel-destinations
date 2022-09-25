export const getDestinations = async () => {
  try {
    const response = await fetch("/api/v1/destinations").then();
    const json = await response.json();

    return json;
  } catch (e) {
    return {
      error: "An error occured",
    };
  }
};

export const getDestination = async (id) => {
  if (!id) return;

  try {
    const response = await fetch("/api/v1/destinations/" + id).then();
    const json = await response.json();

    return json;
  } catch (e) {
    return {
      error: "An error occured",
    };
  }
};

export const updateDestination = async (id, data = {}) => {
  if (!id) return;

  try {
    const response = await fetch("/api/v1/destinations/" + id, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    return json;
  } catch (e) {
    return {
      error: "An error occured",
    };
  }
};

export const deleteDestination = async (id) => {
  if (!id) return;

  try {
    const response = await fetch("/api/v1/destinations/" + id, {
      method: "DELETE",
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
    return {
      error: "An error occured",
    };
  }
};

export const createDestination = async (data = {}) => {
  try {
    const response = await fetch("/api/v1/destinations/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    return json;
  } catch (e) {
    return {
      error: "An error occured",
    };
  }
};
