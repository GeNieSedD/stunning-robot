const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./src/router/auth-router'); // Подключение маршрутов
const testRoutes = require('./src/router/test-router')
const groupRoutes = require('./src/router/group-router')
const errorHandler = require('./src/middleware/errorHandler'); // Обработчик ошибок
const app = express();
const PORT = 8080;

/// 🧠 CORS — авторизация и HTTPS для Codespaces
const corsOptions = {
    origin: 'https://musical-succotash-5wg5wvrv677fv5pw-8081.app.github.dev',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
  };
  app.use(cors(corsOptions));
  
  // Middlewares
  app.use(bodyParser.json());
  app.use(express.json());

// Подключение маршрутов
app.use('/api/auth', authRoutes); // Подключить маршруты аутентификации
app.use('/api/auth/tests', testRoutes); // Подключить маршруты тестов
app.use('/api/auth/groups', groupRoutes);

// Обработчик ошибок
app.use(errorHandler);
app.use(cors());
// Логирование запросов
app.use('/api/auth', (req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});