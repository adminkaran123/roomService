import { Role } from '../generated/graphql';
import { SidebarListItem } from '../utils/types/ListItems';
import {
  ACCOUNT_NAVIGATION_ICON,
  COURSE_CATALOG_NAVIGATION_ICON,
  COURSE_NAVIGATION_ICON,
  DASHBOARD_NAVIGATION_ICON,
  ENGAGMENT_NAVIGATION_ICON,
  INSTITUTIONS_NAVIGATION_ICON,
  LAB_CATALOG_NAVIGATION_ICON,
  LESSONS_NAVIGATION_ICON,
  QUIZ_NAVIGATION_ICON,
  SVG_ICON_BASE,
  USERS_NAVIGATION_ICON,
} from '../variables/svgConstants';
import {
  BILLING_INFORMATION,
  SIDEBAR_ITEM_ACCOUNT_TITLE,
  SIDEBAR_ITEM_COURSE_CATALOG_TITLE,
  SIDEBAR_ITEM_COURSES_TITLE,
  SIDEBAR_ITEM_DASHBOARD_TITLE,
  SIDEBAR_ITEM_ENGAGEMENTS_TITLE,
  SIDEBAR_ITEM_INSTANCES_TITLE,
  SIDEBAR_ITEM_LAB_CATALOG_TITLE,
  SIDEBAR_ITEM_LABS_TITLE,
  SIDEBAR_ITEM_LESSONS_TITLE,
  SIDEBAR_ITEM_NOTIFICATIONS_TITLE,
  SIDEBAR_ITEM_ORGANIGATION_TITLE,
  SIDEBAR_ITEM_PERSONAL_INFO_TITLE,
  SIDEBAR_ITEM_QUIZ_TITLE,
  SIDEBAR_ITEM_SECURITY_INFO_TITLE,
  SIDEBAR_ITEM_TEMPLATES_TITLE,
  SIDEBAR_ITEM_USERS_TITLE,
} from '../variables/textConstants';
import { PATH_DASHBOARD } from './paths';

export const pathItems: SidebarListItem[] = [
  {
    label: SIDEBAR_ITEM_ACCOUNT_TITLE,
    icon: ACCOUNT_NAVIGATION_ICON,
    path: '',
    allowedRoles: [Role.Admin, Role.Instructor, Role.Student, Role.Contact],
    subPaths: [
      {
        id: '1',
        label: BILLING_INFORMATION,
        icon: '',
        path: PATH_DASHBOARD.billingInformation,
        allowedRoles: [Role.Instructor, Role.Student],
      },
      {
        id: '2',
        label: SIDEBAR_ITEM_PERSONAL_INFO_TITLE,
        icon: '',
        path: PATH_DASHBOARD.personalInformation,
      },
      {
        id: '3',
        label: SIDEBAR_ITEM_SECURITY_INFO_TITLE,
        icon: '',
        path: PATH_DASHBOARD.securityInformation,
      },
      {
        id: '4',
        label: SIDEBAR_ITEM_NOTIFICATIONS_TITLE,
        icon: '',
        path: PATH_DASHBOARD.notifications,
        allowedRoles: [Role.Instructor, Role.Student, Role.Contact],
      },
    ],
  },
  {
    label: SIDEBAR_ITEM_DASHBOARD_TITLE,
    icon: DASHBOARD_NAVIGATION_ICON,
    path: PATH_DASHBOARD.root,
    allowedRoles: [Role.Instructor, Role.Student],
  },
  {
    label: SIDEBAR_ITEM_COURSES_TITLE,
    icon: COURSE_NAVIGATION_ICON,
    path: '',
    subPaths: [
      {
        id: '1',
        label: SIDEBAR_ITEM_TEMPLATES_TITLE,
        icon: COURSE_CATALOG_NAVIGATION_ICON,
        path: PATH_DASHBOARD.templates,
      },
      {
        id: '2',
        label: SIDEBAR_ITEM_INSTANCES_TITLE,
        icon: COURSE_NAVIGATION_ICON,
        path: PATH_DASHBOARD.instances,
      },
    ],
    allowedRoles: [Role.Admin],
  },
  {
    label: SIDEBAR_ITEM_LABS_TITLE,
    icon: LAB_CATALOG_NAVIGATION_ICON,
    path: PATH_DASHBOARD.labs,
    allowedRoles: [Role.Admin],
  },
  {
    label: SIDEBAR_ITEM_LESSONS_TITLE,
    icon: LESSONS_NAVIGATION_ICON,
    path: PATH_DASHBOARD.lessons,
    allowedRoles: [Role.Admin],
  },
  {
    label: SIDEBAR_ITEM_QUIZ_TITLE,
    icon: QUIZ_NAVIGATION_ICON,
    path: PATH_DASHBOARD.quiz,
    allowedRoles: [Role.Admin],
  },
  {
    label: SIDEBAR_ITEM_ORGANIGATION_TITLE,
    icon: INSTITUTIONS_NAVIGATION_ICON,
    path: PATH_DASHBOARD.institutions,
    allowedRoles: [Role.Admin],
  },
  {
    label: SIDEBAR_ITEM_ENGAGEMENTS_TITLE,
    icon: ENGAGMENT_NAVIGATION_ICON,
    path: PATH_DASHBOARD.engagements,
    allowedRoles: [Role.Admin, Role.Contact],
  },
  {
    label: SIDEBAR_ITEM_USERS_TITLE,
    icon: USERS_NAVIGATION_ICON,
    path: PATH_DASHBOARD.users,
    allowedRoles: [Role.Admin],
  },
  {
    label: SIDEBAR_ITEM_COURSE_CATALOG_TITLE,
    icon: COURSE_CATALOG_NAVIGATION_ICON,
    path: PATH_DASHBOARD.courseCatalog,
    allowedRoles: [Role.Instructor],
  },
  {
    label: SIDEBAR_ITEM_LAB_CATALOG_TITLE,
    icon: LAB_CATALOG_NAVIGATION_ICON,
    path: PATH_DASHBOARD.labCatalog,
    allowedRoles: [Role.Instructor],
  },
];
