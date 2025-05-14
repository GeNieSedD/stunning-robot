const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

exports.allStudents = async (req, res) => {
    try {
        const allStudents  = await prisma.students.findMany({
            include: {
                group: {
                    select: {
                        title: true,
                        course: true,
                    }
                }
            }
        })

        const result = allStudents.map(student => ({
            name: student.name,
            lastname: student.lastname,
            partronymic: student.patronymic,
            groupTitle: student.group.title,
            course: student.group.course,
        }))
        res.status(200).json(result);
        console.log(result)
    }
    catch(error){
        console.error('Ошибка при получении студентов', error);
        res.status(500).json({message: "Ошибка сервера при выполнении запроса"})
    }
}