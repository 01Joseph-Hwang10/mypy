import React from 'react';
import { connect } from 'react-redux';

function Message( {
	message : Message,
	color : Color,
} ) {

	const animationStyle = {
		transform : 'translateY(-3rem)',
		backgroundColor : `${Color}`,
	};

	return (
		<div className="messageWrapper">
			<div className="message" style={animationStyle}>{Message}</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		message : state.message.message,
		color : state.message.color,
	};
};

export default connect( mapStateToProps, null )( Message );
