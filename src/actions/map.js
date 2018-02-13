import { all, call, put, select } from 'redux-saga/effects';

import * as TYPES from '../types';
import * as MapService from '../services/MapService';
import * as Search from '../services/SearchService';

export const setFiltersfromURL = (search, params) => ({
    type: TYPES.SET_FILTERS_FROM_URL,
    search,
    params
});

export const getArea = ({ code, query, filters }) => ({
    type: TYPES.FETCH_AREA,
    code,
    query,
    filters
});

export const getSearch = ({ code, query, filters, page }) => ({
    type: TYPES.FETCH_SEARCH,
    code,
    query,
    filters,
    page
});

export const updateFilters = filters => ({
    type: TYPES.UPDATE_FILTERS,
    filters
});

export const updateQuery = query => ({
    type: TYPES.UPDATE_QUERY,
    query
});

export const resetFilters = code => ({
    type: TYPES.FETCH_RESET_FILTERS,
    code
});

export const removeFilters = filters => ({
    type: TYPES.REMOVE_FILTERS,
    filters
});

export const toggleDrawer = isDrawerOpen => ({
    type: TYPES.TOGGLE_DRAWER,
    isDrawerOpen
});

export const getMoreDocs = ({ code, query, filters, page }) => ({
    type: TYPES.FETCH_MORE_DOCS,
    code,
    query,
    filters,
    page
});

export const setCode = code => ({
    type: TYPES.SET_CODE,
    code
});

export const resetArea = () => ({
    type: TYPES.RESET_AREA
});

export const getMap = store => store.map;

export function* fetchArea({ code, query, filters }) {
    try {
        const geo = yield call(MapService.getFeatures, code);
        const adjacent = yield call(MapService.getAdjacentFeatures, code);
        const search = yield call(Search.search, code, query, filters);
        const counts = yield call(MapService.getAreaCounts, search.facets, code, search.meta.total);
        yield put({ type: TYPES.SELECT_AREA, geo, adjacent, search, code, counts });
    } catch (e) {
        //handle faled
        console.log(e, 'failed');
    }
}

export function* fetchSearch({ code, query, filters, page }) {
    try {
        const search = yield call(Search.search, code, query, filters, page);
        const counts = yield call(MapService.getAreaCounts, search.facets, code, search.meta.total);
        yield put({ type: TYPES.SEARCH, search, counts });
    } catch (e) {
        //handle failed
        console.log(e, 'failed');
    }
}

export function* fetchMoreDocs({ code, query, filters, page }) {
    try {
        const search = yield call(Search.search, code, query, filters, page);
        yield put({ type: TYPES.GET_MORE_DOCS, search, page });
    } catch (e) {
        //handle failed
        console.log(e, 'failed');
    }
}

export function* fetchResetFilters() {
    try {
        yield put({ type: TYPES.RESET_FILTERS });
        const { filters, code } = yield select(getMap);
        yield put({ type: TYPES.FETCH_SEARCH, code, filters });
    } catch (e) {
        //handle failed
        console.log(e, 'failed');
    }
}
