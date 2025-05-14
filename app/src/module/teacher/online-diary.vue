<template>
  <div class="template">
    <navigation />
    <main class="journal">
      <header>
        <div class="data">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15.3769 18L10.4375 13.0606C9.85417 12.4773 9.85417 11.5227 10.4375 10.9394L15.3769 6"
              stroke="#3D3D3D"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="texting-1">июнь 2024</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M8.62311 18L13.5625 13.0606C14.1458 12.4773 14.1458 11.5227 13.5625 10.9394L8.62311 6"
              stroke="#3D3D3D"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="filters">
          <select
            name=""
            id=""
            class="dropdown texting-3"
            v-model="groupId"
            @change="fetchGrade(groupId)"
          >
            <option value="" disabled selected>Выберите группу</option>
            <option
              v-for="group in groupTitles"
              :key="group.id"
              :value="group.id"
            >
              {{ group.title }}
            </option>
          </select>
          <input type="text" placeholder="Поиск по фио" class="texting-3" v-model="searchFIO"/>
        </div>
      </header>
      <div class="diary">
        <div class="header-tab">
          <div class="information">
            <div id="number"><h3 class="healding-3">№</h3></div>
            <h3 class="healding-3">Фамилия Имя Отчество</h3>
          </div>
          <div class="data-atoms">
            <span class="atom texting-1" v-for="day in arrayDays" :key="day">{{
              day
            }}</span>
          </div>
        </div>
        <div class="content">
          <div class="info-users">
            <div class="user" v-for="(student, index) in filterStudents" :key="student.id || index">
              <div id="number">
                <h3 class="healding-3">{{ index + 1 }}</h3>
              </div>
              <span class="texting-2" >
                {{ student.lastname }}
                {{ student.name }}
                {{ student.patronymic }}</span
              >
            </div>
          </div>
          <div class="table">
            <div class="row-cell" v-for="(student, index) in filterStudents" :key="student.id || index">
              <input 
                type="text" 
                class="cell texting-1" 
                v-for="(grade, gradeIndex) in student.grades" 
                :key="'grade-' + student.id + '-' + gradeIndex" 
                :value="grade" 
              />
              <input 
                type="text" 
                class="cell texting-1" 
                v-for="n in (31 - student.grades.length)" 
                :key="'empty-' + student.id + '-' + n" 
                value="" 
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import navigation from "../navigation.vue";
import { ref, computed, onMounted } from "vue";
import http from "@/http-common";
// Переменные
const arrayDays = ref([]);
const studentsAll = ref([]);
const groupId = ref(null);
const groupTitles = ref([]);
const user = ref(null);
const searchFIO = ref("")
const fetchGroupTitle = async () => {
  try {
    // Убедитесь, что user.value существует и имеет id перед запросом
    if (!user.value || !user.value.id) {
      console.warn("ID пользователя не найден для запроса групп");
      errorMessage.value =
        "Не удалось определить пользователя для загрузки групп";
      return;
    }
    const res = await http.get(`/groups/${user.value.id}`);
    console.log("Полученные данные групп: ", res.data);
    // Предполагаем, что API возвращает массив объектов { id: ..., title: ... }
    // или объект вида { groupTitles: [...] }
    groupTitles.value = res.data.groupTitles || res.data || [];
  } catch (error) {
    console.error("Ошибка при получении групп: ", error);
    errorMessage.value = "Не удалось загрузить группы";
  }
};
const fetchGrade = async (groupId) => {
  try {
    if (!user.value || !user.value.id) {
      console.warn("ID пользователя не найден для запроса оценок");
      return;
    }
    const res = await http.get(`/grades/${groupId}`);
    console.log("Полученные данные о студентах: ", res.data);
    studentsAll.value = res.data.studentsAll || res.data || [];
  } catch (error) {
    console.error("Ошибка при получении оценок: ", error);
    errorMessage.value = "Не удалось загрузить оценки";
  }
};

// 🚀 Загружаем группы при загрузке компонента
onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    router.push("/login");
    return;
  }

  user.value = JSON.parse(storedUser);
  console.log("✅ USER LOADED: ", user.value);
  dateByMonth();
  fetchGroupTitle();
});

// получение дат с текущего месяца
function dateByMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const days = new Date(year, month + 1, 0).getDate();
  const monthName = today.toLocaleString("default", { month: "long" });
  console.log("Название месяца: " + monthName);

  arrayDays.value = Array.from({ length: days }, (_, index) => index + 1);

  console.log(arrayDays.value);
}
const filterStudents = computed(() => {
  if (!searchFIO.value) {
    return studentsAll.value;
  }
  return studentsAll.value.filter(student => {
    const fullName = `${student.lastname} ${student.name} ${student.patronymic}`.toLowerCase();
    return fullName.includes(searchFIO.value.toLowerCase());
  });
});

</script>
<style scoped>
@import "./UI/online-diary.css";
@import "@/css/components/block/inputs/input.css";
</style>
