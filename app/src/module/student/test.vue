<template>
  <div class="template">
    <div class="menu">
      <div class="info-test">
        <div class="info-time">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              d="M6.6665 1.83337H9.33317M7.99984 9.83337L9.99984 7.83337M13.3332 9.83337C13.3332 12.7789 10.9454 15.1667 7.99984 15.1667C5.05432 15.1667 2.6665 12.7789 2.6665 9.83337C2.6665 6.88785 5.05432 4.50004 7.99984 4.50004C10.9454 4.50004 13.3332 6.88785 13.3332 9.83337Z"
              stroke="#3D3D3D"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h3 class="healding-3">Время выполнения</h3>
          <span id="time" class="texting-1">{{ displayTestTime }}</span>
        </div>
        <h3 class="healding-3" id="colorBlue">{{ displayTestTitle }}</h3>
      </div>
      <nav class="cards-question">
        <div
          v-for="(question, index) in questionsAll"
          :key="question.id"
          class="card"
          :class="{ 'card-is-active': currentQuestionIndex === index }"
          @click="selectQuestionByIndex(index)"
        >
          <h3 class="healding-3">Вопрос {{ index + 1 }}</h3>

          <span class="texting-2">{{
            question.description || question.text || "Загрузка..."
          }}</span>
        </div>
        <div v-if="!questionsAll.length">
          <p>Загрузка списка вопросов...</p>
        </div>
      </nav>
    </div>

    <main
      class="content-test"
      v-if="currentQuestionObject && questionsAll.length > 0"
    >
      <div class="test-texting">
        <h2 class="healding-1">
          Вопрос {{ currentQuestionIndex + 1 }} из {{ questionsAll.length }}
        </h2>

        <h1 class="big-healding">
          {{
            currentQuestionObject.text ||
            currentQuestionObject.description ||
            "Текст вопроса загружается..."
          }}
        </h1>
      </div>

      <div class="display-test">
        <div class="img-container" v-if="currentQuestionObject.image_url">
          <img
            :src="currentQuestionObject.image_url"
            alt="Изображение к вопросу"
            class="question-image"
          />
        </div>

        <div class="answers">
          <div
            v-for="answer in currentQuestionAnswers"
            :key="answer.id"
            class="tab texting-3"
            :class="{ 'answer-selected': selectedAnswerId === answer.id }"
            @click="handleAnswerSelect(answer.id)"
          >
            {{ answer.text || "Вариант ответа..." }}
          </div>
          <div v-if="!currentQuestionAnswers.length && currentQuestionObject">
            <p class="texting-3">Загрузка вариантов ответов...</p>
          </div>
          <div
            v-if="
              currentQuestionAnswers.length === 0 &&
              currentQuestionObject &&
              !isLoadingAnswers
            "
          >
            <p class="texting-3">Для этого вопроса нет вариантов ответов.</p>
          </div>
        </div>
      </div>

      <div class="buttons">
        <button
          class="button button-secondary healding-3"
          @click="finishTest"
          v-if="
            currentQuestionIndex >= questionsAll.length - 1 && selectedAnswerId
          "
        >
          Завершить тест
        </button>
        <button
          class="button button-primary healding-3"
          @click="goToNextQuestion"
          :disabled="!selectedAnswerId"
          v-if="currentQuestionIndex < questionsAll.length - 1"
        >
          Ответить на вопрос
        </button>
      </div>
    </main>

    <main
      class="content-test"
      v-else-if="questionsAll.length > 0 && !currentQuestionObject"
    >
      <h2 class="healding-1">Выберите вопрос из списка слева, чтобы начать.</h2>
    </main>

    <main class="content-test" v-else>
      <h2 class="healding-1">Загрузка теста...</h2>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import http from "@/http-common"; // Убедись, что путь к http-common верный
import { useRoute } from "vue-router";

const route = useRoute();
const currentTestId = route.params.testId;

// --- ОСНОВНЫЕ ДАННЫЕ ТЕСТА ---
const testDetails = ref(null); // Детали теста (название, время и т.д.)
const questionsAll = ref([]); // Массив всех вопросов теста
const user = ref(null); // Информация о пользователе (если нужна)

// --- СОСТОЯНИЕ ТЕКУЩЕГО ПРОХОЖДЕНИЯ ТЕСТА ---
const currentQuestionIndex = ref(-1); // Индекс текущего отображаемого вопроса в массиве questionsAll
const currentQuestionAnswers = ref([]); // Варианты ответов для текущего вопроса
const selectedAnswerId = ref(null); // ID ответа, выбранного пользователем для текущего вопроса
const isLoadingAnswers = ref(false); // Флаг для отслеживания загрузки ответов
const userAnswers = ref({}); // Объект для хранения ответов пользователя { questionId: answerId }

// --- ВЫЧИСЛЯЕМЫЕ СВОЙСТВА ---

// Объект текущего вопроса
const currentQuestionObject = computed(() => {
  if (
    currentQuestionIndex.value >= 0 &&
    questionsAll.value.length > currentQuestionIndex.value
  ) {
    return questionsAll.value[currentQuestionIndex.value];
  }
  return null;
});

// Форматированное время выполнения теста для отображения
const displayTestTime = computed(() => {
  if (testDetails.value === null) {
    return "Загрузка времени...";
  }
  if (testDetails.value && testDetails.value.time) {
    return testDetails.value.time;
  }
  return "Время не указано";
});

// Название теста для отображения
const displayTestTitle = computed(() => {
  if (testDetails.value === null) {
    return "Загрузка названия...";
  }
  if (testDetails.value && testDetails.value.title) {
    return testDetails.value.title;
  }
  return "Название теста не загружено";
});

// --- ФУНКЦИИ ЗАГРУЗКИ ДАННЫХ ---

// Загрузка деталей теста (название, время и т.д.)
const fetchTestDetails = async (idOfTest) => {
  try {
    const res = await http(`/createTest/test/${idOfTest}`); // Убедись, что URL правильный
    testDetails.value = res.data || null;
    console.log("Информация о тесте: ", testDetails.value);
  } catch (error) {
    console.error("Ошибка при получении информации о тесте", error);
    testDetails.value = null;
  }
};

// Загрузка всех вопросов для теста
const fetchQuestionsAll = async (idOfTest) => {
  try {
    const res = await http(`/createTest/tests/${idOfTest}/questions`); // Убедись, что URL правильный
    questionsAll.value = res.data || [];
    console.log("Ответ сервера (вопросы):", questionsAll.value);
    if (questionsAll.value.length > 0) {
      selectQuestionByIndex(0); // Автоматически выбрать первый вопрос
    } else {
      currentQuestionIndex.value = -1; // Если вопросов нет, сбрасываем индекс
    }
  } catch (error) {
    console.error("Ошибка при получении вопросов", error);
    questionsAll.value = [];
    currentQuestionIndex.value = -1;
  }
};

// Загрузка вариантов ответов для конкретного вопроса
const fetchAnswersForQuestion = async (questionId) => {
  if (!questionId) {
    currentQuestionAnswers.value = [];
    return;
  }
  isLoadingAnswers.value = true;
  currentQuestionAnswers.value = [];
  try {
    const res = await http(`/createTest/questions/${questionId}`);
    currentQuestionAnswers.value = res.data || [];
    console.log(
      `Ответы для вопроса ${questionId}:`,
      currentQuestionAnswers.value
    );
  } catch (error) {
    console.error(
      `Ошибка при получении ответов для вопроса ${questionId}`,
      error
    );
    currentQuestionAnswers.value = [];
  } finally {
    isLoadingAnswers.value = false;
  }
};

// --- ЛОГИКА УПРАВЛЕНИЯ ПРОХОЖДЕНИЕМ ТЕСТА ---

// Выбор вопроса по его индексу в массиве questionsAll
const selectQuestionByIndex = (index) => {
  if (index >= 0 && index < questionsAll.value.length) {
    currentQuestionIndex.value = index;
    selectedAnswerId.value = null; // Сбросить выбранный ответ при смене вопроса
    // Загрузка ответов для нового текущего вопроса будет инициирована через watch
  }
};

// Обработчик выбора варианта ответа пользователем
const handleAnswerSelect = (answerId) => {
  selectedAnswerId.value = answerId;
};

// Переход к следующему вопросу или завершение теста
const goToNextQuestion = () => {
  if (!selectedAnswerId.value || !currentQuestionObject.value) return;

  // Сохраняем ответ пользователя
  userAnswers.value[currentQuestionObject.value.id] = selectedAnswerId.value;
  console.log("Текущие ответы пользователя:", userAnswers.value);

  if (currentQuestionIndex.value < questionsAll.value.length - 1) {
    selectQuestionByIndex(currentQuestionIndex.value + 1);
  } else {
    // Это был последний вопрос, кнопка должна была измениться на "Завершить тест"
    // Но если логика кнопки другая, можно вызвать finishTest() отсюда
    console.log("Достигнут последний вопрос. Нажмите 'Завершить тест'.");
    // finishTest(); // Если нужно завершать сразу после ответа на последний вопрос
  }
};

// Завершение теста
const finishTest = () => {
  if (currentQuestionObject.value && selectedAnswerId.value) {
    // Убеждаемся, что ответ на ПОСЛЕДНИЙ вопрос тоже сохранен, если goToNextQuestion не вызывался
    if (!userAnswers.value[currentQuestionObject.value.id]) {
      userAnswers.value[currentQuestionObject.value.id] =
        selectedAnswerId.value;
    }
  }

  console.log(
    "Тест завершен! Финальные ответы пользователя:",
    userAnswers.value
  );
  // Здесь будет логика отправки userAnswers.value на сервер,
  // подсчета результатов, отображения страницы результатов и т.д.
  alert("Тест завершен! Результаты в консоли."); // Временное уведомление
};

// --- НАБЛЮДАТЕЛИ (WATCHERS) ---

// Наблюдаем за изменением текущего вопроса (currentQuestionObject),
// чтобы автоматически загружать варианты ответов для него.
watch(
  currentQuestionObject,
  (newQuestion) => {
    if (newQuestion && newQuestion.id) {
      fetchAnswersForQuestion(newQuestion.id);
    } else {
      currentQuestionAnswers.value = []; // Очищаем ответы, если вопрос не выбран
    }
  },
  { immediate: false }
); // immediate: false, так как fetchQuestionsAll вызовет selectQuestionByIndex,
// который установит currentQuestionIndex, что изменит currentQuestionObject
// и тогда watch сработает. Если будут проблемы, можно поставить true.

// --- ХУК ЖИЗНЕННОГО ЦИКЛА ---
onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser);
    } catch (error) {
      console.error("Ошибка парсинга пользователя из localStorage:", error);
      user.value = null;
    }
  } else {
    console.warn("Нет сохранённого пользователя в localStorage");
  }

  if (currentTestId) {
    fetchTestDetails(currentTestId);
    fetchQuestionsAll(currentTestId); // Это инициирует загрузку вопросов,
    // выбор первого вопроса и загрузку его ответов через watch.
  } else {
    console.error("Test ID не найден в параметрах роута!");
    // Можно отобразить сообщение об ошибке пользователю
  }
});
</script>

<style scoped>
@import "./UI/test.css";
</style>
