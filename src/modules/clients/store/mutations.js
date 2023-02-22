// export const myAction = ( state, payload ) => {}
export const setClients = (state, clients) => {
  state.clients = clients.map((client) => ({
    ...client,
    label: `${client.lastname} ${client.name}`,
  }));
};

export const setClient = (state, client) => {
  state.client = client;
};

export const addClient = (state, client) => {
  state.clients.push({ ...client, label: `${client.lastname} ${client.name}` });
};

export const removeClient = (state, id) => {
  state.clients = state.clients.filter((client) => client.id !== id);
};

export const resetClient = (state) => {
  state.client = {
    name: "",
    lastname: "",
    phone: "",
    address: "",
  };
};

export const resetModule = (state) => {
  state.clients = [];
  state.client = null;
};

export const setCountClients = (state, payload) => {
  state.pagination.totalClients = payload;
};

export const updateOffset = (state, page) => {
  state.pagination.offset = (page - 1) * 10;
};
