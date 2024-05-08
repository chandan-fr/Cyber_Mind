import axios from "axios";
import { _Base_Url } from "../../config/staticVariables";

const Api = axios.create({ baseURL: _Base_Url });

export const GETSLIDERDATA = () => Api.get("/get/welcome/sliders");
export const LOGIN = (loginData) => Api.post("/auth/user/login", loginData);
export const SOCIAL_LOGIN = (loginData) => Api.post("/auth/user/social", loginData);
export const REGISTER = (userData) => Api.post("/auth/user/register", userData);
export const ALLMEMBER = (_Header) => Api.get("/get/all/member", _Header);
export const ALLCATEGORY = (_Header) => Api.get("/get/all/category", _Header);
export const UPDATEUSER = (_Header, userData) => Api.post("/user/profile/update", userData, _Header);