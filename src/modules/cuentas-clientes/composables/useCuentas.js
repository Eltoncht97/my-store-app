import { computed } from "vue"
import { useStore } from "vuex"

const useCuentas = () => {
  const store = useStore()

  const loadCuenta = async ( id ) => {
    await store.dispatch('cuentasClientes/getCuenta', id)
  }

  return {
    loadCuenta,
    cuenta: computed(() => store.getters['cuentasClientes/getCuenta'])
  }
}

export default useCuentas;