
import * as type from '../constants/action-types';

export const fetchBuckets = payload => {
    return ({
        type: type.FETCH_BUCKETS,
        payload
    })
};

export const createBuckets = payload => {
    return ({
        type: type.CREATE_BUCKETS,
        payload
    })
};


export const updateBuckets = payload => {
    return ({
        type: type.UPDATE_BUCKETS,
        payload
    })
};

export const removeBuckets = payload => ({
    type: type.REMOVE_BUCKETS,
    payload
});

export const fetchTodoLists = payload => ({
    type: type.FETCH_TODO_LISTS,
    payload
});

export const updateTodoLists = payload => {
    return ({
        type: type.UPDATE_TODO_LISTS,
        payload
    })
};

export const createTodoLists = payload => ({
    type: type.CREATE_TODO_LISTS,
    payload
});

export const removeTodoLists = payload => ({
    type: type.REMOVE_TODO_LISTS,
    payload
});