import { axiosPrivate } from "api/axios";
import { AUTH_TOKEN, REFRESH_TOKEN } from "constants/AuthConstant";

const joueurService = {};
joueurService.addPlayer = function (data) {
  if (data instanceof FormData) {
    console.log(data,"data player is FormData");
  } else {
    console.log("data player is not FormData");
  }
 
  return axiosPrivate({
    method: "post",
    url: "/api/joueur/createPlayer",
    data: data.data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};



joueurService.UpdatePlayer = function (id, data) {
 
  return axiosPrivate({
    method: "put",
    url: `/api/joueur/updateJoueur/${id}`,
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};



  joueurService.getJoueurs = function () {
  return axiosPrivate({
    method: "get",
    url: `/api/joueur/getAll`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

joueurService.getPlayersByFullName = function (fullName) {
  return axiosPrivate({
    method: "get",
    url: `/api/joueur/getAllByFullName?fullName=${fullName}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

joueurService.getOnePlayer = function (id) {
  return axiosPrivate({
    method: "get",
    url: `/api/joueur/getJoueurById/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};
joueurService.deletePlayer = function (id) {
  return axiosPrivate({
    // params: {
    //   id: id
    // },
    method: "delete",
    url: `/api/joueur/deleteJoueurById/${id}`,
    
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};





export default joueurService;
