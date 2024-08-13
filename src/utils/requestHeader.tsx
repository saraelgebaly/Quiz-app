import CookieServices from "../utils/Cookies"


export const requestHeader = { Authorization: `Bearer ${CookieServices.get("accessToken")}` };
