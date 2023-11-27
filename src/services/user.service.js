import httpService from "./http.service";

const userEndPoint = "user/";

const userService = {
  get: async () => {
    const { data } = httpService.get(userEndPoint);
    return data;
  },
};

export default userService;
