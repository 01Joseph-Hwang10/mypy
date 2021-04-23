const BASE_URL = 'http://localhost:8000/source';
const API_URL = `${BASE_URL}/api`;
const AUTH_URL = `${BASE_URL}/auth`;
// Apps
export const CREATE_APP = `${API_URL}/apps/create/`;
export const LIST_APP = `${API_URL}/apps/list/`;
export const RETRIEVE_APP = `${API_URL}/apps/retrieve/`;
export const EXECUTE_APP = `${API_URL}/apps/execute/`;
export const UPDATE_APP = `${API_URL}/apps/update/`;
export const DELETE_APP = `${API_URL}/apps/delete/`;

// Auth
export const SIGN_UP = `${AUTH_URL}/signup/`;
export const TOKEN = `${AUTH_URL}/token/`;
export const REFRESH = `${AUTH_URL}/refresh/`;
export const LOGOUT = `${AUTH_URL}/logout/`;
