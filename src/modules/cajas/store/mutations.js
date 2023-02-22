// export const myAction = ( state, payload ) => {}
export const setCajas = ( state, payload ) => {
  state.cajas = payload
  state.cajasFiltered = payload
}

export const removeCaja = ( state, payload ) => {
  state.cajas = state.cajas.filter( caja => caja.id !== payload)
  state.cajasFiltered = state.cajas
}

export const setCaja = ( state, payload ) => {
  state.caja = payload
}
export const setInformeCaja = ( state, payload ) => {
  state.informeCaja.movimientos = payload.movimientos
  state.informeCaja.ventas = payload.ventas
}

export const filterCajas = ( state, filterTxt ) => {
  state.cajasFiltered = state.cajas.filter( caja => caja.user.name.toLowerCase().includes( filterTxt ))
}