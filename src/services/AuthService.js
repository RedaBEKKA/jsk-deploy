import { axiosPrivate } from "api/axios";
import { AUTH_TOKEN, REFRESH_TOKEN } from "constants/AuthConstant";

const AuthService = {};

AuthService.login = function (data) {
  return axiosPrivate({
    method: "post",
    url: "/api/clubManagement/login",
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    
  });
};

AuthService.refresh = function () {
  return axiosPrivate({
    method: "get",
    url: "/api/refresh/refreshToken",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(REFRESH_TOKEN)}`,
      RefreshT:true
    },
  });
};

AuthService.getUser = function () {
  return axiosPrivate({
    method: "get",
    url: "/api/clubManagement/profil",
    data: {},
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};
AuthService.register = function (data) {
  if (data instanceof FormData) {
    console.log("data is FormData");
  } else {
    console.log("data is not FormData");
  }

  let result = axiosPrivate({
    method: "post",
    url: "/api/clubManagement/register",
    data: data.data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  console.log(result,'my result');
  return result
};

AuthService.logout = function (token) {
  return axiosPrivate({
    method: "post",
    url: "/auth/logout",
    data: {},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// AuthService.loginInOAuth = function () {
//   return fetch({
//     url: "/auth/loginInOAuth",
//     method: "post",
//   });
// };

export default AuthService;
