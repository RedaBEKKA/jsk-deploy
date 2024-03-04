import React from "react";
import {
  AUTH_PREFIX_PATH,
  APP_PREFIX_PATH,
  REGISTER_PREFIX_PATH,
  REGISTER_ENTRY_KEY,
} from "configs/AppConfig";

export const publicRoutes = [
  {
    key: "login",
    path: `${AUTH_PREFIX_PATH}/login`,
    component: React.lazy(() =>
      import("views/auth-views/authentication/login")
    ),
  },
  {
    key: "register",
    path: `${REGISTER_PREFIX_PATH}/register/${REGISTER_ENTRY_KEY}`,
    component: React.lazy(() =>
      import("views/auth-views/authentication/register")
    ),
  },
  // {
  //   key: "forgot-password",
  //   path: `${AUTH_PREFIX_PATH}/forgot-password`,
  //   component: React.lazy(() =>
  //     import("views/auth-views/authentication/forgot-password")
  //   ),
  // },
  // {
  //   key: "forgot-password-changePassword",
  //   path: `${AUTH_PREFIX_PATH}/forgot-password/changePasswords/:token`,
  //   component: React.lazy(() =>
  //     import(
  //       "views/auth-views/authentication/forgot-password/ChangePasswordForm"
  //     )
  //   ),
  // },
];

export const protectedRoutes = [
  {
    key: "Dashboards",
    path: `${APP_PREFIX_PATH}/dashboards/default`,
    component: React.lazy(() => import("views/app-views/dashboards/default")),
  },
  {
    key: "News",
    path: `${APP_PREFIX_PATH}/news/*`,
    component: React.lazy(() => import("views/app-views/news")),
  },
  {
    key: "News.list",
    path: `${APP_PREFIX_PATH}/news/liste`,
    component: React.lazy(() => import("views/app-views/news/newsList")),
  },
  {
    key: "News.add",
    path: `${APP_PREFIX_PATH}/news/add`,
    component: React.lazy(() => import("views/app-views/news/newsAdd")),
  },
  {
    key: "News.edit",
    path: `${APP_PREFIX_PATH}/news/edit/:id `,
    component: React.lazy(() => import("views/app-views/news/newsEdit")),
  },
  {
    key: "News.profile",
    path: `${APP_PREFIX_PATH}/news/profil/:id`,
    // component: React.lazy(() => import("views/app-views/news/newsProfile")),
  },
  {
    key: "Partner",
    path: `${APP_PREFIX_PATH}/partner/*`,
    component: React.lazy(() => import("views/app-views/partner")),
  },
  {
    key: "Partner.list",
    path: `${APP_PREFIX_PATH}/partner/liste`,
    component: React.lazy(() => import("views/app-views/partner/partnerList")),
  },
  {
    key: "Partner.add",
    path: `${APP_PREFIX_PATH}/partner/add`,
    component: React.lazy(() => import("views/app-views/partner/partnerAdd")),
  },
  {
    key: "Partner.edit",
    path: `${APP_PREFIX_PATH}/partner/edit/:id `,
    component: React.lazy(() => import("views/app-views/partner/partnerEdit")),
  },
  {
    key: "Partner.profile",
    path: `${APP_PREFIX_PATH}/partner/profil/:id`,
    // component: React.lazy(() => import("views/app-views/partner/partnerProfile")),
  },

  {
    key: "Headcount",
    path: `${APP_PREFIX_PATH}/headcount/*`,
    component: React.lazy(() => import("views/app-views/headcount")),
  },
  {
    key: "Players.list",
    path: `${APP_PREFIX_PATH}/headcount/players`,
    component: React.lazy(() => import("views/app-views/headcount/playerList")),
  },
  {
    key: "Players.add",
    path: `${APP_PREFIX_PATH}/headcount/players/add`,
    component: React.lazy(() => import("views/app-views/headcount/playerAdd")),
  },
  {
    key: "Players.edit",
    path: `${APP_PREFIX_PATH}/headcount/players/edit/:id`,
    component: React.lazy(() => import("views/app-views/headcount/playerEdit")),
  },
  {
    key: "Staff.list",
    path: `${APP_PREFIX_PATH}/headcount/staff`,
    component: React.lazy(() => import("views/app-views/headcount/stafList")),
  },
  {
    key: "Staff.add",
    path: `${APP_PREFIX_PATH}/headcount/staff/add`,
    component: React.lazy(() => import("views/app-views/headcount/staffAdd")),
  },
  {
    key: "Staff.edit",
    path: `${APP_PREFIX_PATH}/headcount/staff/edit/:id`,
    component: React.lazy(() => import("views/app-views/headcount/stafEdit")),
  },

  {
    key: "Matchs",
    path: `${APP_PREFIX_PATH}/matchs/*`,
    component: React.lazy(() => import("views/app-views/match")),
  },
  {
    key: "Matchs.list",
    path: `${APP_PREFIX_PATH}/matchs/liste`,
    component: React.lazy(() => import("views/app-views/match/matchsList")),
  },
  {
    key: "Matchs.add",
    path: `${APP_PREFIX_PATH}/matchs/add`,
    component: React.lazy(() =>
      import("views/app-views/match/matchApplicationAdd")
    ),
  },
  {
    key: "Matchs.edit",
    path: `${APP_PREFIX_PATH}/matchs/edit/:id`,
    component: React.lazy(() =>
      import("views/app-views/match/matchApplicationEdit")
    ),
  },
  // {
  //   key: "Matchs.viewOne",
  //   path: `${APP_PREFIX_PATH}/matchs/details/:id`,
  //   component: React.lazy(() => import("views/app-views/match/matchDetails")),
  // },

  {
    key: "Club",
    path: `${APP_PREFIX_PATH}/club`,
    component: React.lazy(() => import("views/app-views/club")),
  },
  {
    key: "Live",
    path: `${APP_PREFIX_PATH}/lives`,
    component: React.lazy(() => import("views/app-views/live")),
  },
  {
    key: "Lives.list",
    path: `${APP_PREFIX_PATH}/lives/liste`,
    component: React.lazy(() => import("views/app-views/live/liveList")),
  },
  {
    key: "Live.add",
    path: `${APP_PREFIX_PATH}/lives/add`,
    component: React.lazy(() =>
      import("views/app-views/live/liveApplicationAdd")
    ),
  },
  {
    key: "Live.edit",
    path: `${APP_PREFIX_PATH}/lives/edit/:id`,
    component: React.lazy(() =>
      import("views/app-views/live/liveApplicationEdit")
    ),
  },
  {
    key: "Message",
    path: `${APP_PREFIX_PATH}/messages`,
    component: React.lazy(() => import("views/app-views/message")),
  },
  {
    key: "Messages.list",
    path: `${APP_PREFIX_PATH}/messages/liste`,
    component: React.lazy(() => import("views/app-views/message/messageList")),
  },
  // {
  //   key: "Message.add",
  //   path: `${APP_PREFIX_PATH}/messages/add`,
  //   component: React.lazy(() =>
  //     import("views/app-views/message/messageApplicationAdd")
  //   ),
  // },
  // {
  //   key: "Message.edit",
  //   path: `${APP_PREFIX_PATH}/messages/edit/:id`,
  //   component: React.lazy(() =>
  //     import("views/app-views/message/messageApplicationEdit")
  //   ),
  // },
  {
    key: "Message.detail",
    path: `${APP_PREFIX_PATH}/messages/detail/:id`,
    component: React.lazy(() =>
      import("views/app-views/message/messageApplicationDetail")
    ),
  },
  {
    key: "Message.compose",
    path: `${APP_PREFIX_PATH}/messages/compose`,
    component: React.lazy(() =>
      import("views/app-views/message/messageCompose")
    ),
  },
  {
    key: "Message.Inbox",
    path: `${APP_PREFIX_PATH}/messages/inbox`,
    component: React.lazy(() => import("views/app-views/message/messageInbox")),
  },
  {
    key: "User.manageAccount",
    path: `${APP_PREFIX_PATH}/mon_compte/*`,
    component: React.lazy(() => import("views/app-views/account")),
  },
];
