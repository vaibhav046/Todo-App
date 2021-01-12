import { takeLatest, call, put } from "redux-saga/effects";
import { createBuckets, fetchBuckets, updateBuckets, removeBuckets, createTodoLists, fetchTodoLists, removeTodoLists, updateTodoLists } from "../apis";
import * as type from "../constants/action-types";

/** ****************************** All Workers here *********************** */

export function* getAllBucketsWorker() {
	try {
		const res = yield call(fetchBuckets);
		yield put({
			type: type.FETCH_BUCKETS_SUCCEESS,
			payload: res.data
		});
	} catch ({ message }) {
		yield put({
			type: type.FETCH_BUCKETS_FAILURE,
			payload: message
		});
	}
}

export function* createBucketWorker(payload) {
	try {
		const res = yield call(createBuckets, payload);
		yield put({ type: type.FETCH_BUCKETS });
		yield put({ type: type.CREATE_BUCKETS_SUCCEESS, payload: res.data });
	} catch ({ message }) {
		yield put({
			type: type.CREATE_BUCKETS_FAILURE,
			payload: message
		});
	}
}

export function* updateBucketWorker({ payload }) {
	try {
		const res = yield call(updateBuckets, payload);
		yield put({ type: type.FETCH_BUCKETS });
		yield put({ type: type.UPDATE_BUCKETS_SUCCEESS, payload: res.data });
	} catch (e) {
		yield put({
			type: type.UPDATE_BUCKETS_FAILURE,
			payload: e
		});
	}
}

export function* deleteBucketWorker({ payload }) {
	try {
		const res = yield call(removeBuckets, payload);
		yield put({ type: type.FETCH_BUCKETS });
		debugger;
		yield put({ type: type.REMOVE_BUCKETS_SUCCEESS, payload: res.data })
	} catch (e) {
		yield put({
			type: type.REMOVE_BUCKETS_FAILURE,
			payload: e
		});
	}
}

export function* getAllTodoListWorker() {
	try {
		const res = yield call(fetchTodoLists);
		yield put({
			type: type.FETCH_TODO_LISTS_SUCCESS,
			payload: res.data.lists
		});
	} catch ({ message }) {
		yield put({
			type: type.FETCH_TODO_LISTS_FAILURE,
			payload: message
		});
	}
}

export function* createTodoListWorker({ payload }) {
	try {
		const res = yield call(createTodoLists, payload);
		yield put({ type: type.CREATE_TODO_LISTS_SUCCESS, payload: res.data });
	} catch ({ message }) {
		yield put({
			type: type.CREATE_TODO_LISTS_FAILURE,
			payload: message
		});
	}
}

export function* updateTodoListWorker({ payload }) {
	try {
		const res = yield call(updateTodoLists, payload);
		yield put({ type: type.FETCH_BUCKETS });
		yield put({ type: type.UPDATE_TODO_LISTS_SUCCESS, payload: res.data });
	} catch (e) {
		yield put({
			type: type.UPDATE_TODO_LISTS_FAILURE,
			payload: e
		});
	}
}

export function* deleteTodoListWorker({ payload }) {
	try {
		const res = yield call(removeTodoLists, payload);
		yield put({ type: type.FETCH_BUCKETS });
		debugger;
		yield put({ type: type.REMOVE_TODO_LISTS_SUCCESS, payload: res.data })
	} catch (e) {
		yield put({
			type: type.REMOVE_TODO_LISTS_FAILURE,
			payload: e
		});
	}
}

/** ****************************** All Watchers here *********************** */


export function* getAllBucketsWatcher() {
	yield takeLatest(type.FETCH_BUCKETS, getAllBucketsWorker);
}

export function* createBucketWatcher() {
	yield takeLatest(type.CREATE_BUCKETS, createBucketWorker);
}

export function* updateBucketWatcher() {
	yield takeLatest(type.UPDATE_BUCKETS, updateBucketWorker);
}

export function* deleteBucketWatcher() {
	yield takeLatest(type.REMOVE_BUCKETS, deleteBucketWorker);
}

export function* getAllTodoListsWatcher() {
	yield takeLatest(type.FETCH_TODO_LISTS, getAllTodoListWorker);
}

export function* createTodoListWatcher() {
	yield takeLatest(type.CREATE_TODO_LISTS, createTodoListWorker);
}

export function* updateTodoListWatcher() {
	yield takeLatest(type.UPDATE_TODO_LISTS, updateTodoListWorker);
}

export function* deleteTodoListWatcher() {
	yield takeLatest(type.REMOVE_TODO_LISTS, deleteTodoListWorker);
}
