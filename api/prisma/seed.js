const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const TEACHER_ROLE = 1;
const STUDENT_ROLE = 2;

const teacherUsers = [
  { login: 'Kozlov', password: 'pass1111', fio: ['Максим', 'Козлов', 'Валерьевич'] },
  { login: 'Chubarova', password: 'pass2222', fio: ['Ольга', 'Чубарова', 'Борисовна'] },
  { login: 'Kotikov', password: 'pass3333', fio: ['Андрей', 'Котиков', 'Андреевич'] },
];

const groups = [
  { title: 'АТ1-11', course: 1 },
  { title: 'ИП1-11', course: 1 },
  { title: 'ИП1-21', course: 2 },
  { title: 'ИП1-31', course: 3 },
  { title: 'ДЗ1-31', course: 3 },
];

// Примеры студентов для выдачи логин/пароль
const exampleStudents = [
  { login: 'stud001', password: '111111', fio: ['Иван', 'Иванов', 'Иванович'] },
  { login: 'stud002', password: '222222', fio: ['Петр', 'Петров', 'Петрович'] },
  { login: 'stud003', password: '333333', fio: ['Сидор', 'Сидоров', 'Сидорович'] },
  { login: 'stud004', password: '444444', fio: ['Олег', 'Олегов', 'Олегович'] },
  { login: 'stud005', password: '555555', fio: ['Анна', 'Аннова', 'Андреевна'] },
  { login: 'stud006', password: '666666', fio: ['Мария', 'Маркова', 'Михайловна'] },
  { login: 'stud007', password: '777777', fio: ['Елена', 'Еленова', 'Егоровна'] },
];

async function main() {
  // 1. Создание ролей
  await prisma.role.createMany({
    data: [
      { id: TEACHER_ROLE, title: 'Преподаватель' },
      { id: STUDENT_ROLE, title: 'Студент' },
    ],
    skipDuplicates: true,
  });

  // 2. Создание групп
  for (let i = 0; i < groups.length; i++) {
    await prisma.groups.upsert({
      where: { id: i + 1 },
      update: {},
      create: { id: i + 1, ...groups[i] },
    });
  }

  // 3. Преподаватели (Users + Teachers)
  const teacherUserIds = [];
  for (let i = 0; i < teacherUsers.length; i++) {
    const { login, password, fio } = teacherUsers[i];
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        login,
        passwordhash: hash,
        roleid: TEACHER_ROLE,
      },
    });
    teacherUserIds.push(user.id);

    await prisma.teacher.create({
      data: {
        name: fio[0],
        lastname: fio[1],
        patronymic: fio[2],
        userid: user.id,
      },
    });
  }

  // 4. Студенты (Users + Students)
  // Сначала 7 студентов с известными паролями
  let studentUserIds = [];
  for (let i = 0; i < exampleStudents.length; i++) {
    const { login, password, fio } = exampleStudents[i];
    const hash = await bcrypt.hash(password, 10);
    // Раздаем по группам циклично
    const groupId = (i % groups.length) + 1;

    const user = await prisma.user.create({
      data: {
        login,
        passwordhash: hash,
        roleid: STUDENT_ROLE,
      },
    });
    studentUserIds.push(user.id);

    await prisma.students.create({
      data: {
        name: fio[0],
        lastname: fio[1],
        patronymic: fio[2],
        userId: user.id,
        groupId: groupId,
      },
    });
  }

  // Остальные 110 студентов (рандомные данные)
  for (let i = 7; i < 117; i++) {
    const login = `student${(i + 1).toString().padStart(3, '0')}`;
    const password = Math.random().toString(36).slice(-8); // рандомный пароль, не нужен для вывода
    const hash = await bcrypt.hash(password, 10);
    const groupId = (i % groups.length) + 1;

    const user = await prisma.user.create({
      data: {
        login,
        passwordhash: hash,
        roleid: STUDENT_ROLE,
      },
    });
    studentUserIds.push(user.id);

    await prisma.students.create({
      data: {
        name: `Имя${i + 1}`,
        lastname: `Фамилия${i + 1}`,
        patronymic: `Отчество${i + 1}`,
        userId: user.id,
        groupId: groupId,
      },
    });
  }

  // 5. TeacherGroups
  // 1 1 1
  // 1 1 2
  // 1 2 3
  // 1 2 4
  // 1 3 5
  await prisma.teacherGroups.createMany({
    data: [
      { teacherId: 1, groupId: 1 },
      { teacherId: 1, groupId: 2 },
      { teacherId: 2, groupId: 3 },
      { teacherId: 2, groupId: 4 },
      { teacherId: 3, groupId: 5 },
    ],
    skipDuplicates: true,
  });

  console.log('\n------ Преподаватели (логин/пароль) ------');
  teacherUsers.forEach(t =>
    console.log(`${t.login} / ${t.password}`)
  );
  console.log('\n------ Примеры студентов (логин/пароль) ------');
  exampleStudents.forEach(s =>
    console.log(`${s.login} / ${s.password}`)
  );
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
