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
  return removePerson;
};

const updatePerson = (id, details) => {
  let updatePerson = axios.put(`${baseUrl}/${id}`, details);
  return updatePerson.then((response) => response.data);
};
export default { getAll, addNew, removePerson, updatePerson };
