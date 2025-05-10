const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

exports.allTeacher = async (req, res) => {
    try {
        const allTeacher = await prisma.teacher.findMany({
            include: {
                teacherGroups: {
                    include: {
                        select: {
                            include: {
                                group: {
                                    title: true
                                }
                            }
                        }
                    }
                }
            }
        })

        const result = allTeacher.map(teacher => ({
            name: teacher.name,
            lastname: teacher.lastname,
            partronymic: teacher.patronymic,
            title: teacher.teacherGroups.group.title
        }))
        res.status(200).json(result);
        console.log(result)
    }
    catch(error){
        console.error('Ошибка при получении учителей', error);
        res.status(500).json({message: "Ошибка сервера при выполнении запроса"})
    }
}