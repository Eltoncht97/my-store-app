import { computed } from "vue";
import { useStore } from "vuex";

const useImpresiones = () => {
  const store = useStore();
  const loadDocument = async ({ type, id } = {}) => {
    console.log({ type, id });
    await store.dispatch("impresiones/getDocument", { type, id });
  };

  return {
    document: computed(() => store.getters["impresiones/getDocument"]),
    loadDocument,
  };
};

export default useImpresiones;
