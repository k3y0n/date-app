const TOKEN_KEY = "jwtToken";
const REFRESH_KEY = "jwtRefreshToken";
const EXPIRES_KEY = "jwtExpiresIn";
const USERID_KEY = "userId";

const setTokens = ({
  refreshToken,
  accessToken,
  userId,
  expiresIn = 3600,
}) => {
  const expiredDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiredDate);
  localStorage.setItem(USERID_KEY, userId);
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
  getAccessToken: () => localStorage.getItem(TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_KEY),
  getExpiresIn: () => localStorage.getItem(EXPIRES_KEY),
  getUserId: () => localStorage.getItem(USERID_KEY),
};

export default localStorageService;
