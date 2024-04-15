import api from "./axiosClient";

export const user = {
  async getAll() {
    const { data } = await api.get("/users");
    return data;
  },
  async createOne({ name, password }) {
    const { data } = await api.post("/users", { name, password });
    return data;
  },
  async getOneUser(username, password) {
    const { data } = await api.post(`/users/login`, { username, password });
    return data;
  },
  async addImage(image, username, password) {
    // console.log("addImage");
    // console.log(image, username, password);
    const { data } = await api.post(`/users/add_image`, {
      image,
      username,
      password,
    });
    return data;
  },
};
