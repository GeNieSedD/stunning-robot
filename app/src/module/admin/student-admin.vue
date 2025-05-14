<template>
  <div class="template">
      <navigation />
  <main>
    <div class="content">
      <div class="heading-button">
        <h1>Студенты</h1>
        <button
          class="healding-3 button button-primary"
          @click="showPopup = true"
        >
          Добавить студентов
        </button>
      </div>
      <div class="table">
        <div class="thead">
          <div class="columns">
            <h2 class="healding-2-bold th">Фамилия</h2>
            <h2 class="healding-2-bold th">Имя</h2>
            <h2 class="healding-2-bold th">Название группы</h2>
            <h2 class="healding-2-bold th">Курс</h2>
          </div>
          <h2 class="healding-2-bold th">настройки</h2>
        </div>
        <div class="tbody">
          <div
            class="tr"
            v-for="student in studentAll"
            :key="student.id"
            :value="student.id"
          >
            <div class="columns">
              <span class="texting-1 td">{{ student.lastname }}</span>
              <span class="texting-1 td">{{ student.name }}</span>
              <span class="texting-1 td">{{ student.partronymic }}</span>
              <span class="texting-1 td">{{ student.title }}</span>
              <span class="texting-1 td">{{ student.course }}</span>
            </div>
            <div class="setting">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                @click="deleteGroup(group.id)"
              >
                <path
                  d="M2.5 4.50004H14.5M13.1667 4.50004V13.8334C13.1667 14.5 12.5 15.1667 11.8333 15.1667H5.16667C4.5 15.1667 3.83333 14.5 3.83333 13.8334V4.50004M5.83333 4.50004V3.16671C5.83333 2.50004 6.5 1.83337 7.16667 1.83337H9.83333C10.5 1.83337 11.1667 2.50004 11.1667 3.16671V4.50004"
                  stroke="#3D3D3D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  d="M14.5 11.1667V5.83335C14.4998 5.59953 14.438 5.36989 14.321 5.16746C14.204 4.96503 14.0358 4.79692 13.8333 4.68002L9.16667 2.01335C8.96397 1.89633 8.73405 1.83472 8.5 1.83472C8.26595 1.83472 8.03603 1.89633 7.83333 2.01335L3.16667 4.68002C2.96418 4.79692 2.79599 4.96503 2.67897 5.16746C2.56196 5.36989 2.50024 5.59953 2.5 5.83335V11.1667C2.50024 11.4005 2.56196 11.6301 2.67897 11.8326C2.79599 12.035 2.96418 12.2031 3.16667 12.32L7.83333 14.9867C8.03603 15.1037 8.26595 15.1653 8.5 15.1653C8.73405 15.1653 8.96397 15.1037 9.16667 14.9867L13.8333 12.32C14.0358 12.2031 14.204 12.035 14.321 11.8326C14.438 11.6301 14.4998 11.4005 14.5 11.1667Z"
                  stroke="#3D3D3D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.5 11.1667C9.97276 11.1667 11.1667 9.97278 11.1667 8.50002C11.1667 7.02726 9.97276 5.83335 8.5 5.83335C7.02724 5.83335 5.83333 7.02726 5.83333 8.50002C5.83333 9.97278 7.02724 11.1667 8.5 11.1667Z"
                  stroke="#3D3D3D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  </div>

</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import http from "@/http-common";

import navigation from "./navigation-admin.vue";

// переменные
const studentAll = ref([]);
const user = ref(null);

// функция для получения всех студентов
const fetchStudentAll = async () => {
  try {
    const res = await http.get("/student/allStudent");
    studentAll.value = res.data.studentAll || res.data || [];
  } catch (error) {
    console.error("Ошибка при получении групп", error);
  }
};
onMounted(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser);
      fetchStudentAll();
    } catch (error) {
      console.error("Ошибка парсинга пользователя из localStorage:", error);
    }
  } else {
    console.warn("Нет сохранённого пользователя в localStorage");
  }
});
</script>
<style scoped>
h1{
    font-family: Montserrat;
  font-size: 24px;
  line-height: normal;
  letter-spacing: 0%;
  font-weight: 600;
}
.template{
  display: flex;
  gap: 24px;
  height: 100vh;
  background-color: var(--card-background_gray_fill);
}

input#file-uplode-button {
  display: inline-flex;
  padding: 12px 16px !important;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  cursor: pointer;
}
.content-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}
.inputs {
  display: flex;
  gap: 12px;
}
.content-window {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 200px;
  overflow: auto;
}
.content-form,
.input-label,
.content-window {
  width: 100%;
}
main {
  padding: 24px;
  padding-left: 0px;
  flex: 1;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background-color: var(--card-background_white_fill);
  border-radius: 8px;
  flex: 1;
}
.table {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 950px;
  overflow: auto;
}
.thead {
  display: flex;
  background-color: var(--other-backgroud_light-gray_block);
  justify-content: space-between;
  border-radius: 8px 8px 0px 0px;
}
.tbody {
  display: flex;
  flex-direction: column;
  background: var(--card-background_gray_fill);
}
.td,
.th,
.setting {
  display: flex;
  width: 157px;
  padding: 16px 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.columns {
  display: flex;
}
.tr {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--other-backgroud_light-gray_block);
}
.heading-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.file-upload {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.file-upload:hover {
  border-color: #007bff;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-icon {
  font-size: 24px;
  margin-bottom: 10px;
}

.upload-content p {
  font-size: 16px;
  color: #007bff;
}

.upload-content span {
  font-size: 14px;
  color: #666;
}
</style>
