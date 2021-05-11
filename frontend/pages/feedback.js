import { showMessage } from '@redux/slices/message';
import { CREATE_FEEDBACK } from '@src/urls';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';

function feedback( {
	showMessage : ShowMessage,
} ) {

	const router = useRouter();

	const [ loading, setLoading, ] = useState( false );

	const submitFeedback = async ( e ) => {
		setLoading( true );
		e.preventDefault();
		const button = e.target.querySelector( 'button' );
		button.diabled = true;
		const email = e.target.querySelector( 'input' ).value | 'anonymous';
		const content = e.target.querySelector( 'textarea' ).value;
		const { status, } = await axios
			.post( CREATE_FEEDBACK, { email, content, }, { withCredentials : true, } );
		
		if ( status === 200 ) {
			setLoading( false );
			button.diabled = false;
			router.push( '/' );
			ShowMessage( { message : 'Thanks for your feedback :)', level : 'info', } );
		} else {
			setLoading( false );
			button.diabled = false;
			ShowMessage( { message : 'Sending feedback failed with error. Sorry for the inconvenience :/', level : 'error', } );
		}
	};

	return (
		<div className="feedbackContentWrapper">
			<form onSubmit={submitFeedback}>
				<span>Sending Feedback</span>
				<input name="email" placeholder="Your Email(To response your feedback. Optional)"></input>
				<TextareaAutosize name='content' required placeholder='Thank you so much for your feedback!!' />
				<button>{loading ? 'Loading...' : 'Send'}</button>
			</form>
		</div>
	);
}

const mapDispatchToProps = dispatch => {
	return {
		showMessage : ( data ) => dispatch( showMessage( data ) ),
	};
};

export default connect( null, mapDispatchToProps )( feedback );
