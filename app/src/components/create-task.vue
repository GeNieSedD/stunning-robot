<template>
  <div class="template">
    <navigation />
    <main>
      <!-- Форма создания теста -->
      <div class="heading-question">
        <h2 class="healding-max">Создание теста</h2>
        <span id="popUp-hint" class="healding-3">Посмотреть подсказку</span>
      </div>
      <form class="constructor-test" @submit.prevent="question" v-auto-animate>
        <!-- Вопрос 1 -->
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="question"
        >
          <div class="heading">
            <h1 class="healding-max">Вопрос</h1>
            <h1 class="healding-max">{{ index + 1 }}</h1>
          </div>
          <div class="content-question">
            <div class="description">
              <div class="input-label">
                <label class="healding-2-bold"
                  >Описание вопроса <span id="required">*</span></label
                >
                <input
                  class="input-default texting-3"
                  type="text"
                  v-model="question.description"
                  placeholder="Введите описание"
                  required
                />
              </div>
              <div class="input-label">
                <label class="healding-2-bold"
                  >Фотография<span id="required">*</span></label
                >
                <input
                  class="input-default texting-3"
                  type="file"
                  @change="onQuestionImageChange($event, index)"
                  accept="image/*"
                />
              </div>
            </div>
            <div class="constructor-answers">
              <div class="answers" v-auto-animate>
                <div
                  v-for="(answer, answerIndex) in question.answers"
                  :key="answerIndex"
                  class="input-label"
                >
                  <div class="radio-label">
                    <input
                      type="checkbox"
                      :name="'question' + index"
                      :id="'answer' + index + answerIndex"
                      v-model="answer.isCorrect"
                      :value="answer"
                    />
                    <label
                      for="'answer' + index + answerIndex"
                      class="texting-2"
                      >Вариант ответа</label
                    >
                    <span>{{ answerIndex + 1 }}</span>
                  </div>
                  <input
                    class="input-default texting-3"
                    type="text"
                    v-model="answer.text"
                    placeholder="Введите вариант ответа"
                    required
                  />
                </div>
              </div>

              <a
                href=""
                class="texting-1-bold"
                @click.prevent="addAnswer(index)"
                >+ Добавить вариант ответа</a
              >
            </div>
          </div>
        </div>
        <button
          class="button button-primary healding-3"
          type="button"
          @click="addQuestion"
        >
          Добавить вопрос
        </button>
      </form>
    </main>
    <footer>
      <div class="setting-test">
        <h2 class="healding-1">Настройки теста</h2>
        <div class="inputs">
          <div class="input-label">
            <label for="" class="texting-1">Дата начала теста</label>
            <input type="date" class="input-default" v-model="beginningDate" />
          </div>
          <div class="input-label">
            <label for="" class="texting-1">Дата окончания теста</label>
            <input
              type="date"
              class="input-default texting-3"
              v-model="endDate"
            />
          </div>
          <div class="input-label">
            <label for="" class="texting-1">Время прохождения</label>
            <input
              type="number"
              class="input-default texting-3"
              v-model="time"
            />
          </div>
          <div class="input-label">
            <label for="" class="texting-1">Выбор групп</label>
            <select
              name=""
              id=""
              class="dropdown texting-3"
              v-model="selectedGroupId"
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
          </div>
        </div>
      </div>
      <div class="information-test">
        <h2 class="healding-1">Информация о тесте</h2>
        <div class="update-test">
          <div class="input-label">
            <label for="" class="texting-1">Заголовок</label>
            <input
              v-model="title"
              type="text"
              class="input-default texting-3"
              placeholder="Введите заголовое текста"
            />
          </div>
          <div class="input-label" id="description">
            <label for="" class="texting-1">Описание теста</label>
            <textarea v-model="description">
                
              class="input input-default texting-3"
              placeholder="Введите название">
            </textarea>
          </div>
          <div class="input-label">
            <label for="" class="texting-1">Обложка фотографии</label>
            <input type="file" @change="onImageChange" accept="image/*" />
          </div>
        </div>
        <button
          class="button button-primary healding-3"
          @click.prevent="submitTest"
        >
          Опубликовать тест
        </button>
      </div>
    </footer>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
// import axios from 'axios' // Используем http, если он настроен
import navigation from "../module/navigation.vue"; // Если используется
import http from "../http-common"; // Ваш настроенный экземпляр Axios

// Переменные
const groupTitles = ref([]);
const errorMessage = ref("");
const user = ref(null);

// Основные поля теста
const title = ref("");
const description = ref("");
const img = ref(null); // Будет хранить объект File или null
const beginningDate = ref("");
const endDate = ref("");
const time = ref(0); // Длительность в минутах
const selectedGroupId = ref("");
const teacherId = ref(1); // ID учителя (убедитесь, что он актуален)

// Вопросы и ответы
const questions = ref([
  {
    description: "",
    img: null, // Пока не обрабатываем загрузку картинок для вопросов
    answers: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
  },
]);

// 📡 Функция получения групп
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

// 🚀 Загружаем группы при загрузке компонента
onMounted(() => {
  const storedUser = localStorage.getItem("user"); // Получаем строку
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser); // Парсим JSON
      fetchGroupTitle(); // Вызываем загрузку групп
    } catch (e) {
      console.error("Ошибка парсинга пользователя из localStorage:", e);
      errorMessage.value = "Ошибка данных пользователя";
    }
  } else {
    errorMessage.value = "Пользователь не авторизован";
    console.warn("Нет сохранённого пользователя в localStorage");
  }
});

// Добавить новый вопрос
function addQuestion() {
  questions.value.push({
    description: "",
    img: null,
    answers: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
  });
}

// Добавить вариант ответа к конкретному вопросу
function addAnswer(questionIndex) {
  questions.value[questionIndex].answers.push({ text: "", isCorrect: false });
}

// Обработчик выбора файла изображения для теста
function onImageChange(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    // Проверяем, что это изображение
    img.value = file; // Сохраняем объект File
    console.log("Выбран файл для теста:", file.name);
  } else {
    img.value = null; // Сбрасываем, если файл не выбран или не картинка
    if (file) {
      // Если файл был, но не картинка
      alert("Пожалуйста, выберите файл изображения.");
    }
    console.log("Файл для теста не выбран или не является изображением.");
  }
}
function onQuestionImageChange(event, questionIndex) {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    // Сохраняем файл в нужный объект вопроса
    questions.value[questionIndex].img = file;
    console.log(`Выбран файл для вопроса ${questionIndex + 1}:`, file.name);
    // Очищаем поле ввода, чтобы можно было выбрать тот же файл снова (опционально)
    event.target.value = null;
  } else {
    // Сбрасываем, если файл не выбран или не картинка
    questions.value[questionIndex].img = null;
    if (file) {
      alert("Пожалуйста, выберите файл изображения.");
    }
    console.log(
      `Файл для вопроса ${questionIndex + 1} не выбран или не изображение.`
    );
  }
}
// Сбор и отправка полного теста
async function submitTest() {
  // --- Валидация основных полей ---
  if (!title.value.trim()) {
    alert("Пожалуйста, введите название теста.");
    return; // Прерываем выполнение, если нет названия
  }
  if (!selectedGroupId.value) {
    alert("Пожалуйста, выберите группу.");
    return; // Прерываем, если группа не выбрана
  }
  // Преобразуем время в число и проверяем
  const durationMinutes = parseInt(time.value, 10);
  if (isNaN(durationMinutes) || durationMinutes < 0) {
    alert(
      "Пожалуйста, введите корректную неотрицательную длительность теста в минутах."
    );
    return; // Прерываем, если время некорректно
  }
  // Преобразуем ID группы и учителя в числа (уже проверили, что группа выбрана)
  const currentGroupId = parseInt(selectedGroupId.value, 10);
  const currentTeacherId = parseInt(teacherId.value, 10); // Убедись, что teacherId корректно установлено
  if (isNaN(currentTeacherId)) {
    // Дополнительная проверка ID учителя
    alert("Ошибка: Неверный ID учителя.");
    return; // Прерываем, если ID учителя некорректен
  }
  // --- Конец валидации основных полей ---

  // --- Валидация вопросов ---
  if (questions.value.length === 0) {
    alert("Тест должен содержать хотя бы один вопрос.");
    return; // Прерываем, если нет вопросов
  }
  // Проходим по каждому вопросу для детальной валидации
  for (const [index, q] of questions.value.entries()) {
    // Проверка описания вопроса
    if (!q.description.trim()) {
      alert(`Пожалуйста, заполните описание для вопроса №${index + 1}.`);
      return; // Прерываем
    }
    // Проверка количества ответов
    if (q.answers.length < 2) {
      alert(`В вопросе №${index + 1} должно быть минимум два варианта ответа.`);
      return; // Прерываем
    }
    // Проверка текста ответов и наличия хотя бы одного правильного
    let hasCorrect = false; // Флаг для проверки наличия правильного ответа
    for (const a of q.answers) {
      // Проверка текста ответа
      if (!a.text.trim()) {
        alert(
          `Пожалуйста, заполните текст для всех ответов в вопросе №${
            index + 1
          }.`
        );
        return; // Прерываем
      }
      // Проверяем, отмечен ли ответ как правильный
      if (a.isCorrect) {
        hasCorrect = true; // Нашли хотя бы один правильный
      }
    }
    // Проверка, был ли отмечен правильный ответ для этого вопроса
    if (!hasCorrect) {
      alert(
        `В вопросе №${
          index + 1
        } должен быть отмечен хотя бы один правильный ответ.`
      );
      return; // Прерываем
    }
  }
  // --- Конец валидации вопросов ---

  // --- Формирование FormData ---
  const formData = new FormData();

  // 1. Добавляем основные ТЕКСТОВЫЕ поля теста
  formData.append("title", title.value);
  formData.append("description", description.value);
  formData.append("beginningDate", beginningDate.value || ""); // Отправляем дату или пустую строку
  formData.append("endDate", endDate.value || ""); // Отправляем дату или пустую строку
  formData.append("time", durationMinutes.toString()); // Отправляем проверенное число как строку
  formData.append("groupId", currentGroupId.toString()); // Отправляем проверенный ID как строку
  formData.append("teacherId", currentTeacherId.toString()); // Отправляем проверенный ID как строку

  // 2. Добавляем ФАЙЛ ОБЛОЖКИ (если есть)
  if (img.value instanceof File) {
    // Ключ 'img' - для обложки
    formData.append("img", img.value, img.value.name);
    console.log("Добавлен файл обложки в FormData:", img.value.name);
  } else {
    console.log("Файл обложки не выбран.");
  }

  // 3. Обрабатываем вопросы: отделяем текст от файлов
  const questionsTextData = []; // Массив ТОЛЬКО с текстовыми данными для JSON
  questions.value.forEach((question, index) => {
    // Создаем объект только с текстовыми данными для JSON
    const textData = {
      description: question.description,
      // В JSON не кладем файл, бэкенд сам найдет его по ключу
      answers: question.answers.map((a) => ({
        text: a.text,
        isCorrect: a.isCorrect ?? false, // Используем ?? для большей надежности
      })),
    };
    questionsTextData.push(textData);

    // Добавляем ФАЙЛ ВОПРОСА в FormData, если он есть
    if (question.img instanceof File) {
      // Используем ключ, который поможет бэкенду сопоставить файл с вопросом
      // Например: 'questionImage_0', 'questionImage_1', и т.д.
      const questionImageKey = `questionImage_${index}`; // ВАЖНО: этот ключ будет искать бэкенд
      formData.append(questionImageKey, question.img, question.img.name);
      console.log(
        `Добавлен файл для вопроса ${
          index + 1
        } в FormData под ключом: ${questionImageKey}`
      );
    }
  });

  // 4. Добавляем JSON строку ТОЛЬКО с текстовыми данными вопросов
  formData.append("questions", JSON.stringify(questionsTextData)); // Отправляем массив текстовых данных

  // --- Конец формирования FormData ---

  // --- Отправка запроса ---
  console.log("Отправка данных на /createTest...");
  // Для отладки: посмотреть все ключи (файлы не покажет, но ключи должны быть)
  console.log("--- FormData Keys ---");
  for (let key of formData.keys()) {
    console.log(key);
  }
  console.log("---------------------");

  try {
    // Отправляем FormData (Axios сам поставит Content-Type: multipart/form-data)
    // Убедись, что URL '/createTest' - это правильный эндпоинт на твоем бэкенде
    const response = await http.post("/createTest", formData);

    alert("Тест успешно создан!");
    console.log("Ответ сервера:", response.data);
    // Опционально: можно добавить код для сброса полей формы после успеха
    // title.value = '';
    // description.value = '';
    // img.value = null;
    // questions.value = [{ description: '', img: null, answers: [...] }];
    // ... и т.д.
  } catch (error) {
    // Обработка ошибок при отправке или от сервера
    let errorMessageText = "Ошибка при создании теста"; // Сообщение по умолчанию
    if (error.response) {
      // Ошибка пришла от сервера (статус не 2xx)
      console.error(
        "Ошибка от сервера:",
        error.response.status,
        error.response.data
      );
      // Пытаемся получить сообщение об ошибке из ответа сервера
      errorMessageText += `: ${
        error.response.data.message || `Статус ${error.response.status}`
      }`;
      if (error.response.data.error) {
        // Если сервер прислал доп. инфо об ошибке
        errorMessageText += ` (${error.response.data.error})`;
      }
    } else if (error.request) {
      // Запрос был сделан, но ответ не получен (проблема сети, сервер недоступен)
      console.error("Ошибка запроса (нет ответа):", error.request);
      errorMessageText += ": Сервер не отвечает или проблема с сетью.";
    } else {
      // Ошибка на этапе настройки запроса (редко)
      console.error("Ошибка настройки запроса:", error.message);
      errorMessageText += `: ${error.message}`;
    }
    alert(errorMessageText); // Показываем сообщение об ошибке пользователю
    console.error("Полный объект ошибки:", error); // Логируем полную ошибку для отладки
  }
}
</script>

<style scoped>
@import "../css/components/block/buttons/button.css";
@import "../css/components/block/inputs/input.css";
@import "../css/components/variables/text-style.css";
@import "../css/components/variables/variables.css";
@import "../css/pages/create-test.css";
</style>
