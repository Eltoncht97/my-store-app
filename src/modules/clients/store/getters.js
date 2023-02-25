// export const myGetter = ( state ) => {
// return state.something
// }

export const getClients = (state) => {
  return state.clients;
};
export const getClient = (state) => {
  return state.client;
};

export const getClientsPages = (state) => {
  return Math.ceil(state.pagination.totalClients / state.pagination.limit);
};

export const getTotalClients = (state) => {
  return state.pagination.totalClients;
};

export const getPagination = (state) => {
  return state.pagination
}
