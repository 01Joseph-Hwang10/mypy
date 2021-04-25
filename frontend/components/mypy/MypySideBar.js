import React, { useState } from 'react';
import { connect } from 'react-redux';

function MypySideBar( {
	signedIn : SignedIn,
	me : Me,
} ) {

	const [ isEditing, setIsEditing, ] = useState( false );

	const {
		first_name : name,
		email,
		bio,
	} = Me;

	return (
		<div className="mypySideBar">
			<form className="mypySideBar__info">
				<span className="mypySideBar__name">
					{SignedIn ? name : 'Guest'}
				</span>
				<span className="mypySideBar__email">{SignedIn && email}</span>
				<p className="mypySideBar__bio">{SignedIn && bio && bio}</p>
				{
					SignedIn && <button>Update</button>
				}
			</form>
			<div className="mypySideBar__buttons"></div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		signedIn : state.auth.signedIn,
		me : state.retrieveUser.me,
	};
};

const mapDispatchToProps = null;


export default connect( mapStateToProps, mapDispatchToProps )( MypySideBar );
