export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated() {
  const token = getToken();
  return Boolean(token);
}

export function logout() {
  localStorage.removeItem("token");
}
