import axiosClient from "../config/axiosClient";
const cache = {
  users: null,
  categories: null,
};

class UseApi {
  getUsers = async () => {
    const response = axiosClient.get("/users");
    return (await response).data;
  };

  getUserById = async (id: string) => {
    const response = axiosClient.get(`/user/${id}`);
    return (await response).data;
  };
}

export const useApi = () => {
  const api = new UseApi();
  return api;
};

export default useApi;
