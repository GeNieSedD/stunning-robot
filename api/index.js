const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./src/router/auth-router"); // Подключение маршрутов
const testRoutes = require("./src/router/test-router");
const groupRoutes = require("./src/router/group-router");
const studentRoutes = require("./src/router/student-router");
const teacherRoutes = require("./src/router/teacher-router");
const gradesRouter = require("./src/router/grades-router");
const errorHandler = require("./src/middleware/errorHandler"); // Обработчик ошибок
const app = express();
const PORT = 8080;

/// 🧠 CORS — авторизация и HTTPS для Codespaces
const corsOptions = {
  origin: "https://legendary-waddle-pj95gxxjrpr5366vq-8081.app.github.dev",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};
app.use(cors(corsOptions));

// Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use("/img", express.static(path.join(__dirname, "src", "public", "img")));
// Подключение маршрутов
app.use("/api/auth", authRoutes); // Подключить маршруты аутентификации
app.use("/api/auth/createTest", testRoutes); // Подключить маршруты тестов
app.use("/api/auth/groups", groupRoutes);
app.use("/api/auth/student", studentRoutes);
app.use("/api/auth/teacher", teacherRoutes);
app.use("/api/auth", gradesRouter);
// Обработчик ошибок
app.use(errorHandler);
app.use(cors());
// Логирование запросов
app.use("/api/auth", (req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
