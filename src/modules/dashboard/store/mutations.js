export function someMutation(/* state */) { }

export function toggleSideMenu(state) {
  state.isSideMenuOpen = !state.isSideMenuOpen;
}

export function setLoading(state, payload) {
  state.isLoading = payload
}

export function toggleModal(state, { type }) {
  console.log(type);
  switch (type) {
    case 'newClient':
      state.showNewClientModal = !state.showNewClientModal;
      break;
    case 'newRecibo':
      state.showNewReciboModal = !state.showNewReciboModal;
      break;
    case 'newProveedor':
      state.showNewProveedorModal = !state.showNewProveedorModal;
      break;
    case 'newProduct':
      state.showNewProductModal = !state.showNewProductModal;
      break;
  }
}