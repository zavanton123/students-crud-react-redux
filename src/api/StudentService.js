import axios from "axios";

const BASE_HOST = "http://127.0.0.1:9999/evolunta";

export const getStudents = () => {
  return axios.get(`${BASE_HOST}/students/`)
    .then(response => response.data);
}

export const getStudentById = (studentId) => {
  return axios.get(`${BASE_HOST}/students/${studentId}/`)
    .then(response => response.data);
}

export const addStudent = (student) => {
  return axios.post(`${BASE_HOST}/students/`, student);
}

export const deleteStudent = (studentId) => {
  return axios.delete(`${BASE_HOST}/students/${studentId}/`);
}

export const updateStudent = (student) => {
  return axios.put(`${BASE_HOST}/students/${student.id}/`, student)
}