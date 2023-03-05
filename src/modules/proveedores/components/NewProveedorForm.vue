<template>
    <div class="grid gap-6 mb-6 md:grid-cols-1">
        <div>
            <Input label="Nombre" v-model="proveedor.name" placeholder="Nombre..." />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="v$.name.$error">
                <span class="font-medium">El nombre es requerido</span>
            </p>
        </div>
        <div>
            <Input label="CUIT" v-model="proveedor.cuit" placeholder="xx-xxxxxxxx-x" />
            <!-- <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="v$.cuit.$error">
                <span class="font-medium">El CUIT es requerido</span>
            </p> -->
        </div>
        <div>
            <Input label="Telefono" v-model="proveedor.phone" placeholder="Telefono..." />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="v$.phone.$error">
                <span class="font-medium">El teléfono es requerido</span>
            </p>
        </div>
        <div>
            <Input label="Direccion" v-model="proveedor.address" placeholder="Direccion..." />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="v$.address.$error">
                <span class="font-medium">La dirección es requerida</span>
            </p>
        </div>
    </div>
</template>
  
<script>
import Input from "@/components/Input.vue";
import useProveedores from "../composables/useProveedores";

export default {
    components: {
        Input,
    },
    setup() {
        const { proveedor, v$ } = useProveedores();

        return {
            proveedor,
            v$,
        };
    },
};
</script>
  