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
  return Math.ceil(state.pagination.totalClients / 10);
};

export const getTotalClients = (state) => {
  return state.pagination.totalClients;
};
