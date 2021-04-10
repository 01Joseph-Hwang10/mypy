import { combineReducers } from 'redux';
import { createAppSlice } from '@slices/craete-app';
import { listAppSlice } from './slices/list-app';
import { executeAppSlice } from './slices/execute-app';

const rootReducer = combineReducers({
    createApp: createAppSlice.reducer,
    listApp: listAppSlice.reducer,
    executeApp: executeAppSlice.reducer
});

export default rootReducer;
