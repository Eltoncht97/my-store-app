// export const myAction = ( state, payload ) => {}
export const setCategories = ( state, categories ) => {
  state.categories = categories
}

export const setCategory = ( state, category ) => {
  state.category = category
}

export const resetCategory = ( state ) => {
  state.category = {
    name: '',
  }
}

export const resetModule = ( state ) => {
  state.categories = []
  state.category = null
}