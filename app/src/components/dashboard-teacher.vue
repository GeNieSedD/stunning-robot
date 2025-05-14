<template>
  <div class="template">
    <div class="application">
      <navigation />
      <div class="contents">
        <header></header>
        <main>
          <div id="content-one">
            <calendar />
            <schedule />
          </div>
          <div id="content-two">
            <div class="horizantal">
              <div class="card"></div>
              <div class="card"></div>
            </div>
            <div class="grafic"></div>
            <document />
          </div>
          <div id="content-three">
            <div class="card"></div>
            <materials />
          </div>
        </main>
      </div>
    </div>
  </div>

</template>

<style scoped>
@import "../css/components/block/buttons/chapter.css";
@import "../css/components/block/buttons/button.css";
@import "../css/components/block/inputs/input.css";
@import "../css/components/variables/text-style.css";
@import "../css/components/variables/variables.css";
@import "../css/components/block/other/other.css";
.template {
  display: flex;
  gap: 24px;
  background: var(--card-background_gray_fill, #fafafa);
  height: 100vh;
  padding-right: 24px;
}
.error {
  color: red;
  margin-top: 10px;
}
.application {
  display: flex !important;
  background-color: var(--card-background_gray_fill) !important;
  gap: 24px;
}
body {
  display: flex;
}
#content-one {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
#content-two {
  display: flex;
  flex-direction: column;
  width: 642px;
  gap: 24px;
}
#content-three {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.horizantal {
  display: flex;
  gap: 24px;
}
.card {
  height: 111px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
}
main {
  display: flex;
  gap: 24px;
  flex: 1;
}
.grafic {
  height: 241px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
}
header {
  display: flex;
  padding: 16px 24px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: 60px;
  border-radius: 0px 0px 8px 8px;
  background: #fff;
}
.contents {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
<script setup>
import navigation from "../module/navigation.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import document from "../module/widgets/document.vue";
import schedule from "../module/widgets/schedule.vue";
import calendar from "../module/widgets/calendar.vue";
import materials from "../module/widgets/materials.vue";

// // 📦 Переменные
// const user = ref(null);
// const groupIds = ref([]);
// const router = useRouter();
// onMounted(() => {
//   const storedUser = localStorage.getItem("user");
//   if (!storedUser) {
//     router.push("/login");
//     return;
//   }

//   try {
//     user.value = JSON.parse(storedUser);
//     console.log("✅ USER LOADED: ", user.value);

//     // Проверяем, есть ли у пользователя студенты и извлекаем groupId
//     groupIds.value = user.value.students
//       ? user.value.students.map((student) => student.groupId)
//       : [];

//     // Проверяем, есть ли groupIds перед переходом
//     if (groupIds.value.length > 0) {
//       router.push({
//         path: "/diary",
//         query: { groupIds: JSON.stringify(groupIds.value) },
//       });
//     } else {
//       console.warn("У пользователя нет доступных групп.");
//     }
//   } catch (error) {
//     console.error("Ошибка при парсинге пользователя из localStorage:", error);
//     router.push("/login"); // Переходим на /login при ошибке
//   }
// });
</script>
