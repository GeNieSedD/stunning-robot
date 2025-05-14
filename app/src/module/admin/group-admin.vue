<template>
  <div class="template">
      <navigation />

  <main>
    <div class="content">
      <div class="heading-button">
        <h1>Группы</h1>
        <button
          class="healding-3 button button-primary"
          @click="showPopup = true"
        >
          Добавить группы
        </button>
      </div>
      <div class="table">
        <div class="thead">
          <div class="columns">
            <h2 class="healding-2-bold th">Название группы</h2>
            <h2 class="healding-2-bold th">курс</h2>
          </div>
          <h2 class="healding-2-bold th">настройки</h2>
        </div>
        <div class="tbody">
          <div
            class="tr"
            v-for="group in groupAll"
            :key="group.id"
            :value="group.id"
          >
            <div class="columns">
              <span class="texting-1 td">{{ group.title }}</span>
              <span class="texting-1 td">{{ group.course }}</span>
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

  <module-window
    :isVisible="showPopup"
    :onSubmit="sendDataToServer"
    @close="showPopup = false"
    @success="onSuccess"
  >
    <div class="tabs">
      <button
      class="tab texting-1"
        :class="{ active: activeTab === 'manual' }"
        @click="setActiveTab('manual')"
      >
        Вручную
      </button>
      <button
      class="tab texting-1"
        :class="{ active: activeTab === 'excel' }"
        @click="setActiveTab('excel')"
      >
        Excel
      </button>
    </div>
    <div v-if="activeTab === 'manual'" class="content-window">
      <div class="content-form">
        <div class="inputs" :key="index" v-for="(group, index) in addGroups">
          <div class="input-label">
            <label class="healding-2-bold"
              >Название <span id="required">*</span></label
            >
            <input
              class="input-default texting-3"
              type="text"
              placeholder="Введите название группы"
              minlength="6"
              maxlength="6"
              required
              v-model="group.title"
            />
          </div>
          <div class="input-label">
            <label class="healding-2-bold"
              >курс <span id="required">*</span></label
            >
            <input
              class="input-default texting-3"
              type="number"
              placeholder="Введите курс"
              required
              min="1"
              max="4"
              v-model="group.course"
            />
          </div>
        </div>
        <button @click="addGroup">Добавить еще группу</button>
        <button @click="sendManualDataToServer">Отправить данные</button>
      </div>
    </div>
    <div v-else-if="activeTab === 'excel'" class="content-window">
      <h2 class="healding-1">Добавление группы из Excel</h2>
      <div
        class="file-upload"
        @click="triggerFileInput"
        @dragover.prevent
        @drop.prevent="handleDrop"
      >
        <input
          type="file"
          ref="fileInput"
          @change="handleFileChange"
          accept=".xlsx"
          style="display: none"
        />
        <div class="upload-content">
          <i class="upload-icon">⬆️</i>
          <p>Нажмите, чтобы загрузить или перетащите</p>
          <span>.excel</span>
        </div>
      </div>
    </div>
  </module-window>
</template>

<script setup>
import navigation from "./navigation-admin.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import * as XLSX from "xlsx";
import http from "@/http-common";
import moduleWindow from "../modal-window.vue";

// 📦 Переменные
const router = useRouter();
const user = ref(null);
const groupAll = ref([]);
const fileInput = ref(null);
const showPopup = ref(false);
const jsonData = ref(null); // Данные для отправки
const activeTab = ref("manual");
const setActiveTab = (tab) => {
  activeTab.value = tab;
};
// функция для удаление записей
const deleteGroup = (groupid) => {
  console.log(groupAll.value);
  console.log("Удаляемая группа ID:", groupid);
  if (confirm("Вы уверены, что хотите безвозвратно удалить эту запись?")) {
    http
      .delete(`/groups/${groupid}`)
      .then(() => {
        // Удаление записи из локального состояния после успешного удаления с сервера
        groupAll.value = groupAll.value.filter((group) => group.id !== groupid);
        alert("Запись успешно удалена.");
      })
      .catch((error) => {
        console.error("Ошибка при удалении записи", error);
        alert("Ошибка при удалении записи.");
      });
  }
};

// Функция для добавления множества групп
const addGroups = ref([
  {
    title: "",
    course: 1,
  },
]);
function addGroup() {
  addGroups.value.push({ title: "", course: 1 });
}

// Function to trigger the file input
const triggerFileInput = () => {
  fileInput.value.click();
};

// Function to handle file input change
const handleFileChange = (event) => {
  const files = event.target.files;
  uploadFiles(files);
};

// Function to handle file drop
const handleDrop = (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  uploadFiles(files);
};

// Function to process uploaded files
const uploadFiles = (files) => {
  if (files.length > 0) {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      jsonData.value = XLSX.utils.sheet_to_json(worksheet);

      // Открываем попап после загрузки файла
      showPopup.value = true;
    };

    reader.readAsArrayBuffer(file);
  }
};

// Функция для отправки данных на сервер
const sendDataToServer = () => {
  if (!jsonData.value) {
    console.error("Нет данных для отправки");
    return Promise.reject("Нет данных для отправки");
  }

  return http
    .post("/groups/upload-groups", jsonData.value)
    .then((response) => {
      console.log("Данные успешно отправлены:", response.data);
    })
    .catch((error) => {
      console.error("Ошибка при отправке данных:", error);
      throw error; // Проброс ошибки для обработки
    });
};

// Новая функция для отправки данных из инпутов
const sendManualDataToServer = () => {
  const data = addGroups.value.map((group) => ({
    title: group.title,
    course: group.course,
  }));

  return http
    .post("/groups/upload-groups", data)
    .then((response) => {
      console.log("Данные успешно отправлены:", response.data);
      onSuccess();
    })
    .catch((error) => {
      console.error("Ошибка при отправке данных:", error);
    });
};

// Функция для обработки успешной отправки
const onSuccess = () => {
  alert("Данные успешно отправлены!");
  showPopup.value = false;
};

// Функция для получения всех групп
const fetchGroupAll = async () => {
  try {
    const res = await http.get("/groups/groupAll");
    groupAll.value = res.data.groupAll || res.data || [];
  } catch (error) {
    console.error("Ошибка при получении групп", error);
  }
};

// 🚀 onMounted — загрузка данных и защита
onMounted(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser);
      fetchGroupAll();
    } catch (error) {
      console.error("Ошибка парсинга пользователя из localStorage:", error);
    }
  } else {
    console.warn("Нет сохранённого пользователя в localStorage");
  }
});
</script>

<style scoped>
@import "@/css/components/block/buttons/chapter.css";
@import "@/css/components/block/buttons/button.css";
@import "@/css/components/block/inputs/input.css";
@import "@/css/components/variables/text-style.css";
@import "@/css/components/variables/variables.css";
@import "@/css/components/block/other/other.css";

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
.tabs {
  display: flex;
  gap: 12px;
  align-items: center;
}
.tab{
  background-color: tra;
  border: none;
  border-bottom: 1px solid;
  margin-bottom: -4px;
}
.tab:hover{
    color: var(--text-background_blue_text)
}
</style>
