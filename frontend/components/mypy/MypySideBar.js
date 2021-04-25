import React, { useState } from 'react';
import { connect } from 'react-redux';

function MypySideBar( {
	signedIn : SignedIn,
	me : Me,
} ) {

	const [ isEditing, setIsEditing, ] = useState( false );

	return (
		<div className="mypySideBar">
			<form className="mypySideBar__info">
				<span className="mypySideBar__name">
					{SignedIn && Me ? Me.first_name : 'Guest'}
				</span>
				<span className="mypySideBar__email">{SignedIn && Me && Me.email}</span>
				<p className="mypySideBar__bio">{SignedIn && Me && Me.bio && Me.bio}</p>
				{
					SignedIn && Me && <button>Update</button>
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
