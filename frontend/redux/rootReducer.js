import { combineReducers } from 'redux';
import { createAppSlice } from '@slices/craete-app';

const rootReducer = combineReducers({
    createApp: createAppSlice.reducer,
});

export default rootReducer;
