<template>
  <div class="schedule">
    <div class="text">
      <h1 class="healding-1">Расписание занятий</h1>
      <span class="texting-3">Сегодня, 13 января</span>
    </div>
    <div class="content">
      <div class="lesson" id="active">
        <h3 class="healding-3">Математика</h3>
        <span class="texting-3">9:00 - 10:00</span>
      </div>
      <div class="lesson">
        <h3 class="healding-3">Русский</h3>
        <span class="texting-3">10:10 - 11:10</span>
      </div>
      <div class="lesson">
        <h3 class="healding-3">Английский</h3>
        <span class="texting-3">12:20 - 13:10</span>
      </div>
      <div class="lesson">
        <h3 class="healding-3">Физика</h3>
        <span class="texting-3">13:20 - 14:30</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "@/css/components/variables/text-style.css";
@import "@/css/components/variables/variables.css";
* {
  margin: 0px;
  padding: 0px;
}
.schedule {
  display: flex;
  gap: 22px;
  padding: 16px !important;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  background-color: var(--card-background_white_fill);
  border-radius: 8px;
}
h1 {
  margin: 0px;
}
.text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
}
.text > span {
  color: var(--text-background_gray_text);
}
.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  flex: 1;
}
.lesson {
  display: flex;
  padding: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
  border-radius: 4px;
  background: var(--card-background_dark-gray_fill);
}
.lesson#active {
  background-color: var(--other-background_white-blue_block);
}
.lesson#active * {
  color: var(--text-background_white_text);
}
html,
body,
div#app {
  width: 100%;
}
</style>
