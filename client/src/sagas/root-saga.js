import { all } from "redux-saga/effects";
import {
	createBucketWatcher,
	createTodoListWatcher,
	deleteBucketWatcher,
	deleteTodoListWatcher,
	getAllBucketsWatcher,
	getAllTodoListsWatcher,
	updateBucketWatcher,
	updateTodoListWatcher

} from './repos-saga'

export default function* rootSaga() {
	yield all([
		createBucketWatcher(),
		createTodoListWatcher(),
		deleteBucketWatcher(),
		deleteTodoListWatcher(),
		getAllBucketsWatcher(),
		getAllTodoListsWatcher(),
		updateBucketWatcher(),
		updateTodoListWatcher()
	]);
}