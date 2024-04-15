import api from "./axiosClient";

export const card = {
  async getAll() {
    const { data } = await api.get("/cards");
    return data;
  },
  async createOne(username, password, cardData) {
    const { data } = await api.post("/cards", { username, password, cardData });
    return data;
  },
  async deleteOne(username, password, cardId) {
    const { data } = await api.post("/cards/deleteOne", {
      username,
      password,
      cardId,
    });
    return data;
  },
};
