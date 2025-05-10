<template>
  <div v-if="isVisible" class="modalWindow">
    <div class="popup-content">
      <slot></slot>
      <div class="buttons">
        <button class="button button-secondary healding-3" @click="closePopup">
          Отменить
        </button>
        <button
          @click="handleAdd"
          :desabled="isLoading"
          class="button button-primary healding-3"
        >
          {{ isLoading ? "Загрузка..." : "Добавить" }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
  },
  setup(props, { emit }) {
    const isLoading = ref(false);

    const closePopup = () => {
      emit("close");
    };

    const handleAdd = async () => {
      isLoading.value = true;
      try {
        await props.onSubmit();
        emit("success");
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      closePopup,
      handleAdd,
    };
  },
};
</script>
<style scoped>
.button {
  width: 100%;
}
.buttons {
  display: flex;
  gap: 12px;
  width: 100%;
  margin-top: auto;
}
.modalWindow {
  display: inline-flex;
  position: fixed;
  flex-direction: column;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  align-items: center;
  justify-content: center;
}

.popup-content {
  display: flex;
  width: 480px;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  border-radius: 8px;
  background: var(--card-background_white_fill);
  height: 400px;
}

.close-btn {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close-btn:hover,
.close-btn:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
