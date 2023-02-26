// export const myAction = ( state, payload ) => {}
export const setUsers = (state, users) => {
  state.users = users;
  state.usersFiltered = users;
};

export const filterUsers = (state, filterTxt) => {
  state.usersFiltered = state.users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(filterTxt) ||
      user.email.toLowerCase().includes(filterTxt)
  );
};

export const setUser = (state, user) => {
  state.user = user;
};

export const addUser = (state, user) => {
  state.users.push(user);
  state.usersFiltered.push(user);
};

export const removeUser = (state, id) => {
  state.users = state.users.filter((user) => user.id !== id);
  state.usersFiltered = state.users;
};

export const resetUser = (state) => {
  state.user = {
    fullName: "",
    email: "",
    password: "",
    roles: [],
  };
};

export const resetModule = (state) => {
  state.users = [];
  state.usersFiltered = [];
  state.user = null;
};
