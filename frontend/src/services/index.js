import { user } from "./user";
import { auth } from "./auth";
import { card } from "./card";
import { chatgpt } from "./chatgpt";
import api from "./axiosClient";

const services = {
  auth,
  user,
  card,
  chatgpt,
};

api.interceptors.request.use(
  async (config) => {
    const { csrfToken } = await auth.getCsrf();
    config.headers["x-csrf-token"] = csrfToken;
    return config;
  },
  null,
  {
    runWhen: (config) =>
      ["post", "put", "patch", "delete"].includes(config.method),
  }
);

export default services;
