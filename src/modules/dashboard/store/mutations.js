export function someMutation(/* state */) {}

export function toggleSideMenu(state) {
  state.isSideMenuOpen = !state.isSideMenuOpen;
}

export function setLoading(state, payload) {
  state.isLoading = payload;
}

export function setLoadingButton(state, payload) {
  state.isLoadingButton = payload;
}

export function toggleModal(state, { type }) {
  console.log(type);
  switch (type) {
    case "newClient":
      state.showNewClientModal = !state.showNewClientModal;
      break;
    case "newRecibo":
      state.showNewReciboModal = !state.showNewReciboModal;
      break;
    case "newProveedor":
      state.showNewProveedorModal = !state.showNewProveedorModal;
      break;
    case "newProduct":
      state.showNewProductModal = !state.showNewProductModal;
      break;
  }
}

export function updateOffset(state, { isFilter = false } = {}) {
  state.pagination.offset = !isFilter
    ? (state.pagination.currentPage - 1) * state.pagination.limit
    : 0;

  if (isFilter) {
    state.pagination.currentPage = 1;
  }
}

export function updateTotalItems(state, totalItems) {
  state.pagination.totalItems = totalItems;
  state.pagination.totalPages = Math.ceil(totalItems / state.pagination.limit);
}

export function resetPagination(state) {
  state.pagination = {
    limit: "5",
    currentPage: 1,
    offset: 0,
    totalItems: 0,
    totalPages: 1,
    filterTxt: "",
  };
}
