<template>
  <div class="bg-gray-50 px-6 py-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-4 text-center">
      Управление пользователями
    </h1>
    <!-- Список пользователей -->
    <div class="mb-4"> <!-- Уменьшаем отступ снизу -->
      <UserList />
    </div>
    <!-- Форма добавления пользователя -->
    <div>
      <UserForm />
    </div>
  </div>
</template>

<script>
import UserList from './components/UserList.vue';
import UserForm from './components/AddUserForm.vue';

export default {
  name: 'App',
  components: {
    UserList,
    UserForm,
  },
  methods: {
    reloadUsers() {
      this.$refs.userList.fetchUsers();
    },
  },
};
</script>
