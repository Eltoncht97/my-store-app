<template>
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    {{text}}
  </h5>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
}

</script>