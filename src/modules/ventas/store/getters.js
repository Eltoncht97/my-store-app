// export const myGetter = ( state ) => {
    // return state.something
// }

export const getVentas = ( state ) => {
    return state.ventasFiltered
}

export const getVenta = ( state ) => {
    return state.venta
}

export const getClients = ( state ) => {
    return state.clients.map(client => ({...client, label: `${client.lastname} ${client.name}`}))
}

export const getProducts = ( state ) => {
    return state.products.map(product => ({...product, label: `${product.code} - ${product.name} - ${product.category.name} - $.${product.price}`}))
}