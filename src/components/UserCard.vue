<template>
  <div class="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
    <h2 class="text-lg font-semibold text-gray-800">{{ name }}</h2>
    <p class="text-sm text-gray-600">{{ email }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
};
</script>
