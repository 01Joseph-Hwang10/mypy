import { SCREEN_LARGE, SCREEN_MEDIUM, SCREEN_SMALL, SCREEN_XLARGE, SCREEN_XXLARGE } from "@src/constants";

const defaultDistance = 20;

export let translateDistance = defaultDistance * 2;

if ( typeof window === 'object' ) {
	if ( window.matchMedia( `(min-width: ${SCREEN_SMALL}px)` ).matches ) {
		translateDistance = defaultDistance * 1;
	}
	if ( window.matchMedia( `(min-width: ${SCREEN_MEDIUM}px)` ).matches ) {
		translateDistance = defaultDistance * 2;
	}
	if ( window.matchMedia( `(min-width: ${SCREEN_LARGE}px)` ).matches ) {
		translateDistance = defaultDistance * 3;
	}
	if ( window.matchMedia( `(min-width: ${SCREEN_XLARGE}px)` ).matches ) {
		translateDistance = defaultDistance * 4;
	}
	if ( window.matchMedia( `(min-width: ${SCREEN_XXLARGE}px)` ).matches ) {
		translateDistance = defaultDistance * 5;
	}
}

export const returnLoginElements = () => {
	if ( typeof document === 'object' ) {
		const nav = document.querySelector( '#navigation' );
		const signInButton = nav.querySelector( '.signInButton' );
		const loginFormWrapper = document.querySelector( '#loginFormWrapper' );
	
		return {
			nav,
			signInButton,
			loginFormWrapper,
		};
	}
};

export const checkLoginExists = () => {
	const { loginFormWrapper, } = returnLoginElements();
	if ( loginFormWrapper ) return true;
	return false;
};

export const maintainWhenFocusWithin = ( e ) => {

	const {
		signInButton,
		loginFormWrapper,
	} = returnLoginElements();

	const loginForm = loginFormWrapper.querySelector( '.loginForm' );
	const signupForm = loginFormWrapper.querySelector( '.signupForm' );

	console.log( loginForm );

	const loginFormBool = Boolean( !loginForm || ( loginForm && !loginForm.contains( e.target ) ) );
	const signupFormBool = Boolean( !signupForm || ( signupForm && !signupForm.contains( e.target ) ) );

	console.log( loginFormBool, signupFormBool );

	if ( loginFormBool && signupFormBool  && !signInButton.contains( e.target ) ) {
		signInButton.removeAttribute( 'style' );
		loginFormWrapper.style.transform = `translateX(${translateDistance}rem)`;
		document.removeEventListener( 'click', maintainWhenFocusWithin );
	}
};

export const signInToggle = () => {

	const {
		signInButton,
		loginFormWrapper,
	} = returnLoginElements();

	if ( signInButton.style.backgroundColor ) {
		signInButton.removeAttribute( 'style' );
		loginFormWrapper.style.transform = `translateX(${translateDistance}rem)`;
		document.removeEventListener( 'click', maintainWhenFocusWithin );
	} else {
		signInButton.style.backgroundColor = '#d6e0f0';
		loginFormWrapper.style.transform = 'translateX(0)';
		document.addEventListener( 'click', maintainWhenFocusWithin );
	}
};

export const cleanUp = () => {

	const {
		loginFormWrapper,
	} = returnLoginElements();

	if ( loginFormWrapper ) {
		loginFormWrapper.style.transform = `translateX(${translateDistance}rem)`;
	}
	document.removeEventListener( 'click', maintainWhenFocusWithin );
};
