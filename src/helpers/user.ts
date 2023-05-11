// добавляем/удаляем токен пользователя в локальное хранение, доступно, пока не удалим
export const getUserFromStorage = () => localStorage.getItem("user");

export const removeUserFromStorage = () => localStorage.removeItem("user");

export const addUserToStorage = (user: string) =>
  localStorage.setItem("user", user);
