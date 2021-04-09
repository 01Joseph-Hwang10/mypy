import { combineReducers } from 'redux';
import { createAppSlice } from '@slices/craete-app';
import { listAppSlice } from './slices/list-app';

const rootReducer = combineReducers({
    createApp: createAppSlice.reducer,
    listApp: listAppSlice.reducer,
});

export default rootReducer;
