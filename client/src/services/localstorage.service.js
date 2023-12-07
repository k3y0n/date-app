const TOKEN_KEY = "jwtToken";
const REFRESH_KEY = "jwtRefreshToken";
const EXPIRES_KEY = "jwtExpiresIn";
const USERID_KEY = "userId";

const setTokens = ({ refreshToken, idToken, localId, expiresIn = 3600 }) => {
  const expiredDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiredDate);
  localStorage.setItem(USERID_KEY, localId);
};

const removeTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
  localStorage.removeItem(USERID_KEY);
};

const localStorageService = {
  setTokens,
  removeTokens,
  getToken: () => localStorage.getItem(TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_KEY),
  getExpiresIn: () => localStorage.getItem(EXPIRES_KEY),
  getUserId: () => localStorage.getItem(USERID_KEY),
};

export default localStorageService;
