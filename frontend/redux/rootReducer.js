import { combineReducers } from 'redux';
import { reducer as createAppReducer } from '@slices/craete-app';
import { reducer as listAppReducer } from '@slices/list-app';
import { reducer as ExecuteAppReducer } from '@slices/execute-app';
import { reducer as RetrieveAppReducer } from '@slices/retrieve-app';
import { reducer as DeleteAppReducer } from '@slices/delete-app';
import { reducer as AuthReducer } from '@slices/auth';
import { reducer as MessageReducer } from '@slices/message';
import { reducer as exportAppReducer } from '@slices/exportApp';
import { reducer as retrieveUserReducer } from '@slices/retrieve-user';
import { reducer as updateUserReducer } from '@slices/update-user';

const rootReducer = combineReducers( {
	createApp : createAppReducer,
	listApp : listAppReducer,
	executeApp : ExecuteAppReducer,
	retrieveApp : RetrieveAppReducer,
	deleteApp : DeleteAppReducer,
	auth : AuthReducer,
	message : MessageReducer,
	exportApp : exportAppReducer,
	retrieveUser : retrieveUserReducer,
	updateUser : updateUserReducer,
} );

export default rootReducer;
