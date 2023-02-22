import { computed } from "vue"
import { useStore } from "vuex"

const useCuentasProveedores = () => {
  const store = useStore()

  const loadCuenta = async ( id ) => {
    await store.dispatch('cuentasProveedores/getCuenta', id)
  }

  return {
    loadCuenta,
    cuenta: computed(() => store.getters['cuentasProveedores/getCuenta'])
  }
}

export default useCuentasProveedores;