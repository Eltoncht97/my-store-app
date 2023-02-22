export function someMutation(/* state */) {}

export function toggleSideMenu(state) {
  state.isSideMenuOpen = !state.isSideMenuOpen;
}

export function setLoading(state, payload) { 
  state.isLoading = payload
}