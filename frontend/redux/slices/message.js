import { createSlice } from "@reduxjs/toolkit";


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
		showMessage : ( state, { payload : { message, }, } ) => {
			state.message = message;
		},
	},
} );


export const playAnimation = () => {
	const messageWrapper = document.querySelector( '.messageWrapper' );
	const message = messageWrapper.querySelector( '.message' );
	message.style.transform = 'translateY(2.5rem)';
	setTimeout( () => {
		message.style.transform = 'translateY(-3rem)';
	}, 1000 );
};
