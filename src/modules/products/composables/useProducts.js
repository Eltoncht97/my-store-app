import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { minValue, required } from "@vuelidate/validators";
import Swal from "sweetalert2";
import { isValidForm } from "@/utils/isValidForm";

const useProducts = () => {
  const store = useStore();
  const router = useRouter();

  const filter = ref("");
  const categoryFilter = ref("");
  const isLoading = ref(false);

  const getIVAValue = (ivaType) => {
    const ivaValue = Number(ivaType.split(" ")[1]) | 0;
    switch (ivaValue) {
      case 0:
        return 0;
      case 10:
        return 10.5;
      case 21:
        return 21;
      case 27:
        return 27.5;

      default:
        return 0;
    }
  };

  const product = ref({
    name: "",
    categoryId: "",
    code: "",
    stock: 0,
    stockMin: 0,
    costWithoutIva: 0,
    discountPercentage: 0,
    discount: 0,
    ivaType: "",
    iva: computed(() => {
      return (
        (product.value.costWithoutIva * getIVAValue(product.value.ivaType)) /
        100
      );
    }),
    costPrice: computed(
      () =>
        product.value.costWithoutIva -
        product.value.discount +
        product.value.iva
    ),
    utilitiesPercentage: 0,
    utilities: 0,
    price: computed(() => product.value.costPrice + product.value.utilities),
  });

  const rules = computed(() => {
    return {
      name: { required },
      categoryId: { required },
      code: { required },
      stock: { required, minValue: minValue(0) },
      stockMin: { required, minValue: minValue(0) },
      costWithoutIva: { required, minValue: minValue(0) },
      discountPercentage: { required, minValue: minValue(0) },
      discount: { required, minValue: minValue(0) },
      ivaType: { required },
      iva: { required, minValue: minValue(0) },
      costPrice: { required, minValue: minValue(0) },
      utilitiesPercentage: { required, minValue: minValue(0) },
      utilities: { required, minValue: minValue(0) },
      price: { required, minValue: minValue(1) },
    };
  });

  const v$ = useVuelidate(rules, product);

  const loadProducts = async (page=1) => {
    await store.dispatch("products/loadProducts", {page});
  };

  const getProduct = async (id) => {
    const res = await store.dispatch("products/getProduct", id);
    product.value = res.product;
    product.value.category = res.product.category.id;
    product.value.costPrice = computed(
      () =>
        product.value.costWithoutIva -
        product.value.discount +
        product.value.iva
    );
    product.value.price = computed(
      () => product.value.costPrice + product.value.utilities
    );
  };

  const createProduct = async (data) => {
    if (!isValidForm(rules.value, v$.value)) return;

    const resp = await store.dispatch("products/createProduct", data);
    if (resp.ok) {
      Swal.fire("Completado!", "Producto creado exitosamente!", "success");
      router.push({ name: "products-list" });
    } else {
      Swal.fire("Error!", "Hubo un problema al crear el producto!", "warning");
    }
  };

  const updateProduct = async (product) => {
    const confirmUpdate = await Swal.fire({
      title: "Esta seguro de actualizar el producto?",
      text: "No se podra revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar!",
      cancelButtonText: "Cancelar",
    });

    if (confirmUpdate.isConfirmed) {
      const resp = await store.dispatch("products/updateProduct", product);
      if (resp.ok) {
        Swal.fire("Actualizado!", "El producto a sido actualizado.", "success");
        router.push({ name: "products-list" });
      }
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Esta seguro de eliminar el producto?",
      text: "No se podra revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar!",
      cancelButtonText: "Cancelar",
    });

    if (confirmDelete.isConfirmed) {
      const resp = await store.dispatch("products/deleteProduct", id);
      if (resp.ok) {
        Swal.fire("Eliminado!", "El producto a sido eliminado.", "success");
      }
    }
  };

  // onUnmounted(() => {
  //   store.commit('products/resetModule')
  // })

  onMounted(() => {
    store.commit("products/resetProduct");
  });

  const filterProducts = async (filterTxt) => {
    await store.dispatch("products/loadProducts", {
      filterTxt,
      category: categoryFilter.value,
    });
  };

  return {
    createProduct,
    deleteProduct,
    filter,
    getProduct,
    loadProducts,
    updateProduct,
    isLoading,
    v$,
    categoryFilter,
    product,
    products: computed(() => store.getters["products/getProducts"]),
    filterProducts,
    resetProduct: () => store.commit("products/resetProduct"),
    calcDiscount: () => {
      product.value.discount = Math.round(
        (product.value.costWithoutIva * product.value.discountPercentage) / 100
      );
    },
    calcUtilities: () => {
      product.value.utilities = Math.round(
        (product.value.costPrice * product.value.utilitiesPercentage) / 100
      );
    },
    calcDiscountPercentage: () => {
      product.value.discountPercentage = Math.round(
        (product.value.discount * 100) / product.value.costWithoutIva
      );
    },
    calcIva: () => {
      product.value.iva =
        (product.value.costWithoutIva * getIVAValue(product.value.ivaType)) /
        100;
    },
    calcUtilitiesPercentage: () => {
      product.value.utilitiesPercentage = Math.round(
        (product.value.utilitiesPercentage * 100) / product.value.costPrice
      );
    },
    pageCount: computed(() => store.getters['products/getTotalProducts']),
    pagesCount: computed(() => store.getters['products/getProductPages']),
  };
};

export default useProducts;
