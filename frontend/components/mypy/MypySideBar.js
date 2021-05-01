import updateUserDataForm from '@redux/form/updateUserDataForm';
import { retrieveMeSuccessful } from '@redux/slices/retrieve-user';
import { updateUser, updateUserSuccessful, updateUserError } from '@redux/slices/update-user';
import { PYTHON_BLUE, PYTHON_YELLOW } from '@src/constants';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import TextAreaAutosize from 'react-textarea-autosize';
import { SIGN_UP } from '@src/urls';

function MypySideBar( {
	signedIn : SignedIn,
	me : Me,
	updateUserSuccessful : UpdateUserSuccessful,
	updateUserError : UpdateUserError,
	isSuccessful : UpdateIsSuccessful,
	error : UpdateError,
	retrieveMeSuccessful : RetrieveMeSuccessful,
} ) {

	const [ isEditing, setIsEditing, ] = useState( false );
	const [ isSubmitting, setIsSubmitting, ] = useState( false );

	const styleFormElement = { display : isEditing ? 'block' : 'none', };
	const styleSpanElement = { display : isEditing ? 'none' : 'block', };
	const styleButton = { backgroundColor : isEditing ? PYTHON_YELLOW : PYTHON_BLUE, };

	const toggleButton = async ( e ) => {
		if ( isEditing ) {
			setIsSubmitting( true );
			const [ formData, object, ] = updateUserDataForm( e );
			const { ok, data, } = await updateUser( Me.id, formData );
			if ( ok ) {
				const newMe = {
					...Me,
					first_name : object.first_name,
					email : object.email,
					bio : object.bio,
				};
				RetrieveMeSuccessful( newMe );
				UpdateUserSuccessful();
				setIsEditing( false );
			} else {
				UpdateUserError( data );
			}
			setIsSubmitting( false );
		} else {
			setIsEditing( true );
		}
	};


	return (
		<div className="mypySideBar">
			<div className="mypySideBar__info">
				<span style={styleSpanElement} className="mypySideBar__span mypySideBar__name">
					{SignedIn ? Me?.first_name : 'Guest'}
				</span>
				{
					!SignedIn && 
					<div className="mypySideBar__guestLogin">
						<span>Sign up and access to your imported app list at any device!</span>
						<div className="sideBar__buttons">
							<Link href={SIGN_UP}>
								<button className="buttonRipple">Sign Up</button>
							</Link>
						</div>
					</div>
				}
				{ SignedIn && <input className="mypySideBar__input mypySideBar__name__input" name="first_name" placeholder='Name' defaultValue={Me?.first_name} style={styleFormElement}></input> }
				<span style={styleSpanElement} className="mypySideBar__span mypySideBar__email">{SignedIn && Me?.email}</span>
				{ SignedIn && <input className="mypySideBar__input mypySideBar__email__input" name="email" placeholder='Email' defaultValue={Me?.email} style={styleFormElement}></input> }
				<p style={styleSpanElement} className="mypySideBar__span mypySideBar__bio">{SignedIn && Me?.bio}</p>
				{ SignedIn && <TextAreaAutosize className="mypySideBar__input mypySideBar__bio__input" name="bio" placeholder='Bio' defaultValue={Me?.bio} style={styleFormElement} /> }
				{
					SignedIn && Me && <button onClick={toggleButton} style={styleButton}>{isSubmitting ? 'Loading...' : 'Update'}</button>
				}
				{
					!UpdateIsSuccessful && <span className="mypySideBar__errorMessage">{UpdateError}</span>
				}
			</div>
			<div className="mypySideBar__extraContent">
				<div className="sideBar__aboutApp">
					<span>MYPY: Python app everywhere!</span>
					<span>
						MYPY serves your python app online! 
						<Link href='/about'>Learn more!</Link>
					</span>
				</div>
				<div className="sideBar__buttons">
					<Link href='/create'>
						<button className="buttonRipple">Create new</button>
					</Link>
					<Link href='/tutorial'>
						<button className="buttonRipple">Tutorial</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		signedIn : state.auth.signedIn,
		me : state.retrieveUser.me,
		isSuccessful : state.updateUser.isSuccessful,
		error : state.updateUser.error,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateUserSuccessful : () => dispatch( updateUserSuccessful() ),
		updateUserError : ( response ) => dispatch( updateUserError( response ) ),
		retrieveMeSuccessful : ( response ) => dispatch( retrieveMeSuccessful( response ) ),
	};
};


export default connect( mapStateToProps, mapDispatchToProps )( MypySideBar );
