<template>
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
          <taskList />
        </div>
      </main>
    </div>
  </div>
</template>
<style scoped>
@import "@/css/components/block/buttons/chapter.css";
@import "@/css/components/block/buttons/button.css";
@import "@/css/components/block/inputs/input.css";
@import "@/css/pages/auth.css";
@import "@/css/components/variables/text-style.css";
@import "@/css/components/variables/variables.css";
@import "@/css/components/block/other/other.css";
.error {
  color: red;
  margin-top: 10px;
}
.application {
  display: flex !important;
  background-color: var(--card-background_gray_fill) !important;
  gap: 24px;
  height: 100vh;
}
body {
  background-color: var(--card-background_gray_fill) !important;
}
div#app {
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
import navigation from "../navigation.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import document from "../widgets/document.vue";
import schedule from "../widgets/schedule.vue";
import calendar from "../widgets/calendar.vue";
import taskList from "../widgets/taskList.vue";

// 📦 Переменные
const router = useRouter();
const user = ref(null);

// 🚀 onMounted — загрузка данных и защита
onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    router.push("/login");
    return;
  }
  user.value = JSON.parse(storedUser);
  console.log("✅ USER LOADED: ", user.value);
});
</script>
