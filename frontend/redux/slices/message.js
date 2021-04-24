import { createSlice } from "@reduxjs/toolkit";
import { PYTHON_BLUE, PYTHON_YELLOW, TEAL } from "@src/constants";


export const playAnimation = () => {
	const messageWrapper = document.querySelector( '.messageWrapper' );
	const message = messageWrapper.querySelector( '.message' );
	message.style.transform = 'translateY(2.5rem)';
	setTimeout( () => {
		message.style.transform = 'translateY(-3rem)';
	}, 1000 );
};


export const {
	reducer,
	actions : {
		showMessage,
	},
} = createSlice( {
	name : 'messageSlice',
	initialState : {
		message : null,
		color : null,
	},
	reducers : {
		showMessage : ( state, { payload : { message, level, }, } ) => {
			state.message = message;
			switch ( level ) {
			case undefined:
				state.color = PYTHON_BLUE;
				break;
			case 'info':
				state.color = PYTHON_BLUE;
				break;
			case 'success':
				state.color = TEAL;
				break;
			case 'warning':
				state.color = PYTHON_YELLOW;
				break;
			case 'error':
				state.color = 'tomato';
				break;
			default:
				state.color = PYTHON_BLUE;
				break;
			}
			playAnimation();
		},
	},
} );

