import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  let getAllPersons = axios.get(baseUrl);
  return getAllPersons.then((res) => res.data);
};

const addNew = (person) => {
  let newPerson = axios.post(baseUrl, person);
  return newPerson.then((res) => res.data);
};

const removePerson = (id) => {
  let removePerson = axios.delete(`${baseUrl}/${id}`);
  return removePerson.then((res) => res.data);
};

const updatePerson = (id, person) => {
  let updatePerson = axios.put(`${baseUrl}/${id}`, person);
  return updatePerson.then((res) => res.data);
};
export default { getAll, addNew, removePerson, updatePerson };
