<template>
  <div class="tastList">
    <div class="content">
      <h2 class="healding-2-bold">Онлайн тесты</h2>
      <div class="cards">
        <div
          class="card"
          v-for="test in testTitle"
          :key="test.id"
          @click="openPopup(test)"
        >
          <div class="text">
            <h3 class="healding-3">
              {{ test.title }}
            </h3>
            <span class="texting-3"
              >Дата создания: {{ test.beginningdate.substring(0, 10) }}</span
            >
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.46967 5.96967C8.76256 5.67678 9.23744 5.67678 9.53033 5.96967L15.5303 11.9697C15.8232 12.2626 15.8232 12.7374 15.5303 13.0303L9.53033 19.0303C9.23744 19.3232 8.76256 19.3232 8.46967 19.0303C8.17678 18.7374 8.17678 18.2626 8.46967 17.9697L13.9393 12.5L8.46967 7.03033C8.17678 6.73744 8.17678 6.26256 8.46967 5.96967Z"
              fill="#455DB4"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
  <testPopup
    v-if="isPopupVisible"
    :test="selectedTest"
    :isVisible="isPopupVisible"
    @close="isPopupVisible = false"
  />
</template>
<style scoped>
@import "@/css/components/variables/text-style.css";
@import "@/css/components/variables/variables.css";
* {
  padding: 0px;
  margin: 0px;
}
.tastList {
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 8px;
  background: var(--card-background_white_fill);
  justify-content: space-between;
  gap: 24px;
  background-color: var(--card-background_white_fill);
  border-radius: 8px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
}
.cards {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-content: flex-start;
  gap: 12px;
  align-self: stretch;
  overflow-y: auto;
  height: 520px;
}
.card {
  display: flex;
  min-width: 200px;
  padding: 12px;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  background: var(--card-background_gray_fill);
  gap: 12px;
}
.card h3 {
  color: var(--text-background_blue_text);
}
.card span {
  color: var(--text-background_light-gray_text);
}
</style>
<script setup>
import { ref, onMounted } from "vue";
import http from "@/http-common";
import testPopup from "../student/testPopup.vue";

// переменные
const testTitle = ref([]);
const user = ref(null);
const isPopupVisible = ref(false);
const selectedTest = ref(null);

const fetchTestAll = async (groupId) => {
  try {
    const res = await http(`createTest/tests/${groupId}`);
    testTitle.value = res.data.testTitle || res.data || [];
  } catch (error) {
    console.error("Ошибка при получении теста");
  }
};
const openPopup = (test) => {
  console.log(test);
  selectedTest.value = test; // сохраняем выбранный тест
  isPopupVisible.value = true; // показываем поп-ап
};

onMounted(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser);
      const studentGroup =
        user.value.student.length > 0 ? user.value.student[0].group : null;
      const groupId = studentGroup ? studentGroup.id : null;
      fetchTestAll(groupId);
    } catch (error) {
      console.error("Ошибка парсинга пользователя из localStorage:", error);
    }
  } else {
    console.warn("Нет сохранённого пользователя в localStorage");
  }
});
</script>
