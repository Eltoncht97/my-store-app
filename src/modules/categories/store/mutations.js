// export const myAction = ( state, payload ) => {}
export const setCategories = ( state, categories ) => {
  state.categories = categories
  state.categoriesFiltered = categories
}

export const filterCategories = ( state, filterTxt ) => {
  state.categoriesFiltered = state.categories.filter( category => category.name.toLowerCase().includes( filterTxt.toLowerCase() ) )
}

export const setCategory = ( state, category ) => {
  state.category = category
}

export const addCategory = ( state, category ) => {
  state.categories.push(category)
  state.categoriesFiltered.push(category)
}

export const removeCategory = ( state, id ) => {
  state.categories = state.categories.filter( category => category.id !== id)
  state.categoriesFiltered = state.categories
}

export const resetCategory = ( state ) => {
  state.category = {
    name: '',
  }
}

export const resetModule = ( state ) => {
  state.categories = []
  state.categoriesFiltered = []
  state.category = null
}