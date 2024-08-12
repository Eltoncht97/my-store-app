import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import moment from "moment";

import { customAlert, handleError } from "@/utils/customSweetAlerts";
import { paymentMethods } from "../utils/paymentMethods";
import Swal from "sweetalert2";
import { confirmAlert, errorAlert, successAlert } from "@/utils/customAlerts";
import { isValidForm } from "@/utils/isValidForm";

const useVentas = () => {
  const store = useStore();
  const router = useRouter();

  const isEdit = ref(false);
  const isLoading = ref(false);
  const filter = ref("");
  const product = ref(null);
  const products = computed(() => store.getters["ventas/getProducts"]);
  const pagination = computed(() => store.getters["ui/getPagination"]);

  const venta = ref({
    client: "",
    products: [],
    date: moment().format("yyyy-MM-DD"),
    quantityProduct: 1,
    discountProduct: 0,
    discountValue: 0,
    subtotalProduct: computed(
      () =>
        product.value &&
        product.value.price * venta.value.quantityProduct -
          venta.value.discountProduct * venta.value.quantityProduct
    ),
    discount: 0,
    paymentMethod: "",
    subtotal: computed(() =>
      venta.value.products
        .map((p) => p.total)
        .reduce((prev, curr) => prev + curr, 0)
    ),
    total: computed(() => venta.value.subtotal - venta.value.discount),
  });

  const isPDiscountPercentage = ref(false);
  const isDiscountPercentage = ref(false);

  const rules = computed(() => {
    return {
      client: { required },
      date: { required },
      products: { required },
      paymentMethod: { required },
      subtotal: { required, minValue: minValue(1) },
      total: { required, minValue: minValue(1) },
    };
  });

  const v$ = useVuelidate(rules, venta.value);

  const loadVentas = async ({ isFilter = false, limited = true } = {}) => {
    store.commit("ui/setLoading", true);
    store.commit("ui/updateOffset", { isFilter });
    const { ok, message, totalItems } = await store.dispatch(
      "ventas/getVentas",
      {
        filterTxt: pagination.value.filterTxt,
        limit: limited ? pagination.value.limit : "",
        offset: pagination.value.offset,
      }
    );

    if (!ok) return errorAlert({ text: message });

    store.commit("ui/updateTotalItems", totalItems);
    store.commit("ui/setLoading", false);
  };

  const loadVenta = async (id) => {
    store.commit("ui/setLoading", true);
    const { ok, message } = await store.dispatch("ventas/getVenta", id);

    store.commit("ui/setLoading", false);
    if (!ok) return errorAlert({ text: message });
  };

  const createVenta = async (redirect = true) => {
    if (!isValidForm(rules.value, v$.value)) return;
    store.commit("ui/setLoadingButton", true);

    const { ok, message } = await store.dispatch(
      "ventas/createVenta",
      venta.value
    );

    store.commit("ui/setLoadingButton", false);
    if (!ok) return errorAlert({ text: message });

    successAlert({ text: message });
    loadVentas();

    if (!redirect) {
      return;
    }
    router.push({ name: "ventas-list" });
  };

  const deleteVenta = async (id) => {
    const isConfirmed = await confirmAlert({
      title: "Esta seguro de eliminar la venta?",
    });

    if (!isConfirmed) return;

    const { ok, message } = await store.dispatch("ventas/deleteVenta", id);

    if (!ok) return errorAlert({ text: message });

    successAlert({ text: message });
    loadVentas();
  };

  const getClients = async () => {
    const resp = await store.dispatch("ventas/getClients");
    if (!resp.ok) {
      handleError(resp);
    }
  };

  const getProducts = async () => {
    const resp = await store.dispatch("ventas/getProducts");
    if (!resp.ok) {
      handleError(resp);
    }
  };

  const createClientVenta = async (data) => {
    const resp = await store.dispatch("ventas/createClient", data);
    if (resp.ok) {
      Swal.fire("Completado!", "Cliente creado exitosamente!", "success");
    } else {
      customAlert("Error", "Hubo un problema al crear el cliente", "warning");
    }
  };

  const addProduct = () => {
    if (venta.value.products.find((p) => p.id === product.value.id)) {
      resetProduct();
      return customAlert(
        "Producto existente",
        "Ya se agrego un producto con el mismo id, por favor use la opcion de editar si lo necesita",
        "warning"
      );
    }

    const productToAdd = {
      id: product.value.id,
      name: product.value.name,
      price: Math.ceil(product.value.price),
      quantity: venta.value.quantityProduct,
    };

    productToAdd.subtotal = productToAdd.price * productToAdd.quantity;

    if (isPDiscountPercentage.value) {
      productToAdd.discount =
        productToAdd.quantity *
        Math.round((productToAdd.price * venta.value.discountProduct) / 100);
    } else {
      productToAdd.discount = Math.round(
        venta.value.discountProduct * productToAdd.quantity
      );
    }

    productToAdd.total = productToAdd.subtotal - productToAdd.discount;

    venta.value.products.push(productToAdd);

    resetProduct();
  };

  const editProduct = (id) => {
    isEdit.value = true;
    const productTable = venta.value.products.find((p) => p.id === id);
    product.value = products.value.find((p) => p.id === id);
    venta.value.quantityProduct = productTable.quantity;
    venta.value.discountProduct = productTable.discount / productTable.quantity;
  };

  const updateProduct = () => {
    const idx = venta.value.products.findIndex(
      (p) => p.id === product.value.id
    );

    const productToAdd = {
      id: product.value.id,
      name: product.value.name,
      price: Math.ceil(product.value.price),
      quantity: venta.value.quantityProduct,
    };

    productToAdd.subtotal = productToAdd.price * productToAdd.quantity;

    if (isPDiscountPercentage.value) {
      productToAdd.discount =
        productToAdd.quantity *
        Math.round((productToAdd.price * venta.value.discountProduct) / 100);
    } else {
      productToAdd.discount = Math.round(
        venta.value.discountProduct * productToAdd.quantity
      );
    }

    productToAdd.total = productToAdd.subtotal - productToAdd.discount;
    venta.value.products[idx] = productToAdd;

    resetProduct();
    isEdit.value = false;
  };

  const resetProduct = () => {
    product.value = null;
    venta.value.quantityProduct = 1;
    venta.value.discountProduct = 0;
  };

  const deleteProduct = (id) => {
    venta.value.products = venta.value.products.filter((p) => p.id !== id);
  };

  const loadInformeVentas = async (dates) => {
    const formatedDates = { ...dates };
    formatedDates.startDate = `${moment(formatedDates.startDate).format(
      "MM-DD-YYYY"
    )}T00:00:00Z`;
    formatedDates.endDate = `${moment(formatedDates.endDate).format(
      "MM-DD-YYYY"
    )}T23:59:59Z`;
    await store.dispatch("ventas/getInformeVentas", formatedDates);
  };

  onMounted(() => {
    store.commit("ventas/resetVenta");
  });

  const calcDiscount = () => {
    if (isDiscountPercentage.value) {
      venta.value.discount = Math.round(
        (venta.value.subtotal * venta.value.discountValue) / 100
      );
    } else {
      venta.value.discount = venta.value.discountValue;
    }
  };

  return {
    //Properties
    clients: computed(() => store.getters["ventas/getClients"]),
    filter,
    isDiscountPercentage,
    isEdit,
    isLoading,
    isPDiscountPercentage,
    paymentMethods,
    product,
    products,
    v$,
    venta,
    ventas: computed(() => store.getters["ventas/getVentas"]),
    ventaShow: computed(() => store.getters["ventas/getVenta"]),
    informeData: computed(() => store.getters["ventas/getInformeData"]),

    // Methods
    addProduct,
    calcDiscount,
    createVenta,
    deleteProduct,
    deleteVenta,
    editProduct,
    filterVentas: (filterTxt) => store.commit("ventas/filterVentas", filterTxt),
    getClients,
    getProducts,
    loadVenta,
    loadVentas,
    resetVenta: () => store.commit("ventas/resetVenta"),
    toggleDiscountType: () => {
      isDiscountPercentage.value = !isDiscountPercentage.value;
      calcDiscount();
    },
    togglePDiscountType: () =>
      (isPDiscountPercentage.value = !isPDiscountPercentage.value),
    updateProduct,
    createClientVenta,
    loadInformeVentas,
  };
};

export default useVentas;
