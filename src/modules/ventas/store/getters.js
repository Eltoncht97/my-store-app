// export const myGetter = ( state ) => {
    // return state.something
// }

export const getVentas = ( state ) => {
    return state.ventas
}

export const getVenta = ( state ) => {
    return state.venta
}

export const getProduct = ( state ) => {
    return state.product
}

export const getClients = ( state ) => {
    return state.clients.map(client => ({...client, label: `${client.lastname} ${client.name}`}))
}

export const getProducts = ( state ) => {
    return state.products.map(product => ({...product, label: `${product.code} - ${product.name} - ${product.category.name} - $.${product.price}`}))
}

export const getInformeData = (state) => {
    return state.informeVentas;
  };