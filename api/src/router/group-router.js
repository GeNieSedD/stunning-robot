const express = require("express");
const router = express.Router();
const groupController = require("../controllers/group-controller");

router.get("/groupAll", groupController.getAllGroups);
router.get(
  "/:userId",
  (req, res, next) => {
    console.log(
      "Запрос на получение групп для пользователя:",
      req.params.userId
    );
    next();
  },
  groupController.getUserGroups
);
router.post("/upload-groups", (req, res) => {
  const groupsData = req.body; // Получение данных из тела запроса

  groupController
    .insertData(groupsData)
    .then(() => res.status(200).send("Данные успешно добавлены"))
    .catch((err) =>
      res.status(500).send("Ошибка при добавлении данных: " + err.message)
    );
});
router.delete("/:groupId", groupController.deleteGroup);
module.exports = router;
