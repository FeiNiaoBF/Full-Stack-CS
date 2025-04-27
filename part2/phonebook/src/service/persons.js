import axios from 'axios';
const baseUrl = 'http://localhost:3002/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    return response.data;
  });
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => {
    return response.data;
  });
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => {
    return response.data;
  });
};

const deletePerson = (id, newObject) => {
  const request = axios.delete(`${baseUrl}/${id}`, newObject);
  return request.then((response) => {
    return response.data;
  });
};

export default {
  get: getAll,
  create: create,
  update: update,
  del: deletePerson,
};

// export default personService;
