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
