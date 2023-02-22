// export const myGetter = ( state ) => {
    // return state.something
// }

export const getProducts = ( state ) => {
    return state.productsFiltered
}
export const getProduct = ( state ) => {
    return state.product
}

export const getProductPages = ( state ) => {
    return Math.ceil(state.pagination.count / 10)
}

export const getProductsPage = ( state ) => {
    return state.pagination.count / 10
}

export const getTotalProducts = (state) => {
    return state.pagination.count
}