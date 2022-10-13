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
      headers: {
        Authorization: "bearer " + window.$app.store.state.currentUserToken,
      },
    });
    if (response.status == 401) {
      return {
        error: "Not authorized. Log in to delete this entry.",
      };
    }
    if (response.status == 200) {
      const json = await response.json();
      return json;
    } else {
    }
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

export const registerUser = async (data = {}) => {
  try {
    const response = await fetch("/api/v1/auth/register", {
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
export const loginUser = async (data = {}) => {
  try {
    const response = await fetch("/api/v1/auth/login", {
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
