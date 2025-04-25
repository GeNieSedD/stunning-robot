const { PrismaClient } = require('@prisma/client');
const { dmmfToRuntimeDataModel } = require('@prisma/client/runtime/library');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { login, password } = req.body;
    console.log('REGISTER BODY:', req.body);
    const passwordhash = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                login,
                passwordhash,
                roleid: 1, // предопределенный или изменяемый id роли
            },
        });

        res.status(201).json({ message: 'User registered', user });
    } catch (error) {
        if (error.code === 'P2002') { // Код ошибки для уникального ограничения в Prisma
            return res.status(400).json({ message: 'Login already exists' });
        }
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
};
// Авторизация пользователя
exports.login = async (req, res) => {
    const { login, password } = req.body;
  
    try {
      const user = await prisma.user.findUnique({
        where: { login },
        include: {
          role: true,
          teachers: true,
          students: true
        }
      });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid login or password' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.passwordhash);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid login or password' });
      }
  
      // Успешный ответ, ОСТАНАВЛИВАЕМ флоу!
      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          login: user.login,
          role: user.role.title,
          roleId: user.roleid,
          student: user.students ?? null,
          teacher: user.teachers ?? null
        }
      });
    } catch (error) {
      console.error('Error logging in:', error);
      
      if (!res.headersSent) {
        return res.status(500).json({ message: 'Error logging in', error: error.message });
      }
    }
  };
  