import { DashboardOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { UnorderedListOutlined } from "@ant-design/icons";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { MedicineBoxOutlined } from "@ant-design/icons";
import {
  HomeOutlined,
  MailOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import { APP_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "Dashboards",
    path: `${APP_PREFIX_PATH}/dashboards/default`,
    title: "sidenav.dashboard",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "News",
    path: `${APP_PREFIX_PATH}/news`,
    title: "Actualités",
    icon: MedicineBoxOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "Partner",
    path: `${APP_PREFIX_PATH}/partner`,
    title: "Partenaire",
    icon: UsergroupAddOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "headcount",
    path: `${APP_PREFIX_PATH}/headcount`,
    title: "Effectif",
    icon: UserOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: "Players",
        path: `${APP_PREFIX_PATH}/headcount/players`,
        title: "Joueurs",
        icon: "",
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "Staff",
        path: `${APP_PREFIX_PATH}/headcount/staff`,
        title: "Staff",
        icon: "",
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
  {
    key: "Matchs",
    path: `${APP_PREFIX_PATH}/matchs`,
    title: "Matchs",
    icon: UnorderedListOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "Club",
    path: `${APP_PREFIX_PATH}/club`,
    title: "Club",
    icon: HomeOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "Message",
    path: `${APP_PREFIX_PATH}/messages`,
    title: "Message",
    icon: MailOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "TV",
    path: `${APP_PREFIX_PATH}/lives`,
    title: "TV",
    icon: VideoCameraOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
