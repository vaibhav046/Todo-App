import axios from "axios"

const BUCKETS_ENDPOINT = "http://localhost:5000/api/buckets";
const BUCKETS_DELETE_ENDPOINT = "http://localhost:5000/api/buckets/delete";
const TODO_ENDPOINT = "http://localhost:5000/api/todo";
const TODO_DELETE_ENDPOINT = "http://localhost:5000/api/todo/delete";

export const fetchBuckets = () => axios.get(BUCKETS_ENDPOINT);
export const createBuckets = (payload) => axios.post(BUCKETS_ENDPOINT, payload);
export const updateBuckets = (payload) => axios.put(BUCKETS_ENDPOINT, payload);
export const removeBuckets = (payload) => axios.post(BUCKETS_DELETE_ENDPOINT, payload);




export const fetchTodoLists = () => axios.get(TODO_ENDPOINT);
export const createTodoLists = (payload) => axios.post(TODO_ENDPOINT, payload);
export const updateTodoLists = (payload) => axios.put(TODO_ENDPOINT, payload);
export const removeTodoLists = (payload) => axios.post(TODO_DELETE_ENDPOINT, payload);