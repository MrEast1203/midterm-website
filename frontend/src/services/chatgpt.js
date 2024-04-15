import api from "./axiosClient";

export const chatgpt = {
  async getChatGPTResponse(date) {
    let prompt = `You are a fortune teller, ${date} is my birthday, please use general horoscope information based on my birthday to tell me am I having a good year, please keep the response short. `;
    const { data } = await api.post("/chatgpt", { prompt });
    // console.log("data", data.response);
    return data.response;
  },
};
