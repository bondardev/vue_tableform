<template>
  <div class="bg-white p-6 rounded-lg shadow mb-8">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">
      Добавить нового пользователя
    </h2>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <input
        v-model="name"
        type="text"
        placeholder="Имя"
        class="p-2 border rounded-lg"
        required
      />
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="p-2 border rounded-lg"
        required
      />
      <input
        v-model="phone"
        type="tel"
        placeholder="Телефон"
        class="p-2 border rounded-lg"
        required
      />
      <select v-model="position_id" class="p-2 border rounded-lg" required>
        <option disabled value="">Выберите должность</option>
        <option
          v-for="position in positions"
          :key="position.id"
          :value="position.id"
        >
          {{ position.name }}
        </option>
      </select>
      <input
        type="file"
        @change="handleFileUpload"
        class="p-2 border rounded-lg"
      />

      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
      >
        Добавить
      </button>
    </form>
    <p
      v-if="message"
      :class="{ 'text-green-600': success, 'text-red-600': !success }"
      class="mt-4"
    >
      {{ message }}
    </p>
  </div>
</template>

<script>
import api from "../api";

export default {
  name: "AddUserForm",
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      position_id: "",
      photo: null,
      positions: [],
      message: "",
      success: false,
    };
  },
  methods: {
    async fetchPositions() {
      try {
        const response = await api.get("/positions");
        this.positions = response.data.positions;
      } catch (error) {
        console.error("Ошибка при загрузке должностей:", error);
        alert("Не удалось загрузить должности.");
      }
    },
    handleFileUpload(event) {
      this.photo = event.target.files[0];
    },
    async getToken() {
      try {
        const response = await api.get("/token/");
        return response.data.token;
      } catch (error) {
        console.error("Ошибка при получении токена:", error);
        throw new Error("Не удалось получить токен");
      }
    },
    async handleSubmit() {
      try {
        // Получаем токен
        const token = await this.getToken();

        // Создаем объект FormData
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("email", this.email);
        formData.append("phone", this.phone);
        formData.append("position_id", this.position_id);
        if (this.photo) {
          formData.append("photo", this.photo);
        }

        // Отправляем POST-запрос с FormData
        const response = await api.post("/users", formData, {
          headers: {
            Token: token, // Токен в заголовке
          },
        });

        // Проверяем успешный ответ
        if (response.data.success) {
          this.success = true;
          this.message = `Пользователь успешно создан!`;
          this.resetForm();
        } else {
          // Обрабатываем ошибку, если success === false
          this.success = false;
          this.message =
            "Ошибка валидации: " +
            this.formatValidationErrors(response.data.fails);
        }
      } catch (error) {
        console.error("Ошибка при создании пользователя:", error);
        this.success = false;

        // Если ошибка из-за валидации (400 или 422), обрабатываем поле fails
        if (error.response?.data?.fails) {
          this.message =
            "Ошибка валидации: " +
            this.formatValidationErrors(error.response.data.fails);
        } else {
          this.message =
            error.response?.data?.message || "Не удалось создать пользователя.";
        }
      }
    },
    formatValidationErrors(errors) {
      // Преобразуем объект ошибок в строку
      return Object.entries(errors)
        .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
        .join("; ");
    },
    resetForm() {
      this.name = "";
      this.email = "";
      this.phone = "";
      this.position_id = "";
      this.photo = null;
    },
  },
  mounted() {
    this.fetchPositions();
  },
};
</script>
