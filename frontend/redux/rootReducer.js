import { combineReducers } from 'redux';
import { reducer as createAppReducer } from '@slices/craete-app';
import { reducer as listAppReducer } from '@slices/list-app';
import { reducer as ExecuteAppReducer } from '@slices/execute-app';
import { reducer as RetrieveAppReducer } from '@slices/retrieve-app';

const rootReducer = combineReducers({
    createApp: createAppReducer,
    listApp: listAppReducer,
    executeApp: ExecuteAppReducer,
    retrieveApp: RetrieveAppReducer,
});

export default rootReducer;
