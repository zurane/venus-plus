export const AUTH_STORAGE_KEY = 'venus_auth';

export function getAuthDataFromResponse(data) {
  if (!data) return {};

  const token = data.token || data?.token || data?.accessToken || data?.data?.token || data?.data?.accessToken;
  const user = data.user || data?.data?.user;
  const userId = user?.id || user?._id || user?.user_id;
  const name = user?.name;

  return { token, userId, name };
}

export function storeAuth(data) {
  const authData = getAuthDataFromResponse(data);
  if (!authData.token || !authData.userId) {
    return false;
  }

  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    return true;
  } catch (error) {
    console.error('Failed to persist auth data', error);
    return false;
  }
}

export function getStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}
