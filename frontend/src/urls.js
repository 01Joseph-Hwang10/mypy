const FUNDAMENTAL_URL = 'http://localhost:8000';
const BASE_URL = `${FUNDAMENTAL_URL}/source`;
const API_URL = `${BASE_URL}/api`;
const AUTH_URL = `${BASE_URL}/auth`;
// Media
export const MEDIA_URL = `${FUNDAMENTAL_URL}/media`;
// Apps
export const CREATE_APP = `${API_URL}/apps/create/`;
export const LIST_APP = `${API_URL}/apps/list/`;
export const LIST_SELECTED_APP = `${API_URL}/apps/list/selected/`;
export const RETRIEVE_APP = `${API_URL}/apps/retrieve/`;
export const UPDATE_APP_SPEC = `${API_URL}/apps/update/app-spec/`;
export const UPDATE_INPUT_SPEC = `${API_URL}/apps/update/input-spec/`;
export const DELETE_APP = `${API_URL}/apps/delete/`;

export const BASE_APP_URL = `http://localhost`;

// Auth
export const SIGN_UP = `${AUTH_URL}/signup/`;
export const GOOGLE_LOGIN = `${AUTH_URL}/signup/google/`;
export const TOKEN = `${AUTH_URL}/token/`;
export const REFRESH = `${AUTH_URL}/refresh/`;
export const LOGOUT = `${AUTH_URL}/logout/`;

// Users
export const UPDATE_IMPORTS = `${API_URL}/users/update/imports/`;
export const UPDATE_GENERAL = `${API_URL}/users/update/`;
export const RETRIEVE_USER = `${API_URL}/users/retrieve/user/`;

// Feedbacks
export const CREATE_FEEDBACK = `${API_URL}/feedbacks/create/`;
