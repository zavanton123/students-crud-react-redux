import React from 'react';
import axios from "axios";

export const StudentServiceContext = React.createContext();

export default class StudentService {

  constructor() {
    this._host = "http://127.0.0.1:9999/evolunta";
  }

  getStudents() {
    return axios.get(`${this._host}/students/`)
      .then(response => response.data);
  }

  getStudentById(studentId) {
    return axios.get(`${this._host}/students/${studentId}`)
      .then(response => response.data);
  }

  addStudent(student) {
    return axios.post(`${this._host}/students/`, student);
  }

  deleteStudent(studentId) {
    return axios.delete(`${this._host}/students/${studentId}`);
  }
}