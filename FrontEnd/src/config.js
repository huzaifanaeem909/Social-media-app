export const API_BASE_URL = "http://localhost:8000";
export const AUTH_BASE_URL = `${API_BASE_URL}/api/auth`;
export const POST_BASE_URL = `${API_BASE_URL}/api/post`;

export const API_ROUTES = {
  // Auth routes
  LOGIN: `${AUTH_BASE_URL}/login/`,
  LOGOUT: `${AUTH_BASE_URL}/logout/`,
  REGISTER: `${AUTH_BASE_URL}/register/`,
  PROFILE: `${AUTH_BASE_URL}/profile/`,

  // Post routes
  CREATE_POST: `${POST_BASE_URL}/create/`,
  GET_POSTS: `${POST_BASE_URL}/list/`,
  GET_POST: (id) => `${POST_BASE_URL}/${id}/view/`,
  UPDATE_POST: (id) => `${POST_BASE_URL}/${id}/update/`,
  DELETE_POST: (id) => `${POST_BASE_URL}/${id}/delete/`,
};
