// добавляем/удаляем токен пользователя в локальное хранение, доступно, пока не удалим
export const getSessionFromStorage = () => localStorage.getItem("token");

export const removeSessionFromStorage = () => localStorage.removeItem("token");

export const addSessionToStorage = (token: string) =>
  localStorage.setItem("token", token);
