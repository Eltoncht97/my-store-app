export default function () {
  return {
    isSideMenuOpen: false,

    isLoading: false,
    isLoadingButton: false,

    showNewClientModal: false,
    showNewReciboModal: false,
    showNewProveedorModal: false,
    showNewProductModal: false,
    showNewTraspasoModal: false,

    pagination: {
      limit: 5,
      currentPage: 1,
      offset: 0,
      totalItems: 0,
      totalPages: 1,
      filterTxt: "",
    },
  };
}
