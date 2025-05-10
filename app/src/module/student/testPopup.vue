<!-- TestPopup.vue -->
<template>
  <div class="popup-overlay" v-if="isVisible" @click="close">
    <div class="popup" @click.stop>
      <div class="content">
        <div class="text-heading">
          <h1 class="healding-1">{{ test.title }}</h1>
          <span class="texting-1">{{ test.description }}</span>
        </div>
        <div class="info">
          <div class="card-info">
            <span class="texting-1-bold">Дата начала теста</span>
            <span class="texting-1 span">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M6.66667 1.66667V5.00001M13.3333 1.66667V5.00001M2.5 8.33334H17.5M4.16667 3.33334H15.8333C16.7538 3.33334 17.5 4.07953 17.5 5.00001V16.6667C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6667V5.00001C2.5 4.07953 3.24619 3.33334 4.16667 3.33334Z"
                  stroke="#3D3D3D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ test.beginningdate.substring(0, 10) }}
            </span>
          </div>
          <div class="card-info">
            <span class="texting-1-bold">Дата окончания теста</span>
            <span class="texting-1 span">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M6.66667 1.66667V5.00001M13.3333 1.66667V5.00001M2.5 8.33334H17.5M4.16667 3.33334H15.8333C16.7538 3.33334 17.5 4.07953 17.5 5.00001V16.6667C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6667V5.00001C2.5 4.07953 3.24619 3.33334 4.16667 3.33334Z"
                  stroke="#3D3D3D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ test.enddatetime.substring(0, 10) }}
            </span>
          </div>
          <div class="card-info">
            <span class="texting-1-bold">Время выполнения теста</span>
            <span class="texting-1 span">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clip-path="url(#clip0_365_10683)">
                  <path
                    d="M10.0001 4.99999V9.99999L13.3334 11.6667M18.3334 9.99999C18.3334 14.6024 14.6025 18.3333 10.0001 18.3333C5.39771 18.3333 1.66675 14.6024 1.66675 9.99999C1.66675 5.39762 5.39771 1.66666 10.0001 1.66666C14.6025 1.66666 18.3334 5.39762 18.3334 9.99999Z"
                    stroke="#3D3D3D"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_365_10683">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              {{ test.time }} мин.
            </span>
          </div>
          <div class="card-info">
            <span class="texting-1-bold">Группы</span>
            <span class="texting-1 span">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M13.8334 17.5V15.8333C13.8334 14.9493 13.4822 14.1014 12.8571 13.4763C12.232 12.8512 11.3841 12.5 10.5001 12.5H5.50008C4.61603 12.5 3.76818 12.8512 3.14306 13.4763C2.51794 14.1014 2.16675 14.9493 2.16675 15.8333V17.5M18.8334 17.5V15.8333C18.8329 15.0948 18.587 14.3773 18.1346 13.7936C17.6821 13.2099 17.0485 12.793 16.3334 12.6083M13.8334 2.60833C14.5504 2.79192 15.1859 3.20892 15.6398 3.79359C16.0936 4.37827 16.34 5.09736 16.34 5.8375C16.34 6.57764 16.0936 7.29673 15.6398 7.88141C15.1859 8.46608 14.5504 8.88308 13.8334 9.06667M11.3334 5.83333C11.3334 7.67428 9.84103 9.16667 8.00008 9.16667C6.15913 9.16667 4.66675 7.67428 4.66675 5.83333C4.66675 3.99238 6.15913 2.5 8.00008 2.5C9.84103 2.5 11.3334 3.99238 11.3334 5.83333Z"
                  stroke="#3D3D3D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ test.groupid }}
            </span>
          </div>
        </div>
        <button class="button button-primary healding-3" @click="goToTest">
          Начать тест
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.910826 0.410765C1.23626 0.0853278 1.7639 0.0853278 2.08934 0.410765L7.08934 5.41077C7.41477 5.7362 7.41477 6.26384 7.08934 6.58928L2.08934 11.5893C1.7639 11.9147 1.23626 11.9147 0.910826 11.5893C0.585389 11.2638 0.585389 10.7362 0.910826 10.4108L5.32157 6.00002L0.910826 1.58928C0.585389 1.26384 0.585389 0.736202 0.910826 0.410765Z"
              fill="#fff"
            />
          </svg>
        </button>
      </div>
      <div
        id="img"
        :style="{
          backgroundImage: `url(https://legendary-waddle-pj95gxxjrpr5366vq-8080.app.github.dev${test.img})`,
        }"
      ></div>
      <!-- <img
        :src="`https://legendary-waddle-pj95gxxjrpr5366vq-8080.app.github.dev${test.img}`"
        alt="фтография"
      /> -->
      <!-- <button @click="close">Закрыть</button> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import http from "@/http-common";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  test: {
    type: Object,
    required: true,
  },
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const goToTest = () => {
  console.log("test.id:", props.test.id);
  router.push({ name: "Test", params: { testId: props.test.id } });
};

const close = () => {
  emit("close");
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  display: inline-flex;
  padding: 40px;
  align-items: flex-start;
  gap: 40px;
  border-radius: 16px;
  background: var(--card-background_white_fill);
}
.content {
  display: flex;
  width: 465px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
.text-heading {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
}
.info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  width: 100%;
}
.card-info {
  display: flex;
  min-width: 200px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex: 1 0 0;
}
div#img {
  width: 386px;
  align-self: stretch;
  height: auto;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
}
.span {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
