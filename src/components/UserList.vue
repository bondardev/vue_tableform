<template>
  <div class="p-6 bg-gray-50 ">
    <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Список пользователей</h1>
    <div class="overflow-x-auto">
      <table class="table-auto w-full border-collapse border border-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="border border-gray-300 px-4 py-2">Фото</th>
            <th class="border border-gray-300 px-4 py-2">Имя</th>
            <th class="border border-gray-300 px-4 py-2">Email</th>
            <th class="border border-gray-300 px-4 py-2">Телефон</th>
            <th class="border border-gray-300 px-4 py-2">Должность</th>
            <th class="border border-gray-300 px-4 py-2">Создан</th>
            <th class="border border-gray-300 px-4 py-2">Обновлен</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-100">
            <td class="border border-gray-300 px-4 py-2 text-center">
              <img
                :src="user.photo"
                alt="Фото пользователя"
                class="w-16 h-16 object-cover rounded-full mx-auto"
              />
            </td>
            <td class="border border-gray-300 px-4 py-2">{{ user.name }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ user.phone }}</td>
            <td class="border border-gray-300 px-4 py-2">
              {{ getPositionName(user.position_id) }}
            </td>
            <td class="border border-gray-300 px-4 py-2">{{ formatDate(user.created_at) }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ formatDate(user.updated_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-6 flex justify-center">
      <button
        @click="loadMore"
        class="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition"
        v-if="hasMore"
      >
        Загрузить еще
      </button>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'UserList',
  data() {
    return {
      users: [],
      positions: {},
      page: 1, 
      perPage: 6,
      hasMore: true,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await api.get('/users', {
          params: {
            page: this.page,
            perPage: this.perPage,
          },
        });

        const fetchedUsers = response.data.users;

        if (Array.isArray(fetchedUsers)) {
          this.users = [...this.users, ...fetchedUsers];
          this.hasMore = response.data.page < response.data.total_pages;
        } else {
          throw new Error('API не вернул массив пользователей');
        }
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
        alert('Не удалось загрузить пользователей');
      }
    },
    async fetchPositions() {
      try {
        const response = await api.get('/positions');
        const positions = response.data.positions;

        this.positions = positions.reduce((acc, position) => {
          acc[position.id] = position.name;
          return acc;
        }, {});
      } catch (error) {
        console.error('Ошибка при загрузке позиций:', error);
        alert('Не удалось загрузить позиции');
      }
    },
    loadMore() {
      this.page += 1; 
      this.fetchUsers(); 
    },
    getPositionName(positionId) {
      return this.positions[positionId] || 'Неизвестно';
    },
    formatDate(dateString) {

      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('ru-RU', options);
    },
  },
  async mounted() {
    await this.fetchPositions(); 
    await this.fetchUsers();
  },
};
</script>

