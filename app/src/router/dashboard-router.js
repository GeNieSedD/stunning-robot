import DashboardTeacher from "../components/dashboard-teacher.vue";
import CreateTask from "../components/create-task.vue";
import dashboardAdmin from "../module/admin/dashboard-admin.vue";
import groupAdmin from "../module/admin/group-admin.vue";
import studentAdmin from "../module/admin/student-admin.vue";
import dashboardStudent from "../module/student/dashboard-student.vue";
import test from "../module/student/test.vue";
import onlineDiary from "../module/teacher/online-diary.vue";
const router = [
  {
    path: "/dashboardTeacher",
    name: "DashboardTeacher",
    component: DashboardTeacher,
  },
  {
    path: "/CreateTask",
    name: "CreateTask",
    component: CreateTask,
  },
  {
    path: "/dashboardAdmin",
    name: "DashboardAdmin",
    component: dashboardAdmin,
  },
  {
    path: "/groupAdmin",
    name: "GroupAdmin",
    component: groupAdmin,
  },
  {
    path: "/studentAdmin",
    name: "studentAdmin",
    component: studentAdmin,
  },
  {
    path: "/dashboardStudent",
    name: "DashboardStudent",
    component: dashboardStudent,
  },
  {
    path: "/test/:testId",
    name: "Test",
    component: test,
  },
  {
    path: "/diary",
    name: "Diary",
    component: onlineDiary,
  },
];

export default router;
