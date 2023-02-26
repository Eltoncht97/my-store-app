import { customAlert } from "@/utils/customSweetAlerts";
// import { isValidForm } from "@/utils/isValidForm";
import moment from "moment";
import { ref } from "vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import { isValidForm } from "@/utils/isValidForm";

const useOrdenesDeCompra = () => {
  const store = useStore();
  const router = useRouter();

  const ordenesDeCompra = computed(
    () => store.getters["ordenesDeCompra/getOrdenesDeCompra"]
  );

  const ingreso = ref({
    proveedor: null,
    products: [],
    factura: "",
    date: moment().format("yyyy-MM-DD"),
    quantityProduct: 1,
    discountProduct: null,
    discountValue: null,
    subtotalProduct: computed(
      () =>
        product.value &&
        product.value.price * ingreso.value.quantityProduct -
          ingreso.value.discountProduct * ingreso.value.quantityProduct
    ),
    discount: 0,
    subtotal: computed(() =>
      ingreso.value.products
        .map((p) => p.total)
        .reduce((prev, curr) => prev + curr, 0)
    ),
    total: computed(() => ingreso.value.subtotal - ingreso.value.discount),
  });

  const isPDiscountPercentage = ref(false);
  const isEdit = ref(false);
  const product = ref(null);

  const products = computed(() => store.getters["ventas/getProducts"]);

  const rules = computed(() => {
    return {
      proveedor: { required },
      date: { required },
      products: { required },
      factura: { required },
      subtotal: { required, minValue: minValue(1) },
      total: { required, minValue: minValue(1) },
    };
  });

  const v$ = useVuelidate(rules, ingreso.value);

  const loadOrdenesDeCompra = async () => {
    store.commit("ui/setLoading", true);
    const { ok, message } = await store.dispatch(
      "ordenesDeCompra/getOrdenesDeCompra"
    );
    store.commit("ui/setLoading", false);
    if (!ok) {
      customAlert("Error", message, "warning");
    }
  };

  const loadOrdenDeCompra = async (id) => {
    store.commit("ui/setLoading", true);
    const { ok, message } = await store.dispatch(
      "ordenesDeCompra/getOrdenDeCompra",
      id
    );
    store.commit("ui/setLoading", false);
    if (!ok) {
      customAlert("Error", message, "warning");
    }
  };

  const resetProduct = () => {
    product.value = null;
    ingreso.value.quantityProduct = 1;
    ingreso.value.discountProduct = 0;
  };

  const addProduct = () => {
    if (ingreso.value.products.find((p) => p.id === product.value.id)) {
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
      price: Math.ceil(product.value.costPrice),
      quantity: ingreso.value.quantityProduct,
    };

    productToAdd.subtotal = productToAdd.price * productToAdd.quantity;

    if (isPDiscountPercentage.value) {
      productToAdd.discount =
        productToAdd.quantity *
        Math.round((productToAdd.price * ingreso.value.discountProduct) / 100);
    } else {
      productToAdd.discount = Math.round(
        ingreso.value.discountProduct * productToAdd.quantity
      );
    }

    productToAdd.total = productToAdd.subtotal - productToAdd.discount;

    ingreso.value.products.push(productToAdd);

    resetProduct();
  };

  const editProduct = (id) => {
    isEdit.value = true;
    const productTable = ingreso.value.products.find((p) => p.id === id);
    product.value = products.value.find((p) => p.id === id);
    ingreso.value.quantityProduct = productTable.quantity;
    ingreso.value.discountProduct =
      productTable.discount / productTable.quantity;
  };

  const updateProduct = () => {
    const idx = ingreso.value.products.findIndex(
      (p) => p.id === product.value.id
    );

    const productToAdd = {
      id: product.value.id,
      name: product.value.name,
      price: Math.ceil(product.value.costPrice),
      quantity: ingreso.value.quantityProduct,
    };

    productToAdd.subtotal = productToAdd.price * productToAdd.quantity;

    if (isPDiscountPercentage.value) {
      productToAdd.discount =
        productToAdd.quantity *
        Math.round((productToAdd.price * ingreso.value.discountProduct) / 100);
    } else {
      productToAdd.discount = Math.round(
        ingreso.value.discountProduct * productToAdd.quantity
      );
    }

    productToAdd.total = productToAdd.subtotal - productToAdd.discount;
    ingreso.value.products[idx] = productToAdd;

    resetProduct();
    isEdit.value = false;
  };

  const deleteProduct = (id) => {
    ingreso.value.products = ingreso.value.products.filter((p) => p.id !== id);
  };

  const createIngreso = async () => {
    if (!isValidForm(rules.value, v$.value)) return;

    const resp = await store.dispatch(
      "ordenesDeCompra/createIngreso",
      ingreso.value
    );

    if (resp.ok) {
      customAlert("Orden de compra creada exitosamente!", "", "success");
      router.push({ name: "ordenes-de-compra-list" });
    }

    resetFormulario();
  };

  const resetFormulario = () => {
    ingreso.value = {
      proveedor: "",
      products: [],
      date: "",
      quantityProduct: 1,
      discountProduct: 0,
      discount: 0,
    };
    product.value = null;
  };

  return {
    ingreso,
    ordenesDeCompra,
    product,
    isPDiscountPercentage,
    v$,
    ordenDeCompra: computed(() => store.getters["ordenesDeCompra/getOrdenDeCompra"]),
    editProduct,
    updateProduct,
    deleteProduct,
    resetFormulario,
    addProduct,
    isEdit,
    loadOrdenesDeCompra,
    togglePDiscountType: () =>
      (isPDiscountPercentage.value = !isPDiscountPercentage.value),
    createIngreso,
    loadOrdenDeCompra,
  };
};

export default useOrdenesDeCompra;
