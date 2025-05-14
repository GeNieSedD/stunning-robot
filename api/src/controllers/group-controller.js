const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUserGroups = async (req, res) => {
  const userId = Number(req.params.userId);
  console.log("Запрос на получение групп для пользователя:", userId);
  console.log("Вызван метод getUserGroups");
  try {
    const groupTitles = await prisma.$queryRaw`
      SELECT g.id, g.title
      FROM "User" u
      JOIN "Teacher" t ON t."userid" = u.id
      JOIN "TeacherGroups" tg ON tg."teacherId" = t.id
      JOIN "Groups" g ON g.id = tg."groupId"
      WHERE u.id = ${userId}`;
    console.log("✅ Названия групп (SQL):", groupTitles);
    res.json({ groupTitles });
  } catch (err) {
    console.error("❌ Ошибка при выполнении SQL-запроса:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
exports.getAllGroups = async (req, res) => {
  console.log("Вызван метод getAllGroups");
  try {
    const groups = await prisma.groups.findMany({
      select: {
        title: true,
        course: true,
      },
    });
    res.status(200).json(groups);
    console.log("Полученные группы:", groups);
  } catch (error) {
    console.error("Ошибка при получении групп", error);
    res.status(500).json({ message: "Ошибка сервера при выполнении запроса" });
  }
};

exports.deleteGroup = async (req, res) => {
  console.log("Вызван метод getAllGroups");
  try {
    const groups = await prisma.groups.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json(groups);
  } catch (error) {
    console.error("Ошибка при удалении группы", error);
    res.status(500).json({ message: "Ошибка сервера при выполнении запроса" });
  }
};

async function insertData(groups) {
  try {
    for (const group of groups) {
      await prisma.$executeRaw`
        INSERT INTO "Groups" (title, course)
        VALUES (${group.title}, ${group.course})
      `;
    }
  } catch (error) {
    console.error("Ошибка при добавлении группы:", error);
    throw new Error("Ошибка при добавлении данных: " + error.message);
  }
}

exports.insertData = insertData;
