// export const myAction = ( state, payload ) => {}
export const setProducts = ( state, products ) => {
  state.products = products
  state.productsFiltered = products
}

export const filterProducts = ( state, filterTxt ) => {
  state.productsFiltered = state.products.filter( product => product.code == filterTxt || product.name.toLowerCase().includes( filterTxt ) || product.category.toLowerCase().includes( filterTxt ) )
}

export const setProduct = ( state, product ) => {
  state.product = product
}

export const addProduct = ( state, product ) => {
  state.products.push(product)
  state.productsFiltered.push(product)
}

export const removeProduct = ( state, id ) => {
  state.products = state.products.filter( product => product.id !== id)
  state.productsFiltered = state.products
}

export const resetProduct = ( state ) => {
  state.product = {
    name: '',
    category: '',
    code: '',
    stock: 0,
    stockMin: 0,
    costoSinIva: 0,
    descuentoPorcentaje: 0,
    descuento: 0,
    precioCosto: 0,
    utilidadesPorcentaje: 0,
    utilidades: 0,
    precioVenta: 0,
  }
}

export const resetModule = ( state ) => {
  state.products = []
  state.productsFiltered = []
  state.product = null
}

export const setCountProducts = (state, payload) => {
  state.pagination.count = payload
}

export const updateOffset = (state, page) => {
  state.pagination.offset = (page -1 ) * 10
}