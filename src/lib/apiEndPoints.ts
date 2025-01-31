import Env from "./env";

export const BASE_URL = `${Env.BACKEND_URL}/api`;
export const REGISTER_URL = `${BASE_URL}/user/register`;
export const VERIFY_EMAIL_URL = `${BASE_URL}/user/verify-email`;
export const LOGIN_URL = `${BASE_URL}/user/login`;
export const CHECK_LOGIN_URL = `${BASE_URL}/user/check-login`;
