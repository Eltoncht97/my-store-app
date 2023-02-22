<template>
  <h1>Sistema administrativo Pukis</h1>
  <v-select 
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 style-chooser"
    :options="['Canada', 'United States']"></v-select>


  <Input label="Nombre" v-model="nombre" placeholder="Nombre..." />
  {{nombre}}
</template>

<script>
import Input from '@/components/Input.vue';
import { ref } from 'vue';
export default {
    components: { Input },
    setup() {
      const nombre = ref("")

      return {
        nombre
      }
    }
}
</script>
<style scoped>
/* .style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: #dfe5fb;
  border: none;
  color: #394066;
  text-transform: lowercase;
  font-variant: small-caps;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
} */
</style>