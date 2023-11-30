const TOKEN_KEY = "jwtToken";
const REFRESH_KEY = "jwtRefreshToken";
const EXPIRES_KEY = "jwtExpiresIn";

const setTokens = ({ refreshToken, idToken, expiresIn = 3600 }) => {
  const expiredDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiredDate);
};

const localStorageService = {
  setTokens,
  getToken: () => localStorage.getItem(TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_KEY),
  getExpiresIn: () => localStorage.getItem(EXPIRES_KEY),
};

export default localStorageService;
