import { computed } from "vue";
import { useStore } from "vuex";

const useUI = () => {
  const store = useStore();

  return {
    sideMenuOpen: computed(() => store.getters["ui/isSideMenuOpen"]),
    toggleSideMenu: () => {
      store.commit("ui/toggleSideMenu");
    },
    isLoading: computed(() => store.getters["ui/getIsLoading"]),
    isLoadingButton: computed(() => store.getters["ui/getIsLoadingButton"]),
    showNewClientModal: computed(
      () => store.getters["ui/getShowNewClientModal"]
    ),
    showNewReciboModal: computed(
      () => store.getters["ui/getShowNewReciboModal"]
    ),
    showNewProveedorModal: computed(
      () => store.getters["ui/getShowNewProveedorModal"]
    ),
    showNewProductModal: computed(
      () => store.getters["ui/getShowNewProductModal"]
    ),
    pagination: computed(() => store.getters["ui/getPagination"]),
    toggleModal: (type) => store.commit("ui/toggleModal", { type }),
    resetPagination: () => store.commit("ui/resetPagination")
  };
};

export default useUI;
