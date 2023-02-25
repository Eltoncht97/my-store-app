import { computed } from "vue"
import { useStore } from "vuex"

const useCuentasCorrientes = () => {
  const store = useStore()

  const loadCuenta = async ( id ) => {
    await store.dispatch('cuentasClientes/getCuenta', id)
  }

  return {
    loadCuenta,
    cuenta: computed(() => store.getters['cuentasClientes/getCuenta']),
    totalMovimientos: computed(() => store.getters['cuentasClientes/getTotalMovimientos'])
  }
}

export default useCuentasCorrientes;