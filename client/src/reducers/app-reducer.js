/* eslint-disable import/no-anonymous-default-export */
import * as type from "../constants/action-types";

const initialState = {
	loading: false,
	allBuckets: [],
	allTodoLists: [],
	addedTodoList: [],
	addedNewBucket: false
}

function insertItem(array, item) {
	array.push(item)
	return array;
}


export default (state = initialState, action) => {
	switch (action.type) {
		case type.FETCH_BUCKETS: {
			let allBuckets = action.payload ? action.payload : state.allBuckets;
			return { ...state, loading: true, allBuckets: allBuckets };
		}
		case type.FETCH_BUCKETS_SUCCEESS: {
			return { ...state, loading: false, allBuckets: action.payload };
		}
		case type.FETCH_BUCKETS_FAILURE:
			return { ...state, loading: false, allBuckets: null };
		case type.UPDATE_BUCKETS:
			return { ...state, loading: true };
		case type.UPDATE_BUCKETS_SUCCEESS:
			return { ...state, loading: false };
		case type.UPDATE_BUCKETS_FAILURE:
			return { ...state, loading: false };
		case type.CREATE_BUCKETS:
			return { ...state, loading: true, addedBucket: action.payload };
		case type.CREATE_BUCKETS_SUCCEESS:
			return { ...state, loading: false, allBuckets: action.payload };
		case type.CREATE_BUCKETS_FAILURE:
			return { ...state, loading: false };
		case type.REMOVE_BUCKETS:
			let filteredBucketArrayIndex = action.payload.bucketItemIndex;
			if (filteredBucketArrayIndex >= 0) {
				state.allBuckets.splice(filteredBucketArrayIndex, 1);
			}
			return { ...state, loading: true, allBuckets: state.allBuckets };
		case type.REMOVE_BUCKETS_SUCCEESS:
			debugger;
			return { ...state, loading: false, allBuckets: action.payload };
		case type.REMOVE_BUCKETS_FAILURE:
			return { ...state, loading: false };
		case type.FETCH_TODO_LISTS:
			return { ...state, loading: true };
		case type.FETCH_TODO_LISTS_SUCCESS:
			return { ...state, loading: false, allBuckets: action.payload };
		case type.FETCH_TODO_LISTS_FAILURE:
			return { ...state, loading: false, allBuckets: null };
		case type.UPDATE_TODO_LISTS:
			return { ...state, loading: true };
		case type.UPDATE_TODO_LISTS_SUCCESS:
			return { ...state, loading: false };
		case type.UPDATE_TODO_LISTS_FAILURE:
			return { ...state, loading: false };
		case type.CREATE_TODO_LISTS:
			let todoArray = (state.allTodoLists) ? state.allTodoLists : [] || [];
			let newTodo = insertItem(todoArray, action.payload);
			let bucketArray = (state.allBuckets) ? state.allBuckets : [];
			bucketArray.map(x => { if (x.title === action.payload.bucket) x.TodoLists.push(action.payload.listItem) });
			return { ...state, loading: true, addedTodoList: newTodo, allBuckets: bucketArray };
		case type.CREATE_TODO_LISTS_SUCCESS:
			return { ...state, loading: false };
		case type.CREATE_TODO_LISTS_FAILURE:
			return { ...state, loading: false };
		case type.REMOVE_TODO_LISTS:
			let filteredTodoArrayIndex = (state.allBuckets) ? state.allBuckets.filter((x, index) => { if (x.id === action.payload.id) return index; else return -1; }) : [] || [];
			if (filteredTodoArrayIndex >= 0) {
				state.allTodoLists.splice(filteredTodoArrayIndex, 1);
			}
			return { ...state, loading: true, allTodoLists: state.allTodoLists };
		case type.REMOVE_TODO_LISTS_SUCCESS:
			return { ...state, loading: false, allBuckets: action.payload };
		case type.REMOVE_TODO_LISTS_FAILURE:
			return { ...state, loading: false };
		default:
			return state;
	}
}
