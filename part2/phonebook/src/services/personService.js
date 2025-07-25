import axios from "axios";
//https://backend-lingering-snow-1218.fly.dev/api/persons
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

// {name: string, number: string}
const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  delete: deletePerson,
};
