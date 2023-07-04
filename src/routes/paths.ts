// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_ACCOUNT = '/account';
const ROOTS_LESSONS = '/lessons';
const ROOTS_ORGNAIZATIONS = '/organizations';
const ROOTS_LABS = '/labs';
const ROOTS_TEMPLATE = '/templates';
const ROOTS_INSTANCES = '/instances';
const ROOTS_MODULES = '/modules';
const ROOTS_COURSES = '/courses';
const ROOTS_USERS = '/users';
const ROOTS_STUDENTS = '/students';
const ROOTS_GRADES = '/grades';
const ROOTS_STUDENT_GRADES = '/student_grades';
const ROOTS_QUIZ = '/quiz';
const ROOTS_ENGAGEMENTS = '/engagements';

export const PATH_AUTH = {
  root: path(ROOTS_AUTH, 'root'),
  login: ROOTS_AUTH,
  resetPassword: path(ROOTS_AUTH, 'resetPassword'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  lessons: ROOTS_LESSONS,
  createLesson: path(ROOTS_AUTH, 'lessons/create'),
  account: ROOTS_ACCOUNT,
  labs: ROOTS_LABS,
  createLab: `${ROOTS_LABS}/create`,
  labCatalog: `${ROOTS_LABS}/catalog`,
  templates: ROOTS_TEMPLATE,
  templateDetails: `${ROOTS_TEMPLATE}/template`,
  instances: ROOTS_INSTANCES,
  modules: ROOTS_MODULES,
  createModule: `${ROOTS_MODULES}/create`,
  createCourse: `${ROOTS_COURSES}/create`,
  editCourse: `${ROOTS_COURSES}/edit`,
  duplicateCourse: `${ROOTS_COURSES}/duplicate`,
  archiveCourse: `/archive-courses`,
  courseModules: `${ROOTS_COURSES}/:courseId/modules`,
  courseModuleDetail: `${ROOTS_COURSES}/:courseId/modules/:moduleId`,
  users: ROOTS_USERS,
  createUser: `${ROOTS_USERS}/create`,
  courseCatalog: `${ROOTS_COURSES}/catalog`,
  courseDashboard: `${ROOTS_COURSES}/dashboard`,
  students: ROOTS_STUDENTS,
  grades: ROOTS_GRADES,
  student_grades: ROOTS_STUDENT_GRADES,
  paymentHistory: `${ROOTS_ACCOUNT}/payment_history`,
  personalInformation: `${ROOTS_ACCOUNT}/personal_information`,
  securityInformation: `${ROOTS_ACCOUNT}/security_information`,
  notifications: `${ROOTS_ACCOUNT}/notifications`,
  billingInformation: `${ROOTS_ACCOUNT}/billing_information`,
  institutions: ROOTS_ORGNAIZATIONS,
  createOrganizations: `${ROOTS_ORGNAIZATIONS}/create`,
  quiz: ROOTS_QUIZ,
  createQuiz: `${ROOTS_QUIZ}/create`,
  checkoutPayment: `${ROOTS_ACCOUNT}/checkout`,
  engagements: ROOTS_ENGAGEMENTS,
  createEngagements: `${ROOTS_ENGAGEMENTS}/create`,
};
