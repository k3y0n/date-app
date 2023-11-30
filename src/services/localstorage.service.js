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

const localStorageService = {
  setTokens,
  getToken: () => localStorage.getItem(TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_KEY),
  getExpiresIn: () => localStorage.getItem(EXPIRES_KEY),
  getUserId: () => localStorage.getItem(USERID_KEY),
};

export default localStorageService;
