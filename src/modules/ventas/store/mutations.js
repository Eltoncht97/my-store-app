// export const myAction = ( state, payload ) => {}
export const setVentas = ( state, payload ) => {
  state.ventas = payload
  state.ventasFiltered = payload
}

export const filterVentas = ( state, filterTxt ) => {
  state.ventasFiltered = state.ventas.filter( venta => venta.client.name.toLowerCase().includes( filterTxt ) || venta.client.lastname.toLowerCase().includes( filterTxt ) )
}

export const setVenta = ( state, payload ) => {
  state.venta = payload
}

export const addVenta = ( state, payload ) => {
  state.ventas.push(payload)
  state.ventasFiltered.push(payload)
}

export const removeVenta = ( state, id ) => {
  state.ventas = state.ventas.filter( venta => venta.id !== id)
  state.ventasFiltered = state.ventas
}

export const setClients = ( state, payload ) => {
  state.clients = payload
}

export const setProducts = ( state, payload ) => {
  state.products = payload
}

export const resetVenta = ( state ) => {
  state.venta = {
    client: '',
    date: '',
    products: [],
    subtotal: 0,
    total: 0
  }
}

export const resetModule = ( state ) => {
  state.venta = null
  state.clients = []
  state.products = []
}